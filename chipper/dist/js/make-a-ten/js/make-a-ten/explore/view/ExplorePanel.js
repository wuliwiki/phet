// Copyright 2016-2023, University of Colorado Boulder

/**
 * Panel that contains a 100, 10 and 1, which can be clicked/dragged to create draggable counting objects.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import CountingCreatorNode from '../../../../../counting-common/js/common/view/CountingCreatorNode.js';
import merge from '../../../../../phet-core/js/merge.js';
import { HBox } from '../../../../../scenery/js/imports.js';
import Panel from '../../../../../sun/js/Panel.js';
import makeATen from '../../../makeATen.js';
class ExplorePanel extends Panel {
  /**
   * @param {MakeATenExploreScreenView} screenView
   * @param {NumberProperty} sumProperty
   * @param {Emitter} resetEmitter
   * @param {Object} [options] - Passed to Node
   */
  constructor(screenView, sumProperty, resetEmitter, options) {
    options = merge({
      fill: 'rgb(208,222,239)',
      stroke: 'black',
      lineWidth: 1.5,
      xMargin: 30,
      yMargin: 18,
      resize: false
    }, options);
    const addAndDragCountingObject = screenView.addAndDragCountingObject.bind(screenView);
    const hundredTargetNode = new CountingCreatorNode(2, screenView, sumProperty, resetEmitter, addAndDragCountingObject);
    const tenTargetNode = new CountingCreatorNode(1, screenView, sumProperty, resetEmitter, addAndDragCountingObject);
    const oneTargetNode = new CountingCreatorNode(0, screenView, sumProperty, resetEmitter, addAndDragCountingObject);
    const box = new HBox({
      children: [hundredTargetNode, tenTargetNode, oneTargetNode],
      spacing: 30
    });
    super(box, options);

    // @public (read-only)
    this.digitLengthToTargetNode = {
      1: oneTargetNode,
      2: tenTargetNode,
      3: hundredTargetNode,
      4: hundredTargetNode
    };
  }
}
makeATen.register('ExplorePanel', ExplorePanel);
export default ExplorePanel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb3VudGluZ0NyZWF0b3JOb2RlIiwibWVyZ2UiLCJIQm94IiwiUGFuZWwiLCJtYWtlQVRlbiIsIkV4cGxvcmVQYW5lbCIsImNvbnN0cnVjdG9yIiwic2NyZWVuVmlldyIsInN1bVByb3BlcnR5IiwicmVzZXRFbWl0dGVyIiwib3B0aW9ucyIsImZpbGwiLCJzdHJva2UiLCJsaW5lV2lkdGgiLCJ4TWFyZ2luIiwieU1hcmdpbiIsInJlc2l6ZSIsImFkZEFuZERyYWdDb3VudGluZ09iamVjdCIsImJpbmQiLCJodW5kcmVkVGFyZ2V0Tm9kZSIsInRlblRhcmdldE5vZGUiLCJvbmVUYXJnZXROb2RlIiwiYm94IiwiY2hpbGRyZW4iLCJzcGFjaW5nIiwiZGlnaXRMZW5ndGhUb1RhcmdldE5vZGUiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkV4cGxvcmVQYW5lbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNi0yMDIzLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBQYW5lbCB0aGF0IGNvbnRhaW5zIGEgMTAwLCAxMCBhbmQgMSwgd2hpY2ggY2FuIGJlIGNsaWNrZWQvZHJhZ2dlZCB0byBjcmVhdGUgZHJhZ2dhYmxlIGNvdW50aW5nIG9iamVjdHMuXHJcbiAqXHJcbiAqIEBhdXRob3IgSm9uYXRoYW4gT2xzb24gPGpvbmF0aGFuLm9sc29uQGNvbG9yYWRvLmVkdT5cclxuICogQGF1dGhvciBDaHJpcyBLbHVzZW5kb3JmIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCBDb3VudGluZ0NyZWF0b3JOb2RlIGZyb20gJy4uLy4uLy4uLy4uLy4uL2NvdW50aW5nLWNvbW1vbi9qcy9jb21tb24vdmlldy9Db3VudGluZ0NyZWF0b3JOb2RlLmpzJztcclxuaW1wb3J0IG1lcmdlIGZyb20gJy4uLy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9tZXJnZS5qcyc7XHJcbmltcG9ydCB7IEhCb3ggfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgUGFuZWwgZnJvbSAnLi4vLi4vLi4vLi4vLi4vc3VuL2pzL1BhbmVsLmpzJztcclxuaW1wb3J0IG1ha2VBVGVuIGZyb20gJy4uLy4uLy4uL21ha2VBVGVuLmpzJztcclxuXHJcbmNsYXNzIEV4cGxvcmVQYW5lbCBleHRlbmRzIFBhbmVsIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge01ha2VBVGVuRXhwbG9yZVNjcmVlblZpZXd9IHNjcmVlblZpZXdcclxuICAgKiBAcGFyYW0ge051bWJlclByb3BlcnR5fSBzdW1Qcm9wZXJ0eVxyXG4gICAqIEBwYXJhbSB7RW1pdHRlcn0gcmVzZXRFbWl0dGVyXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFBhc3NlZCB0byBOb2RlXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoIHNjcmVlblZpZXcsIHN1bVByb3BlcnR5LCByZXNldEVtaXR0ZXIsIG9wdGlvbnMgKSB7XHJcblxyXG4gICAgb3B0aW9ucyA9IG1lcmdlKCB7XHJcbiAgICAgIGZpbGw6ICdyZ2IoMjA4LDIyMiwyMzkpJyxcclxuICAgICAgc3Ryb2tlOiAnYmxhY2snLFxyXG4gICAgICBsaW5lV2lkdGg6IDEuNSxcclxuICAgICAgeE1hcmdpbjogMzAsXHJcbiAgICAgIHlNYXJnaW46IDE4LFxyXG4gICAgICByZXNpemU6IGZhbHNlXHJcbiAgICB9LCBvcHRpb25zICk7XHJcblxyXG4gICAgY29uc3QgYWRkQW5kRHJhZ0NvdW50aW5nT2JqZWN0ID0gc2NyZWVuVmlldy5hZGRBbmREcmFnQ291bnRpbmdPYmplY3QuYmluZCggc2NyZWVuVmlldyApO1xyXG4gICAgY29uc3QgaHVuZHJlZFRhcmdldE5vZGUgPSBuZXcgQ291bnRpbmdDcmVhdG9yTm9kZSggMiwgc2NyZWVuVmlldywgc3VtUHJvcGVydHksIHJlc2V0RW1pdHRlciwgYWRkQW5kRHJhZ0NvdW50aW5nT2JqZWN0ICk7XHJcbiAgICBjb25zdCB0ZW5UYXJnZXROb2RlID0gbmV3IENvdW50aW5nQ3JlYXRvck5vZGUoIDEsIHNjcmVlblZpZXcsIHN1bVByb3BlcnR5LCByZXNldEVtaXR0ZXIsIGFkZEFuZERyYWdDb3VudGluZ09iamVjdCApO1xyXG4gICAgY29uc3Qgb25lVGFyZ2V0Tm9kZSA9IG5ldyBDb3VudGluZ0NyZWF0b3JOb2RlKCAwLCBzY3JlZW5WaWV3LCBzdW1Qcm9wZXJ0eSwgcmVzZXRFbWl0dGVyLCBhZGRBbmREcmFnQ291bnRpbmdPYmplY3QgKTtcclxuXHJcbiAgICBjb25zdCBib3ggPSBuZXcgSEJveCgge1xyXG4gICAgICBjaGlsZHJlbjogWyBodW5kcmVkVGFyZ2V0Tm9kZSwgdGVuVGFyZ2V0Tm9kZSwgb25lVGFyZ2V0Tm9kZSBdLFxyXG4gICAgICBzcGFjaW5nOiAzMFxyXG4gICAgfSApO1xyXG5cclxuICAgIHN1cGVyKCBib3gsIG9wdGlvbnMgKTtcclxuXHJcbiAgICAvLyBAcHVibGljIChyZWFkLW9ubHkpXHJcbiAgICB0aGlzLmRpZ2l0TGVuZ3RoVG9UYXJnZXROb2RlID0ge1xyXG4gICAgICAxOiBvbmVUYXJnZXROb2RlLFxyXG4gICAgICAyOiB0ZW5UYXJnZXROb2RlLFxyXG4gICAgICAzOiBodW5kcmVkVGFyZ2V0Tm9kZSxcclxuICAgICAgNDogaHVuZHJlZFRhcmdldE5vZGVcclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG5tYWtlQVRlbi5yZWdpc3RlciggJ0V4cGxvcmVQYW5lbCcsIEV4cGxvcmVQYW5lbCApO1xyXG5leHBvcnQgZGVmYXVsdCBFeHBsb3JlUGFuZWw7XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLG1CQUFtQixNQUFNLHNFQUFzRTtBQUN0RyxPQUFPQyxLQUFLLE1BQU0sc0NBQXNDO0FBQ3hELFNBQVNDLElBQUksUUFBUSxzQ0FBc0M7QUFDM0QsT0FBT0MsS0FBSyxNQUFNLGdDQUFnQztBQUNsRCxPQUFPQyxRQUFRLE1BQU0sc0JBQXNCO0FBRTNDLE1BQU1DLFlBQVksU0FBU0YsS0FBSyxDQUFDO0VBQy9CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNFRyxXQUFXQSxDQUFFQyxVQUFVLEVBQUVDLFdBQVcsRUFBRUMsWUFBWSxFQUFFQyxPQUFPLEVBQUc7SUFFNURBLE9BQU8sR0FBR1QsS0FBSyxDQUFFO01BQ2ZVLElBQUksRUFBRSxrQkFBa0I7TUFDeEJDLE1BQU0sRUFBRSxPQUFPO01BQ2ZDLFNBQVMsRUFBRSxHQUFHO01BQ2RDLE9BQU8sRUFBRSxFQUFFO01BQ1hDLE9BQU8sRUFBRSxFQUFFO01BQ1hDLE1BQU0sRUFBRTtJQUNWLENBQUMsRUFBRU4sT0FBUSxDQUFDO0lBRVosTUFBTU8sd0JBQXdCLEdBQUdWLFVBQVUsQ0FBQ1Usd0JBQXdCLENBQUNDLElBQUksQ0FBRVgsVUFBVyxDQUFDO0lBQ3ZGLE1BQU1ZLGlCQUFpQixHQUFHLElBQUluQixtQkFBbUIsQ0FBRSxDQUFDLEVBQUVPLFVBQVUsRUFBRUMsV0FBVyxFQUFFQyxZQUFZLEVBQUVRLHdCQUF5QixDQUFDO0lBQ3ZILE1BQU1HLGFBQWEsR0FBRyxJQUFJcEIsbUJBQW1CLENBQUUsQ0FBQyxFQUFFTyxVQUFVLEVBQUVDLFdBQVcsRUFBRUMsWUFBWSxFQUFFUSx3QkFBeUIsQ0FBQztJQUNuSCxNQUFNSSxhQUFhLEdBQUcsSUFBSXJCLG1CQUFtQixDQUFFLENBQUMsRUFBRU8sVUFBVSxFQUFFQyxXQUFXLEVBQUVDLFlBQVksRUFBRVEsd0JBQXlCLENBQUM7SUFFbkgsTUFBTUssR0FBRyxHQUFHLElBQUlwQixJQUFJLENBQUU7TUFDcEJxQixRQUFRLEVBQUUsQ0FBRUosaUJBQWlCLEVBQUVDLGFBQWEsRUFBRUMsYUFBYSxDQUFFO01BQzdERyxPQUFPLEVBQUU7SUFDWCxDQUFFLENBQUM7SUFFSCxLQUFLLENBQUVGLEdBQUcsRUFBRVosT0FBUSxDQUFDOztJQUVyQjtJQUNBLElBQUksQ0FBQ2UsdUJBQXVCLEdBQUc7TUFDN0IsQ0FBQyxFQUFFSixhQUFhO01BQ2hCLENBQUMsRUFBRUQsYUFBYTtNQUNoQixDQUFDLEVBQUVELGlCQUFpQjtNQUNwQixDQUFDLEVBQUVBO0lBQ0wsQ0FBQztFQUNIO0FBQ0Y7QUFFQWYsUUFBUSxDQUFDc0IsUUFBUSxDQUFFLGNBQWMsRUFBRXJCLFlBQWEsQ0FBQztBQUNqRCxlQUFlQSxZQUFZIn0=