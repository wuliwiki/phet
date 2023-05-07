// Copyright 2020-2023, University of Colorado Boulder

/**
 * Given a requirejsNamespace, we filter out strings from phet.chipper.strings that start with it, and construct an
 * object with locale fallbacks already pre-computed, so that the correct strings can be accessed via object literal
 * access, e.g. getStringModule( 'JOIST' ).ResetAllButton.name will give the desired string value for whatever locale
 * the sim is being run with.
 *
 * A string "key" is in the form of "NAMESPACE/key.from.strings.json"
 *
 * NOTE: This file likely belongs in joist/js/i18n/, but should stay here to make maintenance-release maintainability easier.
 *
 * @author Jonathan Olson <jonathan.olson>
 */

import PhetioObject from '../../tandem/js/PhetioObject.js';
import Tandem from '../../tandem/js/Tandem.js';
import CouldNotYetDeserializeError from '../../tandem/js/CouldNotYetDeserializeError.js';
import IOType from '../../tandem/js/types/IOType.js';
import ObjectLiteralIO from '../../tandem/js/types/ObjectLiteralIO.js';
import LocalizedString from './LocalizedString.js';
import localeInfoModule from '../../chipper/js/data/localeInfoModule.js';
// constants
const FALLBACK_LOCALE = 'en';

// Holds all of our localizedStrings, so that we can save our phet-io string change state
export const localizedStrings = [];

// For developer internal use, particularly for memory leak detection
// e.g. _.max( phet.chipper.localizedStrings.map( ls => ls.property.tinyProperty.listeners.size ) ) to see if there is
// likely a leak
window.phet.chipper.localizedStrings = localizedStrings;

// For developer internal use, similar to the stringTest query parameter
window.phet.chipper.setAllStrings = str => {
  localizedStrings.forEach(localizedString => {
    localizedString.property.value = str;
  });
};
const StringStateIOType = new IOType('StringStateIO', {
  valueType: PhetioObject,
  toStateObject: () => {
    const data = {};
    localizedStrings.forEach(localizedString => {
      const state = localizedString.getStateDelta();

      // Only create an entry if there is anything (we can save bytes by not including the tandem here)
      if (Object.keys(state).length > 0) {
        data[localizedString.property.tandem.phetioID] = state;
      }
    });
    return {
      data: data // Data nested for a valid schema
    };
  },

  stateSchema: {
    data: ObjectLiteralIO
  },
  applyState: (ignored, state) => {
    // Every string in state has to be in localizedStrings to continue
    Object.keys(state.data).forEach(phetioID => {
      const match = localizedStrings.find(localizedString => localizedString.property.tandem.phetioID === phetioID);

      // When PhetioDynamicElementContainer elements such as PhetioGroup members add localizedStrings, we wait until
      // all of the members have been created (populating localizedStrings) before trying to set any of the strings.
      if (!match) {
        throw new CouldNotYetDeserializeError();
      }
    });

    // We need to iterate through every string in this runtime, since it might need to revert back to "initial" state.
    localizedStrings.forEach(localizedString => {
      localizedString.setStateDelta(state.data[localizedString.property.tandem.phetioID] || {});
    });
  }
});
PhetioObject.create({
  phetioType: StringStateIOType,
  tandem: Tandem.GENERAL_MODEL.createTandem('stringsState'),
  phetioDocumentation: 'Strings that have changed from their initial values. Each string value is specific to the locale it changed in.',
  phetioState: true
});
/**
 * @param requirejsNamespace - E.g. 'JOIST', to pull string keys out from that namespace
 * @returns Nested object to be accessed like JoistStrings.ResetAllButton.name
 */
const getStringModule = requirejsNamespace => {
  // Our string information is pulled globally, e.g. phet.chipper.strings[ locale ][ stringKey ] = stringValue;
  // Our locale information is from phet.chipper.locale

  assert && assert(typeof phet.chipper.locale === 'string', 'phet.chipper.locale should have been loaded by now');
  assert && assert(Object.keys(localeInfoModule).includes(phet.chipper.locale), 'phet.chipper.locale should have been loaded by now');
  assert && assert(phet.chipper.strings, 'phet.chipper.strings should have been loaded by now');

  // Construct locales in increasing specificity, e.g. [ 'en', 'zh', 'zh_CN' ], so we get fallbacks in order
  // const locales = [ FALLBACK_LOCALE ];
  const stringKeyPrefix = `${requirejsNamespace}/`;

  // We may have other older (unused) keys in babel, and we are only doing the search that matters with the English
  // string keys.
  let allStringKeysInRepo = Object.keys(phet.chipper.strings[FALLBACK_LOCALE]).filter(stringKey => stringKey.startsWith(stringKeyPrefix));

  // TODO: https://github.com/phetsims/phet-io/issues/1877 What if this list doesn't exist?  Should that be an error?
  // Or an error if running an api-stable phet-io sim?
  // TODO: https://github.com/phetsims/phet-io/issues/1877 What will happen if this is stale? How will a developer know
  // to update it? Should it run in daily-grunt-work?
  if (phet.chipper.usedStringsEN) {
    allStringKeysInRepo = allStringKeysInRepo.filter(stringKey => phet.chipper.usedStringsEN.hasOwnProperty(stringKey));
  }

  // localizedStringMap[ stringKey ]
  const localizedStringMap = {};
  const stringModule = {};
  allStringKeysInRepo.forEach(stringKey => {
    // strip off the requirejsNamespace, e.g. 'JOIST/ResetAllButton.name' => 'ResetAllButton.name'
    const stringKeyWithoutPrefix = stringKey.slice(stringKeyPrefix.length);
    const keyParts = stringKeyWithoutPrefix.split('.');
    const lastKeyPart = keyParts[keyParts.length - 1];
    const allButLastKeyPart = keyParts.slice(0, keyParts.length - 1);

    // During traversal into the string object, this will hold the object where the next level needs to be defined,
    // whether that's another child object, or the string value itself.
    let reference = stringModule;

    // We'll traverse down through the parts of a string key (separated by '.'), creating a new level in the
    // string object for each one. This is done for all BUT the last part, since we'll want to assign the result
    // of that to a raw string value (rather than an object).
    let partialKey = stringKeyPrefix;
    allButLastKeyPart.forEach((keyPart, i) => {
      // When concatenating each level into the final string key, we don't want to put a '.' directly after the
      // slash, because `JOIST/.ResetAllButton.name` would be invalid.
      // See https://github.com/phetsims/chipper/issues/922
      partialKey += `${i > 0 ? '.' : ''}${keyPart}`;

      // Don't allow e.g. JOIST/a and JOIST/a.b, since localeObject.a would need to be a string AND an object at the
      // same time.
      assert && assert(typeof reference[keyPart] !== 'string', 'It is not allowed to have two different string keys where one is extended by adding a period (.) at the end ' + `of the other. The string key ${partialKey} is extended by ${stringKey} in this case, and should be changed.`);

      // Create the next nested level, and move into it
      if (!reference[keyPart]) {
        reference[keyPart] = {};
      }
      reference = reference[keyPart]; // since we are on all but the last key part, it cannot be stringlike
    });

    assert && assert(typeof reference[lastKeyPart] !== 'object', 'It is not allowed to have two different string keys where one is extended by adding a period (.) at the end ' + `of the other. The string key ${stringKey} is extended by another key, something containing ${reference[lastKeyPart] && Object.keys(reference[lastKeyPart])}.`);
    assert && assert(!reference[lastKeyPart], `We should not have defined this place in the object (${stringKey}), otherwise it means a duplicated string key OR extended string key`);

    // In case our assertions are not enabled, we'll need to proceed without failing out (so we allow for the
    // extended string keys in our actual code, even though assertions should prevent that).
    if (typeof reference !== 'string') {
      let tandem = Tandem.GENERAL_MODEL.createTandem('strings').createTandem(_.camelCase(requirejsNamespace));
      for (let i = 0; i < keyParts.length; i++) {
        // a11y maps to a11Y in camel case, so let's sit this one out. Worth a hard coding here since most string files
        // have this key.
        let tandemName = keyParts[i] === 'a11y' ? keyParts[i] : _.camelCase(keyParts[i]);

        // If it is the tail of the string key, then make the tandem be a "*StringProperty"
        if (i === keyParts.length - 1) {
          let currentTandemName = tandemName;
          let j = 0;
          let tandemNameTaken = true;

          // Handle the case where two unique string keys map to the same camel case value, i.e. "Solid" and "solid".
          // Here we will be solidStringProperty and solid2StringProperty
          while (tandemNameTaken) {
            j++;
            currentTandemName = `${tandemName}${j === 1 ? '' : j}StringProperty`;
            tandemNameTaken = tandem.hasChild(currentTandemName);
          }
          tandemName = currentTandemName;
        }
        tandem = tandem.createTandem(tandemName);
      }

      // strings nested under the a11y section are not currently PhET-iO instrumented, see https://github.com/phetsims/chipper/issues/1352
      if (tandem.phetioID.includes('.a11y.')) {
        tandem = Tandem.OPT_OUT;
      }
      const localizedString = new LocalizedString(phet.chipper.mapString(phet.chipper.strings[FALLBACK_LOCALE][stringKey]), tandem, phet.chipper.stringMetadata[stringKey]);
      localizedStringMap[stringKey] = localizedString;

      // Push up the translated values
      Object.keys(phet.chipper.strings).forEach(locale => {
        const string = phet.chipper.strings[locale][stringKey];
        // Ignore zero-length strings, see https://github.com/phetsims/chipper/issues/1343
        if (typeof string === 'string' && string !== '') {
          localizedString.setInitialValue(locale, phet.chipper.mapString(string));
        }
      });

      // Put our Property in the stringModule
      reference[`${lastKeyPart}StringProperty`] = localizedString.property;

      // Change our stringModule based on the Property value
      localizedString.property.link(string => {
        reference[lastKeyPart] = string;
      });
    }
  });
  return stringModule;
};
export default getStringModule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQaGV0aW9PYmplY3QiLCJUYW5kZW0iLCJDb3VsZE5vdFlldERlc2VyaWFsaXplRXJyb3IiLCJJT1R5cGUiLCJPYmplY3RMaXRlcmFsSU8iLCJMb2NhbGl6ZWRTdHJpbmciLCJsb2NhbGVJbmZvTW9kdWxlIiwiRkFMTEJBQ0tfTE9DQUxFIiwibG9jYWxpemVkU3RyaW5ncyIsIndpbmRvdyIsInBoZXQiLCJjaGlwcGVyIiwic2V0QWxsU3RyaW5ncyIsInN0ciIsImZvckVhY2giLCJsb2NhbGl6ZWRTdHJpbmciLCJwcm9wZXJ0eSIsInZhbHVlIiwiU3RyaW5nU3RhdGVJT1R5cGUiLCJ2YWx1ZVR5cGUiLCJ0b1N0YXRlT2JqZWN0IiwiZGF0YSIsInN0YXRlIiwiZ2V0U3RhdGVEZWx0YSIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJ0YW5kZW0iLCJwaGV0aW9JRCIsInN0YXRlU2NoZW1hIiwiYXBwbHlTdGF0ZSIsImlnbm9yZWQiLCJtYXRjaCIsImZpbmQiLCJzZXRTdGF0ZURlbHRhIiwiY3JlYXRlIiwicGhldGlvVHlwZSIsIkdFTkVSQUxfTU9ERUwiLCJjcmVhdGVUYW5kZW0iLCJwaGV0aW9Eb2N1bWVudGF0aW9uIiwicGhldGlvU3RhdGUiLCJnZXRTdHJpbmdNb2R1bGUiLCJyZXF1aXJlanNOYW1lc3BhY2UiLCJhc3NlcnQiLCJsb2NhbGUiLCJpbmNsdWRlcyIsInN0cmluZ3MiLCJzdHJpbmdLZXlQcmVmaXgiLCJhbGxTdHJpbmdLZXlzSW5SZXBvIiwiZmlsdGVyIiwic3RyaW5nS2V5Iiwic3RhcnRzV2l0aCIsInVzZWRTdHJpbmdzRU4iLCJoYXNPd25Qcm9wZXJ0eSIsImxvY2FsaXplZFN0cmluZ01hcCIsInN0cmluZ01vZHVsZSIsInN0cmluZ0tleVdpdGhvdXRQcmVmaXgiLCJzbGljZSIsImtleVBhcnRzIiwic3BsaXQiLCJsYXN0S2V5UGFydCIsImFsbEJ1dExhc3RLZXlQYXJ0IiwicmVmZXJlbmNlIiwicGFydGlhbEtleSIsImtleVBhcnQiLCJpIiwiXyIsImNhbWVsQ2FzZSIsInRhbmRlbU5hbWUiLCJjdXJyZW50VGFuZGVtTmFtZSIsImoiLCJ0YW5kZW1OYW1lVGFrZW4iLCJoYXNDaGlsZCIsIk9QVF9PVVQiLCJtYXBTdHJpbmciLCJzdHJpbmdNZXRhZGF0YSIsInN0cmluZyIsInNldEluaXRpYWxWYWx1ZSIsImxpbmsiXSwic291cmNlcyI6WyJnZXRTdHJpbmdNb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogR2l2ZW4gYSByZXF1aXJlanNOYW1lc3BhY2UsIHdlIGZpbHRlciBvdXQgc3RyaW5ncyBmcm9tIHBoZXQuY2hpcHBlci5zdHJpbmdzIHRoYXQgc3RhcnQgd2l0aCBpdCwgYW5kIGNvbnN0cnVjdCBhblxyXG4gKiBvYmplY3Qgd2l0aCBsb2NhbGUgZmFsbGJhY2tzIGFscmVhZHkgcHJlLWNvbXB1dGVkLCBzbyB0aGF0IHRoZSBjb3JyZWN0IHN0cmluZ3MgY2FuIGJlIGFjY2Vzc2VkIHZpYSBvYmplY3QgbGl0ZXJhbFxyXG4gKiBhY2Nlc3MsIGUuZy4gZ2V0U3RyaW5nTW9kdWxlKCAnSk9JU1QnICkuUmVzZXRBbGxCdXR0b24ubmFtZSB3aWxsIGdpdmUgdGhlIGRlc2lyZWQgc3RyaW5nIHZhbHVlIGZvciB3aGF0ZXZlciBsb2NhbGVcclxuICogdGhlIHNpbSBpcyBiZWluZyBydW4gd2l0aC5cclxuICpcclxuICogQSBzdHJpbmcgXCJrZXlcIiBpcyBpbiB0aGUgZm9ybSBvZiBcIk5BTUVTUEFDRS9rZXkuZnJvbS5zdHJpbmdzLmpzb25cIlxyXG4gKlxyXG4gKiBOT1RFOiBUaGlzIGZpbGUgbGlrZWx5IGJlbG9uZ3MgaW4gam9pc3QvanMvaTE4bi8sIGJ1dCBzaG91bGQgc3RheSBoZXJlIHRvIG1ha2UgbWFpbnRlbmFuY2UtcmVsZWFzZSBtYWludGFpbmFiaWxpdHkgZWFzaWVyLlxyXG4gKlxyXG4gKiBAYXV0aG9yIEpvbmF0aGFuIE9sc29uIDxqb25hdGhhbi5vbHNvbj5cclxuICovXHJcblxyXG5pbXBvcnQgUGhldGlvT2JqZWN0IGZyb20gJy4uLy4uL3RhbmRlbS9qcy9QaGV0aW9PYmplY3QuanMnO1xyXG5pbXBvcnQgVGFuZGVtIGZyb20gJy4uLy4uL3RhbmRlbS9qcy9UYW5kZW0uanMnO1xyXG5pbXBvcnQgQ291bGROb3RZZXREZXNlcmlhbGl6ZUVycm9yIGZyb20gJy4uLy4uL3RhbmRlbS9qcy9Db3VsZE5vdFlldERlc2VyaWFsaXplRXJyb3IuanMnO1xyXG5pbXBvcnQgSU9UeXBlIGZyb20gJy4uLy4uL3RhbmRlbS9qcy90eXBlcy9JT1R5cGUuanMnO1xyXG5pbXBvcnQgT2JqZWN0TGl0ZXJhbElPIGZyb20gJy4uLy4uL3RhbmRlbS9qcy90eXBlcy9PYmplY3RMaXRlcmFsSU8uanMnO1xyXG5pbXBvcnQgTG9jYWxpemVkU3RyaW5nLCB7IExvY2FsaXplZFN0cmluZ1N0YXRlRGVsdGEsIFN0cmluZ3NTdGF0ZVN0YXRlT2JqZWN0IH0gZnJvbSAnLi9Mb2NhbGl6ZWRTdHJpbmcuanMnO1xyXG5pbXBvcnQgVFJlYWRPbmx5UHJvcGVydHkgZnJvbSAnLi4vLi4vYXhvbi9qcy9UUmVhZE9ubHlQcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCB7IExvY2FsZSB9IGZyb20gJy4uLy4uL2pvaXN0L2pzL2kxOG4vbG9jYWxlUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgbG9jYWxlSW5mb01vZHVsZSBmcm9tICcuLi8uLi9jaGlwcGVyL2pzL2RhdGEvbG9jYWxlSW5mb01vZHVsZS5qcyc7XHJcbmltcG9ydCB7IFBoZXRpb0lEIH0gZnJvbSAnLi4vLi4vdGFuZGVtL2pzL1RhbmRlbUNvbnN0YW50cy5qcyc7XHJcblxyXG4vLyBjb25zdGFudHNcclxuY29uc3QgRkFMTEJBQ0tfTE9DQUxFID0gJ2VuJztcclxuXHJcbi8vIEhvbGRzIGFsbCBvZiBvdXIgbG9jYWxpemVkU3RyaW5ncywgc28gdGhhdCB3ZSBjYW4gc2F2ZSBvdXIgcGhldC1pbyBzdHJpbmcgY2hhbmdlIHN0YXRlXHJcbmV4cG9ydCBjb25zdCBsb2NhbGl6ZWRTdHJpbmdzOiBMb2NhbGl6ZWRTdHJpbmdbXSA9IFtdO1xyXG5cclxuLy8gRm9yIGRldmVsb3BlciBpbnRlcm5hbCB1c2UsIHBhcnRpY3VsYXJseSBmb3IgbWVtb3J5IGxlYWsgZGV0ZWN0aW9uXHJcbi8vIGUuZy4gXy5tYXgoIHBoZXQuY2hpcHBlci5sb2NhbGl6ZWRTdHJpbmdzLm1hcCggbHMgPT4gbHMucHJvcGVydHkudGlueVByb3BlcnR5Lmxpc3RlbmVycy5zaXplICkgKSB0byBzZWUgaWYgdGhlcmUgaXNcclxuLy8gbGlrZWx5IGEgbGVha1xyXG53aW5kb3cucGhldC5jaGlwcGVyLmxvY2FsaXplZFN0cmluZ3MgPSBsb2NhbGl6ZWRTdHJpbmdzO1xyXG5cclxuLy8gRm9yIGRldmVsb3BlciBpbnRlcm5hbCB1c2UsIHNpbWlsYXIgdG8gdGhlIHN0cmluZ1Rlc3QgcXVlcnkgcGFyYW1ldGVyXHJcbndpbmRvdy5waGV0LmNoaXBwZXIuc2V0QWxsU3RyaW5ncyA9ICggc3RyOiBzdHJpbmcgKSA9PiB7XHJcbiAgbG9jYWxpemVkU3RyaW5ncy5mb3JFYWNoKCBsb2NhbGl6ZWRTdHJpbmcgPT4ge1xyXG4gICAgbG9jYWxpemVkU3RyaW5nLnByb3BlcnR5LnZhbHVlID0gc3RyO1xyXG4gIH0gKTtcclxufTtcclxuXHJcbmNvbnN0IFN0cmluZ1N0YXRlSU9UeXBlID0gbmV3IElPVHlwZTxQaGV0aW9PYmplY3QsIFN0cmluZ3NTdGF0ZVN0YXRlT2JqZWN0PiggJ1N0cmluZ1N0YXRlSU8nLCB7XHJcbiAgdmFsdWVUeXBlOiBQaGV0aW9PYmplY3QsXHJcbiAgdG9TdGF0ZU9iamVjdDogKCk6IFN0cmluZ3NTdGF0ZVN0YXRlT2JqZWN0ID0+IHtcclxuICAgIGNvbnN0IGRhdGE6IFJlY29yZDxQaGV0aW9JRCwgTG9jYWxpemVkU3RyaW5nU3RhdGVEZWx0YT4gPSB7fTtcclxuXHJcbiAgICBsb2NhbGl6ZWRTdHJpbmdzLmZvckVhY2goIGxvY2FsaXplZFN0cmluZyA9PiB7XHJcbiAgICAgIGNvbnN0IHN0YXRlID0gbG9jYWxpemVkU3RyaW5nLmdldFN0YXRlRGVsdGEoKTtcclxuXHJcbiAgICAgIC8vIE9ubHkgY3JlYXRlIGFuIGVudHJ5IGlmIHRoZXJlIGlzIGFueXRoaW5nICh3ZSBjYW4gc2F2ZSBieXRlcyBieSBub3QgaW5jbHVkaW5nIHRoZSB0YW5kZW0gaGVyZSlcclxuICAgICAgaWYgKCBPYmplY3Qua2V5cyggc3RhdGUgKS5sZW5ndGggPiAwICkge1xyXG4gICAgICAgIGRhdGFbIGxvY2FsaXplZFN0cmluZy5wcm9wZXJ0eS50YW5kZW0ucGhldGlvSUQgXSA9IHN0YXRlO1xyXG4gICAgICB9XHJcbiAgICB9ICk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBkYXRhOiBkYXRhIC8vIERhdGEgbmVzdGVkIGZvciBhIHZhbGlkIHNjaGVtYVxyXG4gICAgfTtcclxuICB9LFxyXG4gIHN0YXRlU2NoZW1hOiB7XHJcbiAgICBkYXRhOiBPYmplY3RMaXRlcmFsSU9cclxuICB9LFxyXG4gIGFwcGx5U3RhdGU6ICggaWdub3JlZCwgc3RhdGUgKSA9PiB7XHJcblxyXG4gICAgLy8gRXZlcnkgc3RyaW5nIGluIHN0YXRlIGhhcyB0byBiZSBpbiBsb2NhbGl6ZWRTdHJpbmdzIHRvIGNvbnRpbnVlXHJcbiAgICBPYmplY3Qua2V5cyggc3RhdGUuZGF0YSApLmZvckVhY2goIHBoZXRpb0lEID0+IHtcclxuICAgICAgY29uc3QgbWF0Y2ggPSBsb2NhbGl6ZWRTdHJpbmdzLmZpbmQoIGxvY2FsaXplZFN0cmluZyA9PiBsb2NhbGl6ZWRTdHJpbmcucHJvcGVydHkudGFuZGVtLnBoZXRpb0lEID09PSBwaGV0aW9JRCApO1xyXG5cclxuICAgICAgLy8gV2hlbiBQaGV0aW9EeW5hbWljRWxlbWVudENvbnRhaW5lciBlbGVtZW50cyBzdWNoIGFzIFBoZXRpb0dyb3VwIG1lbWJlcnMgYWRkIGxvY2FsaXplZFN0cmluZ3MsIHdlIHdhaXQgdW50aWxcclxuICAgICAgLy8gYWxsIG9mIHRoZSBtZW1iZXJzIGhhdmUgYmVlbiBjcmVhdGVkIChwb3B1bGF0aW5nIGxvY2FsaXplZFN0cmluZ3MpIGJlZm9yZSB0cnlpbmcgdG8gc2V0IGFueSBvZiB0aGUgc3RyaW5ncy5cclxuICAgICAgaWYgKCAhbWF0Y2ggKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IENvdWxkTm90WWV0RGVzZXJpYWxpemVFcnJvcigpO1xyXG4gICAgICB9XHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gV2UgbmVlZCB0byBpdGVyYXRlIHRocm91Z2ggZXZlcnkgc3RyaW5nIGluIHRoaXMgcnVudGltZSwgc2luY2UgaXQgbWlnaHQgbmVlZCB0byByZXZlcnQgYmFjayB0byBcImluaXRpYWxcIiBzdGF0ZS5cclxuICAgIGxvY2FsaXplZFN0cmluZ3MuZm9yRWFjaCggbG9jYWxpemVkU3RyaW5nID0+IHtcclxuICAgICAgbG9jYWxpemVkU3RyaW5nLnNldFN0YXRlRGVsdGEoIHN0YXRlLmRhdGFbIGxvY2FsaXplZFN0cmluZy5wcm9wZXJ0eS50YW5kZW0ucGhldGlvSUQgXSB8fCB7fSApO1xyXG4gICAgfSApO1xyXG4gIH1cclxufSApO1xyXG5cclxuUGhldGlvT2JqZWN0LmNyZWF0ZSgge1xyXG4gIHBoZXRpb1R5cGU6IFN0cmluZ1N0YXRlSU9UeXBlLFxyXG4gIHRhbmRlbTogVGFuZGVtLkdFTkVSQUxfTU9ERUwuY3JlYXRlVGFuZGVtKCAnc3RyaW5nc1N0YXRlJyApLFxyXG4gIHBoZXRpb0RvY3VtZW50YXRpb246ICdTdHJpbmdzIHRoYXQgaGF2ZSBjaGFuZ2VkIGZyb20gdGhlaXIgaW5pdGlhbCB2YWx1ZXMuIEVhY2ggc3RyaW5nIHZhbHVlIGlzIHNwZWNpZmljIHRvIHRoZSBsb2NhbGUgaXQgY2hhbmdlZCBpbi4nLFxyXG4gIHBoZXRpb1N0YXRlOiB0cnVlXHJcbn0gKTtcclxuXHJcbnR5cGUgVFN0cmluZ01vZHVsZSA9IHtcclxuICBbIGtleTogc3RyaW5nIF06IFRTdHJpbmdNb2R1bGUgfCBzdHJpbmcgfCBUUmVhZE9ubHlQcm9wZXJ0eTxzdHJpbmc+O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSByZXF1aXJlanNOYW1lc3BhY2UgLSBFLmcuICdKT0lTVCcsIHRvIHB1bGwgc3RyaW5nIGtleXMgb3V0IGZyb20gdGhhdCBuYW1lc3BhY2VcclxuICogQHJldHVybnMgTmVzdGVkIG9iamVjdCB0byBiZSBhY2Nlc3NlZCBsaWtlIEpvaXN0U3RyaW5ncy5SZXNldEFsbEJ1dHRvbi5uYW1lXHJcbiAqL1xyXG5jb25zdCBnZXRTdHJpbmdNb2R1bGUgPSAoIHJlcXVpcmVqc05hbWVzcGFjZTogc3RyaW5nICk6IG9iamVjdCA9PiB7XHJcbiAgLy8gT3VyIHN0cmluZyBpbmZvcm1hdGlvbiBpcyBwdWxsZWQgZ2xvYmFsbHksIGUuZy4gcGhldC5jaGlwcGVyLnN0cmluZ3NbIGxvY2FsZSBdWyBzdHJpbmdLZXkgXSA9IHN0cmluZ1ZhbHVlO1xyXG4gIC8vIE91ciBsb2NhbGUgaW5mb3JtYXRpb24gaXMgZnJvbSBwaGV0LmNoaXBwZXIubG9jYWxlXHJcblxyXG4gIGFzc2VydCAmJiBhc3NlcnQoIHR5cGVvZiBwaGV0LmNoaXBwZXIubG9jYWxlID09PSAnc3RyaW5nJywgJ3BoZXQuY2hpcHBlci5sb2NhbGUgc2hvdWxkIGhhdmUgYmVlbiBsb2FkZWQgYnkgbm93JyApO1xyXG4gIGFzc2VydCAmJiBhc3NlcnQoIE9iamVjdC5rZXlzKCBsb2NhbGVJbmZvTW9kdWxlICkuaW5jbHVkZXMoIHBoZXQuY2hpcHBlci5sb2NhbGUgKSwgJ3BoZXQuY2hpcHBlci5sb2NhbGUgc2hvdWxkIGhhdmUgYmVlbiBsb2FkZWQgYnkgbm93JyApO1xyXG4gIGFzc2VydCAmJiBhc3NlcnQoIHBoZXQuY2hpcHBlci5zdHJpbmdzLCAncGhldC5jaGlwcGVyLnN0cmluZ3Mgc2hvdWxkIGhhdmUgYmVlbiBsb2FkZWQgYnkgbm93JyApO1xyXG5cclxuICAvLyBDb25zdHJ1Y3QgbG9jYWxlcyBpbiBpbmNyZWFzaW5nIHNwZWNpZmljaXR5LCBlLmcuIFsgJ2VuJywgJ3poJywgJ3poX0NOJyBdLCBzbyB3ZSBnZXQgZmFsbGJhY2tzIGluIG9yZGVyXHJcbiAgLy8gY29uc3QgbG9jYWxlcyA9IFsgRkFMTEJBQ0tfTE9DQUxFIF07XHJcbiAgY29uc3Qgc3RyaW5nS2V5UHJlZml4ID0gYCR7cmVxdWlyZWpzTmFtZXNwYWNlfS9gO1xyXG5cclxuICAvLyBXZSBtYXkgaGF2ZSBvdGhlciBvbGRlciAodW51c2VkKSBrZXlzIGluIGJhYmVsLCBhbmQgd2UgYXJlIG9ubHkgZG9pbmcgdGhlIHNlYXJjaCB0aGF0IG1hdHRlcnMgd2l0aCB0aGUgRW5nbGlzaFxyXG4gIC8vIHN0cmluZyBrZXlzLlxyXG4gIGxldCBhbGxTdHJpbmdLZXlzSW5SZXBvID0gT2JqZWN0LmtleXMoIHBoZXQuY2hpcHBlci5zdHJpbmdzWyBGQUxMQkFDS19MT0NBTEUgXSApLmZpbHRlciggc3RyaW5nS2V5ID0+IHN0cmluZ0tleS5zdGFydHNXaXRoKCBzdHJpbmdLZXlQcmVmaXggKSApO1xyXG5cclxuICAvLyBUT0RPOiBodHRwczovL2dpdGh1Yi5jb20vcGhldHNpbXMvcGhldC1pby9pc3N1ZXMvMTg3NyBXaGF0IGlmIHRoaXMgbGlzdCBkb2Vzbid0IGV4aXN0PyAgU2hvdWxkIHRoYXQgYmUgYW4gZXJyb3I/XHJcbiAgLy8gT3IgYW4gZXJyb3IgaWYgcnVubmluZyBhbiBhcGktc3RhYmxlIHBoZXQtaW8gc2ltP1xyXG4gIC8vIFRPRE86IGh0dHBzOi8vZ2l0aHViLmNvbS9waGV0c2ltcy9waGV0LWlvL2lzc3Vlcy8xODc3IFdoYXQgd2lsbCBoYXBwZW4gaWYgdGhpcyBpcyBzdGFsZT8gSG93IHdpbGwgYSBkZXZlbG9wZXIga25vd1xyXG4gIC8vIHRvIHVwZGF0ZSBpdD8gU2hvdWxkIGl0IHJ1biBpbiBkYWlseS1ncnVudC13b3JrP1xyXG4gIGlmICggcGhldC5jaGlwcGVyLnVzZWRTdHJpbmdzRU4gKSB7XHJcbiAgICBhbGxTdHJpbmdLZXlzSW5SZXBvID0gYWxsU3RyaW5nS2V5c0luUmVwby5maWx0ZXIoIHN0cmluZ0tleSA9PiBwaGV0LmNoaXBwZXIudXNlZFN0cmluZ3NFTi5oYXNPd25Qcm9wZXJ0eSggc3RyaW5nS2V5ICkgKTtcclxuICB9XHJcblxyXG4gIC8vIGxvY2FsaXplZFN0cmluZ01hcFsgc3RyaW5nS2V5IF1cclxuICBjb25zdCBsb2NhbGl6ZWRTdHJpbmdNYXA6IFJlY29yZDxzdHJpbmcsIExvY2FsaXplZFN0cmluZz4gPSB7fTtcclxuXHJcbiAgY29uc3Qgc3RyaW5nTW9kdWxlOiBUU3RyaW5nTW9kdWxlID0ge307XHJcblxyXG4gIGFsbFN0cmluZ0tleXNJblJlcG8uZm9yRWFjaCggc3RyaW5nS2V5ID0+IHtcclxuICAgIC8vIHN0cmlwIG9mZiB0aGUgcmVxdWlyZWpzTmFtZXNwYWNlLCBlLmcuICdKT0lTVC9SZXNldEFsbEJ1dHRvbi5uYW1lJyA9PiAnUmVzZXRBbGxCdXR0b24ubmFtZSdcclxuICAgIGNvbnN0IHN0cmluZ0tleVdpdGhvdXRQcmVmaXggPSBzdHJpbmdLZXkuc2xpY2UoIHN0cmluZ0tleVByZWZpeC5sZW5ndGggKTtcclxuXHJcbiAgICBjb25zdCBrZXlQYXJ0cyA9IHN0cmluZ0tleVdpdGhvdXRQcmVmaXguc3BsaXQoICcuJyApO1xyXG4gICAgY29uc3QgbGFzdEtleVBhcnQgPSBrZXlQYXJ0c1sga2V5UGFydHMubGVuZ3RoIC0gMSBdO1xyXG4gICAgY29uc3QgYWxsQnV0TGFzdEtleVBhcnQgPSBrZXlQYXJ0cy5zbGljZSggMCwga2V5UGFydHMubGVuZ3RoIC0gMSApO1xyXG5cclxuICAgIC8vIER1cmluZyB0cmF2ZXJzYWwgaW50byB0aGUgc3RyaW5nIG9iamVjdCwgdGhpcyB3aWxsIGhvbGQgdGhlIG9iamVjdCB3aGVyZSB0aGUgbmV4dCBsZXZlbCBuZWVkcyB0byBiZSBkZWZpbmVkLFxyXG4gICAgLy8gd2hldGhlciB0aGF0J3MgYW5vdGhlciBjaGlsZCBvYmplY3QsIG9yIHRoZSBzdHJpbmcgdmFsdWUgaXRzZWxmLlxyXG4gICAgbGV0IHJlZmVyZW5jZTogVFN0cmluZ01vZHVsZSA9IHN0cmluZ01vZHVsZTtcclxuXHJcbiAgICAvLyBXZSdsbCB0cmF2ZXJzZSBkb3duIHRocm91Z2ggdGhlIHBhcnRzIG9mIGEgc3RyaW5nIGtleSAoc2VwYXJhdGVkIGJ5ICcuJyksIGNyZWF0aW5nIGEgbmV3IGxldmVsIGluIHRoZVxyXG4gICAgLy8gc3RyaW5nIG9iamVjdCBmb3IgZWFjaCBvbmUuIFRoaXMgaXMgZG9uZSBmb3IgYWxsIEJVVCB0aGUgbGFzdCBwYXJ0LCBzaW5jZSB3ZSdsbCB3YW50IHRvIGFzc2lnbiB0aGUgcmVzdWx0XHJcbiAgICAvLyBvZiB0aGF0IHRvIGEgcmF3IHN0cmluZyB2YWx1ZSAocmF0aGVyIHRoYW4gYW4gb2JqZWN0KS5cclxuICAgIGxldCBwYXJ0aWFsS2V5ID0gc3RyaW5nS2V5UHJlZml4O1xyXG4gICAgYWxsQnV0TGFzdEtleVBhcnQuZm9yRWFjaCggKCBrZXlQYXJ0LCBpICkgPT4ge1xyXG4gICAgICAvLyBXaGVuIGNvbmNhdGVuYXRpbmcgZWFjaCBsZXZlbCBpbnRvIHRoZSBmaW5hbCBzdHJpbmcga2V5LCB3ZSBkb24ndCB3YW50IHRvIHB1dCBhICcuJyBkaXJlY3RseSBhZnRlciB0aGVcclxuICAgICAgLy8gc2xhc2gsIGJlY2F1c2UgYEpPSVNULy5SZXNldEFsbEJ1dHRvbi5uYW1lYCB3b3VsZCBiZSBpbnZhbGlkLlxyXG4gICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3BoZXRzaW1zL2NoaXBwZXIvaXNzdWVzLzkyMlxyXG4gICAgICBwYXJ0aWFsS2V5ICs9IGAke2kgPiAwID8gJy4nIDogJyd9JHtrZXlQYXJ0fWA7XHJcblxyXG4gICAgICAvLyBEb24ndCBhbGxvdyBlLmcuIEpPSVNUL2EgYW5kIEpPSVNUL2EuYiwgc2luY2UgbG9jYWxlT2JqZWN0LmEgd291bGQgbmVlZCB0byBiZSBhIHN0cmluZyBBTkQgYW4gb2JqZWN0IGF0IHRoZVxyXG4gICAgICAvLyBzYW1lIHRpbWUuXHJcbiAgICAgIGFzc2VydCAmJiBhc3NlcnQoIHR5cGVvZiByZWZlcmVuY2VbIGtleVBhcnQgXSAhPT0gJ3N0cmluZycsXHJcbiAgICAgICAgJ0l0IGlzIG5vdCBhbGxvd2VkIHRvIGhhdmUgdHdvIGRpZmZlcmVudCBzdHJpbmcga2V5cyB3aGVyZSBvbmUgaXMgZXh0ZW5kZWQgYnkgYWRkaW5nIGEgcGVyaW9kICguKSBhdCB0aGUgZW5kICcgK1xyXG4gICAgICAgIGBvZiB0aGUgb3RoZXIuIFRoZSBzdHJpbmcga2V5ICR7cGFydGlhbEtleX0gaXMgZXh0ZW5kZWQgYnkgJHtzdHJpbmdLZXl9IGluIHRoaXMgY2FzZSwgYW5kIHNob3VsZCBiZSBjaGFuZ2VkLmAgKTtcclxuXHJcbiAgICAgIC8vIENyZWF0ZSB0aGUgbmV4dCBuZXN0ZWQgbGV2ZWwsIGFuZCBtb3ZlIGludG8gaXRcclxuICAgICAgaWYgKCAhcmVmZXJlbmNlWyBrZXlQYXJ0IF0gKSB7XHJcbiAgICAgICAgcmVmZXJlbmNlWyBrZXlQYXJ0IF0gPSB7fTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmVmZXJlbmNlID0gcmVmZXJlbmNlWyBrZXlQYXJ0IF0gYXMgVFN0cmluZ01vZHVsZTsgLy8gc2luY2Ugd2UgYXJlIG9uIGFsbCBidXQgdGhlIGxhc3Qga2V5IHBhcnQsIGl0IGNhbm5vdCBiZSBzdHJpbmdsaWtlXHJcbiAgICB9ICk7XHJcblxyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggdHlwZW9mIHJlZmVyZW5jZVsgbGFzdEtleVBhcnQgXSAhPT0gJ29iamVjdCcsXHJcbiAgICAgICdJdCBpcyBub3QgYWxsb3dlZCB0byBoYXZlIHR3byBkaWZmZXJlbnQgc3RyaW5nIGtleXMgd2hlcmUgb25lIGlzIGV4dGVuZGVkIGJ5IGFkZGluZyBhIHBlcmlvZCAoLikgYXQgdGhlIGVuZCAnICtcclxuICAgICAgYG9mIHRoZSBvdGhlci4gVGhlIHN0cmluZyBrZXkgJHtzdHJpbmdLZXl9IGlzIGV4dGVuZGVkIGJ5IGFub3RoZXIga2V5LCBzb21ldGhpbmcgY29udGFpbmluZyAke3JlZmVyZW5jZVsgbGFzdEtleVBhcnQgXSAmJiBPYmplY3Qua2V5cyggcmVmZXJlbmNlWyBsYXN0S2V5UGFydCBdICl9LmAgKTtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoICFyZWZlcmVuY2VbIGxhc3RLZXlQYXJ0IF0sXHJcbiAgICAgIGBXZSBzaG91bGQgbm90IGhhdmUgZGVmaW5lZCB0aGlzIHBsYWNlIGluIHRoZSBvYmplY3QgKCR7c3RyaW5nS2V5fSksIG90aGVyd2lzZSBpdCBtZWFucyBhIGR1cGxpY2F0ZWQgc3RyaW5nIGtleSBPUiBleHRlbmRlZCBzdHJpbmcga2V5YCApO1xyXG5cclxuICAgIC8vIEluIGNhc2Ugb3VyIGFzc2VydGlvbnMgYXJlIG5vdCBlbmFibGVkLCB3ZSdsbCBuZWVkIHRvIHByb2NlZWQgd2l0aG91dCBmYWlsaW5nIG91dCAoc28gd2UgYWxsb3cgZm9yIHRoZVxyXG4gICAgLy8gZXh0ZW5kZWQgc3RyaW5nIGtleXMgaW4gb3VyIGFjdHVhbCBjb2RlLCBldmVuIHRob3VnaCBhc3NlcnRpb25zIHNob3VsZCBwcmV2ZW50IHRoYXQpLlxyXG4gICAgaWYgKCB0eXBlb2YgcmVmZXJlbmNlICE9PSAnc3RyaW5nJyApIHtcclxuICAgICAgbGV0IHRhbmRlbSA9IFRhbmRlbS5HRU5FUkFMX01PREVMLmNyZWF0ZVRhbmRlbSggJ3N0cmluZ3MnICkuY3JlYXRlVGFuZGVtKCBfLmNhbWVsQ2FzZSggcmVxdWlyZWpzTmFtZXNwYWNlICkgKTtcclxuICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwga2V5UGFydHMubGVuZ3RoOyBpKysgKSB7XHJcblxyXG4gICAgICAgIC8vIGExMXkgbWFwcyB0byBhMTFZIGluIGNhbWVsIGNhc2UsIHNvIGxldCdzIHNpdCB0aGlzIG9uZSBvdXQuIFdvcnRoIGEgaGFyZCBjb2RpbmcgaGVyZSBzaW5jZSBtb3N0IHN0cmluZyBmaWxlc1xyXG4gICAgICAgIC8vIGhhdmUgdGhpcyBrZXkuXHJcbiAgICAgICAgbGV0IHRhbmRlbU5hbWUgPSBrZXlQYXJ0c1sgaSBdID09PSAnYTExeScgPyBrZXlQYXJ0c1sgaSBdIDogXy5jYW1lbENhc2UoIGtleVBhcnRzWyBpIF0gKTtcclxuXHJcbiAgICAgICAgLy8gSWYgaXQgaXMgdGhlIHRhaWwgb2YgdGhlIHN0cmluZyBrZXksIHRoZW4gbWFrZSB0aGUgdGFuZGVtIGJlIGEgXCIqU3RyaW5nUHJvcGVydHlcIlxyXG4gICAgICAgIGlmICggaSA9PT0ga2V5UGFydHMubGVuZ3RoIC0gMSApIHtcclxuXHJcbiAgICAgICAgICBsZXQgY3VycmVudFRhbmRlbU5hbWUgPSB0YW5kZW1OYW1lO1xyXG4gICAgICAgICAgbGV0IGogPSAwO1xyXG4gICAgICAgICAgbGV0IHRhbmRlbU5hbWVUYWtlbiA9IHRydWU7XHJcblxyXG4gICAgICAgICAgLy8gSGFuZGxlIHRoZSBjYXNlIHdoZXJlIHR3byB1bmlxdWUgc3RyaW5nIGtleXMgbWFwIHRvIHRoZSBzYW1lIGNhbWVsIGNhc2UgdmFsdWUsIGkuZS4gXCJTb2xpZFwiIGFuZCBcInNvbGlkXCIuXHJcbiAgICAgICAgICAvLyBIZXJlIHdlIHdpbGwgYmUgc29saWRTdHJpbmdQcm9wZXJ0eSBhbmQgc29saWQyU3RyaW5nUHJvcGVydHlcclxuICAgICAgICAgIHdoaWxlICggdGFuZGVtTmFtZVRha2VuICkge1xyXG4gICAgICAgICAgICBqKys7XHJcblxyXG4gICAgICAgICAgICBjdXJyZW50VGFuZGVtTmFtZSA9IGAke3RhbmRlbU5hbWV9JHtqID09PSAxID8gJycgOiBqfVN0cmluZ1Byb3BlcnR5YDtcclxuXHJcbiAgICAgICAgICAgIHRhbmRlbU5hbWVUYWtlbiA9IHRhbmRlbS5oYXNDaGlsZCggY3VycmVudFRhbmRlbU5hbWUgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRhbmRlbU5hbWUgPSBjdXJyZW50VGFuZGVtTmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRhbmRlbSA9IHRhbmRlbS5jcmVhdGVUYW5kZW0oIHRhbmRlbU5hbWUgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gc3RyaW5ncyBuZXN0ZWQgdW5kZXIgdGhlIGExMXkgc2VjdGlvbiBhcmUgbm90IGN1cnJlbnRseSBQaEVULWlPIGluc3RydW1lbnRlZCwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9waGV0c2ltcy9jaGlwcGVyL2lzc3Vlcy8xMzUyXHJcbiAgICAgIGlmICggdGFuZGVtLnBoZXRpb0lELmluY2x1ZGVzKCAnLmExMXkuJyApICkge1xyXG4gICAgICAgIHRhbmRlbSA9IFRhbmRlbS5PUFRfT1VUO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBsb2NhbGl6ZWRTdHJpbmcgPSBuZXcgTG9jYWxpemVkU3RyaW5nKFxyXG4gICAgICAgIHBoZXQuY2hpcHBlci5tYXBTdHJpbmcoIHBoZXQuY2hpcHBlci5zdHJpbmdzWyBGQUxMQkFDS19MT0NBTEUgXVsgc3RyaW5nS2V5IF0gKSxcclxuICAgICAgICB0YW5kZW0sXHJcbiAgICAgICAgcGhldC5jaGlwcGVyLnN0cmluZ01ldGFkYXRhWyBzdHJpbmdLZXkgXVxyXG4gICAgICApO1xyXG4gICAgICBsb2NhbGl6ZWRTdHJpbmdNYXBbIHN0cmluZ0tleSBdID0gbG9jYWxpemVkU3RyaW5nO1xyXG5cclxuICAgICAgLy8gUHVzaCB1cCB0aGUgdHJhbnNsYXRlZCB2YWx1ZXNcclxuICAgICAgKCBPYmplY3Qua2V5cyggcGhldC5jaGlwcGVyLnN0cmluZ3MgKSBhcyBMb2NhbGVbXSApLmZvckVhY2goICggbG9jYWxlOiBMb2NhbGUgKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3RyaW5nOiBzdHJpbmcgPSBwaGV0LmNoaXBwZXIuc3RyaW5nc1sgbG9jYWxlIF1bIHN0cmluZ0tleSBdO1xyXG4gICAgICAgIC8vIElnbm9yZSB6ZXJvLWxlbmd0aCBzdHJpbmdzLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3BoZXRzaW1zL2NoaXBwZXIvaXNzdWVzLzEzNDNcclxuICAgICAgICBpZiAoIHR5cGVvZiBzdHJpbmcgPT09ICdzdHJpbmcnICYmIHN0cmluZyAhPT0gJycgKSB7XHJcbiAgICAgICAgICBsb2NhbGl6ZWRTdHJpbmcuc2V0SW5pdGlhbFZhbHVlKCBsb2NhbGUsIHBoZXQuY2hpcHBlci5tYXBTdHJpbmcoIHN0cmluZyApICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9ICk7XHJcblxyXG4gICAgICAvLyBQdXQgb3VyIFByb3BlcnR5IGluIHRoZSBzdHJpbmdNb2R1bGVcclxuICAgICAgcmVmZXJlbmNlWyBgJHtsYXN0S2V5UGFydH1TdHJpbmdQcm9wZXJ0eWAgXSA9IGxvY2FsaXplZFN0cmluZy5wcm9wZXJ0eTtcclxuXHJcbiAgICAgIC8vIENoYW5nZSBvdXIgc3RyaW5nTW9kdWxlIGJhc2VkIG9uIHRoZSBQcm9wZXJ0eSB2YWx1ZVxyXG4gICAgICBsb2NhbGl6ZWRTdHJpbmcucHJvcGVydHkubGluayggc3RyaW5nID0+IHtcclxuICAgICAgICByZWZlcmVuY2VbIGxhc3RLZXlQYXJ0IF0gPSBzdHJpbmc7XHJcbiAgICAgIH0gKTtcclxuICAgIH1cclxuICB9ICk7XHJcblxyXG4gIHJldHVybiBzdHJpbmdNb2R1bGU7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZXRTdHJpbmdNb2R1bGU7XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLFlBQVksTUFBTSxpQ0FBaUM7QUFDMUQsT0FBT0MsTUFBTSxNQUFNLDJCQUEyQjtBQUM5QyxPQUFPQywyQkFBMkIsTUFBTSxnREFBZ0Q7QUFDeEYsT0FBT0MsTUFBTSxNQUFNLGlDQUFpQztBQUNwRCxPQUFPQyxlQUFlLE1BQU0sMENBQTBDO0FBQ3RFLE9BQU9DLGVBQWUsTUFBOEQsc0JBQXNCO0FBRzFHLE9BQU9DLGdCQUFnQixNQUFNLDJDQUEyQztBQUd4RTtBQUNBLE1BQU1DLGVBQWUsR0FBRyxJQUFJOztBQUU1QjtBQUNB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