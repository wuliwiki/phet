// Copyright 2017-2022, University of Colorado Boulder

/**
 * Trash button that is used to delete components.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { Path } from '../../../scenery/js/imports.js';
import trashAltRegularShape from '../../../sherpa/js/fontawesome-5/trashAltRegularShape.js';
import CCKCConstants from '../CCKCConstants.js';
import circuitConstructionKitCommon from '../circuitConstructionKitCommon.js';
import CCKCRoundPushButton from './CCKCRoundPushButton.js';
import CircuitElement from '../model/CircuitElement.js';
import { combineOptions } from '../../../phet-core/js/optionize.js';
export default class CCKCTrashButton extends CCKCRoundPushButton {
  /**
   * @param circuit - the circuit from which the CircuitElement can be removed
   * @param tandem
   * @param [providedOptions]
   */
  constructor(circuit, tandem, providedOptions) {
    super(combineOptions({
      touchAreaDilation: 5,
      // radius dilation for touch area
      content: new Path(trashAltRegularShape, {
        fill: 'black',
        scale: CCKCConstants.FONT_AWESOME_ICON_SCALE * 0.8
      }),
      listener: () => {
        const circuitElement = circuit.selectionProperty.value;
        if (circuitElement instanceof CircuitElement) {
          // Only permit deletion when not being dragged, see https://github.com/phetsims/circuit-construction-kit-common/issues/414
          if (!circuitElement.startVertexProperty.value.isDragged && !circuitElement.endVertexProperty.value.isDragged) {
            circuit.disposeCircuitElement(circuitElement);
          }
        }
      },
      tandem: tandem
    }, providedOptions));
  }
  dispose() {
    assert && assert(false, 'should not be disposed');
  }
}
circuitConstructionKitCommon.register('CCKCTrashButton', CCKCTrashButton);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQYXRoIiwidHJhc2hBbHRSZWd1bGFyU2hhcGUiLCJDQ0tDQ29uc3RhbnRzIiwiY2lyY3VpdENvbnN0cnVjdGlvbktpdENvbW1vbiIsIkNDS0NSb3VuZFB1c2hCdXR0b24iLCJDaXJjdWl0RWxlbWVudCIsImNvbWJpbmVPcHRpb25zIiwiQ0NLQ1RyYXNoQnV0dG9uIiwiY29uc3RydWN0b3IiLCJjaXJjdWl0IiwidGFuZGVtIiwicHJvdmlkZWRPcHRpb25zIiwidG91Y2hBcmVhRGlsYXRpb24iLCJjb250ZW50IiwiZmlsbCIsInNjYWxlIiwiRk9OVF9BV0VTT01FX0lDT05fU0NBTEUiLCJsaXN0ZW5lciIsImNpcmN1aXRFbGVtZW50Iiwic2VsZWN0aW9uUHJvcGVydHkiLCJ2YWx1ZSIsInN0YXJ0VmVydGV4UHJvcGVydHkiLCJpc0RyYWdnZWQiLCJlbmRWZXJ0ZXhQcm9wZXJ0eSIsImRpc3Bvc2VDaXJjdWl0RWxlbWVudCIsImRpc3Bvc2UiLCJhc3NlcnQiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkNDS0NUcmFzaEJ1dHRvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNy0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBUcmFzaCBidXR0b24gdGhhdCBpcyB1c2VkIHRvIGRlbGV0ZSBjb21wb25lbnRzLlxyXG4gKlxyXG4gKiBAYXV0aG9yIFNhbSBSZWlkIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IFBhdGggfSBmcm9tICcuLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgdHJhc2hBbHRSZWd1bGFyU2hhcGUgZnJvbSAnLi4vLi4vLi4vc2hlcnBhL2pzL2ZvbnRhd2Vzb21lLTUvdHJhc2hBbHRSZWd1bGFyU2hhcGUuanMnO1xyXG5pbXBvcnQgQ0NLQ0NvbnN0YW50cyBmcm9tICcuLi9DQ0tDQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IGNpcmN1aXRDb25zdHJ1Y3Rpb25LaXRDb21tb24gZnJvbSAnLi4vY2lyY3VpdENvbnN0cnVjdGlvbktpdENvbW1vbi5qcyc7XHJcbmltcG9ydCBDQ0tDUm91bmRQdXNoQnV0dG9uIGZyb20gJy4vQ0NLQ1JvdW5kUHVzaEJ1dHRvbi5qcyc7XHJcbmltcG9ydCBDaXJjdWl0IGZyb20gJy4uL21vZGVsL0NpcmN1aXQuanMnO1xyXG5pbXBvcnQgVGFuZGVtIGZyb20gJy4uLy4uLy4uL3RhbmRlbS9qcy9UYW5kZW0uanMnO1xyXG5pbXBvcnQgeyBSb3VuZFB1c2hCdXR0b25PcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vc3VuL2pzL2J1dHRvbnMvUm91bmRQdXNoQnV0dG9uLmpzJztcclxuaW1wb3J0IENpcmN1aXRFbGVtZW50IGZyb20gJy4uL21vZGVsL0NpcmN1aXRFbGVtZW50LmpzJztcclxuaW1wb3J0IHsgY29tYmluZU9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9waGV0LWNvcmUvanMvb3B0aW9uaXplLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENDS0NUcmFzaEJ1dHRvbiBleHRlbmRzIENDS0NSb3VuZFB1c2hCdXR0b24ge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gY2lyY3VpdCAtIHRoZSBjaXJjdWl0IGZyb20gd2hpY2ggdGhlIENpcmN1aXRFbGVtZW50IGNhbiBiZSByZW1vdmVkXHJcbiAgICogQHBhcmFtIHRhbmRlbVxyXG4gICAqIEBwYXJhbSBbcHJvdmlkZWRPcHRpb25zXVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggY2lyY3VpdDogQ2lyY3VpdCwgdGFuZGVtOiBUYW5kZW0sIHByb3ZpZGVkT3B0aW9ucz86IFJvdW5kUHVzaEJ1dHRvbk9wdGlvbnMgKSB7XHJcblxyXG4gICAgc3VwZXIoIGNvbWJpbmVPcHRpb25zPFJvdW5kUHVzaEJ1dHRvbk9wdGlvbnM+KCB7XHJcbiAgICAgIHRvdWNoQXJlYURpbGF0aW9uOiA1LCAvLyByYWRpdXMgZGlsYXRpb24gZm9yIHRvdWNoIGFyZWFcclxuICAgICAgY29udGVudDogbmV3IFBhdGgoIHRyYXNoQWx0UmVndWxhclNoYXBlLCB7XHJcbiAgICAgICAgZmlsbDogJ2JsYWNrJyxcclxuICAgICAgICBzY2FsZTogQ0NLQ0NvbnN0YW50cy5GT05UX0FXRVNPTUVfSUNPTl9TQ0FMRSAqIDAuOFxyXG4gICAgICB9ICksXHJcbiAgICAgIGxpc3RlbmVyOiAoKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGNpcmN1aXRFbGVtZW50ID0gY2lyY3VpdC5zZWxlY3Rpb25Qcm9wZXJ0eS52YWx1ZTtcclxuICAgICAgICBpZiAoIGNpcmN1aXRFbGVtZW50IGluc3RhbmNlb2YgQ2lyY3VpdEVsZW1lbnQgKSB7XHJcblxyXG4gICAgICAgICAgLy8gT25seSBwZXJtaXQgZGVsZXRpb24gd2hlbiBub3QgYmVpbmcgZHJhZ2dlZCwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9waGV0c2ltcy9jaXJjdWl0LWNvbnN0cnVjdGlvbi1raXQtY29tbW9uL2lzc3Vlcy80MTRcclxuICAgICAgICAgIGlmICggIWNpcmN1aXRFbGVtZW50LnN0YXJ0VmVydGV4UHJvcGVydHkudmFsdWUuaXNEcmFnZ2VkICYmICFjaXJjdWl0RWxlbWVudC5lbmRWZXJ0ZXhQcm9wZXJ0eS52YWx1ZS5pc0RyYWdnZWQgKSB7XHJcbiAgICAgICAgICAgIGNpcmN1aXQuZGlzcG9zZUNpcmN1aXRFbGVtZW50KCBjaXJjdWl0RWxlbWVudCApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgdGFuZGVtOiB0YW5kZW1cclxuICAgIH0sIHByb3ZpZGVkT3B0aW9ucyApICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb3ZlcnJpZGUgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIGZhbHNlLCAnc2hvdWxkIG5vdCBiZSBkaXNwb3NlZCcgKTtcclxuICB9XHJcbn1cclxuXHJcbmNpcmN1aXRDb25zdHJ1Y3Rpb25LaXRDb21tb24ucmVnaXN0ZXIoICdDQ0tDVHJhc2hCdXR0b24nLCBDQ0tDVHJhc2hCdXR0b24gKTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsSUFBSSxRQUFRLGdDQUFnQztBQUNyRCxPQUFPQyxvQkFBb0IsTUFBTSwwREFBMEQ7QUFDM0YsT0FBT0MsYUFBYSxNQUFNLHFCQUFxQjtBQUMvQyxPQUFPQyw0QkFBNEIsTUFBTSxvQ0FBb0M7QUFDN0UsT0FBT0MsbUJBQW1CLE1BQU0sMEJBQTBCO0FBSTFELE9BQU9DLGNBQWMsTUFBTSw0QkFBNEI7QUFDdkQsU0FBU0MsY0FBYyxRQUFRLG9DQUFvQztBQUVuRSxlQUFlLE1BQU1DLGVBQWUsU0FBU0gsbUJBQW1CLENBQUM7RUFFL0Q7QUFDRjtBQUNBO0FBQ0E7QUFDQTtFQUNTSSxXQUFXQSxDQUFFQyxPQUFnQixFQUFFQyxNQUFjLEVBQUVDLGVBQXdDLEVBQUc7SUFFL0YsS0FBSyxDQUFFTCxjQUFjLENBQTBCO01BQzdDTSxpQkFBaUIsRUFBRSxDQUFDO01BQUU7TUFDdEJDLE9BQU8sRUFBRSxJQUFJYixJQUFJLENBQUVDLG9CQUFvQixFQUFFO1FBQ3ZDYSxJQUFJLEVBQUUsT0FBTztRQUNiQyxLQUFLLEVBQUViLGFBQWEsQ0FBQ2MsdUJBQXVCLEdBQUc7TUFDakQsQ0FBRSxDQUFDO01BQ0hDLFFBQVEsRUFBRUEsQ0FBQSxLQUFNO1FBRWQsTUFBTUMsY0FBYyxHQUFHVCxPQUFPLENBQUNVLGlCQUFpQixDQUFDQyxLQUFLO1FBQ3RELElBQUtGLGNBQWMsWUFBWWIsY0FBYyxFQUFHO1VBRTlDO1VBQ0EsSUFBSyxDQUFDYSxjQUFjLENBQUNHLG1CQUFtQixDQUFDRCxLQUFLLENBQUNFLFNBQVMsSUFBSSxDQUFDSixjQUFjLENBQUNLLGlCQUFpQixDQUFDSCxLQUFLLENBQUNFLFNBQVMsRUFBRztZQUM5R2IsT0FBTyxDQUFDZSxxQkFBcUIsQ0FBRU4sY0FBZSxDQUFDO1VBQ2pEO1FBQ0Y7TUFDRixDQUFDO01BQ0RSLE1BQU0sRUFBRUE7SUFDVixDQUFDLEVBQUVDLGVBQWdCLENBQUUsQ0FBQztFQUN4QjtFQUVnQmMsT0FBT0EsQ0FBQSxFQUFTO0lBQzlCQyxNQUFNLElBQUlBLE1BQU0sQ0FBRSxLQUFLLEVBQUUsd0JBQXlCLENBQUM7RUFDckQ7QUFDRjtBQUVBdkIsNEJBQTRCLENBQUN3QixRQUFRLENBQUUsaUJBQWlCLEVBQUVwQixlQUFnQixDQUFDIn0=