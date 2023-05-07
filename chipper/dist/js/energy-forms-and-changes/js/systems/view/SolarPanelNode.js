// Copyright 2016-2022, University of Colorado Boulder

/**
 * a Scenery Node that depicts a solar panel in the view
 *
 * @author John Blanco
 * @author Andrew Adare
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import { Shape } from '../../../../kite/js/imports.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Image, Path } from '../../../../scenery/js/imports.js';
import connector_png from '../../../images/connector_png.js';
import solarPanel_png from '../../../images/solarPanel_png.js';
import solarPanelGen_png from '../../../images/solarPanelGen_png.js';
import solarPanelPost_png from '../../../images/solarPanelPost_png.js';
import wireBottomLeft_png from '../../../images/wireBottomLeft_png.js';
import EFACConstants from '../../common/EFACConstants.js';
import EFACQueryParameters from '../../common/EFACQueryParameters.js';
import EnergyChunkLayer from '../../common/view/EnergyChunkLayer.js';
import energyFormsAndChanges from '../../energyFormsAndChanges.js';
import SolarPanel from '../model/SolarPanel.js';
import MoveFadeModelElementNode from './MoveFadeModelElementNode.js';
class SolarPanelNode extends MoveFadeModelElementNode {
  /**
   * @param {SolarPanel} solarPanel - model of a solar panel
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Tandem} tandem
   */
  constructor(solarPanel, modelViewTransform, tandem) {
    super(solarPanel, modelViewTransform, tandem);

    // create a scale-only MVT since the absorption shape is relatively positioned
    const scaleOnlyMVT = ModelViewTransform2.createSinglePointScaleInvertedYMapping(Vector2.ZERO, Vector2.ZERO, modelViewTransform.getMatrix().getScaleVector().x);

    // Add an image for the actual panel portion, i.e. the part that collects the solar energy.  The aspect ratio of
    // the image should be reasonably close to the shape described by the model to avoid visual distortion.
    const panelNode = new Image(solarPanel_png);
    panelNode.scale(modelViewTransform.modelToViewDeltaX(solarPanel.untranslatedPanelBounds.width) / panelNode.width, -modelViewTransform.modelToViewDeltaY(solarPanel.untranslatedPanelBounds.height) / panelNode.height);
    panelNode.center = scaleOnlyMVT.modelToViewPosition(solarPanel.untranslatedPanelBounds.center);

    // add the other portions of the solar panel assembly
    const postNode = new Image(solarPanelPost_png, {
      centerX: modelViewTransform.modelToViewDeltaX(SolarPanel.PANEL_CONNECTOR_OFFSET.x),
      top: panelNode.bottom - 5
    });
    const windowNode = new Image(solarPanelGen_png, {
      centerX: postNode.centerX,
      top: postNode.centerY
    });
    const wireBottomLeftNode = new Image(wireBottomLeft_png, {
      right: windowNode.right - 20,
      bottom: windowNode.centerY + 13,
      scale: EFACConstants.WIRE_IMAGE_SCALE
    });
    const connectorNode = new Image(connector_png, {
      left: windowNode.right - 2,
      centerY: windowNode.centerY
    });

    // add in correct order for layering effect
    this.addChild(wireBottomLeftNode);
    this.addChild(postNode);
    this.addChild(panelNode);
    this.addChild(new EnergyChunkLayer(solarPanel.energyChunkList, modelViewTransform, {
      parentPositionProperty: solarPanel.positionProperty
    }));
    this.addChild(windowNode);
    this.addChild(connectorNode);

    // for debug
    if (EFACQueryParameters.showHelperShapes) {
      // add a shape that shows the bounds of the collection area
      const panelBoundsShape = Shape.rect(solarPanel.untranslatedPanelBounds.minX, solarPanel.untranslatedPanelBounds.minY, solarPanel.untranslatedPanelBounds.width, solarPanel.untranslatedPanelBounds.height);
      this.addChild(new Path(scaleOnlyMVT.modelToViewShape(panelBoundsShape), {
        stroke: 'green'
      }));

      // add a shape that shows where light energy chunks should be absorbed
      this.addChild(new Path(scaleOnlyMVT.modelToViewShape(solarPanel.untranslatedAbsorptionShape), {
        stroke: 'red',
        lineJoin: 'round'
      }));

      // create a marker the shows where the center of the node is
      const crossLength = 15;
      const crossShape = new Shape().moveTo(-crossLength / 2, 0).lineTo(crossLength / 2, 0).moveTo(0, -crossLength / 2).lineTo(0, crossLength / 2);
      this.addChild(new Path(crossShape, {
        stroke: 'red',
        lineWidth: 3
      }));
    }
  }
}
energyFormsAndChanges.register('SolarPanelNode', SolarPanelNode);
export default SolarPanelNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWZWN0b3IyIiwiU2hhcGUiLCJNb2RlbFZpZXdUcmFuc2Zvcm0yIiwiSW1hZ2UiLCJQYXRoIiwiY29ubmVjdG9yX3BuZyIsInNvbGFyUGFuZWxfcG5nIiwic29sYXJQYW5lbEdlbl9wbmciLCJzb2xhclBhbmVsUG9zdF9wbmciLCJ3aXJlQm90dG9tTGVmdF9wbmciLCJFRkFDQ29uc3RhbnRzIiwiRUZBQ1F1ZXJ5UGFyYW1ldGVycyIsIkVuZXJneUNodW5rTGF5ZXIiLCJlbmVyZ3lGb3Jtc0FuZENoYW5nZXMiLCJTb2xhclBhbmVsIiwiTW92ZUZhZGVNb2RlbEVsZW1lbnROb2RlIiwiU29sYXJQYW5lbE5vZGUiLCJjb25zdHJ1Y3RvciIsInNvbGFyUGFuZWwiLCJtb2RlbFZpZXdUcmFuc2Zvcm0iLCJ0YW5kZW0iLCJzY2FsZU9ubHlNVlQiLCJjcmVhdGVTaW5nbGVQb2ludFNjYWxlSW52ZXJ0ZWRZTWFwcGluZyIsIlpFUk8iLCJnZXRNYXRyaXgiLCJnZXRTY2FsZVZlY3RvciIsIngiLCJwYW5lbE5vZGUiLCJzY2FsZSIsIm1vZGVsVG9WaWV3RGVsdGFYIiwidW50cmFuc2xhdGVkUGFuZWxCb3VuZHMiLCJ3aWR0aCIsIm1vZGVsVG9WaWV3RGVsdGFZIiwiaGVpZ2h0IiwiY2VudGVyIiwibW9kZWxUb1ZpZXdQb3NpdGlvbiIsInBvc3ROb2RlIiwiY2VudGVyWCIsIlBBTkVMX0NPTk5FQ1RPUl9PRkZTRVQiLCJ0b3AiLCJib3R0b20iLCJ3aW5kb3dOb2RlIiwiY2VudGVyWSIsIndpcmVCb3R0b21MZWZ0Tm9kZSIsInJpZ2h0IiwiV0lSRV9JTUFHRV9TQ0FMRSIsImNvbm5lY3Rvck5vZGUiLCJsZWZ0IiwiYWRkQ2hpbGQiLCJlbmVyZ3lDaHVua0xpc3QiLCJwYXJlbnRQb3NpdGlvblByb3BlcnR5IiwicG9zaXRpb25Qcm9wZXJ0eSIsInNob3dIZWxwZXJTaGFwZXMiLCJwYW5lbEJvdW5kc1NoYXBlIiwicmVjdCIsIm1pblgiLCJtaW5ZIiwibW9kZWxUb1ZpZXdTaGFwZSIsInN0cm9rZSIsInVudHJhbnNsYXRlZEFic29ycHRpb25TaGFwZSIsImxpbmVKb2luIiwiY3Jvc3NMZW5ndGgiLCJjcm9zc1NoYXBlIiwibW92ZVRvIiwibGluZVRvIiwibGluZVdpZHRoIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJTb2xhclBhbmVsTm9kZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNi0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBhIFNjZW5lcnkgTm9kZSB0aGF0IGRlcGljdHMgYSBzb2xhciBwYW5lbCBpbiB0aGUgdmlld1xyXG4gKlxyXG4gKiBAYXV0aG9yIEpvaG4gQmxhbmNvXHJcbiAqIEBhdXRob3IgQW5kcmV3IEFkYXJlXHJcbiAqIEBhdXRob3IgQ2hyaXMgS2x1c2VuZG9yZiAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgVmVjdG9yMiBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvVmVjdG9yMi5qcyc7XHJcbmltcG9ydCB7IFNoYXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4va2l0ZS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IE1vZGVsVmlld1RyYW5zZm9ybTIgZnJvbSAnLi4vLi4vLi4vLi4vcGhldGNvbW1vbi9qcy92aWV3L01vZGVsVmlld1RyYW5zZm9ybTIuanMnO1xyXG5pbXBvcnQgeyBJbWFnZSwgUGF0aCB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBjb25uZWN0b3JfcG5nIGZyb20gJy4uLy4uLy4uL2ltYWdlcy9jb25uZWN0b3JfcG5nLmpzJztcclxuaW1wb3J0IHNvbGFyUGFuZWxfcG5nIGZyb20gJy4uLy4uLy4uL2ltYWdlcy9zb2xhclBhbmVsX3BuZy5qcyc7XHJcbmltcG9ydCBzb2xhclBhbmVsR2VuX3BuZyBmcm9tICcuLi8uLi8uLi9pbWFnZXMvc29sYXJQYW5lbEdlbl9wbmcuanMnO1xyXG5pbXBvcnQgc29sYXJQYW5lbFBvc3RfcG5nIGZyb20gJy4uLy4uLy4uL2ltYWdlcy9zb2xhclBhbmVsUG9zdF9wbmcuanMnO1xyXG5pbXBvcnQgd2lyZUJvdHRvbUxlZnRfcG5nIGZyb20gJy4uLy4uLy4uL2ltYWdlcy93aXJlQm90dG9tTGVmdF9wbmcuanMnO1xyXG5pbXBvcnQgRUZBQ0NvbnN0YW50cyBmcm9tICcuLi8uLi9jb21tb24vRUZBQ0NvbnN0YW50cy5qcyc7XHJcbmltcG9ydCBFRkFDUXVlcnlQYXJhbWV0ZXJzIGZyb20gJy4uLy4uL2NvbW1vbi9FRkFDUXVlcnlQYXJhbWV0ZXJzLmpzJztcclxuaW1wb3J0IEVuZXJneUNodW5rTGF5ZXIgZnJvbSAnLi4vLi4vY29tbW9uL3ZpZXcvRW5lcmd5Q2h1bmtMYXllci5qcyc7XHJcbmltcG9ydCBlbmVyZ3lGb3Jtc0FuZENoYW5nZXMgZnJvbSAnLi4vLi4vZW5lcmd5Rm9ybXNBbmRDaGFuZ2VzLmpzJztcclxuaW1wb3J0IFNvbGFyUGFuZWwgZnJvbSAnLi4vbW9kZWwvU29sYXJQYW5lbC5qcyc7XHJcbmltcG9ydCBNb3ZlRmFkZU1vZGVsRWxlbWVudE5vZGUgZnJvbSAnLi9Nb3ZlRmFkZU1vZGVsRWxlbWVudE5vZGUuanMnO1xyXG5cclxuY2xhc3MgU29sYXJQYW5lbE5vZGUgZXh0ZW5kcyBNb3ZlRmFkZU1vZGVsRWxlbWVudE5vZGUge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1NvbGFyUGFuZWx9IHNvbGFyUGFuZWwgLSBtb2RlbCBvZiBhIHNvbGFyIHBhbmVsXHJcbiAgICogQHBhcmFtIHtNb2RlbFZpZXdUcmFuc2Zvcm0yfSBtb2RlbFZpZXdUcmFuc2Zvcm1cclxuICAgKiBAcGFyYW0ge1RhbmRlbX0gdGFuZGVtXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoIHNvbGFyUGFuZWwsIG1vZGVsVmlld1RyYW5zZm9ybSwgdGFuZGVtICkge1xyXG4gICAgc3VwZXIoIHNvbGFyUGFuZWwsIG1vZGVsVmlld1RyYW5zZm9ybSwgdGFuZGVtICk7XHJcblxyXG4gICAgLy8gY3JlYXRlIGEgc2NhbGUtb25seSBNVlQgc2luY2UgdGhlIGFic29ycHRpb24gc2hhcGUgaXMgcmVsYXRpdmVseSBwb3NpdGlvbmVkXHJcbiAgICBjb25zdCBzY2FsZU9ubHlNVlQgPSBNb2RlbFZpZXdUcmFuc2Zvcm0yLmNyZWF0ZVNpbmdsZVBvaW50U2NhbGVJbnZlcnRlZFlNYXBwaW5nKFxyXG4gICAgICBWZWN0b3IyLlpFUk8sXHJcbiAgICAgIFZlY3RvcjIuWkVSTyxcclxuICAgICAgbW9kZWxWaWV3VHJhbnNmb3JtLmdldE1hdHJpeCgpLmdldFNjYWxlVmVjdG9yKCkueFxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBBZGQgYW4gaW1hZ2UgZm9yIHRoZSBhY3R1YWwgcGFuZWwgcG9ydGlvbiwgaS5lLiB0aGUgcGFydCB0aGF0IGNvbGxlY3RzIHRoZSBzb2xhciBlbmVyZ3kuICBUaGUgYXNwZWN0IHJhdGlvIG9mXHJcbiAgICAvLyB0aGUgaW1hZ2Ugc2hvdWxkIGJlIHJlYXNvbmFibHkgY2xvc2UgdG8gdGhlIHNoYXBlIGRlc2NyaWJlZCBieSB0aGUgbW9kZWwgdG8gYXZvaWQgdmlzdWFsIGRpc3RvcnRpb24uXHJcbiAgICBjb25zdCBwYW5lbE5vZGUgPSBuZXcgSW1hZ2UoIHNvbGFyUGFuZWxfcG5nICk7XHJcbiAgICBwYW5lbE5vZGUuc2NhbGUoXHJcbiAgICAgIG1vZGVsVmlld1RyYW5zZm9ybS5tb2RlbFRvVmlld0RlbHRhWCggc29sYXJQYW5lbC51bnRyYW5zbGF0ZWRQYW5lbEJvdW5kcy53aWR0aCApIC8gcGFuZWxOb2RlLndpZHRoLFxyXG4gICAgICAtbW9kZWxWaWV3VHJhbnNmb3JtLm1vZGVsVG9WaWV3RGVsdGFZKCBzb2xhclBhbmVsLnVudHJhbnNsYXRlZFBhbmVsQm91bmRzLmhlaWdodCApIC8gcGFuZWxOb2RlLmhlaWdodFxyXG4gICAgKTtcclxuICAgIHBhbmVsTm9kZS5jZW50ZXIgPSBzY2FsZU9ubHlNVlQubW9kZWxUb1ZpZXdQb3NpdGlvbiggc29sYXJQYW5lbC51bnRyYW5zbGF0ZWRQYW5lbEJvdW5kcy5jZW50ZXIgKTtcclxuXHJcbiAgICAvLyBhZGQgdGhlIG90aGVyIHBvcnRpb25zIG9mIHRoZSBzb2xhciBwYW5lbCBhc3NlbWJseVxyXG4gICAgY29uc3QgcG9zdE5vZGUgPSBuZXcgSW1hZ2UoIHNvbGFyUGFuZWxQb3N0X3BuZywge1xyXG4gICAgICBjZW50ZXJYOiBtb2RlbFZpZXdUcmFuc2Zvcm0ubW9kZWxUb1ZpZXdEZWx0YVgoIFNvbGFyUGFuZWwuUEFORUxfQ09OTkVDVE9SX09GRlNFVC54ICksXHJcbiAgICAgIHRvcDogcGFuZWxOb2RlLmJvdHRvbSAtIDVcclxuICAgIH0gKTtcclxuICAgIGNvbnN0IHdpbmRvd05vZGUgPSBuZXcgSW1hZ2UoIHNvbGFyUGFuZWxHZW5fcG5nLCB7XHJcbiAgICAgIGNlbnRlclg6IHBvc3ROb2RlLmNlbnRlclgsXHJcbiAgICAgIHRvcDogcG9zdE5vZGUuY2VudGVyWVxyXG4gICAgfSApO1xyXG4gICAgY29uc3Qgd2lyZUJvdHRvbUxlZnROb2RlID0gbmV3IEltYWdlKCB3aXJlQm90dG9tTGVmdF9wbmcsIHtcclxuICAgICAgcmlnaHQ6IHdpbmRvd05vZGUucmlnaHQgLSAyMCxcclxuICAgICAgYm90dG9tOiB3aW5kb3dOb2RlLmNlbnRlclkgKyAxMyxcclxuICAgICAgc2NhbGU6IEVGQUNDb25zdGFudHMuV0lSRV9JTUFHRV9TQ0FMRVxyXG4gICAgfSApO1xyXG4gICAgY29uc3QgY29ubmVjdG9yTm9kZSA9IG5ldyBJbWFnZSggY29ubmVjdG9yX3BuZywgeyBsZWZ0OiB3aW5kb3dOb2RlLnJpZ2h0IC0gMiwgY2VudGVyWTogd2luZG93Tm9kZS5jZW50ZXJZIH0gKTtcclxuXHJcbiAgICAvLyBhZGQgaW4gY29ycmVjdCBvcmRlciBmb3IgbGF5ZXJpbmcgZWZmZWN0XHJcbiAgICB0aGlzLmFkZENoaWxkKCB3aXJlQm90dG9tTGVmdE5vZGUgKTtcclxuICAgIHRoaXMuYWRkQ2hpbGQoIHBvc3ROb2RlICk7XHJcbiAgICB0aGlzLmFkZENoaWxkKCBwYW5lbE5vZGUgKTtcclxuICAgIHRoaXMuYWRkQ2hpbGQoIG5ldyBFbmVyZ3lDaHVua0xheWVyKCBzb2xhclBhbmVsLmVuZXJneUNodW5rTGlzdCwgbW9kZWxWaWV3VHJhbnNmb3JtLCB7XHJcbiAgICAgIHBhcmVudFBvc2l0aW9uUHJvcGVydHk6IHNvbGFyUGFuZWwucG9zaXRpb25Qcm9wZXJ0eVxyXG4gICAgfSApICk7XHJcbiAgICB0aGlzLmFkZENoaWxkKCB3aW5kb3dOb2RlICk7XHJcbiAgICB0aGlzLmFkZENoaWxkKCBjb25uZWN0b3JOb2RlICk7XHJcblxyXG4gICAgLy8gZm9yIGRlYnVnXHJcbiAgICBpZiAoIEVGQUNRdWVyeVBhcmFtZXRlcnMuc2hvd0hlbHBlclNoYXBlcyApIHtcclxuXHJcbiAgICAgIC8vIGFkZCBhIHNoYXBlIHRoYXQgc2hvd3MgdGhlIGJvdW5kcyBvZiB0aGUgY29sbGVjdGlvbiBhcmVhXHJcbiAgICAgIGNvbnN0IHBhbmVsQm91bmRzU2hhcGUgPSBTaGFwZS5yZWN0KFxyXG4gICAgICAgIHNvbGFyUGFuZWwudW50cmFuc2xhdGVkUGFuZWxCb3VuZHMubWluWCxcclxuICAgICAgICBzb2xhclBhbmVsLnVudHJhbnNsYXRlZFBhbmVsQm91bmRzLm1pblksXHJcbiAgICAgICAgc29sYXJQYW5lbC51bnRyYW5zbGF0ZWRQYW5lbEJvdW5kcy53aWR0aCxcclxuICAgICAgICBzb2xhclBhbmVsLnVudHJhbnNsYXRlZFBhbmVsQm91bmRzLmhlaWdodFxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLmFkZENoaWxkKCBuZXcgUGF0aCggc2NhbGVPbmx5TVZULm1vZGVsVG9WaWV3U2hhcGUoIHBhbmVsQm91bmRzU2hhcGUgKSwge1xyXG4gICAgICAgIHN0cm9rZTogJ2dyZWVuJ1xyXG4gICAgICB9ICkgKTtcclxuXHJcbiAgICAgIC8vIGFkZCBhIHNoYXBlIHRoYXQgc2hvd3Mgd2hlcmUgbGlnaHQgZW5lcmd5IGNodW5rcyBzaG91bGQgYmUgYWJzb3JiZWRcclxuICAgICAgdGhpcy5hZGRDaGlsZCggbmV3IFBhdGgoIHNjYWxlT25seU1WVC5tb2RlbFRvVmlld1NoYXBlKCBzb2xhclBhbmVsLnVudHJhbnNsYXRlZEFic29ycHRpb25TaGFwZSApLCB7XHJcbiAgICAgICAgc3Ryb2tlOiAncmVkJyxcclxuICAgICAgICBsaW5lSm9pbjogJ3JvdW5kJ1xyXG4gICAgICB9ICkgKTtcclxuXHJcbiAgICAgIC8vIGNyZWF0ZSBhIG1hcmtlciB0aGUgc2hvd3Mgd2hlcmUgdGhlIGNlbnRlciBvZiB0aGUgbm9kZSBpc1xyXG4gICAgICBjb25zdCBjcm9zc0xlbmd0aCA9IDE1O1xyXG4gICAgICBjb25zdCBjcm9zc1NoYXBlID0gbmV3IFNoYXBlKClcclxuICAgICAgICAubW92ZVRvKCAtY3Jvc3NMZW5ndGggLyAyLCAwIClcclxuICAgICAgICAubGluZVRvKCBjcm9zc0xlbmd0aCAvIDIsIDAgKVxyXG4gICAgICAgIC5tb3ZlVG8oIDAsIC1jcm9zc0xlbmd0aCAvIDIgKVxyXG4gICAgICAgIC5saW5lVG8oIDAsIGNyb3NzTGVuZ3RoIC8gMiApO1xyXG4gICAgICB0aGlzLmFkZENoaWxkKCBuZXcgUGF0aCggY3Jvc3NTaGFwZSwge1xyXG4gICAgICAgIHN0cm9rZTogJ3JlZCcsXHJcbiAgICAgICAgbGluZVdpZHRoOiAzXHJcbiAgICAgIH0gKSApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZW5lcmd5Rm9ybXNBbmRDaGFuZ2VzLnJlZ2lzdGVyKCAnU29sYXJQYW5lbE5vZGUnLCBTb2xhclBhbmVsTm9kZSApO1xyXG5leHBvcnQgZGVmYXVsdCBTb2xhclBhbmVsTm9kZTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLE9BQU8sTUFBTSwrQkFBK0I7QUFDbkQsU0FBU0MsS0FBSyxRQUFRLGdDQUFnQztBQUN0RCxPQUFPQyxtQkFBbUIs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