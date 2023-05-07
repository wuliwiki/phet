// Copyright 2022-2023, University of Colorado Boulder

/**
 * Demo for ConductivityTesterNode
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Range from '../../../../dot/js/Range.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import { DragListener, Node, Text } from '../../../../scenery/js/imports.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import HSlider from '../../../../sun/js/HSlider.js';
import ConductivityTesterNode from '../../ConductivityTesterNode.js';
import PhetFont from '../../PhetFont.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
export default function demoConductivityTesterNode(layoutBounds) {
  const brightnessProperty = new NumberProperty(0, {
    range: new Range(0, 1)
  });
  const testerPositionProperty = new Vector2Property(new Vector2(0, 0));
  const positiveProbePositionProperty = new Vector2Property(new Vector2(testerPositionProperty.get().x + 140, testerPositionProperty.get().y + 100));
  const negativeProbePositionProperty = new Vector2Property(new Vector2(testerPositionProperty.get().x - 40, testerPositionProperty.get().y + 100));
  const conductivityTesterNode = new ConductivityTesterNode(brightnessProperty, testerPositionProperty, positiveProbePositionProperty, negativeProbePositionProperty, {
    positiveProbeFill: 'orange',
    cursor: 'pointer',
    tandem: Tandem.OPT_OUT
  });
  conductivityTesterNode.addInputListener(new DragListener({
    positionProperty: testerPositionProperty
  }));

  // brightness slider
  const brightnessSlider = new HSlider(brightnessProperty, new Range(0, 1), {
    trackSize: new Dimension2(200, 5),
    thumbSize: new Dimension2(25, 45),
    thumbFill: 'orange',
    thumbFillHighlighted: 'rgb( 255, 210, 0 )',
    thumbCenterLineStroke: 'black',
    centerX: conductivityTesterNode.centerX,
    bottom: conductivityTesterNode.bottom + 100
  });
  const shortCircuitProperty = new Property(false);
  shortCircuitProperty.link(shortCircuit => {
    conductivityTesterNode.shortCircuit = shortCircuit;
  });
  const shortCircuitCheckbox = new Checkbox(shortCircuitProperty, new Text('short circuit', {
    font: new PhetFont(20)
  }), {
    centerX: brightnessSlider.centerX,
    bottom: brightnessSlider.bottom + 50
  });
  return new Node({
    children: [conductivityTesterNode, brightnessSlider, shortCircuitCheckbox],
    center: layoutBounds.center
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQcm9wZXJ0eSIsIlJhbmdlIiwiRGltZW5zaW9uMiIsIlZlY3RvcjIiLCJWZWN0b3IyUHJvcGVydHkiLCJEcmFnTGlzdGVuZXIiLCJOb2RlIiwiVGV4dCIsIkNoZWNrYm94IiwiSFNsaWRlciIsIkNvbmR1Y3Rpdml0eVRlc3Rlck5vZGUiLCJQaGV0Rm9udCIsIk51bWJlclByb3BlcnR5IiwiVGFuZGVtIiwiZGVtb0NvbmR1Y3Rpdml0eVRlc3Rlck5vZGUiLCJsYXlvdXRCb3VuZHMiLCJicmlnaHRuZXNzUHJvcGVydHkiLCJyYW5nZSIsInRlc3RlclBvc2l0aW9uUHJvcGVydHkiLCJwb3NpdGl2ZVByb2JlUG9zaXRpb25Qcm9wZXJ0eSIsImdldCIsIngiLCJ5IiwibmVnYXRpdmVQcm9iZVBvc2l0aW9uUHJvcGVydHkiLCJjb25kdWN0aXZpdHlUZXN0ZXJOb2RlIiwicG9zaXRpdmVQcm9iZUZpbGwiLCJjdXJzb3IiLCJ0YW5kZW0iLCJPUFRfT1VUIiwiYWRkSW5wdXRMaXN0ZW5lciIsInBvc2l0aW9uUHJvcGVydHkiLCJicmlnaHRuZXNzU2xpZGVyIiwidHJhY2tTaXplIiwidGh1bWJTaXplIiwidGh1bWJGaWxsIiwidGh1bWJGaWxsSGlnaGxpZ2h0ZWQiLCJ0aHVtYkNlbnRlckxpbmVTdHJva2UiLCJjZW50ZXJYIiwiYm90dG9tIiwic2hvcnRDaXJjdWl0UHJvcGVydHkiLCJsaW5rIiwic2hvcnRDaXJjdWl0Iiwic2hvcnRDaXJjdWl0Q2hlY2tib3giLCJmb250IiwiY2hpbGRyZW4iLCJjZW50ZXIiXSwic291cmNlcyI6WyJkZW1vQ29uZHVjdGl2aXR5VGVzdGVyTm9kZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMi0yMDIzLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBEZW1vIGZvciBDb25kdWN0aXZpdHlUZXN0ZXJOb2RlXHJcbiAqXHJcbiAqIEBhdXRob3IgQ2hyaXMgTWFsbGV5IChQaXhlbFpvb20sIEluYy4pXHJcbiAqL1xyXG5cclxuaW1wb3J0IFByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgQm91bmRzMiBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvQm91bmRzMi5qcyc7XHJcbmltcG9ydCBSYW5nZSBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvUmFuZ2UuanMnO1xyXG5pbXBvcnQgRGltZW5zaW9uMiBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvRGltZW5zaW9uMi5qcyc7XHJcbmltcG9ydCBWZWN0b3IyIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9WZWN0b3IyLmpzJztcclxuaW1wb3J0IFZlY3RvcjJQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvVmVjdG9yMlByb3BlcnR5LmpzJztcclxuaW1wb3J0IHsgRHJhZ0xpc3RlbmVyLCBOb2RlLCBUZXh0IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IENoZWNrYm94IGZyb20gJy4uLy4uLy4uLy4uL3N1bi9qcy9DaGVja2JveC5qcyc7XHJcbmltcG9ydCBIU2xpZGVyIGZyb20gJy4uLy4uLy4uLy4uL3N1bi9qcy9IU2xpZGVyLmpzJztcclxuaW1wb3J0IENvbmR1Y3Rpdml0eVRlc3Rlck5vZGUgZnJvbSAnLi4vLi4vQ29uZHVjdGl2aXR5VGVzdGVyTm9kZS5qcyc7XHJcbmltcG9ydCBQaGV0Rm9udCBmcm9tICcuLi8uLi9QaGV0Rm9udC5qcyc7XHJcbmltcG9ydCBOdW1iZXJQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL051bWJlclByb3BlcnR5LmpzJztcclxuaW1wb3J0IFRhbmRlbSBmcm9tICcuLi8uLi8uLi8uLi90YW5kZW0vanMvVGFuZGVtLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlbW9Db25kdWN0aXZpdHlUZXN0ZXJOb2RlKCBsYXlvdXRCb3VuZHM6IEJvdW5kczIgKTogTm9kZSB7XHJcblxyXG4gIGNvbnN0IGJyaWdodG5lc3NQcm9wZXJ0eSA9IG5ldyBOdW1iZXJQcm9wZXJ0eSggMCwgeyByYW5nZTogbmV3IFJhbmdlKCAwLCAxICkgfSApO1xyXG4gIGNvbnN0IHRlc3RlclBvc2l0aW9uUHJvcGVydHkgPSBuZXcgVmVjdG9yMlByb3BlcnR5KCBuZXcgVmVjdG9yMiggMCwgMCApICk7XHJcbiAgY29uc3QgcG9zaXRpdmVQcm9iZVBvc2l0aW9uUHJvcGVydHkgPSBuZXcgVmVjdG9yMlByb3BlcnR5KCBuZXcgVmVjdG9yMiggdGVzdGVyUG9zaXRpb25Qcm9wZXJ0eS5nZXQoKS54ICsgMTQwLCB0ZXN0ZXJQb3NpdGlvblByb3BlcnR5LmdldCgpLnkgKyAxMDAgKSApO1xyXG4gIGNvbnN0IG5lZ2F0aXZlUHJvYmVQb3NpdGlvblByb3BlcnR5ID0gbmV3IFZlY3RvcjJQcm9wZXJ0eSggbmV3IFZlY3RvcjIoIHRlc3RlclBvc2l0aW9uUHJvcGVydHkuZ2V0KCkueCAtIDQwLCB0ZXN0ZXJQb3NpdGlvblByb3BlcnR5LmdldCgpLnkgKyAxMDAgKSApO1xyXG5cclxuICBjb25zdCBjb25kdWN0aXZpdHlUZXN0ZXJOb2RlID0gbmV3IENvbmR1Y3Rpdml0eVRlc3Rlck5vZGUoIGJyaWdodG5lc3NQcm9wZXJ0eSxcclxuICAgIHRlc3RlclBvc2l0aW9uUHJvcGVydHksIHBvc2l0aXZlUHJvYmVQb3NpdGlvblByb3BlcnR5LCBuZWdhdGl2ZVByb2JlUG9zaXRpb25Qcm9wZXJ0eSwge1xyXG4gICAgICBwb3NpdGl2ZVByb2JlRmlsbDogJ29yYW5nZScsXHJcbiAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICB0YW5kZW06IFRhbmRlbS5PUFRfT1VUXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgY29uZHVjdGl2aXR5VGVzdGVyTm9kZS5hZGRJbnB1dExpc3RlbmVyKCBuZXcgRHJhZ0xpc3RlbmVyKCB7XHJcbiAgICBwb3NpdGlvblByb3BlcnR5OiB0ZXN0ZXJQb3NpdGlvblByb3BlcnR5XHJcbiAgfSApICk7XHJcblxyXG4gIC8vIGJyaWdodG5lc3Mgc2xpZGVyXHJcbiAgY29uc3QgYnJpZ2h0bmVzc1NsaWRlciA9IG5ldyBIU2xpZGVyKCBicmlnaHRuZXNzUHJvcGVydHksIG5ldyBSYW5nZSggMCwgMSApLCB7XHJcbiAgICB0cmFja1NpemU6IG5ldyBEaW1lbnNpb24yKCAyMDAsIDUgKSxcclxuICAgIHRodW1iU2l6ZTogbmV3IERpbWVuc2lvbjIoIDI1LCA0NSApLFxyXG4gICAgdGh1bWJGaWxsOiAnb3JhbmdlJyxcclxuICAgIHRodW1iRmlsbEhpZ2hsaWdodGVkOiAncmdiKCAyNTUsIDIxMCwgMCApJyxcclxuICAgIHRodW1iQ2VudGVyTGluZVN0cm9rZTogJ2JsYWNrJyxcclxuICAgIGNlbnRlclg6IGNvbmR1Y3Rpdml0eVRlc3Rlck5vZGUuY2VudGVyWCxcclxuICAgIGJvdHRvbTogY29uZHVjdGl2aXR5VGVzdGVyTm9kZS5ib3R0b20gKyAxMDBcclxuICB9ICk7XHJcblxyXG4gIGNvbnN0IHNob3J0Q2lyY3VpdFByb3BlcnR5ID0gbmV3IFByb3BlcnR5KCBmYWxzZSApO1xyXG4gIHNob3J0Q2lyY3VpdFByb3BlcnR5LmxpbmsoIHNob3J0Q2lyY3VpdCA9PiB7XHJcbiAgICBjb25kdWN0aXZpdHlUZXN0ZXJOb2RlLnNob3J0Q2lyY3VpdCA9IHNob3J0Q2lyY3VpdDtcclxuICB9ICk7XHJcblxyXG4gIGNvbnN0IHNob3J0Q2lyY3VpdENoZWNrYm94ID0gbmV3IENoZWNrYm94KCBzaG9ydENpcmN1aXRQcm9wZXJ0eSwgbmV3IFRleHQoICdzaG9ydCBjaXJjdWl0JywgeyBmb250OiBuZXcgUGhldEZvbnQoIDIwICkgfSApLCB7XHJcbiAgICBjZW50ZXJYOiBicmlnaHRuZXNzU2xpZGVyLmNlbnRlclgsXHJcbiAgICBib3R0b206IGJyaWdodG5lc3NTbGlkZXIuYm90dG9tICsgNTBcclxuICB9ICk7XHJcblxyXG4gIHJldHVybiBuZXcgTm9kZSgge1xyXG4gICAgY2hpbGRyZW46IFsgY29uZHVjdGl2aXR5VGVzdGVyTm9kZSwgYnJpZ2h0bmVzc1NsaWRlciwgc2hvcnRDaXJjdWl0Q2hlY2tib3ggXSxcclxuICAgIGNlbnRlcjogbGF5b3V0Qm91bmRzLmNlbnRlclxyXG4gIH0gKTtcclxufSJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxRQUFRLE1BQU0saUNBQWlDO0FBRXRELE9BQU9DLEtBQUssTUFBTSw2QkFBNkI7QUFDL0MsT0FBT0MsVUFBVSxNQUFNLGtDQUFrQztBQUN6RCxPQUFPQyxPQUFPLE1BQU0sK0JBQStCO0FBQ25ELE9BQU9DLGVBQWUsTUFBTSx1Q0FBdUM7QUFDbkUsU0FBU0MsWUFBWSxFQUFFQyxJQUFJLEVBQUVDLElBQUksUUFBUSxtQ0FBbUM7QUFDNUUsT0FBT0MsUUFBUSxNQUFNLGdDQUFnQztBQUNyRCxPQUFPQyxPQUFPLE1BQU0sK0JBQStCO0FBQ25ELE9BQU9DLHNCQUFzQixNQUFNLGlDQUFpQztBQUNwRSxPQUFPQyxRQUFRLE1BQU0sbUJBQW1CO0FBQ3hDLE9BQU9DLGNBQWMsTUFBTSx1Q0FBdUM7QUFDbEUsT0FBT0MsTUFBTSxNQUFNLGlDQUFpQztBQUVwRCxlQUFlLFNBQVNDLDBCQUEwQkEsQ0FBRUMsWUFBcUIsRUFBUztFQUVoRixNQUFNQyxrQkFBa0IsR0FBRyxJQUFJSixjQUFjLENBQUUsQ0FBQyxFQUFFO0lBQUVLLEtBQUssRUFBRSxJQUFJaEIsS0FBSyxDQUFFLENBQUMsRUFBRSxDQUFFO0VBQUUsQ0FBRSxDQUFDO0VBQ2hGLE1BQU1pQixzQkFBc0IsR0FBRyxJQUFJZCxlQUFlLENBQUUsSUFBSUQsT0FBTyxDQUFFLENBQUMsRUFBRSxDQUFFLENBQUUsQ0FBQztFQUN6RSxNQUFNZ0IsNkJBQTZCLEdBQUcsSUFBSWYsZUFBZSxDQUFFLElBQUlELE9BQU8sQ0FBRWUsc0JBQXNCLENBQUNFLEdBQUcsQ0FBQyxDQUFDLENBQUNDLENBQUMsR0FBRyxHQUFHLEVBQUVILHNCQUFzQixDQUFDRSxHQUFHLENBQUMsQ0FBQyxDQUFDRSxDQUFDLEdBQUcsR0FBSSxDQUFFLENBQUM7RUFDdEosTUFBTUMsNkJBQTZCLEdBQUcsSUFBSW5CLGVBQWUsQ0FBRSxJQUFJRCxPQUFPLENBQUVlLHNCQUFzQixDQUFDRSxHQUFHLENBQUMsQ0FBQyxDQUFDQyxDQUFDLEdBQUcsRUFBRSxFQUFFSCxzQkFBc0IsQ0FBQ0UsR0FBRyxDQUFDLENBQUMsQ0FBQ0UsQ0FBQyxHQUFHLEdBQUksQ0FBRSxDQUFDO0VBRXJKLE1BQU1FLHNCQUFzQixHQUFHLElBQUlkLHNCQUFzQixDQUFFTSxrQkFBa0IsRUFDM0VFLHNCQUFzQixFQUFFQyw2QkFBNkIsRUFBRUksNkJBQTZCLEVBQUU7SUFDcEZFLGlCQUFpQixFQUFFLFFBQVE7SUFDM0JDLE1BQU0sRUFBRSxTQUFTO0lBQ2pCQyxNQUFNLEVBQUVkLE1BQU0sQ0FBQ2U7RUFDakIsQ0FDRixDQUFDO0VBRURKLHNCQUFzQixDQUFDSyxnQkFBZ0IsQ0FBRSxJQUFJeEIsWUFBWSxDQUFFO0lBQ3pEeUIsZ0JBQWdCLEVBQUVaO0VBQ3BCLENBQUUsQ0FBRSxDQUFDOztFQUVMO0VBQ0EsTUFBTWEsZ0JBQWdCLEdBQUcsSUFBSXRCLE9BQU8sQ0FBRU8sa0JBQWtCLEVBQUUsSUFBSWYsS0FBSyxDQUFFLENBQUMsRUFBRSxDQUFFLENBQUMsRUFBRTtJQUMzRStCLFNBQVMsRUFBRSxJQUFJOUIsVUFBVSxDQUFFLEdBQUcsRUFBRSxDQUFFLENBQUM7SUFDbkMrQixTQUFTLEVBQUUsSUFBSS9CLFVBQVUsQ0FBRSxFQUFFLEVBQUUsRUFBRyxDQUFDO0lBQ25DZ0MsU0FBUyxFQUFFLFFBQVE7SUFDbkJDLG9CQUFvQixFQUFFLG9CQUFvQjtJQUMxQ0MscUJBQXFCLEVBQUUsT0FBTztJQUM5QkMsT0FBTyxFQUFFYixzQkFBc0IsQ0FBQ2EsT0FBTztJQUN2Q0MsTUFBTSxFQUFFZCxzQkFBc0IsQ0FBQ2MsTUFBTSxHQUFHO0VBQzFDLENBQUUsQ0FBQztFQUVILE1BQU1DLG9CQUFvQixHQUFHLElBQUl2QyxRQUFRLENBQUUsS0FBTSxDQUFDO0VBQ2xEdUMsb0JBQW9CLENBQUNDLElBQUksQ0FBRUMsWUFBWSxJQUFJO0lBQ3pDakIsc0JBQXNCLENBQUNpQixZQUFZLEdBQUdBLFlBQVk7RUFDcEQsQ0FBRSxDQUFDO0VBRUgsTUFBTUMsb0JBQW9CLEdBQUcsSUFBSWxDLFFBQVEsQ0FBRStCLG9CQUFvQixFQUFFLElBQUloQyxJQUFJLENBQUUsZUFBZSxFQUFFO0lBQUVvQyxJQUFJLEVBQUUsSUFBSWhDLFFBQVEsQ0FBRSxFQUFHO0VBQUUsQ0FBRSxDQUFDLEVBQUU7SUFDMUgwQixPQUFPLEVBQUVOLGdCQUFnQixDQUFDTSxPQUFPO0lBQ2pDQyxNQUFNLEVBQUVQLGdCQUFnQixDQUFDTyxNQUFNLEdBQUc7RUFDcEMsQ0FBRSxDQUFDO0VBRUgsT0FBTyxJQUFJaEMsSUFBSSxDQUFFO0lBQ2ZzQyxRQUFRLEVBQUUsQ0FBRXBCLHNCQUFzQixFQUFFTyxnQkFBZ0IsRUFBRVcsb0JBQW9CLENBQUU7SUFDNUVHLE1BQU0sRUFBRTlCLFlBQVksQ0FBQzhCO0VBQ3ZCLENBQUUsQ0FBQztBQUNMIn0=