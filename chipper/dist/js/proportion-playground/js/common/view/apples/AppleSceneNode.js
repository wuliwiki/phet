// Copyright 2016-2022, University of Colorado Boulder

/**
 * Node that displays everything for the Apple scene.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { HBox, Image, Node, Text } from '../../../../../scenery/js/imports.js';
import Checkbox from '../../../../../sun/js/Checkbox.js';
import appleRed_png from '../../../../mipmaps/appleRed_png.js';
import proportionPlayground from '../../../proportionPlayground.js';
import ProportionPlaygroundStrings from '../../../ProportionPlaygroundStrings.js';
import ProportionPlaygroundConstants from '../../ProportionPlaygroundConstants.js';
import SceneNode from '../SceneNode.js';
import AppleGraphNode from './AppleGraphNode.js';
import AppleGroupControl from './AppleGroupControl.js';
const costPerAppleString = ProportionPlaygroundStrings.costPerApple;
class AppleSceneNode extends SceneNode {
  /**
   * @param {AppleScene} scene - the model
   * @param {Bounds2} layoutBounds - the box within which to lay out all components
   * @param {Tandem} tandem
   */
  constructor(scene, layoutBounds, tandem) {
    // Create child nodes to be displayed
    const leftAppleGroupControl = new AppleGroupControl(scene.leftAppleGroup, scene.showCostPerAppleProperty, tandem.createTandem('leftAppleGroupControl'));
    const rightAppleGroupControl = new AppleGroupControl(scene.rightAppleGroup, scene.showCostPerAppleProperty, tandem.createTandem('rightAppleGroupControl'));
    const appleGraphNode = new AppleGraphNode(scene, {
      y: 150,
      tandem: tandem.createTandem('appleGraphNode')
    });

    // Create icons for the ABSwitch
    const appleImageNode = new Image(appleRed_png, {
      scale: 0.2
    });

    // Checkbox that shows the cost per apple in a price tag
    const showCostPerAppleCheckbox = new Checkbox(scene.showCostPerAppleProperty, new Text(costPerAppleString, {
      maxWidth: 293,
      // ceiling value from ?stringTest=double for English
      font: ProportionPlaygroundConstants.CONTROL_FONT
    }), {
      tandem: tandem.createTandem('showCostPerAppleCheckbox')
    });

    // Super call and add children
    super(scene, layoutBounds, {
      sceneIcon: new Image(appleRed_png, {
        scale: 0.25
      }),
      leftControl: leftAppleGroupControl,
      rightControl: rightAppleGroupControl,
      leftSwitchIcon: new Node({
        children: [appleImageNode]
      }),
      rightSwitchIcon: new HBox({
        children: [new Node({
          children: [appleImageNode]
        }), new Node({
          children: [appleImageNode]
        })]
      }),
      tandem: tandem
    });
    this.addChild(showCostPerAppleCheckbox);
    this.addChild(appleGraphNode);

    // When the "show both" ABSwitch is toggled, change which apple groups are displayed and update their layouts
    scene.showBothProperty.link(showBoth => {
      if (showBoth) {
        leftAppleGroupControl.right = layoutBounds.width * 0.465;
        rightAppleGroupControl.left = layoutBounds.width * 0.535;
        appleGraphNode.x = layoutBounds.centerX;
      } else {
        leftAppleGroupControl.centerX = layoutBounds.width / 2;
        appleGraphNode.left = leftAppleGroupControl.right + layoutBounds.width * 0.05;
      }
      this.updateControlButton();
    });

    // Price tag checkbox goes in the bottom left
    const checkboxInset = 10;
    showCostPerAppleCheckbox.leftBottom = layoutBounds.leftBottom.plusXY(checkboxInset, -checkboxInset);
  }
}
proportionPlayground.register('AppleSceneNode', AppleSceneNode);
export default AppleSceneNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJIQm94IiwiSW1hZ2UiLCJOb2RlIiwiVGV4dCIsIkNoZWNrYm94IiwiYXBwbGVSZWRfcG5nIiwicHJvcG9ydGlvblBsYXlncm91bmQiLCJQcm9wb3J0aW9uUGxheWdyb3VuZFN0cmluZ3MiLCJQcm9wb3J0aW9uUGxheWdyb3VuZENvbnN0YW50cyIsIlNjZW5lTm9kZSIsIkFwcGxlR3JhcGhOb2RlIiwiQXBwbGVHcm91cENvbnRyb2wiLCJjb3N0UGVyQXBwbGVTdHJpbmciLCJjb3N0UGVyQXBwbGUiLCJBcHBsZVNjZW5lTm9kZSIsImNvbnN0cnVjdG9yIiwic2NlbmUiLCJsYXlvdXRCb3VuZHMiLCJ0YW5kZW0iLCJsZWZ0QXBwbGVHcm91cENvbnRyb2wiLCJsZWZ0QXBwbGVHcm91cCIsInNob3dDb3N0UGVyQXBwbGVQcm9wZXJ0eSIsImNyZWF0ZVRhbmRlbSIsInJpZ2h0QXBwbGVHcm91cENvbnRyb2wiLCJyaWdodEFwcGxlR3JvdXAiLCJhcHBsZUdyYXBoTm9kZSIsInkiLCJhcHBsZUltYWdlTm9kZSIsInNjYWxlIiwic2hvd0Nvc3RQZXJBcHBsZUNoZWNrYm94IiwibWF4V2lkdGgiLCJmb250IiwiQ09OVFJPTF9GT05UIiwic2NlbmVJY29uIiwibGVmdENvbnRyb2wiLCJyaWdodENvbnRyb2wiLCJsZWZ0U3dpdGNoSWNvbiIsImNoaWxkcmVuIiwicmlnaHRTd2l0Y2hJY29uIiwiYWRkQ2hpbGQiLCJzaG93Qm90aFByb3BlcnR5IiwibGluayIsInNob3dCb3RoIiwicmlnaHQiLCJ3aWR0aCIsImxlZnQiLCJ4IiwiY2VudGVyWCIsInVwZGF0ZUNvbnRyb2xCdXR0b24iLCJjaGVja2JveEluc2V0IiwibGVmdEJvdHRvbSIsInBsdXNYWSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiQXBwbGVTY2VuZU5vZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTYtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogTm9kZSB0aGF0IGRpc3BsYXlzIGV2ZXJ5dGhpbmcgZm9yIHRoZSBBcHBsZSBzY2VuZS5cclxuICpcclxuICogQGF1dGhvciBTYW0gUmVpZCAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgeyBIQm94LCBJbWFnZSwgTm9kZSwgVGV4dCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBDaGVja2JveCBmcm9tICcuLi8uLi8uLi8uLi8uLi9zdW4vanMvQ2hlY2tib3guanMnO1xyXG5pbXBvcnQgYXBwbGVSZWRfcG5nIGZyb20gJy4uLy4uLy4uLy4uL21pcG1hcHMvYXBwbGVSZWRfcG5nLmpzJztcclxuaW1wb3J0IHByb3BvcnRpb25QbGF5Z3JvdW5kIGZyb20gJy4uLy4uLy4uL3Byb3BvcnRpb25QbGF5Z3JvdW5kLmpzJztcclxuaW1wb3J0IFByb3BvcnRpb25QbGF5Z3JvdW5kU3RyaW5ncyBmcm9tICcuLi8uLi8uLi9Qcm9wb3J0aW9uUGxheWdyb3VuZFN0cmluZ3MuanMnO1xyXG5pbXBvcnQgUHJvcG9ydGlvblBsYXlncm91bmRDb25zdGFudHMgZnJvbSAnLi4vLi4vUHJvcG9ydGlvblBsYXlncm91bmRDb25zdGFudHMuanMnO1xyXG5pbXBvcnQgU2NlbmVOb2RlIGZyb20gJy4uL1NjZW5lTm9kZS5qcyc7XHJcbmltcG9ydCBBcHBsZUdyYXBoTm9kZSBmcm9tICcuL0FwcGxlR3JhcGhOb2RlLmpzJztcclxuaW1wb3J0IEFwcGxlR3JvdXBDb250cm9sIGZyb20gJy4vQXBwbGVHcm91cENvbnRyb2wuanMnO1xyXG5cclxuY29uc3QgY29zdFBlckFwcGxlU3RyaW5nID0gUHJvcG9ydGlvblBsYXlncm91bmRTdHJpbmdzLmNvc3RQZXJBcHBsZTtcclxuXHJcbmNsYXNzIEFwcGxlU2NlbmVOb2RlIGV4dGVuZHMgU2NlbmVOb2RlIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge0FwcGxlU2NlbmV9IHNjZW5lIC0gdGhlIG1vZGVsXHJcbiAgICogQHBhcmFtIHtCb3VuZHMyfSBsYXlvdXRCb3VuZHMgLSB0aGUgYm94IHdpdGhpbiB3aGljaCB0byBsYXkgb3V0IGFsbCBjb21wb25lbnRzXHJcbiAgICogQHBhcmFtIHtUYW5kZW19IHRhbmRlbVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCBzY2VuZSwgbGF5b3V0Qm91bmRzLCB0YW5kZW0gKSB7XHJcblxyXG4gICAgLy8gQ3JlYXRlIGNoaWxkIG5vZGVzIHRvIGJlIGRpc3BsYXllZFxyXG4gICAgY29uc3QgbGVmdEFwcGxlR3JvdXBDb250cm9sID0gbmV3IEFwcGxlR3JvdXBDb250cm9sKCBzY2VuZS5sZWZ0QXBwbGVHcm91cCwgc2NlbmUuc2hvd0Nvc3RQZXJBcHBsZVByb3BlcnR5LCB0YW5kZW0uY3JlYXRlVGFuZGVtKCAnbGVmdEFwcGxlR3JvdXBDb250cm9sJyApICk7XHJcbiAgICBjb25zdCByaWdodEFwcGxlR3JvdXBDb250cm9sID0gbmV3IEFwcGxlR3JvdXBDb250cm9sKCBzY2VuZS5yaWdodEFwcGxlR3JvdXAsIHNjZW5lLnNob3dDb3N0UGVyQXBwbGVQcm9wZXJ0eSwgdGFuZGVtLmNyZWF0ZVRhbmRlbSggJ3JpZ2h0QXBwbGVHcm91cENvbnRyb2wnICkgKTtcclxuICAgIGNvbnN0IGFwcGxlR3JhcGhOb2RlID0gbmV3IEFwcGxlR3JhcGhOb2RlKCBzY2VuZSwge1xyXG4gICAgICB5OiAxNTAsXHJcbiAgICAgIHRhbmRlbTogdGFuZGVtLmNyZWF0ZVRhbmRlbSggJ2FwcGxlR3JhcGhOb2RlJyApXHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gQ3JlYXRlIGljb25zIGZvciB0aGUgQUJTd2l0Y2hcclxuICAgIGNvbnN0IGFwcGxlSW1hZ2VOb2RlID0gbmV3IEltYWdlKCBhcHBsZVJlZF9wbmcsIHsgc2NhbGU6IDAuMiB9ICk7XHJcblxyXG4gICAgLy8gQ2hlY2tib3ggdGhhdCBzaG93cyB0aGUgY29zdCBwZXIgYXBwbGUgaW4gYSBwcmljZSB0YWdcclxuICAgIGNvbnN0IHNob3dDb3N0UGVyQXBwbGVDaGVja2JveCA9IG5ldyBDaGVja2JveCggc2NlbmUuc2hvd0Nvc3RQZXJBcHBsZVByb3BlcnR5LCBuZXcgVGV4dCggY29zdFBlckFwcGxlU3RyaW5nLCB7XHJcbiAgICAgIG1heFdpZHRoOiAyOTMsIC8vIGNlaWxpbmcgdmFsdWUgZnJvbSA/c3RyaW5nVGVzdD1kb3VibGUgZm9yIEVuZ2xpc2hcclxuICAgICAgZm9udDogUHJvcG9ydGlvblBsYXlncm91bmRDb25zdGFudHMuQ09OVFJPTF9GT05UXHJcbiAgICB9ICksIHtcclxuICAgICAgdGFuZGVtOiB0YW5kZW0uY3JlYXRlVGFuZGVtKCAnc2hvd0Nvc3RQZXJBcHBsZUNoZWNrYm94JyApXHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gU3VwZXIgY2FsbCBhbmQgYWRkIGNoaWxkcmVuXHJcbiAgICBzdXBlciggc2NlbmUsIGxheW91dEJvdW5kcywge1xyXG4gICAgICBzY2VuZUljb246IG5ldyBJbWFnZSggYXBwbGVSZWRfcG5nLCB7IHNjYWxlOiAwLjI1IH0gKSxcclxuICAgICAgbGVmdENvbnRyb2w6IGxlZnRBcHBsZUdyb3VwQ29udHJvbCxcclxuICAgICAgcmlnaHRDb250cm9sOiByaWdodEFwcGxlR3JvdXBDb250cm9sLFxyXG4gICAgICBsZWZ0U3dpdGNoSWNvbjogbmV3IE5vZGUoIHsgY2hpbGRyZW46IFsgYXBwbGVJbWFnZU5vZGUgXSB9ICksXHJcbiAgICAgIHJpZ2h0U3dpdGNoSWNvbjogbmV3IEhCb3goIHtcclxuICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgbmV3IE5vZGUoIHsgY2hpbGRyZW46IFsgYXBwbGVJbWFnZU5vZGUgXSB9ICksXHJcbiAgICAgICAgICBuZXcgTm9kZSggeyBjaGlsZHJlbjogWyBhcHBsZUltYWdlTm9kZSBdIH0gKVxyXG4gICAgICAgIF1cclxuICAgICAgfSApLFxyXG4gICAgICB0YW5kZW06IHRhbmRlbVxyXG4gICAgfSApO1xyXG5cclxuICAgIHRoaXMuYWRkQ2hpbGQoIHNob3dDb3N0UGVyQXBwbGVDaGVja2JveCApO1xyXG4gICAgdGhpcy5hZGRDaGlsZCggYXBwbGVHcmFwaE5vZGUgKTtcclxuXHJcbiAgICAvLyBXaGVuIHRoZSBcInNob3cgYm90aFwiIEFCU3dpdGNoIGlzIHRvZ2dsZWQsIGNoYW5nZSB3aGljaCBhcHBsZSBncm91cHMgYXJlIGRpc3BsYXllZCBhbmQgdXBkYXRlIHRoZWlyIGxheW91dHNcclxuICAgIHNjZW5lLnNob3dCb3RoUHJvcGVydHkubGluayggc2hvd0JvdGggPT4ge1xyXG4gICAgICBpZiAoIHNob3dCb3RoICkge1xyXG4gICAgICAgIGxlZnRBcHBsZUdyb3VwQ29udHJvbC5yaWdodCA9IGxheW91dEJvdW5kcy53aWR0aCAqIDAuNDY1O1xyXG4gICAgICAgIHJpZ2h0QXBwbGVHcm91cENvbnRyb2wubGVmdCA9IGxheW91dEJvdW5kcy53aWR0aCAqIDAuNTM1O1xyXG4gICAgICAgIGFwcGxlR3JhcGhOb2RlLnggPSBsYXlvdXRCb3VuZHMuY2VudGVyWDtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBsZWZ0QXBwbGVHcm91cENvbnRyb2wuY2VudGVyWCA9IGxheW91dEJvdW5kcy53aWR0aCAvIDI7XHJcbiAgICAgICAgYXBwbGVHcmFwaE5vZGUubGVmdCA9IGxlZnRBcHBsZUdyb3VwQ29udHJvbC5yaWdodCArIGxheW91dEJvdW5kcy53aWR0aCAqIDAuMDU7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy51cGRhdGVDb250cm9sQnV0dG9uKCk7XHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gUHJpY2UgdGFnIGNoZWNrYm94IGdvZXMgaW4gdGhlIGJvdHRvbSBsZWZ0XHJcbiAgICBjb25zdCBjaGVja2JveEluc2V0ID0gMTA7XHJcbiAgICBzaG93Q29zdFBlckFwcGxlQ2hlY2tib3gubGVmdEJvdHRvbSA9IGxheW91dEJvdW5kcy5sZWZ0Qm90dG9tLnBsdXNYWSggY2hlY2tib3hJbnNldCwgLWNoZWNrYm94SW5zZXQgKTtcclxuICB9XHJcbn1cclxuXHJcbnByb3BvcnRpb25QbGF5Z3JvdW5kLnJlZ2lzdGVyKCAnQXBwbGVTY2VuZU5vZGUnLCBBcHBsZVNjZW5lTm9kZSApO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBwbGVTY2VuZU5vZGU7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLElBQUksRUFBRUMsS0FBSyxFQUFFQyxJQUFJLEVBQUVDLElBQUksUUFBUSxzQ0FBc0M7QUFDOUUsT0FBT0MsUUFBUSxNQUFNLG1DQUFtQztBQUN4RCxPQUFPQyxZQUFZLE1BQU0scUNBQXFDO0FBQzlELE9BQU9DLG9CQUFvQixNQUFNLGtDQUFrQztBQUNuRSxPQUFPQywyQkFBMkIsTUFBTSx5Q0FBeUM7QUFDakYsT0FBT0MsNkJBQTZCLE1BQU0sd0NBQXdDO0FBQ2xGLE9BQU9DLFNBQVMsTUFBTSxpQkFBaUI7QUFDdkMsT0FBT0MsY0FBYyxNQUFNLHFCQUFxQjtBQUNoRCxPQUFPQyxpQkFBaUIsTUFBTSx3QkFBd0I7QUFFdEQsTUFBTUMsa0JBQWtCLEdBQUdMLDJCQUEyQixDQUFDTSxZQUFZO0FBRW5FLE1BQU1DLGNBQWMsU0FBU0wsU0FBUyxDQUFDO0VBQ3JDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7RUFDRU0sV0FBV0EsQ0FBRUMsS0FBSyxFQUFFQyxZQUFZLEVBQUVDLE1BQU0sRUFBRztJQUV6QztJQUNBLE1BQU1DLHFCQUFxQixHQUFHLElBQUlSLGlCQUFpQixDQUFFSyxLQUFLLENBQUNJLGNBQWMsRUFBRUosS0FBSyxDQUFDSyx3QkFBd0IsRUFBRUgsTUFBTSxDQUFDSSxZQUFZLENBQUUsdUJBQXdCLENBQUUsQ0FBQztJQUMzSixNQUFNQyxzQkFBc0IsR0FBRyxJQUFJWixpQkFBaUIsQ0FBRUssS0FBSyxDQUFDUSxlQUFlLEVBQUVSLEtBQUssQ0FBQ0ssd0JBQXdCLEVBQUVILE1BQU0sQ0FBQ0ksWUFBWSxDQUFFLHdCQUF5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