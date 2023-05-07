// Copyright 2017-2022, University of Colorado Boulder

/**
 * Displays tiles for a partitioned area.
 *
 * NOTE: This type is designed to be persistent, and will not need to release references to avoid memory leaks.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Utils from '../../../../dot/js/Utils.js';
import { Shape } from '../../../../kite/js/imports.js';
import Orientation from '../../../../phet-core/js/Orientation.js';
import { Node, Path } from '../../../../scenery/js/imports.js';
import areaModelCommon from '../../areaModelCommon.js';
import AreaModelCommonColors from '../../common/view/AreaModelCommonColors.js';
class TiledAreaNode extends Node {
  /**
   * @param {ProportionalAreaDisplay} areaDisplay
   * @param {Property.<ModelViewTransform2>} modelViewTransformProperty
   * @param {Property.<boolean>} tilesVisibleProperty
   */
  constructor(areaDisplay, modelViewTransformProperty, tilesVisibleProperty) {
    super();

    // @private {Property.<ProportionalArea>}
    this.areaDisplay = areaDisplay;

    // @private {Property.<ModelViewTransform2>}
    this.modelViewTransformProperty = modelViewTransformProperty;

    // @private {Property.<boolean>}
    this.tilesVisibleProperty = tilesVisibleProperty;

    // @private {Property.<number>}
    this.smallTileSizeProperty = areaDisplay.smallTileSizeProperty;
    this.largeTileSizeProperty = areaDisplay.largeTileSizeProperty;
    this.maximumSizeProperty = areaDisplay.maximumSizeProperty;

    // @private {boolean} - Whether we should be redrawn
    this.dirty = true;

    // Things we depend on
    const invalidate = () => {
      this.dirty = true;
    };
    tilesVisibleProperty.lazyLink(invalidate);
    modelViewTransformProperty.lazyLink(invalidate);
    this.smallTileSizeProperty.lazyLink(invalidate);
    this.largeTileSizeProperty.lazyLink(invalidate);
    areaDisplay.allPartitionsProperty.link((partitions, oldPartitions) => {
      oldPartitions && oldPartitions.forEach(partition => {
        partition.visibleProperty.unlink(invalidate);
        partition.coordinateRangeProperty.unlink(invalidate);
      });
      partitions.forEach(partition => {
        partition.visibleProperty.link(invalidate);
        partition.coordinateRangeProperty.link(invalidate);
      });
      invalidate();
    });
    invalidate();

    // @private {Path} - Background color paths for each section
    this.bigPath = new Path(null, {
      fill: AreaModelCommonColors.bigTileProperty
    });
    this.horizontalPath = new Path(null, {
      fill: AreaModelCommonColors.mediumTileProperty
    });
    this.verticalPath = new Path(null, {
      fill: AreaModelCommonColors.mediumTileProperty
    });
    this.smallPath = new Path(null, {
      fill: AreaModelCommonColors.smallTileProperty
    });

    // @private {Path} - Grid line paths. We'll use clipping to control where they are visible
    this.smallGridPath = new Path(null, {
      stroke: AreaModelCommonColors.tileBorderProperty
    });
    this.horizontalGridPath = new Path(null, {
      stroke: AreaModelCommonColors.tileBorderProperty
    });
    this.verticalGridPath = new Path(null, {
      stroke: AreaModelCommonColors.tileBorderProperty
    });
    Multilink.multilink([modelViewTransformProperty, this.maximumSizeProperty, this.smallTileSizeProperty], (modelViewTransform, maximumSize, smallTileSize) => {
      // Grid line shapes
      const smallGridShape = new Shape();
      const horizontalGridShape = new Shape();
      const verticalGridShape = new Shape();
      const maxX = modelViewTransform.modelToViewX(maximumSize);
      const maxY = modelViewTransform.modelToViewY(maximumSize);

      // We need the grid lines to extend out past each side a bit for correct appearance
      for (let i = -1; i < maximumSize / smallTileSize + 1; i++) {
        const x = modelViewTransform.modelToViewX(i * smallTileSize);
        const y = modelViewTransform.modelToViewY(i * smallTileSize);
        smallGridShape.moveTo(x, 0).lineTo(x, maxY);
        smallGridShape.moveTo(0, y).lineTo(maxX, y);
        verticalGridShape.moveTo(x, 0).lineTo(x, maxY);
        horizontalGridShape.moveTo(0, y).lineTo(maxX, y);
      }

      // Made immutable for potential performance gains
      this.smallGridPath.shape = smallGridShape.makeImmutable();
      this.horizontalGridPath.shape = horizontalGridShape.makeImmutable();
      this.verticalGridPath.shape = verticalGridShape.makeImmutable();
    });

    // @private {Path} - Contains extra overlay lines to fill in the 'stroked' appearance.
    this.extraLinesPath = new Path(null, {
      stroke: AreaModelCommonColors.tileBorderProperty
    });
    this.mutate({
      children: [this.bigPath, this.horizontalPath, this.verticalPath, this.smallPath, this.smallGridPath, this.horizontalGridPath, this.verticalGridPath, this.extraLinesPath]
    });
  }

  /**
   * For each partition of a particular orientation, fires the callback with range information already in view
   * coordinates.
   * @private
   *
   * @param {Orientation} orientation
   * @param {function} callback - callback( largeCount, smallCount, min, border, max )
   */
  forEachPartition(orientation, callback) {
    this.areaDisplay.partitionsProperties.get(orientation).value.forEach(partition => {
      const range = partition.coordinateRangeProperty.value;

      // Ignore partitions without a visible well-defined range.
      if (!partition.visibleProperty.value || range === null) {
        return;
      }
      const size = range.getLength();
      const largeCount = Math.floor(Utils.toFixedNumber(size / this.largeTileSizeProperty.value, 3));
      const smallCount = Utils.roundSymmetric((size - this.largeTileSizeProperty.value * largeCount) / this.smallTileSizeProperty.value);
      const min = orientation.modelToView(this.modelViewTransformProperty.value, range.min);
      const border = orientation.modelToView(this.modelViewTransformProperty.value, range.min + largeCount * this.largeTileSizeProperty.value);
      const max = orientation.modelToView(this.modelViewTransformProperty.value, range.max);
      callback(largeCount, smallCount, min, border, max);
    });
  }

  /**
   * Updates the view for tiled areas (since it is somewhat expensive to re-draw, and we don't want it being done
   * multiple times per frame.
   * @private
   */
  update() {
    // Ignore updates if we are not dirty
    if (!this.dirty) {
      return;
    }
    this.dirty = false;

    // Coordinate mapping into the view
    const modelToViewX = this.modelViewTransformProperty.value.modelToViewX.bind(this.modelViewTransformProperty.value);
    const modelToViewY = this.modelViewTransformProperty.value.modelToViewY.bind(this.modelViewTransformProperty.value);
    const largeTileSize = this.largeTileSizeProperty.value;
    const maximumSize = this.maximumSizeProperty.value;
    this.visible = this.tilesVisibleProperty.value;
    const bigShape = new Shape();
    const horizontalShape = new Shape();
    const verticalShape = new Shape();
    const smallShape = new Shape();
    const extraLinesShape = new Shape();
    this.forEachPartition(Orientation.HORIZONTAL, (horizontalLargeCount, horizontalSmallCount, xMin, xBorder, xMax) => {
      this.forEachPartition(Orientation.VERTICAL, (verticalLargeCount, verticalSmallCount, yMin, yBorder, yMax) => {
        // Add in extra lines on the far sides of large sections.
        let i;
        for (i = 0; i < horizontalLargeCount; i++) {
          const x = xMin + modelToViewX((i + 1) * largeTileSize);
          extraLinesShape.moveTo(x, 0).lineTo(x, modelToViewY(maximumSize));
        }
        for (i = 0; i < verticalLargeCount; i++) {
          const y = yMin + modelToViewY((i + 1) * largeTileSize);
          extraLinesShape.moveTo(0, y).lineTo(modelToViewX(maximumSize), y);
        }

        // Add sections to the relevant shapes.
        if (horizontalLargeCount && verticalLargeCount) {
          bigShape.rect(xMin, yMin, xBorder - xMin, yBorder - yMin);
        }
        if (horizontalLargeCount && verticalSmallCount) {
          horizontalShape.rect(xMin, yBorder, xBorder - xMin, yMax - yBorder);
        }
        if (horizontalSmallCount && verticalLargeCount) {
          verticalShape.rect(xBorder, yMin, xMax - xBorder, yBorder - yMin);
        }
        if (horizontalSmallCount && verticalSmallCount) {
          smallShape.rect(xBorder, yBorder, xMax - xBorder, yMax - yBorder);
        }
      });
    });

    // Make the shapes immutable so that listeners don't have to be added
    bigShape.makeImmutable();
    horizontalShape.makeImmutable();
    verticalShape.makeImmutable();
    smallShape.makeImmutable();
    extraLinesShape.makeImmutable();

    // Adjust the backgrounds to fit their respective areas
    this.bigPath.shape = bigShape;
    this.horizontalPath.shape = horizontalShape;
    this.verticalPath.shape = verticalShape;
    this.smallPath.shape = smallShape;

    // Selectively display grid lines as a "stroke" over the background
    this.smallGridPath.clipArea = smallShape;
    this.horizontalGridPath.clipArea = horizontalShape;
    this.verticalGridPath.clipArea = verticalShape;

    // Display extra lines, and clip it to fit the active area.
    this.extraLinesPath.shape = extraLinesShape;
    this.extraLinesPath.clipArea = Shape.rect(0, 0, modelToViewX(this.areaDisplay.activeTotalProperties.horizontal.value), modelToViewY(this.areaDisplay.activeTotalProperties.vertical.value));
  }
}
areaModelCommon.register('TiledAreaNode', TiledAreaNode);
export default TiledAreaNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJNdWx0aWxpbmsiLCJVdGlscyIsIlNoYXBlIiwiT3JpZW50YXRpb24iLCJOb2RlIiwiUGF0aCIsImFyZWFNb2RlbENvbW1vbiIsIkFyZWFNb2RlbENvbW1vbkNvbG9ycyIsIlRpbGVkQXJlYU5vZGUiLCJjb25zdHJ1Y3RvciIsImFyZWFEaXNwbGF5IiwibW9kZWxWaWV3VHJhbnNmb3JtUHJvcGVydHkiLCJ0aWxlc1Zpc2libGVQcm9wZXJ0eSIsInNtYWxsVGlsZVNpemVQcm9wZXJ0eSIsImxhcmdlVGlsZVNpemVQcm9wZXJ0eSIsIm1heGltdW1TaXplUHJvcGVydHkiLCJkaXJ0eSIsImludmFsaWRhdGUiLCJsYXp5TGluayIsImFsbFBhcnRpdGlvbnNQcm9wZXJ0eSIsImxpbmsiLCJwYXJ0aXRpb25zIiwib2xkUGFydGl0aW9ucyIsImZvckVhY2giLCJwYXJ0aXRpb24iLCJ2aXNpYmxlUHJvcGVydHkiLCJ1bmxpbmsiLCJjb29yZGluYXRlUmFuZ2VQcm9wZXJ0eSIsImJpZ1BhdGgiLCJmaWxsIiwiYmlnVGlsZVByb3BlcnR5IiwiaG9yaXpvbnRhbFBhdGgiLCJtZWRpdW1UaWxlUHJvcGVydHkiLCJ2ZXJ0aWNhbFBhdGgiLCJzbWFsbFBhdGgiLCJzbWFsbFRpbGVQcm9wZXJ0eSIsInNtYWxsR3JpZFBhdGgiLCJzdHJva2UiLCJ0aWxlQm9yZGVyUHJvcGVydHkiLCJob3Jpem9udGFsR3JpZFBhdGgiLCJ2ZXJ0aWNhbEdyaWRQYXRoIiwibXVsdGlsaW5rIiwibW9kZWxWaWV3VHJhbnNmb3JtIiwibWF4aW11bVNpemUiLCJzbWFsbFRpbGVTaXplIiwic21hbGxHcmlkU2hhcGUiLCJob3Jpem9udGFsR3JpZFNoYXBlIiwidmVydGljYWxHcmlkU2hhcGUiLCJtYXhYIiwibW9kZWxUb1ZpZXdYIiwibWF4WSIsIm1vZGVsVG9WaWV3WSIsImkiLCJ4IiwieSIsIm1vdmVUbyIsImxpbmVUbyIsInNoYXBlIiwibWFrZUltbXV0YWJsZSIsImV4dHJhTGluZXNQYXRoIiwibXV0YXRlIiwiY2hpbGRyZW4iLCJmb3JFYWNoUGFydGl0aW9uIiwib3JpZW50YXRpb24iLCJjYWxsYmFjayIsInBhcnRpdGlvbnNQcm9wZXJ0aWVzIiwiZ2V0IiwidmFsdWUiLCJyYW5nZSIsInNpemUiLCJnZXRMZW5ndGgiLCJsYXJnZUNvdW50IiwiTWF0aCIsImZsb29yIiwidG9GaXhlZE51bWJlciIsInNtYWxsQ291bnQiLCJyb3VuZFN5bW1ldHJpYyIsIm1pbiIsIm1vZGVsVG9WaWV3IiwiYm9yZGVyIiwibWF4IiwidXBkYXRlIiwiYmluZCIsImxhcmdlVGlsZVNpemUiLCJ2aXNpYmxlIiwiYmlnU2hhcGUiLCJob3Jpem9udGFsU2hhcGUiLCJ2ZXJ0aWNhbFNoYXBlIiwic21hbGxTaGFwZSIsImV4dHJhTGluZXNTaGFwZSIsIkhPUklaT05UQUwiLCJob3Jpem9udGFsTGFyZ2VDb3VudCIsImhvcml6b250YWxTbWFsbENvdW50IiwieE1pbiIsInhCb3JkZXIiLCJ4TWF4IiwiVkVSVElDQUwiLCJ2ZXJ0aWNhbExhcmdlQ291bnQiLCJ2ZXJ0aWNhbFNtYWxsQ291bnQiLCJ5TWluIiwieUJvcmRlciIsInlNYXgiLCJyZWN0IiwiY2xpcEFyZWEiLCJhY3RpdmVUb3RhbFByb3BlcnRpZXMiLCJob3Jpem9udGFsIiwidmVydGljYWwiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlRpbGVkQXJlYU5vZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTctMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogRGlzcGxheXMgdGlsZXMgZm9yIGEgcGFydGl0aW9uZWQgYXJlYS5cclxuICpcclxuICogTk9URTogVGhpcyB0eXBlIGlzIGRlc2lnbmVkIHRvIGJlIHBlcnNpc3RlbnQsIGFuZCB3aWxsIG5vdCBuZWVkIHRvIHJlbGVhc2UgcmVmZXJlbmNlcyB0byBhdm9pZCBtZW1vcnkgbGVha3MuXHJcbiAqXHJcbiAqIEBhdXRob3IgSm9uYXRoYW4gT2xzb24gPGpvbmF0aGFuLm9sc29uQGNvbG9yYWRvLmVkdT5cclxuICovXHJcblxyXG5pbXBvcnQgTXVsdGlsaW5rIGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvTXVsdGlsaW5rLmpzJztcclxuaW1wb3J0IFV0aWxzIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9VdGlscy5qcyc7XHJcbmltcG9ydCB7IFNoYXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4va2l0ZS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IE9yaWVudGF0aW9uIGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9PcmllbnRhdGlvbi5qcyc7XHJcbmltcG9ydCB7IE5vZGUsIFBhdGggfSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgYXJlYU1vZGVsQ29tbW9uIGZyb20gJy4uLy4uL2FyZWFNb2RlbENvbW1vbi5qcyc7XHJcbmltcG9ydCBBcmVhTW9kZWxDb21tb25Db2xvcnMgZnJvbSAnLi4vLi4vY29tbW9uL3ZpZXcvQXJlYU1vZGVsQ29tbW9uQ29sb3JzLmpzJztcclxuXHJcbmNsYXNzIFRpbGVkQXJlYU5vZGUgZXh0ZW5kcyBOb2RlIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge1Byb3BvcnRpb25hbEFyZWFEaXNwbGF5fSBhcmVhRGlzcGxheVxyXG4gICAqIEBwYXJhbSB7UHJvcGVydHkuPE1vZGVsVmlld1RyYW5zZm9ybTI+fSBtb2RlbFZpZXdUcmFuc2Zvcm1Qcm9wZXJ0eVxyXG4gICAqIEBwYXJhbSB7UHJvcGVydHkuPGJvb2xlYW4+fSB0aWxlc1Zpc2libGVQcm9wZXJ0eVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCBhcmVhRGlzcGxheSwgbW9kZWxWaWV3VHJhbnNmb3JtUHJvcGVydHksIHRpbGVzVmlzaWJsZVByb3BlcnR5ICkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICAvLyBAcHJpdmF0ZSB7UHJvcGVydHkuPFByb3BvcnRpb25hbEFyZWE+fVxyXG4gICAgdGhpcy5hcmVhRGlzcGxheSA9IGFyZWFEaXNwbGF5O1xyXG5cclxuICAgIC8vIEBwcml2YXRlIHtQcm9wZXJ0eS48TW9kZWxWaWV3VHJhbnNmb3JtMj59XHJcbiAgICB0aGlzLm1vZGVsVmlld1RyYW5zZm9ybVByb3BlcnR5ID0gbW9kZWxWaWV3VHJhbnNmb3JtUHJvcGVydHk7XHJcblxyXG4gICAgLy8gQHByaXZhdGUge1Byb3BlcnR5Ljxib29sZWFuPn1cclxuICAgIHRoaXMudGlsZXNWaXNpYmxlUHJvcGVydHkgPSB0aWxlc1Zpc2libGVQcm9wZXJ0eTtcclxuXHJcbiAgICAvLyBAcHJpdmF0ZSB7UHJvcGVydHkuPG51bWJlcj59XHJcbiAgICB0aGlzLnNtYWxsVGlsZVNpemVQcm9wZXJ0eSA9IGFyZWFEaXNwbGF5LnNtYWxsVGlsZVNpemVQcm9wZXJ0eTtcclxuICAgIHRoaXMubGFyZ2VUaWxlU2l6ZVByb3BlcnR5ID0gYXJlYURpc3BsYXkubGFyZ2VUaWxlU2l6ZVByb3BlcnR5O1xyXG4gICAgdGhpcy5tYXhpbXVtU2l6ZVByb3BlcnR5ID0gYXJlYURpc3BsYXkubWF4aW11bVNpemVQcm9wZXJ0eTtcclxuXHJcbiAgICAvLyBAcHJpdmF0ZSB7Ym9vbGVhbn0gLSBXaGV0aGVyIHdlIHNob3VsZCBiZSByZWRyYXduXHJcbiAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBUaGluZ3Mgd2UgZGVwZW5kIG9uXHJcbiAgICBjb25zdCBpbnZhbGlkYXRlID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcclxuICAgIH07XHJcblxyXG4gICAgdGlsZXNWaXNpYmxlUHJvcGVydHkubGF6eUxpbmsoIGludmFsaWRhdGUgKTtcclxuICAgIG1vZGVsVmlld1RyYW5zZm9ybVByb3BlcnR5LmxhenlMaW5rKCBpbnZhbGlkYXRlICk7XHJcbiAgICB0aGlzLnNtYWxsVGlsZVNpemVQcm9wZXJ0eS5sYXp5TGluayggaW52YWxpZGF0ZSApO1xyXG4gICAgdGhpcy5sYXJnZVRpbGVTaXplUHJvcGVydHkubGF6eUxpbmsoIGludmFsaWRhdGUgKTtcclxuICAgIGFyZWFEaXNwbGF5LmFsbFBhcnRpdGlvbnNQcm9wZXJ0eS5saW5rKCAoIHBhcnRpdGlvbnMsIG9sZFBhcnRpdGlvbnMgKSA9PiB7XHJcbiAgICAgIG9sZFBhcnRpdGlvbnMgJiYgb2xkUGFydGl0aW9ucy5mb3JFYWNoKCBwYXJ0aXRpb24gPT4ge1xyXG4gICAgICAgIHBhcnRpdGlvbi52aXNpYmxlUHJvcGVydHkudW5saW5rKCBpbnZhbGlkYXRlICk7XHJcbiAgICAgICAgcGFydGl0aW9uLmNvb3JkaW5hdGVSYW5nZVByb3BlcnR5LnVubGluayggaW52YWxpZGF0ZSApO1xyXG4gICAgICB9ICk7XHJcbiAgICAgIHBhcnRpdGlvbnMuZm9yRWFjaCggcGFydGl0aW9uID0+IHtcclxuICAgICAgICBwYXJ0aXRpb24udmlzaWJsZVByb3BlcnR5LmxpbmsoIGludmFsaWRhdGUgKTtcclxuICAgICAgICBwYXJ0aXRpb24uY29vcmRpbmF0ZVJhbmdlUHJvcGVydHkubGluayggaW52YWxpZGF0ZSApO1xyXG4gICAgICB9ICk7XHJcbiAgICAgIGludmFsaWRhdGUoKTtcclxuICAgIH0gKTtcclxuICAgIGludmFsaWRhdGUoKTtcclxuXHJcbiAgICAvLyBAcHJpdmF0ZSB7UGF0aH0gLSBCYWNrZ3JvdW5kIGNvbG9yIHBhdGhzIGZvciBlYWNoIHNlY3Rpb25cclxuICAgIHRoaXMuYmlnUGF0aCA9IG5ldyBQYXRoKCBudWxsLCB7XHJcbiAgICAgIGZpbGw6IEFyZWFNb2RlbENvbW1vbkNvbG9ycy5iaWdUaWxlUHJvcGVydHlcclxuICAgIH0gKTtcclxuICAgIHRoaXMuaG9yaXpvbnRhbFBhdGggPSBuZXcgUGF0aCggbnVsbCwge1xyXG4gICAgICBmaWxsOiBBcmVhTW9kZWxDb21tb25Db2xvcnMubWVkaXVtVGlsZVByb3BlcnR5XHJcbiAgICB9ICk7XHJcbiAgICB0aGlzLnZlcnRpY2FsUGF0aCA9IG5ldyBQYXRoKCBudWxsLCB7XHJcbiAgICAgIGZpbGw6IEFyZWFNb2RlbENvbW1vbkNvbG9ycy5tZWRpdW1UaWxlUHJvcGVydHlcclxuICAgIH0gKTtcclxuICAgIHRoaXMuc21hbGxQYXRoID0gbmV3IFBhdGgoIG51bGwsIHtcclxuICAgICAgZmlsbDogQXJlYU1vZGVsQ29tbW9uQ29sb3JzLnNtYWxsVGlsZVByb3BlcnR5XHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gQHByaXZhdGUge1BhdGh9IC0gR3JpZCBsaW5lIHBhdGhzLiBXZSdsbCB1c2UgY2xpcHBpbmcgdG8gY29udHJvbCB3aGVyZSB0aGV5IGFyZSB2aXNpYmxlXHJcbiAgICB0aGlzLnNtYWxsR3JpZFBhdGggPSBuZXcgUGF0aCggbnVsbCwge1xyXG4gICAgICBzdHJva2U6IEFyZWFNb2RlbENvbW1vbkNvbG9ycy50aWxlQm9yZGVyUHJvcGVydHlcclxuICAgIH0gKTtcclxuICAgIHRoaXMuaG9yaXpvbnRhbEdyaWRQYXRoID0gbmV3IFBhdGgoIG51bGwsIHtcclxuICAgICAgc3Ryb2tlOiBBcmVhTW9kZWxDb21tb25Db2xvcnMudGlsZUJvcmRlclByb3BlcnR5XHJcbiAgICB9ICk7XHJcbiAgICB0aGlzLnZlcnRpY2FsR3JpZFBhdGggPSBuZXcgUGF0aCggbnVsbCwge1xyXG4gICAgICBzdHJva2U6IEFyZWFNb2RlbENvbW1vbkNvbG9ycy50aWxlQm9yZGVyUHJvcGVydHlcclxuICAgIH0gKTtcclxuXHJcbiAgICBNdWx0aWxpbmsubXVsdGlsaW5rKFxyXG4gICAgICBbIG1vZGVsVmlld1RyYW5zZm9ybVByb3BlcnR5LCB0aGlzLm1heGltdW1TaXplUHJvcGVydHksIHRoaXMuc21hbGxUaWxlU2l6ZVByb3BlcnR5IF0sXHJcbiAgICAgICggbW9kZWxWaWV3VHJhbnNmb3JtLCBtYXhpbXVtU2l6ZSwgc21hbGxUaWxlU2l6ZSApID0+IHtcclxuICAgICAgICAvLyBHcmlkIGxpbmUgc2hhcGVzXHJcbiAgICAgICAgY29uc3Qgc21hbGxHcmlkU2hhcGUgPSBuZXcgU2hhcGUoKTtcclxuICAgICAgICBjb25zdCBob3Jpem9udGFsR3JpZFNoYXBlID0gbmV3IFNoYXBlKCk7XHJcbiAgICAgICAgY29uc3QgdmVydGljYWxHcmlkU2hhcGUgPSBuZXcgU2hhcGUoKTtcclxuICAgICAgICBjb25zdCBtYXhYID0gbW9kZWxWaWV3VHJhbnNmb3JtLm1vZGVsVG9WaWV3WCggbWF4aW11bVNpemUgKTtcclxuICAgICAgICBjb25zdCBtYXhZID0gbW9kZWxWaWV3VHJhbnNmb3JtLm1vZGVsVG9WaWV3WSggbWF4aW11bVNpemUgKTtcclxuXHJcbiAgICAgICAgLy8gV2UgbmVlZCB0aGUgZ3JpZCBsaW5lcyB0byBleHRlbmQgb3V0IHBhc3QgZWFjaCBzaWRlIGEgYml0IGZvciBjb3JyZWN0IGFwcGVhcmFuY2VcclxuICAgICAgICBmb3IgKCBsZXQgaSA9IC0xOyBpIDwgbWF4aW11bVNpemUgLyBzbWFsbFRpbGVTaXplICsgMTsgaSsrICkge1xyXG4gICAgICAgICAgY29uc3QgeCA9IG1vZGVsVmlld1RyYW5zZm9ybS5tb2RlbFRvVmlld1goIGkgKiBzbWFsbFRpbGVTaXplICk7XHJcbiAgICAgICAgICBjb25zdCB5ID0gbW9kZWxWaWV3VHJhbnNmb3JtLm1vZGVsVG9WaWV3WSggaSAqIHNtYWxsVGlsZVNpemUgKTtcclxuXHJcbiAgICAgICAgICBzbWFsbEdyaWRTaGFwZS5tb3ZlVG8oIHgsIDAgKS5saW5lVG8oIHgsIG1heFkgKTtcclxuICAgICAgICAgIHNtYWxsR3JpZFNoYXBlLm1vdmVUbyggMCwgeSApLmxpbmVUbyggbWF4WCwgeSApO1xyXG5cclxuICAgICAgICAgIHZlcnRpY2FsR3JpZFNoYXBlLm1vdmVUbyggeCwgMCApLmxpbmVUbyggeCwgbWF4WSApO1xyXG4gICAgICAgICAgaG9yaXpvbnRhbEdyaWRTaGFwZS5tb3ZlVG8oIDAsIHkgKS5saW5lVG8oIG1heFgsIHkgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1hZGUgaW1tdXRhYmxlIGZvciBwb3RlbnRpYWwgcGVyZm9ybWFuY2UgZ2FpbnNcclxuICAgICAgICB0aGlzLnNtYWxsR3JpZFBhdGguc2hhcGUgPSBzbWFsbEdyaWRTaGFwZS5tYWtlSW1tdXRhYmxlKCk7XHJcbiAgICAgICAgdGhpcy5ob3Jpem9udGFsR3JpZFBhdGguc2hhcGUgPSBob3Jpem9udGFsR3JpZFNoYXBlLm1ha2VJbW11dGFibGUoKTtcclxuICAgICAgICB0aGlzLnZlcnRpY2FsR3JpZFBhdGguc2hhcGUgPSB2ZXJ0aWNhbEdyaWRTaGFwZS5tYWtlSW1tdXRhYmxlKCk7XHJcbiAgICAgIH0gKTtcclxuXHJcbiAgICAvLyBAcHJpdmF0ZSB7UGF0aH0gLSBDb250YWlucyBleHRyYSBvdmVybGF5IGxpbmVzIHRvIGZpbGwgaW4gdGhlICdzdHJva2VkJyBhcHBlYXJhbmNlLlxyXG4gICAgdGhpcy5leHRyYUxpbmVzUGF0aCA9IG5ldyBQYXRoKCBudWxsLCB7XHJcbiAgICAgIHN0cm9rZTogQXJlYU1vZGVsQ29tbW9uQ29sb3JzLnRpbGVCb3JkZXJQcm9wZXJ0eVxyXG4gICAgfSApO1xyXG5cclxuICAgIHRoaXMubXV0YXRlKCB7XHJcbiAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgdGhpcy5iaWdQYXRoLFxyXG4gICAgICAgIHRoaXMuaG9yaXpvbnRhbFBhdGgsXHJcbiAgICAgICAgdGhpcy52ZXJ0aWNhbFBhdGgsXHJcbiAgICAgICAgdGhpcy5zbWFsbFBhdGgsXHJcbiAgICAgICAgdGhpcy5zbWFsbEdyaWRQYXRoLFxyXG4gICAgICAgIHRoaXMuaG9yaXpvbnRhbEdyaWRQYXRoLFxyXG4gICAgICAgIHRoaXMudmVydGljYWxHcmlkUGF0aCxcclxuICAgICAgICB0aGlzLmV4dHJhTGluZXNQYXRoXHJcbiAgICAgIF1cclxuICAgIH0gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvciBlYWNoIHBhcnRpdGlvbiBvZiBhIHBhcnRpY3VsYXIgb3JpZW50YXRpb24sIGZpcmVzIHRoZSBjYWxsYmFjayB3aXRoIHJhbmdlIGluZm9ybWF0aW9uIGFscmVhZHkgaW4gdmlld1xyXG4gICAqIGNvb3JkaW5hdGVzLlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09yaWVudGF0aW9ufSBvcmllbnRhdGlvblxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gY2FsbGJhY2soIGxhcmdlQ291bnQsIHNtYWxsQ291bnQsIG1pbiwgYm9yZGVyLCBtYXggKVxyXG4gICAqL1xyXG4gIGZvckVhY2hQYXJ0aXRpb24oIG9yaWVudGF0aW9uLCBjYWxsYmFjayApIHtcclxuICAgIHRoaXMuYXJlYURpc3BsYXkucGFydGl0aW9uc1Byb3BlcnRpZXMuZ2V0KCBvcmllbnRhdGlvbiApLnZhbHVlLmZvckVhY2goIHBhcnRpdGlvbiA9PiB7XHJcbiAgICAgIGNvbnN0IHJhbmdlID0gcGFydGl0aW9uLmNvb3JkaW5hdGVSYW5nZVByb3BlcnR5LnZhbHVlO1xyXG5cclxuICAgICAgLy8gSWdub3JlIHBhcnRpdGlvbnMgd2l0aG91dCBhIHZpc2libGUgd2VsbC1kZWZpbmVkIHJhbmdlLlxyXG4gICAgICBpZiAoICFwYXJ0aXRpb24udmlzaWJsZVByb3BlcnR5LnZhbHVlIHx8IHJhbmdlID09PSBudWxsICkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgc2l6ZSA9IHJhbmdlLmdldExlbmd0aCgpO1xyXG4gICAgICBjb25zdCBsYXJnZUNvdW50ID0gTWF0aC5mbG9vciggVXRpbHMudG9GaXhlZE51bWJlciggc2l6ZSAvIHRoaXMubGFyZ2VUaWxlU2l6ZVByb3BlcnR5LnZhbHVlLCAzICkgKTtcclxuXHJcbiAgICAgIGNvbnN0IHNtYWxsQ291bnQgPSBVdGlscy5yb3VuZFN5bW1ldHJpYyhcclxuICAgICAgICAoIHNpemUgLSB0aGlzLmxhcmdlVGlsZVNpemVQcm9wZXJ0eS52YWx1ZSAqIGxhcmdlQ291bnQgKSAvIHRoaXMuc21hbGxUaWxlU2l6ZVByb3BlcnR5LnZhbHVlXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG1pbiA9IG9yaWVudGF0aW9uLm1vZGVsVG9WaWV3KCB0aGlzLm1vZGVsVmlld1RyYW5zZm9ybVByb3BlcnR5LnZhbHVlLCByYW5nZS5taW4gKTtcclxuICAgICAgY29uc3QgYm9yZGVyID0gb3JpZW50YXRpb24ubW9kZWxUb1ZpZXcoXHJcbiAgICAgICAgdGhpcy5tb2RlbFZpZXdUcmFuc2Zvcm1Qcm9wZXJ0eS52YWx1ZSwgcmFuZ2UubWluICsgbGFyZ2VDb3VudCAqIHRoaXMubGFyZ2VUaWxlU2l6ZVByb3BlcnR5LnZhbHVlXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG1heCA9IG9yaWVudGF0aW9uLm1vZGVsVG9WaWV3KCB0aGlzLm1vZGVsVmlld1RyYW5zZm9ybVByb3BlcnR5LnZhbHVlLCByYW5nZS5tYXggKTtcclxuXHJcbiAgICAgIGNhbGxiYWNrKCBsYXJnZUNvdW50LCBzbWFsbENvdW50LCBtaW4sIGJvcmRlciwgbWF4ICk7XHJcbiAgICB9ICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSB2aWV3IGZvciB0aWxlZCBhcmVhcyAoc2luY2UgaXQgaXMgc29tZXdoYXQgZXhwZW5zaXZlIHRvIHJlLWRyYXcsIGFuZCB3ZSBkb24ndCB3YW50IGl0IGJlaW5nIGRvbmVcclxuICAgKiBtdWx0aXBsZSB0aW1lcyBwZXIgZnJhbWUuXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICB1cGRhdGUoKSB7XHJcbiAgICAvLyBJZ25vcmUgdXBkYXRlcyBpZiB3ZSBhcmUgbm90IGRpcnR5XHJcbiAgICBpZiAoICF0aGlzLmRpcnR5ICkgeyByZXR1cm47IH1cclxuICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBDb29yZGluYXRlIG1hcHBpbmcgaW50byB0aGUgdmlld1xyXG4gICAgY29uc3QgbW9kZWxUb1ZpZXdYID0gdGhpcy5tb2RlbFZpZXdUcmFuc2Zvcm1Qcm9wZXJ0eS52YWx1ZS5tb2RlbFRvVmlld1guYmluZCggdGhpcy5tb2RlbFZpZXdUcmFuc2Zvcm1Qcm9wZXJ0eS52YWx1ZSApO1xyXG4gICAgY29uc3QgbW9kZWxUb1ZpZXdZID0gdGhpcy5tb2RlbFZpZXdUcmFuc2Zvcm1Qcm9wZXJ0eS52YWx1ZS5tb2RlbFRvVmlld1kuYmluZCggdGhpcy5tb2RlbFZpZXdUcmFuc2Zvcm1Qcm9wZXJ0eS52YWx1ZSApO1xyXG5cclxuICAgIGNvbnN0IGxhcmdlVGlsZVNpemUgPSB0aGlzLmxhcmdlVGlsZVNpemVQcm9wZXJ0eS52YWx1ZTtcclxuICAgIGNvbnN0IG1heGltdW1TaXplID0gdGhpcy5tYXhpbXVtU2l6ZVByb3BlcnR5LnZhbHVlO1xyXG5cclxuICAgIHRoaXMudmlzaWJsZSA9IHRoaXMudGlsZXNWaXNpYmxlUHJvcGVydHkudmFsdWU7XHJcblxyXG4gICAgY29uc3QgYmlnU2hhcGUgPSBuZXcgU2hhcGUoKTtcclxuICAgIGNvbnN0IGhvcml6b250YWxTaGFwZSA9IG5ldyBTaGFwZSgpO1xyXG4gICAgY29uc3QgdmVydGljYWxTaGFwZSA9IG5ldyBTaGFwZSgpO1xyXG4gICAgY29uc3Qgc21hbGxTaGFwZSA9IG5ldyBTaGFwZSgpO1xyXG4gICAgY29uc3QgZXh0cmFMaW5lc1NoYXBlID0gbmV3IFNoYXBlKCk7XHJcblxyXG4gICAgdGhpcy5mb3JFYWNoUGFydGl0aW9uKCBPcmllbnRhdGlvbi5IT1JJWk9OVEFMLCAoIGhvcml6b250YWxMYXJnZUNvdW50LCBob3Jpem9udGFsU21hbGxDb3VudCwgeE1pbiwgeEJvcmRlciwgeE1heCApID0+IHtcclxuICAgICAgdGhpcy5mb3JFYWNoUGFydGl0aW9uKCBPcmllbnRhdGlvbi5WRVJUSUNBTCwgKCB2ZXJ0aWNhbExhcmdlQ291bnQsIHZlcnRpY2FsU21hbGxDb3VudCwgeU1pbiwgeUJvcmRlciwgeU1heCApID0+IHtcclxuXHJcbiAgICAgICAgLy8gQWRkIGluIGV4dHJhIGxpbmVzIG9uIHRoZSBmYXIgc2lkZXMgb2YgbGFyZ2Ugc2VjdGlvbnMuXHJcbiAgICAgICAgbGV0IGk7XHJcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBob3Jpem9udGFsTGFyZ2VDb3VudDsgaSsrICkge1xyXG4gICAgICAgICAgY29uc3QgeCA9IHhNaW4gKyBtb2RlbFRvVmlld1goICggaSArIDEgKSAqIGxhcmdlVGlsZVNpemUgKTtcclxuICAgICAgICAgIGV4dHJhTGluZXNTaGFwZS5tb3ZlVG8oIHgsIDAgKS5saW5lVG8oIHgsIG1vZGVsVG9WaWV3WSggbWF4aW11bVNpemUgKSApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKCBpID0gMDsgaSA8IHZlcnRpY2FsTGFyZ2VDb3VudDsgaSsrICkge1xyXG4gICAgICAgICAgY29uc3QgeSA9IHlNaW4gKyBtb2RlbFRvVmlld1koICggaSArIDEgKSAqIGxhcmdlVGlsZVNpemUgKTtcclxuICAgICAgICAgIGV4dHJhTGluZXNTaGFwZS5tb3ZlVG8oIDAsIHkgKS5saW5lVG8oIG1vZGVsVG9WaWV3WCggbWF4aW11bVNpemUgKSwgeSApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRkIHNlY3Rpb25zIHRvIHRoZSByZWxldmFudCBzaGFwZXMuXHJcbiAgICAgICAgaWYgKCBob3Jpem9udGFsTGFyZ2VDb3VudCAmJiB2ZXJ0aWNhbExhcmdlQ291bnQgKSB7XHJcbiAgICAgICAgICBiaWdTaGFwZS5yZWN0KCB4TWluLCB5TWluLCB4Qm9yZGVyIC0geE1pbiwgeUJvcmRlciAtIHlNaW4gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBob3Jpem9udGFsTGFyZ2VDb3VudCAmJiB2ZXJ0aWNhbFNtYWxsQ291bnQgKSB7XHJcbiAgICAgICAgICBob3Jpem9udGFsU2hhcGUucmVjdCggeE1pbiwgeUJvcmRlciwgeEJvcmRlciAtIHhNaW4sIHlNYXggLSB5Qm9yZGVyICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggaG9yaXpvbnRhbFNtYWxsQ291bnQgJiYgdmVydGljYWxMYXJnZUNvdW50ICkge1xyXG4gICAgICAgICAgdmVydGljYWxTaGFwZS5yZWN0KCB4Qm9yZGVyLCB5TWluLCB4TWF4IC0geEJvcmRlciwgeUJvcmRlciAtIHlNaW4gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBob3Jpem9udGFsU21hbGxDb3VudCAmJiB2ZXJ0aWNhbFNtYWxsQ291bnQgKSB7XHJcbiAgICAgICAgICBzbWFsbFNoYXBlLnJlY3QoIHhCb3JkZXIsIHlCb3JkZXIsIHhNYXggLSB4Qm9yZGVyLCB5TWF4IC0geUJvcmRlciApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSApO1xyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIE1ha2UgdGhlIHNoYXBlcyBpbW11dGFibGUgc28gdGhhdCBsaXN0ZW5lcnMgZG9uJ3QgaGF2ZSB0byBiZSBhZGRlZFxyXG4gICAgYmlnU2hhcGUubWFrZUltbXV0YWJsZSgpO1xyXG4gICAgaG9yaXpvbnRhbFNoYXBlLm1ha2VJbW11dGFibGUoKTtcclxuICAgIHZlcnRpY2FsU2hhcGUubWFrZUltbXV0YWJsZSgpO1xyXG4gICAgc21hbGxTaGFwZS5tYWtlSW1tdXRhYmxlKCk7XHJcbiAgICBleHRyYUxpbmVzU2hhcGUubWFrZUltbXV0YWJsZSgpO1xyXG5cclxuICAgIC8vIEFkanVzdCB0aGUgYmFja2dyb3VuZHMgdG8gZml0IHRoZWlyIHJlc3BlY3RpdmUgYXJlYXNcclxuICAgIHRoaXMuYmlnUGF0aC5zaGFwZSA9IGJpZ1NoYXBlO1xyXG4gICAgdGhpcy5ob3Jpem9udGFsUGF0aC5zaGFwZSA9IGhvcml6b250YWxTaGFwZTtcclxuICAgIHRoaXMudmVydGljYWxQYXRoLnNoYXBlID0gdmVydGljYWxTaGFwZTtcclxuICAgIHRoaXMuc21hbGxQYXRoLnNoYXBlID0gc21hbGxTaGFwZTtcclxuXHJcbiAgICAvLyBTZWxlY3RpdmVseSBkaXNwbGF5IGdyaWQgbGluZXMgYXMgYSBcInN0cm9rZVwiIG92ZXIgdGhlIGJhY2tncm91bmRcclxuICAgIHRoaXMuc21hbGxHcmlkUGF0aC5jbGlwQXJlYSA9IHNtYWxsU2hhcGU7XHJcbiAgICB0aGlzLmhvcml6b250YWxHcmlkUGF0aC5jbGlwQXJlYSA9IGhvcml6b250YWxTaGFwZTtcclxuICAgIHRoaXMudmVydGljYWxHcmlkUGF0aC5jbGlwQXJlYSA9IHZlcnRpY2FsU2hhcGU7XHJcblxyXG4gICAgLy8gRGlzcGxheSBleHRyYSBsaW5lcywgYW5kIGNsaXAgaXQgdG8gZml0IHRoZSBhY3RpdmUgYXJlYS5cclxuICAgIHRoaXMuZXh0cmFMaW5lc1BhdGguc2hhcGUgPSBleHRyYUxpbmVzU2hhcGU7XHJcbiAgICB0aGlzLmV4dHJhTGluZXNQYXRoLmNsaXBBcmVhID0gU2hhcGUucmVjdChcclxuICAgICAgMCxcclxuICAgICAgMCxcclxuICAgICAgbW9kZWxUb1ZpZXdYKCB0aGlzLmFyZWFEaXNwbGF5LmFjdGl2ZVRvdGFsUHJvcGVydGllcy5ob3Jpem9udGFsLnZhbHVlICksXHJcbiAgICAgIG1vZGVsVG9WaWV3WSggdGhpcy5hcmVhRGlzcGxheS5hY3RpdmVUb3RhbFByb3BlcnRpZXMudmVydGljYWwudmFsdWUgKVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmFyZWFNb2RlbENvbW1vbi5yZWdpc3RlciggJ1RpbGVkQXJlYU5vZGUnLCBUaWxlZEFyZWFOb2RlICk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUaWxlZEFyZWFOb2RlOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsU0FBUyxNQUFNLGtDQUFrQztBQUN4RCxPQUFPQyxLQUFLLE1BQU0sNkJBQTZCO0FBQy9DLFNBQVNDLEtBQUssUUFBUSxnQ0FBZ0M7QUFDdEQsT0FBT0MsV0FBVyxNQUFNLHlDQUF5QztBQUNqRSxTQUFTQyxJQUFJLEVBQUVDLElBQUksUUFBUSxtQ0FBbUM7QUFDOUQsT0FBT0MsZUFBZSxNQUFNLDBCQUEwQjtBQUN0RCxPQUFPQyxxQkFBcUIsTUFBTSw0Q0FBNEM7QUFFOUUs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