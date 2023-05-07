// Copyright 2016-2022, University of Colorado Boulder

/**
 * Challenges for the 'Mystery' screen, with function for parsing them.
 * To make them easier to read and modify, challenges are expressed as strings,
 * with operators and operands separated by spaces.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import FBSymbols from '../../common/FBSymbols.js';
import functionBuilder from '../../functionBuilder.js';

// maps operator tokens used in challenges to operator symbols used in functions
const OPERATOR_MAP = {
  '+': FBSymbols.PLUS,
  '-': FBSymbols.MINUS,
  '*': FBSymbols.TIMES,
  '/': FBSymbols.DIVIDE
};
const MysteryChallenges = {
  // Index of the challenge in each pool that is display on startup and reset.
  // This provides a reproducible challenge for the teacher.
  DEFAULT_CHALLENGE_INDEX: 0,
  // 1-function challenges
  POOL1: ['+ 3',
  // selected on startup and reset
  '+ 2', '+ 1', '+ 0', '- 3', '- 2', '- 1', '- 0', '* 3', '* 2', '* 1', '* 0', '* -1', '* -2', '* -3', '/ 3', '/ 2', '/ 1', '/ -1', '/ -2', '/ -3'],
  // 2-function challenges
  POOL2: ['+ 1 * 2',
  // selected on startup and reset
  '+ 1 + 3', '+ 1 + 2', '* 2 * 0', '* 0 * 1', '* -1 * -2', '* -3 * 2', '* 3 + 3', '* 2 + 3', '* 2 - 2', '* 3 - 1', '* -3 + 0', '* -2 + 1', '* 1 + 3', '* 1 - 2', '* 0 + 3', '* 0 - 2', '/ 1 - 1', '/ 3 - 3', '/ 3 + 2', '/ -1 - 3', '/ -2 + 2', '+ 3 * 3', '- 1 * 3', '+ 2 * 2', '+ 3 * 1', '+ 2 / 1', '+ 3 * 0', '+ 0 * -3', '- 3 / 2', '- 2 / 3', '+ 3 / -1'],
  // 3-function challenges
  POOL3: ['+ 2 * 1 + 2',
  // selected on startup and reset
  '* -3 * -1 * 0', '* 3 * -2 * -1', '* 2 * -2 * -2', '/ 3 / -1 / -1', '/ 2 / 3 / -2', '/ 1 / -1 / 2', '* 3 * -3 + 3', '/ 2 * 2 - 2', '+ 3 * 1 + 3', '- 1 / 1 - 1', '+ 3 * 0 + 3', '+ 2 * -2 + 3', '+ 0 * -3 + 0', '+ 1 - 3 * 2', '- 3 / 3 - 3', '- 2 / 3 + 2', '+ 3 / -1 - 3', '+ 2 / -2 + 2', '* -3 + 3 + 3', '/ 3 - 3 - 3', '* 0 + 2 + 2', '* 3 + 3 * 1', '/ 2 + 2 / 1', '/ 2 - 1 * 1', '* -2 + 3 * 0', '* 1 + 0 * -3', '* 0 - 3 + 3', '* -1 - 2 / 3', '* 0 + 3 / -1'],
  /**
   * Converts the string representation of a challenge into an array of Objects
   * that is easier to process programmatically.
   *
   * @param {string} challenge
   * @returns {{operator: string, operand: number}[]}
   * @static
   * @public
   */
  parseChallenge: function (challenge) {
    const challengeObjects = [];
    const tokens = challenge.split(' ');
    assert && assert(tokens.length % 2 === 0, `malformed challenge: ${challenge}`);
    for (let i = 0; i < tokens.length; i = i + 2) {
      const challengeObject = {
        operator: OPERATOR_MAP[tokens[i]],
        operand: Number(tokens[i + 1])
      };

      // validation
      assert && assert(challengeObject.operator, `bad operator in challenge: ${challenge}`);
      assert && assert(Number.isInteger(challengeObject.operand), `bad operand in challenge: ${challenge}`);
      assert && assert(!(challengeObject.operand < 0 && challengeObject.operator === FBSymbols.PLUS), `negative operand not allowed with plus in challenge: ${challenge}`);
      assert && assert(!(challengeObject.operand < 0 && challengeObject.operator === FBSymbols.MINUS), `negative operand not allowed with minus in challenge: ${challenge}`);
      assert && assert(!(challengeObject.operand === 0 && challengeObject.operator === FBSymbols.DIVIDE), `division by zero not allowed in challenge: ${challenge}`);
      challengeObjects.push(challengeObject);
    }
    return challengeObjects;
  }
};
functionBuilder.register('MysteryChallenges', MysteryChallenges);
export default MysteryChallenges;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJGQlN5bWJvbHMiLCJmdW5jdGlvbkJ1aWxkZXIiLCJPUEVSQVRPUl9NQVAiLCJQTFVTIiwiTUlOVVMiLCJUSU1FUyIsIkRJVklERSIsIk15c3RlcnlDaGFsbGVuZ2VzIiwiREVGQVVMVF9DSEFMTEVOR0VfSU5ERVgiLCJQT09MMSIsIlBPT0wyIiwiUE9PTDMiLCJwYXJzZUNoYWxsZW5nZSIsImNoYWxsZW5nZSIsImNoYWxsZW5nZU9iamVjdHMiLCJ0b2tlbnMiLCJzcGxpdCIsImFzc2VydCIsImxlbmd0aCIsImkiLCJjaGFsbGVuZ2VPYmplY3QiLCJvcGVyYXRvciIsIm9wZXJhbmQiLCJOdW1iZXIiLCJpc0ludGVnZXIiLCJwdXNoIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJNeXN0ZXJ5Q2hhbGxlbmdlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNi0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBDaGFsbGVuZ2VzIGZvciB0aGUgJ015c3RlcnknIHNjcmVlbiwgd2l0aCBmdW5jdGlvbiBmb3IgcGFyc2luZyB0aGVtLlxyXG4gKiBUbyBtYWtlIHRoZW0gZWFzaWVyIHRvIHJlYWQgYW5kIG1vZGlmeSwgY2hhbGxlbmdlcyBhcmUgZXhwcmVzc2VkIGFzIHN0cmluZ3MsXHJcbiAqIHdpdGggb3BlcmF0b3JzIGFuZCBvcGVyYW5kcyBzZXBhcmF0ZWQgYnkgc3BhY2VzLlxyXG4gKlxyXG4gKiBAYXV0aG9yIENocmlzIE1hbGxleSAoUGl4ZWxab29tLCBJbmMuKVxyXG4gKi9cclxuXHJcbmltcG9ydCBGQlN5bWJvbHMgZnJvbSAnLi4vLi4vY29tbW9uL0ZCU3ltYm9scy5qcyc7XHJcbmltcG9ydCBmdW5jdGlvbkJ1aWxkZXIgZnJvbSAnLi4vLi4vZnVuY3Rpb25CdWlsZGVyLmpzJztcclxuXHJcbi8vIG1hcHMgb3BlcmF0b3IgdG9rZW5zIHVzZWQgaW4gY2hhbGxlbmdlcyB0byBvcGVyYXRvciBzeW1ib2xzIHVzZWQgaW4gZnVuY3Rpb25zXHJcbmNvbnN0IE9QRVJBVE9SX01BUCA9IHtcclxuICAnKyc6IEZCU3ltYm9scy5QTFVTLFxyXG4gICctJzogRkJTeW1ib2xzLk1JTlVTLFxyXG4gICcqJzogRkJTeW1ib2xzLlRJTUVTLFxyXG4gICcvJzogRkJTeW1ib2xzLkRJVklERVxyXG59O1xyXG5cclxuY29uc3QgTXlzdGVyeUNoYWxsZW5nZXMgPSB7XHJcblxyXG4gIC8vIEluZGV4IG9mIHRoZSBjaGFsbGVuZ2UgaW4gZWFjaCBwb29sIHRoYXQgaXMgZGlzcGxheSBvbiBzdGFydHVwIGFuZCByZXNldC5cclxuICAvLyBUaGlzIHByb3ZpZGVzIGEgcmVwcm9kdWNpYmxlIGNoYWxsZW5nZSBmb3IgdGhlIHRlYWNoZXIuXHJcbiAgREVGQVVMVF9DSEFMTEVOR0VfSU5ERVg6IDAsXHJcblxyXG4gIC8vIDEtZnVuY3Rpb24gY2hhbGxlbmdlc1xyXG4gIFBPT0wxOiBbXHJcbiAgICAnKyAzJywgLy8gc2VsZWN0ZWQgb24gc3RhcnR1cCBhbmQgcmVzZXRcclxuICAgICcrIDInLFxyXG4gICAgJysgMScsXHJcbiAgICAnKyAwJyxcclxuICAgICctIDMnLFxyXG4gICAgJy0gMicsXHJcbiAgICAnLSAxJyxcclxuICAgICctIDAnLFxyXG4gICAgJyogMycsXHJcbiAgICAnKiAyJyxcclxuICAgICcqIDEnLFxyXG4gICAgJyogMCcsXHJcbiAgICAnKiAtMScsXHJcbiAgICAnKiAtMicsXHJcbiAgICAnKiAtMycsXHJcbiAgICAnLyAzJyxcclxuICAgICcvIDInLFxyXG4gICAgJy8gMScsXHJcbiAgICAnLyAtMScsXHJcbiAgICAnLyAtMicsXHJcbiAgICAnLyAtMydcclxuICBdLFxyXG5cclxuICAvLyAyLWZ1bmN0aW9uIGNoYWxsZW5nZXNcclxuICBQT09MMjogW1xyXG4gICAgJysgMSAqIDInLCAvLyBzZWxlY3RlZCBvbiBzdGFydHVwIGFuZCByZXNldFxyXG4gICAgJysgMSArIDMnLFxyXG4gICAgJysgMSArIDInLFxyXG4gICAgJyogMiAqIDAnLFxyXG4gICAgJyogMCAqIDEnLFxyXG4gICAgJyogLTEgKiAtMicsXHJcbiAgICAnKiAtMyAqIDInLFxyXG4gICAgJyogMyArIDMnLFxyXG4gICAgJyogMiArIDMnLFxyXG4gICAgJyogMiAtIDInLFxyXG4gICAgJyogMyAtIDEnLFxyXG4gICAgJyogLTMgKyAwJyxcclxuICAgICcqIC0yICsgMScsXHJcbiAgICAnKiAxICsgMycsXHJcbiAgICAnKiAxIC0gMicsXHJcbiAgICAnKiAwICsgMycsXHJcbiAgICAnKiAwIC0gMicsXHJcbiAgICAnLyAxIC0gMScsXHJcbiAgICAnLyAzIC0gMycsXHJcbiAgICAnLyAzICsgMicsXHJcbiAgICAnLyAtMSAtIDMnLFxyXG4gICAgJy8gLTIgKyAyJyxcclxuICAgICcrIDMgKiAzJyxcclxuICAgICctIDEgKiAzJyxcclxuICAgICcrIDIgKiAyJyxcclxuICAgICcrIDMgKiAxJyxcclxuICAgICcrIDIgLyAxJyxcclxuICAgICcrIDMgKiAwJyxcclxuICAgICcrIDAgKiAtMycsXHJcbiAgICAnLSAzIC8gMicsXHJcbiAgICAnLSAyIC8gMycsXHJcbiAgICAnKyAzIC8gLTEnXHJcbiAgXSxcclxuXHJcbiAgLy8gMy1mdW5jdGlvbiBjaGFsbGVuZ2VzXHJcbiAgUE9PTDM6IFtcclxuICAgICcrIDIgKiAxICsgMicsIC8vIHNlbGVjdGVkIG9uIHN0YXJ0dXAgYW5kIHJlc2V0XHJcbiAgICAnKiAtMyAqIC0xICogMCcsXHJcbiAgICAnKiAzICogLTIgKiAtMScsXHJcbiAgICAnKiAyICogLTIgKiAtMicsXHJcbiAgICAnLyAzIC8gLTEgLyAtMScsXHJcbiAgICAnLyAyIC8gMyAvIC0yJyxcclxuICAgICcvIDEgLyAtMSAvIDInLFxyXG4gICAgJyogMyAqIC0zICsgMycsXHJcbiAgICAnLyAyICogMiAtIDInLFxyXG4gICAgJysgMyAqIDEgKyAzJyxcclxuICAgICctIDEgLyAxIC0gMScsXHJcbiAgICAnKyAzICogMCArIDMnLFxyXG4gICAgJysgMiAqIC0yICsgMycsXHJcbiAgICAnKyAwICogLTMgKyAwJyxcclxuICAgICcrIDEgLSAzICogMicsXHJcbiAgICAnLSAzIC8gMyAtIDMnLFxyXG4gICAgJy0gMiAvIDMgKyAyJyxcclxuICAgICcrIDMgLyAtMSAtIDMnLFxyXG4gICAgJysgMiAvIC0yICsgMicsXHJcbiAgICAnKiAtMyArIDMgKyAzJyxcclxuICAgICcvIDMgLSAzIC0gMycsXHJcbiAgICAnKiAwICsgMiArIDInLFxyXG4gICAgJyogMyArIDMgKiAxJyxcclxuICAgICcvIDIgKyAyIC8gMScsXHJcbiAgICAnLyAyIC0gMSAqIDEnLFxyXG4gICAgJyogLTIgKyAzICogMCcsXHJcbiAgICAnKiAxICsgMCAqIC0zJyxcclxuICAgICcqIDAgLSAzICsgMycsXHJcbiAgICAnKiAtMSAtIDIgLyAzJyxcclxuICAgICcqIDAgKyAzIC8gLTEnXHJcbiAgXSxcclxuXHJcbiAgLyoqXHJcbiAgICogQ29udmVydHMgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIGNoYWxsZW5nZSBpbnRvIGFuIGFycmF5IG9mIE9iamVjdHNcclxuICAgKiB0aGF0IGlzIGVhc2llciB0byBwcm9jZXNzIHByb2dyYW1tYXRpY2FsbHkuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhbGxlbmdlXHJcbiAgICogQHJldHVybnMge3tvcGVyYXRvcjogc3RyaW5nLCBvcGVyYW5kOiBudW1iZXJ9W119XHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBwdWJsaWNcclxuICAgKi9cclxuICBwYXJzZUNoYWxsZW5nZTogZnVuY3Rpb24oIGNoYWxsZW5nZSApIHtcclxuXHJcbiAgICBjb25zdCBjaGFsbGVuZ2VPYmplY3RzID0gW107XHJcblxyXG4gICAgY29uc3QgdG9rZW5zID0gY2hhbGxlbmdlLnNwbGl0KCAnICcgKTtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIHRva2Vucy5sZW5ndGggJSAyID09PSAwLCBgbWFsZm9ybWVkIGNoYWxsZW5nZTogJHtjaGFsbGVuZ2V9YCApO1xyXG5cclxuICAgIGZvciAoIGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkgPSBpICsgMiApIHtcclxuXHJcbiAgICAgIGNvbnN0IGNoYWxsZW5nZU9iamVjdCA9IHtcclxuICAgICAgICBvcGVyYXRvcjogT1BFUkFUT1JfTUFQWyB0b2tlbnNbIGkgXSBdLFxyXG4gICAgICAgIG9wZXJhbmQ6IE51bWJlciggdG9rZW5zWyBpICsgMSBdIClcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIHZhbGlkYXRpb25cclxuICAgICAgYXNzZXJ0ICYmIGFzc2VydCggY2hhbGxlbmdlT2JqZWN0Lm9wZXJhdG9yLCBgYmFkIG9wZXJhdG9yIGluIGNoYWxsZW5nZTogJHtjaGFsbGVuZ2V9YCApO1xyXG4gICAgICBhc3NlcnQgJiYgYXNzZXJ0KCBOdW1iZXIuaXNJbnRlZ2VyKCBjaGFsbGVuZ2VPYmplY3Qub3BlcmFuZCApLCBgYmFkIG9wZXJhbmQgaW4gY2hhbGxlbmdlOiAke2NoYWxsZW5nZX1gICk7XHJcbiAgICAgIGFzc2VydCAmJiBhc3NlcnQoICEoIGNoYWxsZW5nZU9iamVjdC5vcGVyYW5kIDwgMCAmJiBjaGFsbGVuZ2VPYmplY3Qub3BlcmF0b3IgPT09IEZCU3ltYm9scy5QTFVTICksXHJcbiAgICAgICAgYG5lZ2F0aXZlIG9wZXJhbmQgbm90IGFsbG93ZWQgd2l0aCBwbHVzIGluIGNoYWxsZW5nZTogJHtjaGFsbGVuZ2V9YCApO1xyXG4gICAgICBhc3NlcnQgJiYgYXNzZXJ0KCAhKCBjaGFsbGVuZ2VPYmplY3Qub3BlcmFuZCA8IDAgJiYgY2hhbGxlbmdlT2JqZWN0Lm9wZXJhdG9yID09PSBGQlN5bWJvbHMuTUlOVVMgKSxcclxuICAgICAgICBgbmVnYXRpdmUgb3BlcmFuZCBub3QgYWxsb3dlZCB3aXRoIG1pbnVzIGluIGNoYWxsZW5nZTogJHtjaGFsbGVuZ2V9YCApO1xyXG4gICAgICBhc3NlcnQgJiYgYXNzZXJ0KCAhKCBjaGFsbGVuZ2VPYmplY3Qub3BlcmFuZCA9PT0gMCAmJiBjaGFsbGVuZ2VPYmplY3Qub3BlcmF0b3IgPT09IEZCU3ltYm9scy5ESVZJREUgKSxcclxuICAgICAgICBgZGl2aXNpb24gYnkgemVybyBub3QgYWxsb3dlZCBpbiBjaGFsbGVuZ2U6ICR7Y2hhbGxlbmdlfWAgKTtcclxuXHJcbiAgICAgIGNoYWxsZW5nZU9iamVjdHMucHVzaCggY2hhbGxlbmdlT2JqZWN0ICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNoYWxsZW5nZU9iamVjdHM7XHJcbiAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb25CdWlsZGVyLnJlZ2lzdGVyKCAnTXlzdGVyeUNoYWxsZW5nZXMnLCBNeXN0ZXJ5Q2hhbGxlbmdlcyApO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTXlzdGVyeUNoYWxsZW5nZXM7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxTQUFTLE1BQU0sMkJBQTJCO0FBQ2pELE9BQU9DLGVBQWUsTUFBTSwwQkFBMEI7O0FBRXREO0FBQ0EsTUFBTUMsWUFBWSxHQUFHO0VBQ25CLEdBQUcsRUFBRUYsU0FBUyxDQUFDRyxJQUFJO0VBQ25CLEdBQUcsRUFBRUgsU0FBUyxDQUFDSSxLQUFLO0VBQ3BCLEdBQUcsRUFBRUosU0FBUyxDQUFDSyxLQUFLO0VBQ3BCLEdBQUcsRUFBRUwsU0FBUyxDQUFDTTtBQUNqQixDQUFDO0FBRUQsTUFBTUMsaUJBQWlCLEdBQUc7RUFFeEI7RUFDQTtFQUNBQyx1QkFBdUIsRUFBRSxDQUFDO0VBRTFCO0VBQ0FDLEtBQUssRUFBRSxDQUNMLEtBQUs7RUFBRTtFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixNQUFNLEVBQ04sS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixNQUFNLENBQ1A7RUFFRDtFQUNBQyxLQUFLLEVBQUUsQ0FDTCxTQUFTO0VBQUU7RUFDWCxTQUFTLEVBQ1QsU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEVBQ1QsV0FBVyxFQUNYLFVBQVUsRUFDVixTQUFTLEVBQ1QsU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFVBQVUsRUFDVixTQUFTLEVBQ1QsU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEVBQ1QsU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFVBQVUsRUFDVixTQUFTLEVBQ1QsU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEVBQ1QsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLENBQ1g7RUFFRDtFQUNBQyxLQUFLLEVBQUUsQ0FDTCxhQUFhO0VBQUU7RUFDZixlQUFlLEVBQ2YsZUFBZSxFQUNmLGVBQWUsRUFDZixlQUFlLEVBQ2YsY0FBYyxFQUNkLGNBQWMsRUFDZCxjQUFjLEVBQ2QsYUFBYSxFQUNiLGFBQWEsRUFDYixhQUFhLEVBQ2IsYUFBYSxFQUNiLGNBQWMsRUFDZCxjQUFjLEVBQ2QsYUFBYSxFQUNiLGFBQWEsRUFDYixhQUFhLEVBQ2IsY0FBYyxFQUNkLGNBQWMsRUFDZCxjQUFjLEVBQ2QsYUFBYSxFQUNiLGFBQWEsRUFDYixhQUFhLEVBQ2IsYUFBYSxFQUNiLGFBQWEsRUFDYixjQUFjLEVBQ2QsY0FBYyxFQUNkLGFBQWEsRUFDYixjQUFjLEVBQ2QsY0FBYyxDQUNmO0VBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0VDLGNBQWMsRUFBRSxTQUFBQSxDQUFVQyxTQUFTLEVBQUc7SUFFcEMsTUFBTUMsZ0JBQWdCLEdBQUcsRUFBRTtJQUUzQixNQUFNQyxNQUFNLEdBQUdGLFNBQVMsQ0FBQ0csS0FBSyxDQUFFLEdBQUksQ0FBQztJQUNyQ0MsTUFBTSxJQUFJQSxNQUFNLENBQUVGLE1BQU0sQ0FBQ0csTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUcsd0JBQXVCTCxTQUFVLEVBQUUsQ0FBQztJQUVoRixLQUFNLElBQUlNLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0osTUFBTSxDQUFDRyxNQUFNLEVBQUVDLENBQUMsR0FBR0EsQ0FBQyxHQUFHLENBQUMsRUFBRztNQUU5QyxNQUFNQyxlQUFlLEdBQUc7UUFDdEJDLFFBQVEsRUFBRW5CLFlBQVksQ0FBRWEsTUFBTSxDQUFFSSxDQUFDLENBQUUsQ0FBRTtRQUNyQ0csT0FBTyxFQUFFQyxNQUFNLENBQUVSLE1BQU0sQ0FBRUksQ0FBQyxHQUFHLENBQUMsQ0FBRztNQUNuQyxDQUFDOztNQUVEO01BQ0FGLE1BQU0sSUFBSUEsTUFBTSxDQUFFRyxlQUFlLENBQUNDLFFBQVEsRUFBRyw4QkFBNkJSLFNBQVUsRUFBRSxDQUFDO01BQ3ZGSSxNQUFNLElBQUlBLE1BQU0sQ0FBRU0sTUFBTSxDQUFDQyxTQUFTLENBQUVKLGVBQWUsQ0FBQ0UsT0FBUSxDQUFDLEVBQUcsNkJBQTRCVCxTQUFVLEVBQUUsQ0FBQztNQUN6R0ksTUFBTSxJQUFJQSxNQUFNLENBQUUsRUFBR0csZUFBZSxDQUFDRSxPQUFPLEdBQUcsQ0FBQyxJQUFJRixlQUFlLENBQUNDLFFBQVEsS0FBS3JCLFNBQVMsQ0FBQ0csSUFBSSxDQUFFLEVBQzlGLHdEQUF1RFUsU0FBVSxFQUFFLENBQUM7TUFDdkVJLE1BQU0sSUFBSUEsTUFBTSxDQUFFLEVBQUdHLGVBQWUsQ0FBQ0UsT0FBTyxHQUFHLENBQUMsSUFBSUYsZUFBZSxDQUFDQyxRQUFRLEtBQUtyQixTQUFTLENBQUNJLEtBQUssQ0FBRSxFQUMvRix5REFBd0RTLFNBQVUsRUFBRSxDQUFDO01BQ3hFSSxNQUFNLElBQUlBLE1BQU0sQ0FBRSxFQUFHRyxlQUFlLENBQUNFLE9BQU8sS0FBSyxDQUFDLElBQUlGLGVBQWUsQ0FBQ0MsUUFBUSxLQUFLckIsU0FBUyxDQUFDTSxNQUFNLENBQUUsRUFDbEcsOENBQTZDTyxTQUFVLEVBQUUsQ0FBQztNQUU3REMsZ0JBQWdCLENBQUNXLElBQUksQ0FBRUwsZUFBZ0IsQ0FBQztJQUMxQztJQUVBLE9BQU9OLGdCQUFnQjtFQUN6QjtBQUNGLENBQUM7QUFFRGIsZUFBZSxDQUFDeUIsUUFBUSxDQUFFLG1CQUFtQixFQUFFbkIsaUJBQWtCLENBQUM7QUFFbEUsZUFBZUEsaUJBQWlCIn0=