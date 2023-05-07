// Copyright 2022, University of Colorado Boulder

/**
 * Button with two arrows side by side that both point up or down.
 * Press and release immediately and the button fires on 'up'.
 * Press and hold for M milliseconds and the button will fire repeatedly every N milliseconds until released.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 * @author Luisa Vargas
 */

import { Shape } from '../../../../kite/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { HBox, Path } from '../../../../scenery/js/imports.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import buildANucleus from '../../buildANucleus.js';
export default class DoubleArrowButton extends RectangularPushButton {
  constructor(direction, callback, providedOptions) {
    const options = optionize()({
      // options for the button
      cursor: 'pointer',
      baseColor: 'white',
      stroke: 'black',
      lineWidth: 1,
      cornerRadius: 4,
      xMargin: 7,
      yMargin: 5,
      touchAreaXDilation: 7,
      touchAreaYDilation: 7,
      heightSizable: false,
      // options related to fire-on-hold feature
      fireOnHold: true,
      fireOnHoldDelay: 400,
      // start to fire continuously after pressing for this long (milliseconds)
      fireOnHoldInterval: 100 // fire continuously at this interval (milliseconds)
    }, providedOptions);
    options.listener = callback;

    // arrow shape pointing up
    const arrowShape = new Shape();
    arrowShape.moveTo(0, 0).lineTo(options.arrowWidth / 2, options.arrowHeight).lineTo(-options.arrowWidth / 2, options.arrowHeight).close();

    // function to create a double arrow path
    const createDoubleArrow = (direction, leftArrowFill, rightArrowFill) => {
      const leftArrowPath = new Path(arrowShape, {
        fill: leftArrowFill
      });
      const rightArrowPath = new Path(arrowShape, {
        fill: rightArrowFill
      });
      const doubleArrow = new HBox({
        children: [leftArrowPath, rightArrowPath],
        spacing: 0
      });
      if (direction === 'down') {
        doubleArrow.setRotation(Math.PI);

        // switch the colors since the arrow was rotated 180 degrees
        leftArrowPath.fill = rightArrowFill;
        rightArrowPath.fill = leftArrowFill;
      }
      return doubleArrow;
    };
    options.content = createDoubleArrow(direction, options.leftArrowFill, options.rightArrowFill);
    super(options);
  }
}
buildANucleus.register('DoubleArrowButton', DoubleArrowButton);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTaGFwZSIsIm9wdGlvbml6ZSIsIkhCb3giLCJQYXRoIiwiUmVjdGFuZ3VsYXJQdXNoQnV0dG9uIiwiYnVpbGRBTnVjbGV1cyIsIkRvdWJsZUFycm93QnV0dG9uIiwiY29uc3RydWN0b3IiLCJkaXJlY3Rpb24iLCJjYWxsYmFjayIsInByb3ZpZGVkT3B0aW9ucyIsIm9wdGlvbnMiLCJjdXJzb3IiLCJiYXNlQ29sb3IiLCJzdHJva2UiLCJsaW5lV2lkdGgiLCJjb3JuZXJSYWRpdXMiLCJ4TWFyZ2luIiwieU1hcmdpbiIsInRvdWNoQXJlYVhEaWxhdGlvbiIsInRvdWNoQXJlYVlEaWxhdGlvbiIsImhlaWdodFNpemFibGUiLCJmaXJlT25Ib2xkIiwiZmlyZU9uSG9sZERlbGF5IiwiZmlyZU9uSG9sZEludGVydmFsIiwibGlzdGVuZXIiLCJhcnJvd1NoYXBlIiwibW92ZVRvIiwibGluZVRvIiwiYXJyb3dXaWR0aCIsImFycm93SGVpZ2h0IiwiY2xvc2UiLCJjcmVhdGVEb3VibGVBcnJvdyIsImxlZnRBcnJvd0ZpbGwiLCJyaWdodEFycm93RmlsbCIsImxlZnRBcnJvd1BhdGgiLCJmaWxsIiwicmlnaHRBcnJvd1BhdGgiLCJkb3VibGVBcnJvdyIsImNoaWxkcmVuIiwic3BhY2luZyIsInNldFJvdGF0aW9uIiwiTWF0aCIsIlBJIiwiY29udGVudCIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiRG91YmxlQXJyb3dCdXR0b24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIEJ1dHRvbiB3aXRoIHR3byBhcnJvd3Mgc2lkZSBieSBzaWRlIHRoYXQgYm90aCBwb2ludCB1cCBvciBkb3duLlxyXG4gKiBQcmVzcyBhbmQgcmVsZWFzZSBpbW1lZGlhdGVseSBhbmQgdGhlIGJ1dHRvbiBmaXJlcyBvbiAndXAnLlxyXG4gKiBQcmVzcyBhbmQgaG9sZCBmb3IgTSBtaWxsaXNlY29uZHMgYW5kIHRoZSBidXR0b24gd2lsbCBmaXJlIHJlcGVhdGVkbHkgZXZlcnkgTiBtaWxsaXNlY29uZHMgdW50aWwgcmVsZWFzZWQuXHJcbiAqXHJcbiAqIEBhdXRob3IgQ2hyaXMgS2x1c2VuZG9yZiAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICogQGF1dGhvciBMdWlzYSBWYXJnYXNcclxuICovXHJcblxyXG5pbXBvcnQgeyBTaGFwZSB9IGZyb20gJy4uLy4uLy4uLy4uL2tpdGUvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBTdHJpY3RPbWl0IGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy90eXBlcy9TdHJpY3RPbWl0LmpzJztcclxuaW1wb3J0IG9wdGlvbml6ZSBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvb3B0aW9uaXplLmpzJztcclxuaW1wb3J0IHsgSEJveCwgVFBhaW50LCBQYXRoIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IFJlY3Rhbmd1bGFyUHVzaEJ1dHRvbiwgeyBSZWN0YW5ndWxhclB1c2hCdXR0b25PcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vc3VuL2pzL2J1dHRvbnMvUmVjdGFuZ3VsYXJQdXNoQnV0dG9uLmpzJztcclxuaW1wb3J0IGJ1aWxkQU51Y2xldXMgZnJvbSAnLi4vLi4vYnVpbGRBTnVjbGV1cy5qcyc7XHJcblxyXG5leHBvcnQgdHlwZSBEb3VibGVBcnJvd0J1dHRvbkRpcmVjdGlvbiA9ICd1cCcgfCAnZG93bic7XHJcblxyXG50eXBlIFNlbGZPcHRpb25zID0ge1xyXG5cclxuICAvLyBmcm9tIHRpcCB0byBiYXNlXHJcbiAgYXJyb3dIZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgLy8gd2lkdGggb2YgYmFzZVxyXG4gIGFycm93V2lkdGg6IG51bWJlcjtcclxuXHJcbiAgbGVmdEFycm93RmlsbDogVFBhaW50O1xyXG4gIHJpZ2h0QXJyb3dGaWxsOiBUUGFpbnQ7XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBEb3VibGVBcnJvd0J1dHRvbk9wdGlvbnMgPSBTZWxmT3B0aW9ucyAmIFN0cmljdE9taXQ8UmVjdGFuZ3VsYXJQdXNoQnV0dG9uT3B0aW9ucywgJ2xpc3RlbmVyJyB8ICdjb250ZW50Jz47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb3VibGVBcnJvd0J1dHRvbiBleHRlbmRzIFJlY3Rhbmd1bGFyUHVzaEJ1dHRvbiB7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggZGlyZWN0aW9uOiBEb3VibGVBcnJvd0J1dHRvbkRpcmVjdGlvbiwgY2FsbGJhY2s6ICgpID0+IHZvaWQsIHByb3ZpZGVkT3B0aW9ucz86IERvdWJsZUFycm93QnV0dG9uT3B0aW9ucyApIHtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0gb3B0aW9uaXplPERvdWJsZUFycm93QnV0dG9uT3B0aW9ucywgU2VsZk9wdGlvbnMsIFJlY3Rhbmd1bGFyUHVzaEJ1dHRvbk9wdGlvbnM+KCkoIHtcclxuXHJcbiAgICAgIC8vIG9wdGlvbnMgZm9yIHRoZSBidXR0b25cclxuICAgICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgIGJhc2VDb2xvcjogJ3doaXRlJyxcclxuICAgICAgc3Ryb2tlOiAnYmxhY2snLFxyXG4gICAgICBsaW5lV2lkdGg6IDEsXHJcbiAgICAgIGNvcm5lclJhZGl1czogNCxcclxuICAgICAgeE1hcmdpbjogNyxcclxuICAgICAgeU1hcmdpbjogNSxcclxuICAgICAgdG91Y2hBcmVhWERpbGF0aW9uOiA3LFxyXG4gICAgICB0b3VjaEFyZWFZRGlsYXRpb246IDcsXHJcbiAgICAgIGhlaWdodFNpemFibGU6IGZhbHNlLFxyXG5cclxuICAgICAgLy8gb3B0aW9ucyByZWxhdGVkIHRvIGZpcmUtb24taG9sZCBmZWF0dXJlXHJcbiAgICAgIGZpcmVPbkhvbGQ6IHRydWUsXHJcbiAgICAgIGZpcmVPbkhvbGREZWxheTogNDAwLCAvLyBzdGFydCB0byBmaXJlIGNvbnRpbnVvdXNseSBhZnRlciBwcmVzc2luZyBmb3IgdGhpcyBsb25nIChtaWxsaXNlY29uZHMpXHJcbiAgICAgIGZpcmVPbkhvbGRJbnRlcnZhbDogMTAwIC8vIGZpcmUgY29udGludW91c2x5IGF0IHRoaXMgaW50ZXJ2YWwgKG1pbGxpc2Vjb25kcylcclxuXHJcbiAgICB9LCBwcm92aWRlZE9wdGlvbnMgKTtcclxuXHJcbiAgICBvcHRpb25zLmxpc3RlbmVyID0gY2FsbGJhY2s7XHJcblxyXG4gICAgLy8gYXJyb3cgc2hhcGUgcG9pbnRpbmcgdXBcclxuICAgIGNvbnN0IGFycm93U2hhcGUgPSBuZXcgU2hhcGUoKTtcclxuICAgIGFycm93U2hhcGUubW92ZVRvKCAwLCAwICkubGluZVRvKCBvcHRpb25zLmFycm93V2lkdGggLyAyLCBvcHRpb25zLmFycm93SGVpZ2h0ICkubGluZVRvKCAtb3B0aW9ucy5hcnJvd1dpZHRoIC8gMiwgb3B0aW9ucy5hcnJvd0hlaWdodCApLmNsb3NlKCk7XHJcblxyXG4gICAgLy8gZnVuY3Rpb24gdG8gY3JlYXRlIGEgZG91YmxlIGFycm93IHBhdGhcclxuICAgIGNvbnN0IGNyZWF0ZURvdWJsZUFycm93ID0gKCBkaXJlY3Rpb246IERvdWJsZUFycm93QnV0dG9uRGlyZWN0aW9uLCBsZWZ0QXJyb3dGaWxsOiBUUGFpbnQsIHJpZ2h0QXJyb3dGaWxsOiBUUGFpbnQgKSA9PiB7XHJcbiAgICAgIGNvbnN0IGxlZnRBcnJvd1BhdGggPSBuZXcgUGF0aCggYXJyb3dTaGFwZSwgeyBmaWxsOiBsZWZ0QXJyb3dGaWxsIH0gKTtcclxuICAgICAgY29uc3QgcmlnaHRBcnJvd1BhdGggPSBuZXcgUGF0aCggYXJyb3dTaGFwZSwgeyBmaWxsOiByaWdodEFycm93RmlsbCB9ICk7XHJcbiAgICAgIGNvbnN0IGRvdWJsZUFycm93ID0gbmV3IEhCb3goIHtcclxuICAgICAgICBjaGlsZHJlbjogWyBsZWZ0QXJyb3dQYXRoLCByaWdodEFycm93UGF0aCBdLFxyXG4gICAgICAgIHNwYWNpbmc6IDBcclxuICAgICAgfSApO1xyXG5cclxuICAgICAgaWYgKCBkaXJlY3Rpb24gPT09ICdkb3duJyApIHtcclxuICAgICAgICBkb3VibGVBcnJvdy5zZXRSb3RhdGlvbiggTWF0aC5QSSApO1xyXG5cclxuICAgICAgICAvLyBzd2l0Y2ggdGhlIGNvbG9ycyBzaW5jZSB0aGUgYXJyb3cgd2FzIHJvdGF0ZWQgMTgwIGRlZ3JlZXNcclxuICAgICAgICBsZWZ0QXJyb3dQYXRoLmZpbGwgPSByaWdodEFycm93RmlsbDtcclxuICAgICAgICByaWdodEFycm93UGF0aC5maWxsID0gbGVmdEFycm93RmlsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGRvdWJsZUFycm93O1xyXG4gICAgfTtcclxuXHJcbiAgICBvcHRpb25zLmNvbnRlbnQgPSBjcmVhdGVEb3VibGVBcnJvdyggZGlyZWN0aW9uLCBvcHRpb25zLmxlZnRBcnJvd0ZpbGwsIG9wdGlvbnMucmlnaHRBcnJvd0ZpbGwgKTtcclxuXHJcbiAgICBzdXBlciggb3B0aW9ucyApO1xyXG4gIH1cclxufVxyXG5cclxuYnVpbGRBTnVjbGV1cy5yZWdpc3RlciggJ0RvdWJsZUFycm93QnV0dG9uJywgRG91YmxlQXJyb3dCdXR0b24gKTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsS0FBSyxRQUFRLGdDQUFnQztBQUV0RCxPQUFPQyxTQUFTLE1BQU0sdUNBQXVDO0FBQzdELFNBQVNDLElBQUksRUFBVUMsSUFBSSxRQUFRLG1DQUFtQztBQUN0RSxPQUFPQyxxQkFBcUIsTUFBd0MscURBQXFEO0FBQ3pILE9BQU9DLGFBQWEsTUFBTSx3QkFBd0I7QUFrQmxELGVBQWUsTUFBTUMsaUJBQWlCLFNBQVNGLHFCQUFxQixDQUFDO0VBRTVERyxXQUFXQSxDQUFFQyxTQUFxQyxFQUFFQyxRQUFvQixFQUFFQyxlQUEwQyxFQUFHO0lBRTVILE1BQU1DLE9BQU8sR0FBR1YsU0FBUyxDQUFzRSxDQUFDLENBQUU7TUFFaEc7TUFDQVcsTUFBTSxFQUFFLFNBQVM7TUFDakJDLFNBQVMsRUFBRSxPQUFPO01BQ2xCQyxNQUFNLEVBQUUsT0FBTztNQUNmQyxTQUFTLEVBQUUsQ0FBQztNQUNaQyxZQUFZLEVBQUUsQ0FBQztNQUNmQyxPQUFPLEVBQUUsQ0FBQztNQUNWQyxPQUFPLEVBQUUsQ0FBQztNQUNWQyxrQkFBa0IsRUFBRSxDQUFDO01BQ3JCQyxrQkFBa0IsRUFBRSxDQUFDO01BQ3JCQyxhQUFhLEVBQUUsS0FBSztNQUVwQjtNQUNBQyxVQUFVLEVBQUUsSUFBSTtNQUNoQkMsZUFBZSxFQUFFLEdBQUc7TUFBRTtNQUN0QkMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDO0lBRTFCLENBQUMsRUFBRWQsZUFBZ0IsQ0FBQztJQUVwQkMsT0FBTyxDQUFDYyxRQUFRLEdBQUdoQixRQUFROztJQUUzQjtJQUNBLE1BQU1pQixVQUFVLEdBQUcsSUFBSTFCLEtBQUssQ0FBQyxDQUFDO0lBQzlCMEIsVUFBVSxDQUFDQyxNQUFNLENBQUUsQ0FBQyxFQUFFLENBQUUsQ0FBQyxDQUFDQyxNQUFNLENBQUVqQixPQUFPLENBQUNrQixVQUFVLEdBQUcsQ0FBQyxFQUFFbEIsT0FBTyxDQUFDbUIsV0FBWSxDQUFDLENBQUNGLE1BQU0sQ0FBRSxDQUFDakIsT0FBTyxDQUFDa0IsVUFBVSxHQUFHLENBQUMsRUFBRWxCLE9BQU8sQ0FBQ21CLFdBQVksQ0FBQyxDQUFDQyxLQUFLLENBQUMsQ0FBQzs7SUFFOUk7SUFDQSxNQUFNQyxpQkFBaUIsR0FBR0EsQ0FBRXhCLFNBQXFDLEVBQUV5QixhQUFxQixFQUFFQyxjQUFzQixLQUFNO01BQ3BILE1BQU1DLGFBQWEsR0FBRyxJQUFJaEMsSUFBSSxDQUFFdUIsVUFBVSxFQUFFO1FBQUVVLElBQUksRUFBRUg7TUFBYyxDQUFFLENBQUM7TUFDckUsTUFBTUksY0FBYyxHQUFHLElBQUlsQyxJQUFJLENBQUV1QixVQUFVLEVBQUU7UUFBRVUsSUFBSSxFQUFFRjtNQUFlLENBQUUsQ0FBQztNQUN2RSxNQUFNSSxXQUFXLEdBQUcsSUFBSXBDLElBQUksQ0FBRTtRQUM1QnFDLFFBQVEsRUFBRSxDQUFFSixhQUFhLEVBQUVFLGNBQWMsQ0FBRTtRQUMzQ0csT0FBTyxFQUFFO01BQ1gsQ0FBRSxDQUFDO01BRUgsSUFBS2hDLFNBQVMsS0FBSyxNQUFNLEVBQUc7UUFDMUI4QixXQUFXLENBQUNHLFdBQVcsQ0FBRUMsSUFBSSxDQUFDQyxFQUFHLENBQUM7O1FBRWxDO1FBQ0FSLGFBQWEsQ0FBQ0MsSUFBSSxHQUFHRixjQUFjO1FBQ25DRyxjQUFjLENBQUNELElBQUksR0FBR0gsYUFBYTtNQUNyQztNQUVBLE9BQU9LLFdBQVc7SUFDcEIsQ0FBQztJQUVEM0IsT0FBTyxDQUFDaUMsT0FBTyxHQUFHWixpQkFBaUIsQ0FBRXhCLFNBQVMsRUFBRUcsT0FBTyxDQUFDc0IsYUFBYSxFQUFFdEIsT0FBTyxDQUFDdUIsY0FBZSxDQUFDO0lBRS9GLEtBQUssQ0FBRXZCLE9BQVEsQ0FBQztFQUNsQjtBQUNGO0FBRUFOLGFBQWEsQ0FBQ3dDLFFBQVEsQ0FBRSxtQkFBbUIsRUFBRXZDLGlCQUFrQixDQUFDIn0=