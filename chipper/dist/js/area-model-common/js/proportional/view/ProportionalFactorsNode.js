// Copyright 2017-2022, University of Colorado Boulder

/**
 * Displays and allows editing of the total width and height of the contained area.
 *
 * NOTE: This type is designed to be persistent, and will not need to release references to avoid memory leaks.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import validate from '../../../../axon/js/validate.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import Orientation from '../../../../phet-core/js/Orientation.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import { HBox, Node, Text } from '../../../../scenery/js/imports.js';
import NumberPicker from '../../../../sun/js/NumberPicker.js';
import areaModelCommon from '../../areaModelCommon.js';
import AreaModelCommonStrings from '../../AreaModelCommonStrings.js';
import AreaModelCommonConstants from '../../common/AreaModelCommonConstants.js';
import AreaModelCommonQueryParameters from '../../common/AreaModelCommonQueryParameters.js';
import AreaModelCommonColors from '../../common/view/AreaModelCommonColors.js';
const factorsTimesPatternString = AreaModelCommonStrings.a11y.factorsTimesPattern;
const horizontalPickerString = AreaModelCommonStrings.a11y.horizontalPicker;
const horizontalPickerDescriptionString = AreaModelCommonStrings.a11y.horizontalPickerDescription;
const verticalPickerString = AreaModelCommonStrings.a11y.verticalPicker;
const verticalPickerDescriptionString = AreaModelCommonStrings.a11y.verticalPickerDescription;
class ProportionalFactorsNode extends Node {
  /**
   * @param {Property.<Area>} currentAreaProperty
   * @param {OrientationPair.<Property.<number>>} - activeTotalProperties
   * @param {number} decimalPlaces - The number of decimal places to show in the picker (when needed)
   */
  constructor(currentAreaProperty, activeTotalProperties, decimalPlaces) {
    super();
    if (AreaModelCommonQueryParameters.rawMath) {
      this.tagName = 'div';
      Multilink.multilink(activeTotalProperties.values, (horizontalTotal, verticalTotal) => {
        this.innerContent = StringUtils.fillIn(factorsTimesPatternString, {
          width: horizontalTotal,
          height: verticalTotal
        });
      });
    } else {
      const ns = 'http://www.w3.org/1998/Math/MathML';
      const verticalNode = new Node({
        // pdom
        tagName: 'mn',
        pdomNamespace: ns
      });
      activeTotalProperties.vertical.link(verticalTotal => {
        verticalNode.innerContent = `${verticalTotal}`;
      });
      const horizontalNode = new Node({
        // pdom
        tagName: 'mn',
        pdomNamespace: ns
      });
      activeTotalProperties.horizontal.link(horizontalTotal => {
        horizontalNode.innerContent = `${horizontalTotal}`;
      });
      const mathNode = new Node({
        tagName: 'math',
        pdomNamespace: ns,
        children: [new Node({
          tagName: 'mrow',
          pdomNamespace: ns,
          children: [verticalNode, new Node({
            tagName: 'mo',
            pdomNamespace: ns,
            innerContent: '&times;'
          }), horizontalNode]
        })]
      });
      this.addChild(mathNode);
    }
    this.addChild(new HBox({
      children: [this.createPicker(Orientation.VERTICAL, currentAreaProperty, decimalPlaces), new Text(MathSymbols.TIMES, {
        font: AreaModelCommonConstants.FACTORS_TERM_FONT
      }), this.createPicker(Orientation.HORIZONTAL, currentAreaProperty, decimalPlaces)],
      spacing: 10
    }));
  }

  /**
   * Creates a picker that adjusts the specified orientation's total size.
   * @private
   *
   * @param {Orientation} orientation
   * @param {Property.<Area>} currentAreaProperty
   * @param {number} decimalPlaces
   */
  createPicker(orientation, currentAreaProperty, decimalPlaces) {
    validate(orientation, {
      validValues: Orientation.enumeration.values
    });

    // {Property.<Property.<Polynomial|null>>}
    const currentTotalProperty = new DerivedProperty([currentAreaProperty], area => area.activeTotalProperties.get(orientation));

    // {Property.<Polynomial|null>}
    const bidirectionalProperty = new DynamicProperty(currentTotalProperty, {
      bidirectional: true
    });

    // {Property.<Range>}
    const rangeProperty = new DerivedProperty([currentAreaProperty], area => new Range(area.minimumSize, area.maximumSize));
    return new NumberPicker(bidirectionalProperty, rangeProperty, {
      incrementFunction: value => Utils.toFixedNumber(value + currentAreaProperty.value.snapSize, decimalPlaces),
      decrementFunction: value => Utils.toFixedNumber(value - currentAreaProperty.value.snapSize, decimalPlaces),
      decimalPlaces: decimalPlaces,
      scale: 1.5,
      formatValue: value => {
        // Epsilon chosen to avoid round-off errors while not "rounding" any values in the decimals sims improperly.
        if (Utils.equalsEpsilon(value, Utils.roundSymmetric(value), 1e-6)) {
          return Utils.toFixed(value, 0);
        } else {
          return Utils.toFixed(value, 1);
        }
      },
      color: AreaModelCommonColors.proportionalColorProperties.get(orientation),
      // pdom
      labelContent: orientation === Orientation.HORIZONTAL ? horizontalPickerString : verticalPickerString,
      descriptionContent: orientation === Orientation.HORIZONTAL ? horizontalPickerDescriptionString : verticalPickerDescriptionString,
      a11yMapPDOMValue: value => Utils.toFixedNumber(value, decimalPlaces)
    });
  }
}
areaModelCommon.register('ProportionalFactorsNode', ProportionalFactorsNode);
export default ProportionalFactorsNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEZXJpdmVkUHJvcGVydHkiLCJEeW5hbWljUHJvcGVydHkiLCJNdWx0aWxpbmsiLCJ2YWxpZGF0ZSIsIlJhbmdlIiwiVXRpbHMiLCJPcmllbnRhdGlvbiIsIlN0cmluZ1V0aWxzIiwiTWF0aFN5bWJvbHMiLCJIQm94IiwiTm9kZSIsIlRleHQiLCJOdW1iZXJQaWNrZXIiLCJhcmVhTW9kZWxDb21tb24iLCJBcmVhTW9kZWxDb21tb25TdHJpbmdzIiwiQXJlYU1vZGVsQ29tbW9uQ29uc3RhbnRzIiwiQXJlYU1vZGVsQ29tbW9uUXVlcnlQYXJhbWV0ZXJzIiwiQXJlYU1vZGVsQ29tbW9uQ29sb3JzIiwiZmFjdG9yc1RpbWVzUGF0dGVyblN0cmluZyIsImExMXkiLCJmYWN0b3JzVGltZXNQYXR0ZXJuIiwiaG9yaXpvbnRhbFBpY2tlclN0cmluZyIsImhvcml6b250YWxQaWNrZXIiLCJob3Jpem9udGFsUGlja2VyRGVzY3JpcHRpb25TdHJpbmciLCJob3Jpem9udGFsUGlja2VyRGVzY3JpcHRpb24iLCJ2ZXJ0aWNhbFBpY2tlclN0cmluZyIsInZlcnRpY2FsUGlja2VyIiwidmVydGljYWxQaWNrZXJEZXNjcmlwdGlvblN0cmluZyIsInZlcnRpY2FsUGlja2VyRGVzY3JpcHRpb24iLCJQcm9wb3J0aW9uYWxGYWN0b3JzTm9kZSIsImNvbnN0cnVjdG9yIiwiY3VycmVudEFyZWFQcm9wZXJ0eSIsImFjdGl2ZVRvdGFsUHJvcGVydGllcyIsImRlY2ltYWxQbGFjZXMiLCJyYXdNYXRoIiwidGFnTmFtZSIsIm11bHRpbGluayIsInZhbHVlcyIsImhvcml6b250YWxUb3RhbCIsInZlcnRpY2FsVG90YWwiLCJpbm5lckNvbnRlbnQiLCJmaWxsSW4iLCJ3aWR0aCIsImhlaWdodCIsIm5zIiwidmVydGljYWxOb2RlIiwicGRvbU5hbWVzcGFjZSIsInZlcnRpY2FsIiwibGluayIsImhvcml6b250YWxOb2RlIiwiaG9yaXpvbnRhbCIsIm1hdGhOb2RlIiwiY2hpbGRyZW4iLCJhZGRDaGlsZCIsImNyZWF0ZVBpY2tlciIsIlZFUlRJQ0FMIiwiVElNRVMiLCJmb250IiwiRkFDVE9SU19URVJNX0ZPTlQiLCJIT1JJWk9OVEFMIiwic3BhY2luZyIsIm9yaWVudGF0aW9uIiwidmFsaWRWYWx1ZXMiLCJlbnVtZXJhdGlvbiIsImN1cnJlbnRUb3RhbFByb3BlcnR5IiwiYXJlYSIsImdldCIsImJpZGlyZWN0aW9uYWxQcm9wZXJ0eSIsImJpZGlyZWN0aW9uYWwiLCJyYW5nZVByb3BlcnR5IiwibWluaW11bVNpemUiLCJtYXhpbXVtU2l6ZSIsImluY3JlbWVudEZ1bmN0aW9uIiwidmFsdWUiLCJ0b0ZpeGVkTnVtYmVyIiwic25hcFNpemUiLCJkZWNyZW1lbnRGdW5jdGlvbiIsInNjYWxlIiwiZm9ybWF0VmFsdWUiLCJlcXVhbHNFcHNpbG9uIiwicm91bmRTeW1tZXRyaWMiLCJ0b0ZpeGVkIiwiY29sb3IiLCJwcm9wb3J0aW9uYWxDb2xvclByb3BlcnRpZXMiLCJsYWJlbENvbnRlbnQiLCJkZXNjcmlwdGlvbkNvbnRlbnQiLCJhMTF5TWFwUERPTVZhbHVlIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJQcm9wb3J0aW9uYWxGYWN0b3JzTm9kZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNy0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBEaXNwbGF5cyBhbmQgYWxsb3dzIGVkaXRpbmcgb2YgdGhlIHRvdGFsIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIGNvbnRhaW5lZCBhcmVhLlxyXG4gKlxyXG4gKiBOT1RFOiBUaGlzIHR5cGUgaXMgZGVzaWduZWQgdG8gYmUgcGVyc2lzdGVudCwgYW5kIHdpbGwgbm90IG5lZWQgdG8gcmVsZWFzZSByZWZlcmVuY2VzIHRvIGF2b2lkIG1lbW9yeSBsZWFrcy5cclxuICpcclxuICogQGF1dGhvciBKb25hdGhhbiBPbHNvbiA8am9uYXRoYW4ub2xzb25AY29sb3JhZG8uZWR1PlxyXG4gKi9cclxuXHJcbmltcG9ydCBEZXJpdmVkUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9EZXJpdmVkUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgRHluYW1pY1Byb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvRHluYW1pY1Byb3BlcnR5LmpzJztcclxuaW1wb3J0IE11bHRpbGluayBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL011bHRpbGluay5qcyc7XHJcbmltcG9ydCB2YWxpZGF0ZSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL3ZhbGlkYXRlLmpzJztcclxuaW1wb3J0IFJhbmdlIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9SYW5nZS5qcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvVXRpbHMuanMnO1xyXG5pbXBvcnQgT3JpZW50YXRpb24gZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL09yaWVudGF0aW9uLmpzJztcclxuaW1wb3J0IFN0cmluZ1V0aWxzIGZyb20gJy4uLy4uLy4uLy4uL3BoZXRjb21tb24vanMvdXRpbC9TdHJpbmdVdGlscy5qcyc7XHJcbmltcG9ydCBNYXRoU3ltYm9scyBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5LXBoZXQvanMvTWF0aFN5bWJvbHMuanMnO1xyXG5pbXBvcnQgeyBIQm94LCBOb2RlLCBUZXh0IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IE51bWJlclBpY2tlciBmcm9tICcuLi8uLi8uLi8uLi9zdW4vanMvTnVtYmVyUGlja2VyLmpzJztcclxuaW1wb3J0IGFyZWFNb2RlbENvbW1vbiBmcm9tICcuLi8uLi9hcmVhTW9kZWxDb21tb24uanMnO1xyXG5pbXBvcnQgQXJlYU1vZGVsQ29tbW9uU3RyaW5ncyBmcm9tICcuLi8uLi9BcmVhTW9kZWxDb21tb25TdHJpbmdzLmpzJztcclxuaW1wb3J0IEFyZWFNb2RlbENvbW1vbkNvbnN0YW50cyBmcm9tICcuLi8uLi9jb21tb24vQXJlYU1vZGVsQ29tbW9uQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IEFyZWFNb2RlbENvbW1vblF1ZXJ5UGFyYW1ldGVycyBmcm9tICcuLi8uLi9jb21tb24vQXJlYU1vZGVsQ29tbW9uUXVlcnlQYXJhbWV0ZXJzLmpzJztcclxuaW1wb3J0IEFyZWFNb2RlbENvbW1vbkNvbG9ycyBmcm9tICcuLi8uLi9jb21tb24vdmlldy9BcmVhTW9kZWxDb21tb25Db2xvcnMuanMnO1xyXG5cclxuY29uc3QgZmFjdG9yc1RpbWVzUGF0dGVyblN0cmluZyA9IEFyZWFNb2RlbENvbW1vblN0cmluZ3MuYTExeS5mYWN0b3JzVGltZXNQYXR0ZXJuO1xyXG5jb25zdCBob3Jpem9udGFsUGlja2VyU3RyaW5nID0gQXJlYU1vZGVsQ29tbW9uU3RyaW5ncy5hMTF5Lmhvcml6b250YWxQaWNrZXI7XHJcbmNvbnN0IGhvcml6b250YWxQaWNrZXJEZXNjcmlwdGlvblN0cmluZyA9IEFyZWFNb2RlbENvbW1vblN0cmluZ3MuYTExeS5ob3Jpem9udGFsUGlja2VyRGVzY3JpcHRpb247XHJcbmNvbnN0IHZlcnRpY2FsUGlja2VyU3RyaW5nID0gQXJlYU1vZGVsQ29tbW9uU3RyaW5ncy5hMTF5LnZlcnRpY2FsUGlja2VyO1xyXG5jb25zdCB2ZXJ0aWNhbFBpY2tlckRlc2NyaXB0aW9uU3RyaW5nID0gQXJlYU1vZGVsQ29tbW9uU3RyaW5ncy5hMTF5LnZlcnRpY2FsUGlja2VyRGVzY3JpcHRpb247XHJcblxyXG5jbGFzcyBQcm9wb3J0aW9uYWxGYWN0b3JzTm9kZSBleHRlbmRzIE5vZGUge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7UHJvcGVydHkuPEFyZWE+fSBjdXJyZW50QXJlYVByb3BlcnR5XHJcbiAgICogQHBhcmFtIHtPcmllbnRhdGlvblBhaXIuPFByb3BlcnR5LjxudW1iZXI+Pn0gLSBhY3RpdmVUb3RhbFByb3BlcnRpZXNcclxuICAgKiBAcGFyYW0ge251bWJlcn0gZGVjaW1hbFBsYWNlcyAtIFRoZSBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgdG8gc2hvdyBpbiB0aGUgcGlja2VyICh3aGVuIG5lZWRlZClcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggY3VycmVudEFyZWFQcm9wZXJ0eSwgYWN0aXZlVG90YWxQcm9wZXJ0aWVzLCBkZWNpbWFsUGxhY2VzICkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICBpZiAoIEFyZWFNb2RlbENvbW1vblF1ZXJ5UGFyYW1ldGVycy5yYXdNYXRoICkge1xyXG4gICAgICB0aGlzLnRhZ05hbWUgPSAnZGl2JztcclxuICAgICAgTXVsdGlsaW5rLm11bHRpbGluayggYWN0aXZlVG90YWxQcm9wZXJ0aWVzLnZhbHVlcywgKCBob3Jpem9udGFsVG90YWwsIHZlcnRpY2FsVG90YWwgKSA9PiB7XHJcbiAgICAgICAgdGhpcy5pbm5lckNvbnRlbnQgPSBTdHJpbmdVdGlscy5maWxsSW4oIGZhY3RvcnNUaW1lc1BhdHRlcm5TdHJpbmcsIHtcclxuICAgICAgICAgIHdpZHRoOiBob3Jpem9udGFsVG90YWwsXHJcbiAgICAgICAgICBoZWlnaHQ6IHZlcnRpY2FsVG90YWxcclxuICAgICAgICB9ICk7XHJcbiAgICAgIH0gKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBjb25zdCBucyA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MJztcclxuICAgICAgY29uc3QgdmVydGljYWxOb2RlID0gbmV3IE5vZGUoIHtcclxuXHJcbiAgICAgICAgLy8gcGRvbVxyXG4gICAgICAgIHRhZ05hbWU6ICdtbicsXHJcbiAgICAgICAgcGRvbU5hbWVzcGFjZTogbnNcclxuICAgICAgfSApO1xyXG4gICAgICBhY3RpdmVUb3RhbFByb3BlcnRpZXMudmVydGljYWwubGluayggdmVydGljYWxUb3RhbCA9PiB7XHJcbiAgICAgICAgdmVydGljYWxOb2RlLmlubmVyQ29udGVudCA9IGAke3ZlcnRpY2FsVG90YWx9YDtcclxuICAgICAgfSApO1xyXG4gICAgICBjb25zdCBob3Jpem9udGFsTm9kZSA9IG5ldyBOb2RlKCB7XHJcblxyXG4gICAgICAgIC8vIHBkb21cclxuICAgICAgICB0YWdOYW1lOiAnbW4nLFxyXG4gICAgICAgIHBkb21OYW1lc3BhY2U6IG5zXHJcbiAgICAgIH0gKTtcclxuICAgICAgYWN0aXZlVG90YWxQcm9wZXJ0aWVzLmhvcml6b250YWwubGluayggaG9yaXpvbnRhbFRvdGFsID0+IHtcclxuICAgICAgICBob3Jpem9udGFsTm9kZS5pbm5lckNvbnRlbnQgPSBgJHtob3Jpem9udGFsVG90YWx9YDtcclxuICAgICAgfSApO1xyXG5cclxuICAgICAgY29uc3QgbWF0aE5vZGUgPSBuZXcgTm9kZSgge1xyXG4gICAgICAgIHRhZ05hbWU6ICdtYXRoJyxcclxuICAgICAgICBwZG9tTmFtZXNwYWNlOiBucyxcclxuICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgbmV3IE5vZGUoIHtcclxuICAgICAgICAgICAgdGFnTmFtZTogJ21yb3cnLFxyXG4gICAgICAgICAgICBwZG9tTmFtZXNwYWNlOiBucyxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICB2ZXJ0aWNhbE5vZGUsXHJcbiAgICAgICAgICAgICAgbmV3IE5vZGUoIHtcclxuICAgICAgICAgICAgICAgIHRhZ05hbWU6ICdtbycsXHJcbiAgICAgICAgICAgICAgICBwZG9tTmFtZXNwYWNlOiBucyxcclxuICAgICAgICAgICAgICAgIGlubmVyQ29udGVudDogJyZ0aW1lczsnXHJcbiAgICAgICAgICAgICAgfSApLFxyXG4gICAgICAgICAgICAgIGhvcml6b250YWxOb2RlXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0gKVxyXG4gICAgICAgIF1cclxuICAgICAgfSApO1xyXG4gICAgICB0aGlzLmFkZENoaWxkKCBtYXRoTm9kZSApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWRkQ2hpbGQoIG5ldyBIQm94KCB7XHJcbiAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgdGhpcy5jcmVhdGVQaWNrZXIoIE9yaWVudGF0aW9uLlZFUlRJQ0FMLCBjdXJyZW50QXJlYVByb3BlcnR5LCBkZWNpbWFsUGxhY2VzICksXHJcbiAgICAgICAgbmV3IFRleHQoIE1hdGhTeW1ib2xzLlRJTUVTLCB7IGZvbnQ6IEFyZWFNb2RlbENvbW1vbkNvbnN0YW50cy5GQUNUT1JTX1RFUk1fRk9OVCB9ICksXHJcbiAgICAgICAgdGhpcy5jcmVhdGVQaWNrZXIoIE9yaWVudGF0aW9uLkhPUklaT05UQUwsIGN1cnJlbnRBcmVhUHJvcGVydHksIGRlY2ltYWxQbGFjZXMgKVxyXG4gICAgICBdLFxyXG4gICAgICBzcGFjaW5nOiAxMFxyXG4gICAgfSApICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgcGlja2VyIHRoYXQgYWRqdXN0cyB0aGUgc3BlY2lmaWVkIG9yaWVudGF0aW9uJ3MgdG90YWwgc2l6ZS5cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPcmllbnRhdGlvbn0gb3JpZW50YXRpb25cclxuICAgKiBAcGFyYW0ge1Byb3BlcnR5LjxBcmVhPn0gY3VycmVudEFyZWFQcm9wZXJ0eVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkZWNpbWFsUGxhY2VzXHJcbiAgICovXHJcbiAgY3JlYXRlUGlja2VyKCBvcmllbnRhdGlvbiwgY3VycmVudEFyZWFQcm9wZXJ0eSwgZGVjaW1hbFBsYWNlcyApIHtcclxuICAgIHZhbGlkYXRlKCBvcmllbnRhdGlvbiwgeyB2YWxpZFZhbHVlczogT3JpZW50YXRpb24uZW51bWVyYXRpb24udmFsdWVzIH0gKTtcclxuXHJcbiAgICAvLyB7UHJvcGVydHkuPFByb3BlcnR5LjxQb2x5bm9taWFsfG51bGw+Pn1cclxuICAgIGNvbnN0IGN1cnJlbnRUb3RhbFByb3BlcnR5ID0gbmV3IERlcml2ZWRQcm9wZXJ0eSggWyBjdXJyZW50QXJlYVByb3BlcnR5IF0sIGFyZWEgPT4gYXJlYS5hY3RpdmVUb3RhbFByb3BlcnRpZXMuZ2V0KCBvcmllbnRhdGlvbiApICk7XHJcblxyXG4gICAgLy8ge1Byb3BlcnR5LjxQb2x5bm9taWFsfG51bGw+fVxyXG4gICAgY29uc3QgYmlkaXJlY3Rpb25hbFByb3BlcnR5ID0gbmV3IER5bmFtaWNQcm9wZXJ0eSggY3VycmVudFRvdGFsUHJvcGVydHksIHtcclxuICAgICAgYmlkaXJlY3Rpb25hbDogdHJ1ZVxyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIHtQcm9wZXJ0eS48UmFuZ2U+fVxyXG4gICAgY29uc3QgcmFuZ2VQcm9wZXJ0eSA9IG5ldyBEZXJpdmVkUHJvcGVydHkoIFsgY3VycmVudEFyZWFQcm9wZXJ0eSBdLCBhcmVhID0+IG5ldyBSYW5nZSggYXJlYS5taW5pbXVtU2l6ZSwgYXJlYS5tYXhpbXVtU2l6ZSApICk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBOdW1iZXJQaWNrZXIoIGJpZGlyZWN0aW9uYWxQcm9wZXJ0eSwgcmFuZ2VQcm9wZXJ0eSwge1xyXG4gICAgICBpbmNyZW1lbnRGdW5jdGlvbjogdmFsdWUgPT4gVXRpbHMudG9GaXhlZE51bWJlciggdmFsdWUgKyBjdXJyZW50QXJlYVByb3BlcnR5LnZhbHVlLnNuYXBTaXplLCBkZWNpbWFsUGxhY2VzICksXHJcbiAgICAgIGRlY3JlbWVudEZ1bmN0aW9uOiB2YWx1ZSA9PiBVdGlscy50b0ZpeGVkTnVtYmVyKCB2YWx1ZSAtIGN1cnJlbnRBcmVhUHJvcGVydHkudmFsdWUuc25hcFNpemUsIGRlY2ltYWxQbGFjZXMgKSxcclxuICAgICAgZGVjaW1hbFBsYWNlczogZGVjaW1hbFBsYWNlcyxcclxuICAgICAgc2NhbGU6IDEuNSxcclxuICAgICAgZm9ybWF0VmFsdWU6IHZhbHVlID0+IHtcclxuICAgICAgICAvLyBFcHNpbG9uIGNob3NlbiB0byBhdm9pZCByb3VuZC1vZmYgZXJyb3JzIHdoaWxlIG5vdCBcInJvdW5kaW5nXCIgYW55IHZhbHVlcyBpbiB0aGUgZGVjaW1hbHMgc2ltcyBpbXByb3Blcmx5LlxyXG4gICAgICAgIGlmICggVXRpbHMuZXF1YWxzRXBzaWxvbiggdmFsdWUsIFV0aWxzLnJvdW5kU3ltbWV0cmljKCB2YWx1ZSApLCAxZS02ICkgKSB7XHJcbiAgICAgICAgICByZXR1cm4gVXRpbHMudG9GaXhlZCggdmFsdWUsIDAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gVXRpbHMudG9GaXhlZCggdmFsdWUsIDEgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbG9yOiBBcmVhTW9kZWxDb21tb25Db2xvcnMucHJvcG9ydGlvbmFsQ29sb3JQcm9wZXJ0aWVzLmdldCggb3JpZW50YXRpb24gKSxcclxuXHJcbiAgICAgIC8vIHBkb21cclxuICAgICAgbGFiZWxDb250ZW50OiBvcmllbnRhdGlvbiA9PT0gT3JpZW50YXRpb24uSE9SSVpPTlRBTCA/IGhvcml6b250YWxQaWNrZXJTdHJpbmcgOiB2ZXJ0aWNhbFBpY2tlclN0cmluZyxcclxuICAgICAgZGVzY3JpcHRpb25Db250ZW50OiBvcmllbnRhdGlvbiA9PT0gT3JpZW50YXRpb24uSE9SSVpPTlRBTCA/IGhvcml6b250YWxQaWNrZXJEZXNjcmlwdGlvblN0cmluZyA6IHZlcnRpY2FsUGlja2VyRGVzY3JpcHRpb25TdHJpbmcsXHJcbiAgICAgIGExMXlNYXBQRE9NVmFsdWU6IHZhbHVlID0+IFV0aWxzLnRvRml4ZWROdW1iZXIoIHZhbHVlLCBkZWNpbWFsUGxhY2VzIClcclxuICAgIH0gKTtcclxuICB9XHJcbn1cclxuXHJcbmFyZWFNb2RlbENvbW1vbi5yZWdpc3RlciggJ1Byb3BvcnRpb25hbEZhY3RvcnNOb2RlJywgUHJvcG9ydGlvbmFsRmFjdG9yc05vZGUgKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb3BvcnRpb25hbEZhY3RvcnNOb2RlOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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