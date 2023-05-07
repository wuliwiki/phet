// Copyright 2018-2021, University of Colorado Boulder

/**
 * Scene for the circular representation
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import merge from '../../../../../phet-core/js/merge.js';
import FractionsCommonColors from '../../../common/view/FractionsCommonColors.js';
import fractionsCommon from '../../../fractionsCommon.js';
import Container from '../../model/Container.js';
import CellSceneNode from '../CellSceneNode.js';
import CircularContainerNode from './CircularContainerNode.js';
import CircularNode from './CircularNode.js';
import CircularPieceNode from './CircularPieceNode.js';
class CircularSceneNode extends CellSceneNode {
  /**
   * @param {ContainerSetScreenView} model
   * @param {Object} [options]
   */
  constructor(model, options) {
    const maxContainers = model.containerCountProperty.range.max;
    super(model, merge({
      createContainerNode(container, options) {
        return new CircularContainerNode(container, options);
      },
      createPieceNode(piece, finishedAnimatingCallback, droppedCallback) {
        return new CircularPieceNode(piece, finishedAnimatingCallback, droppedCallback);
      },
      createCellNode(denominator, index, options) {
        const circularNode = new CircularNode(denominator, index, options);
        circularNode.setRotationAngle(circularNode.bucketRotation);
        return circularNode;
      },
      maxContainersPerRow: model.isCompact ? 2 : maxContainers
    }, options));
  }

  /**
   * Returns the icon node to be used for this representation.
   * @public
   *
   * @param {boolean} [useEqualityLabColor]
   * @returns {Node}
   */
  static getIcon(useEqualityLabColor) {
    const iconContainer = new Container();
    iconContainer.addCells(1);
    iconContainer.cells.get(0).fill();
    return new CircularContainerNode(iconContainer, {
      scale: 30 / 63,
      colorOverride: useEqualityLabColor ? FractionsCommonColors.equalityLabColorProperty : null
    });
  }
}
fractionsCommon.register('CircularSceneNode', CircularSceneNode);
export default CircularSceneNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtZXJnZSIsIkZyYWN0aW9uc0NvbW1vbkNvbG9ycyIsImZyYWN0aW9uc0NvbW1vbiIsIkNvbnRhaW5lciIsIkNlbGxTY2VuZU5vZGUiLCJDaXJjdWxhckNvbnRhaW5lck5vZGUiLCJDaXJjdWxhck5vZGUiLCJDaXJjdWxhclBpZWNlTm9kZSIsIkNpcmN1bGFyU2NlbmVOb2RlIiwiY29uc3RydWN0b3IiLCJtb2RlbCIsIm9wdGlvbnMiLCJtYXhDb250YWluZXJzIiwiY29udGFpbmVyQ291bnRQcm9wZXJ0eSIsInJhbmdlIiwibWF4IiwiY3JlYXRlQ29udGFpbmVyTm9kZSIsImNvbnRhaW5lciIsImNyZWF0ZVBpZWNlTm9kZSIsInBpZWNlIiwiZmluaXNoZWRBbmltYXRpbmdDYWxsYmFjayIsImRyb3BwZWRDYWxsYmFjayIsImNyZWF0ZUNlbGxOb2RlIiwiZGVub21pbmF0b3IiLCJpbmRleCIsImNpcmN1bGFyTm9kZSIsInNldFJvdGF0aW9uQW5nbGUiLCJidWNrZXRSb3RhdGlvbiIsIm1heENvbnRhaW5lcnNQZXJSb3ciLCJpc0NvbXBhY3QiLCJnZXRJY29uIiwidXNlRXF1YWxpdHlMYWJDb2xvciIsImljb25Db250YWluZXIiLCJhZGRDZWxscyIsImNlbGxzIiwiZ2V0IiwiZmlsbCIsInNjYWxlIiwiY29sb3JPdmVycmlkZSIsImVxdWFsaXR5TGFiQ29sb3JQcm9wZXJ0eSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiQ2lyY3VsYXJTY2VuZU5vZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMSwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogU2NlbmUgZm9yIHRoZSBjaXJjdWxhciByZXByZXNlbnRhdGlvblxyXG4gKlxyXG4gKiBAYXV0aG9yIEpvbmF0aGFuIE9sc29uIDxqb25hdGhhbi5vbHNvbkBjb2xvcmFkby5lZHU+XHJcbiAqL1xyXG5cclxuaW1wb3J0IG1lcmdlIGZyb20gJy4uLy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9tZXJnZS5qcyc7XHJcbmltcG9ydCBGcmFjdGlvbnNDb21tb25Db2xvcnMgZnJvbSAnLi4vLi4vLi4vY29tbW9uL3ZpZXcvRnJhY3Rpb25zQ29tbW9uQ29sb3JzLmpzJztcclxuaW1wb3J0IGZyYWN0aW9uc0NvbW1vbiBmcm9tICcuLi8uLi8uLi9mcmFjdGlvbnNDb21tb24uanMnO1xyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJy4uLy4uL21vZGVsL0NvbnRhaW5lci5qcyc7XHJcbmltcG9ydCBDZWxsU2NlbmVOb2RlIGZyb20gJy4uL0NlbGxTY2VuZU5vZGUuanMnO1xyXG5pbXBvcnQgQ2lyY3VsYXJDb250YWluZXJOb2RlIGZyb20gJy4vQ2lyY3VsYXJDb250YWluZXJOb2RlLmpzJztcclxuaW1wb3J0IENpcmN1bGFyTm9kZSBmcm9tICcuL0NpcmN1bGFyTm9kZS5qcyc7XHJcbmltcG9ydCBDaXJjdWxhclBpZWNlTm9kZSBmcm9tICcuL0NpcmN1bGFyUGllY2VOb2RlLmpzJztcclxuXHJcbmNsYXNzIENpcmN1bGFyU2NlbmVOb2RlIGV4dGVuZHMgQ2VsbFNjZW5lTm9kZSB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtDb250YWluZXJTZXRTY3JlZW5WaWV3fSBtb2RlbFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggbW9kZWwsIG9wdGlvbnMgKSB7XHJcbiAgICBjb25zdCBtYXhDb250YWluZXJzID0gbW9kZWwuY29udGFpbmVyQ291bnRQcm9wZXJ0eS5yYW5nZS5tYXg7XHJcblxyXG4gICAgc3VwZXIoIG1vZGVsLCBtZXJnZSgge1xyXG4gICAgICBjcmVhdGVDb250YWluZXJOb2RlKCBjb250YWluZXIsIG9wdGlvbnMgKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDaXJjdWxhckNvbnRhaW5lck5vZGUoIGNvbnRhaW5lciwgb3B0aW9ucyApO1xyXG4gICAgICB9LFxyXG4gICAgICBjcmVhdGVQaWVjZU5vZGUoIHBpZWNlLCBmaW5pc2hlZEFuaW1hdGluZ0NhbGxiYWNrLCBkcm9wcGVkQ2FsbGJhY2sgKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDaXJjdWxhclBpZWNlTm9kZSggcGllY2UsIGZpbmlzaGVkQW5pbWF0aW5nQ2FsbGJhY2ssIGRyb3BwZWRDYWxsYmFjayApO1xyXG4gICAgICB9LFxyXG4gICAgICBjcmVhdGVDZWxsTm9kZSggZGVub21pbmF0b3IsIGluZGV4LCBvcHRpb25zICkge1xyXG4gICAgICAgIGNvbnN0IGNpcmN1bGFyTm9kZSA9IG5ldyBDaXJjdWxhck5vZGUoIGRlbm9taW5hdG9yLCBpbmRleCwgb3B0aW9ucyApO1xyXG4gICAgICAgIGNpcmN1bGFyTm9kZS5zZXRSb3RhdGlvbkFuZ2xlKCBjaXJjdWxhck5vZGUuYnVja2V0Um90YXRpb24gKTtcclxuICAgICAgICByZXR1cm4gY2lyY3VsYXJOb2RlO1xyXG4gICAgICB9LFxyXG4gICAgICBtYXhDb250YWluZXJzUGVyUm93OiBtb2RlbC5pc0NvbXBhY3QgPyAyIDogbWF4Q29udGFpbmVyc1xyXG4gICAgfSwgb3B0aW9ucyApICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBpY29uIG5vZGUgdG8gYmUgdXNlZCBmb3IgdGhpcyByZXByZXNlbnRhdGlvbi5cclxuICAgKiBAcHVibGljXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFt1c2VFcXVhbGl0eUxhYkNvbG9yXVxyXG4gICAqIEByZXR1cm5zIHtOb2RlfVxyXG4gICAqL1xyXG4gIHN0YXRpYyBnZXRJY29uKCB1c2VFcXVhbGl0eUxhYkNvbG9yICkge1xyXG4gICAgY29uc3QgaWNvbkNvbnRhaW5lciA9IG5ldyBDb250YWluZXIoKTtcclxuICAgIGljb25Db250YWluZXIuYWRkQ2VsbHMoIDEgKTtcclxuICAgIGljb25Db250YWluZXIuY2VsbHMuZ2V0KCAwICkuZmlsbCgpO1xyXG5cclxuICAgIHJldHVybiBuZXcgQ2lyY3VsYXJDb250YWluZXJOb2RlKCBpY29uQ29udGFpbmVyLCB7XHJcbiAgICAgIHNjYWxlOiAzMCAvIDYzLFxyXG4gICAgICBjb2xvck92ZXJyaWRlOiB1c2VFcXVhbGl0eUxhYkNvbG9yID8gRnJhY3Rpb25zQ29tbW9uQ29sb3JzLmVxdWFsaXR5TGFiQ29sb3JQcm9wZXJ0eSA6IG51bGxcclxuICAgIH0gKTtcclxuICB9XHJcbn1cclxuXHJcbmZyYWN0aW9uc0NvbW1vbi5yZWdpc3RlciggJ0NpcmN1bGFyU2NlbmVOb2RlJywgQ2lyY3VsYXJTY2VuZU5vZGUgKTtcclxuZXhwb3J0IGRlZmF1bHQgQ2lyY3VsYXJTY2VuZU5vZGU7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLEtBQUssTUFBTSxzQ0FBc0M7QUFDeEQsT0FBT0MscUJBQXFCLE1BQU0sK0NBQStDO0FBQ2pGLE9BQU9DLGVBQWUsTUFBTSw2QkFBNkI7QUFDekQsT0FBT0MsU0FBUyxNQUFNLDBCQUEwQjtBQUNoRCxPQUFPQyxhQUFhLE1BQU0scUJBQXFCO0FBQy9DLE9BQU9DLHFCQUFxQixNQUFNLDRCQUE0QjtBQUM5RCxPQUFPQyxZQUFZLE1BQU0sbUJBQW1CO0FBQzVDLE9BQU9DLGlCQUFpQixNQUFNLHdCQUF3QjtBQUV0RCxNQUFNQyxpQkFBaUIsU0FBU0osYUFBYSxDQUFDO0VBQzVDO0FBQ0Y7QUFDQTtBQUNBO0VBQ0VLLFdBQVdBLENBQUVDLEtBQUssRUFBRUMsT0FBTyxFQUFHO0lBQzVCLE1BQU1DLGFBQWEsR0FBR0YsS0FBSyxDQUFDRyxzQkFBc0IsQ0FBQ0MsS0FBSyxDQUFDQyxHQUFHO0lBRTVELEtBQUssQ0FBRUwsS0FBSyxFQUFFVixLQUFLLENBQUU7TUFDbkJnQixtQkFBbUJBLENBQUVDLFNBQVMsRUFBRU4sT0FBTyxFQUFHO1FBQ3hDLE9BQU8sSUFBSU4scUJBQXFCLENBQUVZLFNBQVMsRUFBRU4sT0FBUSxDQUFDO01BQ3hELENBQUM7TUFDRE8sZUFBZUEsQ0FBRUMsS0FBSyxFQUFFQyx5QkFBeUIsRUFBRUMsZUFBZSxFQUFHO1FBQ25FLE9BQU8sSUFBSWQsaUJBQWlCLENBQUVZLEtBQUssRUFBRUMseUJBQXlCLEVBQUVDLGVBQWdCLENBQUM7TUFDbkYsQ0FBQztNQUNEQyxjQUFjQSxDQUFFQyxXQUFXLEVBQUVDLEtBQUssRUFBRWIsT0FBTyxFQUFHO1FBQzVDLE1BQU1jLFlBQVksR0FBRyxJQUFJbkIsWUFBWSxDQUFFaUIsV0FBVyxFQUFFQyxLQUFLLEVBQUViLE9BQVEsQ0FBQztRQUNwRWMsWUFBWSxDQUFDQyxnQkFBZ0IsQ0FBRUQsWUFBWSxDQUFDRSxjQUFlLENBQUM7UUFDNUQsT0FBT0YsWUFBWTtNQUNyQixDQUFDO01BQ0RHLG1CQUFtQixFQUFFbEIsS0FBSyxDQUFDbUIsU0FBUyxHQUFHLENBQUMsR0FBR2pCO0lBQzdDLENBQUMsRUFBRUQsT0FBUSxDQUFFLENBQUM7RUFDaEI7O0VBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDRSxPQUFPbUIsT0FBT0EsQ0FBRUMsbUJBQW1CLEVBQUc7SUFDcEMsTUFBTUMsYUFBYSxHQUFHLElBQUk3QixTQUFTLENBQUMsQ0FBQztJQUNyQzZCLGFBQWEsQ0FBQ0MsUUFBUSxDQUFFLENBQUUsQ0FBQztJQUMzQkQsYUFBYSxDQUFDRSxLQUFLLENBQUNDLEdBQUcsQ0FBRSxDQUFFLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLENBQUM7SUFFbkMsT0FBTyxJQUFJL0IscUJBQXFCLENBQUUyQixhQUFhLEVBQUU7TUFDL0NLLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRTtNQUNkQyxhQUFhLEVBQUVQLG1CQUFtQixHQUFHOUIscUJBQXFCLENBQUNzQyx3QkFBd0IsR0FBRztJQUN4RixDQUFFLENBQUM7RUFDTDtBQUNGO0FBRUFyQyxlQUFlLENBQUNzQyxRQUFRLENBQUUsbUJBQW1CLEVBQUVoQyxpQkFBa0IsQ0FBQztBQUNsRSxlQUFlQSxpQkFBaUIifQ==