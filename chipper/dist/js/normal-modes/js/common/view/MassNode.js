// Copyright 2020-2022, University of Colorado Boulder

/**
 * MassNode is a base class for MassNode1D and MassNode2D, as its drag listeners differ.
 *
 * @author Thiago de Mendonça Mildemberger (UTFPR)
 * @author Franco Barpp Gomes (UTFPR)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import merge from '../../../../phet-core/js/merge.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import { Node } from '../../../../scenery/js/imports.js';
import normalModes from '../../normalModes.js';
import NormalModesColors from '../NormalModesColors.js';
class MassNode extends Node {
  /**
   * @param {Mass} mass
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Tandem} tandem
   */
  constructor(mass, modelViewTransform, tandem) {
    super({
      cursor: 'pointer'
    });

    // TODO https://github.com/phetsims/normal-modes/issues/38 magic number
    this.size = 20;

    // dispose is unnecessary, the MassNode and the dependencies exist for the lifetime of the sim
    Multilink.multilink([mass.equilibriumPositionProperty, mass.displacementProperty], (massPosition, massDisplacement) => {
      this.translation = modelViewTransform.modelToViewPosition(massPosition.plus(massDisplacement));
    });

    // TODO https://github.com/phetsims/normal-modes/issues/38 magic numbers
    const arrowOptions = merge({
      boundsMethod: 'unstroked',
      lineWidth: 2,
      tailWidth: 10,
      headWidth: 20,
      headHeight: 16,
      visible: false,
      excludeInvisible: true
    }, NormalModesColors.ARROW_COLORS);
    const arrowSize = 23;

    // @public {Object}
    this.arrows = {
      left: new ArrowNode(-this.size / 2, 0, -this.size / 2 - arrowSize, 0, arrowOptions),
      right: new ArrowNode(this.size / 2, 0, this.size / 2 + arrowSize, 0, arrowOptions),
      top: new ArrowNode(0, -this.size / 2, 0, -this.size / 2 - arrowSize, arrowOptions),
      bottom: new ArrowNode(0, this.size / 2, 0, this.size / 2 + arrowSize, arrowOptions)
    };
    this.addChild(this.arrows.left);
    this.addChild(this.arrows.top);
    this.addChild(this.arrows.right);
    this.addChild(this.arrows.bottom);
    mass.visibleProperty.linkAttribute(this, 'visible');
  }
}
normalModes.register('MassNode', MassNode);
export default MassNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJNdWx0aWxpbmsiLCJtZXJnZSIsIkFycm93Tm9kZSIsIk5vZGUiLCJub3JtYWxNb2RlcyIsIk5vcm1hbE1vZGVzQ29sb3JzIiwiTWFzc05vZGUiLCJjb25zdHJ1Y3RvciIsIm1hc3MiLCJtb2RlbFZpZXdUcmFuc2Zvcm0iLCJ0YW5kZW0iLCJjdXJzb3IiLCJzaXplIiwibXVsdGlsaW5rIiwiZXF1aWxpYnJpdW1Qb3NpdGlvblByb3BlcnR5IiwiZGlzcGxhY2VtZW50UHJvcGVydHkiLCJtYXNzUG9zaXRpb24iLCJtYXNzRGlzcGxhY2VtZW50IiwidHJhbnNsYXRpb24iLCJtb2RlbFRvVmlld1Bvc2l0aW9uIiwicGx1cyIsImFycm93T3B0aW9ucyIsImJvdW5kc01ldGhvZCIsImxpbmVXaWR0aCIsInRhaWxXaWR0aCIsImhlYWRXaWR0aCIsImhlYWRIZWlnaHQiLCJ2aXNpYmxlIiwiZXhjbHVkZUludmlzaWJsZSIsIkFSUk9XX0NPTE9SUyIsImFycm93U2l6ZSIsImFycm93cyIsImxlZnQiLCJyaWdodCIsInRvcCIsImJvdHRvbSIsImFkZENoaWxkIiwidmlzaWJsZVByb3BlcnR5IiwibGlua0F0dHJpYnV0ZSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiTWFzc05vZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogTWFzc05vZGUgaXMgYSBiYXNlIGNsYXNzIGZvciBNYXNzTm9kZTFEIGFuZCBNYXNzTm9kZTJELCBhcyBpdHMgZHJhZyBsaXN0ZW5lcnMgZGlmZmVyLlxyXG4gKlxyXG4gKiBAYXV0aG9yIFRoaWFnbyBkZSBNZW5kb27Dp2EgTWlsZGVtYmVyZ2VyIChVVEZQUilcclxuICogQGF1dGhvciBGcmFuY28gQmFycHAgR29tZXMgKFVURlBSKVxyXG4gKi9cclxuXHJcbmltcG9ydCBNdWx0aWxpbmsgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9NdWx0aWxpbmsuanMnO1xyXG5pbXBvcnQgbWVyZ2UgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL21lcmdlLmpzJztcclxuaW1wb3J0IEFycm93Tm9kZSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5LXBoZXQvanMvQXJyb3dOb2RlLmpzJztcclxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBub3JtYWxNb2RlcyBmcm9tICcuLi8uLi9ub3JtYWxNb2Rlcy5qcyc7XHJcbmltcG9ydCBOb3JtYWxNb2Rlc0NvbG9ycyBmcm9tICcuLi9Ob3JtYWxNb2Rlc0NvbG9ycy5qcyc7XHJcblxyXG5jbGFzcyBNYXNzTm9kZSBleHRlbmRzIE5vZGUge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge01hc3N9IG1hc3NcclxuICAgKiBAcGFyYW0ge01vZGVsVmlld1RyYW5zZm9ybTJ9IG1vZGVsVmlld1RyYW5zZm9ybVxyXG4gICAqIEBwYXJhbSB7VGFuZGVtfSB0YW5kZW1cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggbWFzcywgbW9kZWxWaWV3VHJhbnNmb3JtLCB0YW5kZW0gKSB7XHJcbiAgICBzdXBlciggeyBjdXJzb3I6ICdwb2ludGVyJyB9ICk7XHJcblxyXG4gICAgLy8gVE9ETyBodHRwczovL2dpdGh1Yi5jb20vcGhldHNpbXMvbm9ybWFsLW1vZGVzL2lzc3Vlcy8zOCBtYWdpYyBudW1iZXJcclxuICAgIHRoaXMuc2l6ZSA9IDIwO1xyXG5cclxuICAgIC8vIGRpc3Bvc2UgaXMgdW5uZWNlc3NhcnksIHRoZSBNYXNzTm9kZSBhbmQgdGhlIGRlcGVuZGVuY2llcyBleGlzdCBmb3IgdGhlIGxpZmV0aW1lIG9mIHRoZSBzaW1cclxuICAgIE11bHRpbGluay5tdWx0aWxpbmsoIFsgbWFzcy5lcXVpbGlicml1bVBvc2l0aW9uUHJvcGVydHksIG1hc3MuZGlzcGxhY2VtZW50UHJvcGVydHkgXSxcclxuICAgICAgKCBtYXNzUG9zaXRpb24sIG1hc3NEaXNwbGFjZW1lbnQgKSA9PiB7XHJcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvbiA9IG1vZGVsVmlld1RyYW5zZm9ybS5tb2RlbFRvVmlld1Bvc2l0aW9uKCBtYXNzUG9zaXRpb24ucGx1cyggbWFzc0Rpc3BsYWNlbWVudCApICk7XHJcbiAgICAgIH0gKTtcclxuXHJcbiAgICAvLyBUT0RPIGh0dHBzOi8vZ2l0aHViLmNvbS9waGV0c2ltcy9ub3JtYWwtbW9kZXMvaXNzdWVzLzM4IG1hZ2ljIG51bWJlcnNcclxuICAgIGNvbnN0IGFycm93T3B0aW9ucyA9IG1lcmdlKCB7XHJcbiAgICAgIGJvdW5kc01ldGhvZDogJ3Vuc3Ryb2tlZCcsXHJcbiAgICAgIGxpbmVXaWR0aDogMixcclxuICAgICAgdGFpbFdpZHRoOiAxMCxcclxuICAgICAgaGVhZFdpZHRoOiAyMCxcclxuICAgICAgaGVhZEhlaWdodDogMTYsXHJcbiAgICAgIHZpc2libGU6IGZhbHNlLFxyXG4gICAgICBleGNsdWRlSW52aXNpYmxlOiB0cnVlXHJcbiAgICB9LCBOb3JtYWxNb2Rlc0NvbG9ycy5BUlJPV19DT0xPUlMgKTtcclxuXHJcbiAgICBjb25zdCBhcnJvd1NpemUgPSAyMztcclxuXHJcbiAgICAvLyBAcHVibGljIHtPYmplY3R9XHJcbiAgICB0aGlzLmFycm93cyA9IHtcclxuICAgICAgbGVmdDogbmV3IEFycm93Tm9kZSggLXRoaXMuc2l6ZSAvIDIsIDAsIC10aGlzLnNpemUgLyAyIC0gYXJyb3dTaXplLCAwLCBhcnJvd09wdGlvbnMgKSxcclxuICAgICAgcmlnaHQ6IG5ldyBBcnJvd05vZGUoIHRoaXMuc2l6ZSAvIDIsIDAsIHRoaXMuc2l6ZSAvIDIgKyBhcnJvd1NpemUsIDAsIGFycm93T3B0aW9ucyApLFxyXG5cclxuICAgICAgdG9wOiBuZXcgQXJyb3dOb2RlKCAwLCAtdGhpcy5zaXplIC8gMiwgMCwgLXRoaXMuc2l6ZSAvIDIgLSBhcnJvd1NpemUsIGFycm93T3B0aW9ucyApLFxyXG4gICAgICBib3R0b206IG5ldyBBcnJvd05vZGUoIDAsIHRoaXMuc2l6ZSAvIDIsIDAsIHRoaXMuc2l6ZSAvIDIgKyBhcnJvd1NpemUsIGFycm93T3B0aW9ucyApXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuYWRkQ2hpbGQoIHRoaXMuYXJyb3dzLmxlZnQgKTtcclxuICAgIHRoaXMuYWRkQ2hpbGQoIHRoaXMuYXJyb3dzLnRvcCApO1xyXG4gICAgdGhpcy5hZGRDaGlsZCggdGhpcy5hcnJvd3MucmlnaHQgKTtcclxuICAgIHRoaXMuYWRkQ2hpbGQoIHRoaXMuYXJyb3dzLmJvdHRvbSApO1xyXG5cclxuICAgIG1hc3MudmlzaWJsZVByb3BlcnR5LmxpbmtBdHRyaWJ1dGUoIHRoaXMsICd2aXNpYmxlJyApO1xyXG4gIH1cclxufVxyXG5cclxubm9ybWFsTW9kZXMucmVnaXN0ZXIoICdNYXNzTm9kZScsIE1hc3NOb2RlICk7XHJcbmV4cG9ydCBkZWZhdWx0IE1hc3NOb2RlOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLFNBQVMsTUFBTSxrQ0FBa0M7QUFDeEQsT0FBT0MsS0FBSyxNQUFNLG1DQUFtQztBQUNyRCxPQUFPQyxTQUFTLE1BQU0sMENBQTBDO0FBQ2hFLFNBQVNDLElBQUksUUFBUSxtQ0FBbUM7QUFDeEQsT0FBT0MsV0FBVyxNQUFNLHNCQUFzQjtBQUM5QyxPQUFPQyxpQkFBaUIsTUFBTSx5QkFBeUI7QUFFdkQsTUFBTUMsUUFBUSxTQUFTSCxJQUFJLENBQUM7RUFFMUI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtFQUNFSSxXQUFXQSxDQUFFQyxJQUFJLEVBQUVDLGtCQUFrQixFQUFFQyxNQUFNLEVBQUc7SUFDOUMsS0FBSyxDQUFFO01BQUVDLE1BQU0sRUFBRTtJQUFVLENBQUUsQ0FBQzs7SUFFOUI7SUFDQSxJQUFJLENBQUNDLElBQUksR0FBRyxFQUFFOztJQUVkO0lBQ0FaLFNBQVMsQ0FBQ2EsU0FBUyxDQUFFLENBQUVMLElBQUksQ0FBQ00sMkJBQTJCLEVBQUVOLElBQUksQ0FBQ08sb0JBQW9CLENBQUUsRUFDbEYsQ0FBRUMsWUFBWSxFQUFFQyxnQkFBZ0IsS0FBTTtNQUNwQyxJQUFJLENBQUNDLFdBQVcsR0FBR1Qsa0JBQWtCLENBQUNVLG1CQUFtQixDQUFFSCxZQUFZLENBQUNJLElBQUksQ0FBRUgsZ0JBQWlCLENBQUUsQ0FBQztJQUNwRyxDQUFFLENBQUM7O0lBRUw7SUFDQSxNQUFNSSxZQUFZLEdBQUdwQixLQUFLLENBQUU7TUFDMUJxQixZQUFZLEVBQUUsV0FBVztNQUN6QkMsU0FBUyxFQUFFLENBQUM7TUFDWkMsU0FBUyxFQUFFLEVBQUU7TUFDYkMsU0FBUyxFQUFFLEVBQUU7TUFDYkMsVUFBVSxFQUFFLEVBQUU7TUFDZEMsT0FBTyxFQUFFLEtBQUs7TUFDZEMsZ0JBQWdCLEVBQUU7SUFDcEIsQ0FBQyxFQUFFdkIsaUJBQWlCLENBQUN3QixZQUFhLENBQUM7SUFFbkMsTUFBTUMsU0FBUyxHQUFHLEVBQUU7O0lBRXBCO0lBQ0EsSUFBSSxDQUFDQyxNQUFNLEdBQUc7TUFDWkMsSUFBSSxFQUFFLElBQUk5QixTQUFTLENBQUUsQ0FBQyxJQUFJLENBQUNVLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDQSxJQUFJLEdBQUcsQ0FBQyxHQUFHa0IsU0FBUyxFQUFFLENBQUMsRUFBRVQsWUFBYSxDQUFDO01BQ3JGWSxLQUFLLEVBQUUsSUFBSS9CLFNBQVMsQ0FBRSxJQUFJLENBQUNVLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQ0EsSUFBSSxHQUFHLENBQUMsR0FBR2tCLFNBQVMsRUFBRSxDQUFDLEVBQUVULFlBQWEsQ0FBQztNQUVwRmEsR0FBRyxFQUFFLElBQUloQyxTQUFTLENBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDVSxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQ0EsSUFBSSxHQUFHLENBQUMsR0FBR2tCLFNBQVMsRUFBRVQsWUFBYSxDQUFDO01BQ3BGYyxNQUFNLEVBQUUsSUFBSWpDLFNBQVMsQ0FBRSxDQUFDLEVBQUUsSUFBSSxDQUFDVSxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUNBLElBQUksR0FBRyxDQUFDLEdBQUdrQixTQUFTLEVBQUVULFlBQWE7SUFDdEYsQ0FBQztJQUVELElBQUksQ0FBQ2UsUUFBUSxDQUFFLElBQUksQ0FBQ0wsTUFBTSxDQUFDQyxJQUFLLENBQUM7SUFDakMsSUFBSSxDQUFDSSxRQUFRLENBQUUsSUFBSSxDQUFDTCxNQUFNLENBQUNHLEdBQUksQ0FBQztJQUNoQyxJQUFJLENBQUNFLFFBQVEsQ0FBRSxJQUFJLENBQUNMLE1BQU0sQ0FBQ0UsS0FBTSxDQUFDO0lBQ2xDLElBQUksQ0FBQ0csUUFBUSxDQUFFLElBQUksQ0FBQ0wsTUFBTSxDQUFDSSxNQUFPLENBQUM7SUFFbkMzQixJQUFJLENBQUM2QixlQUFlLENBQUNDLGFBQWEsQ0FBRSxJQUFJLEVBQUUsU0FBVSxDQUFDO0VBQ3ZEO0FBQ0Y7QUFFQWxDLFdBQVcsQ0FBQ21DLFFBQVEsQ0FBRSxVQUFVLEVBQUVqQyxRQUFTLENBQUM7QUFDNUMsZUFBZUEsUUFBUSJ9