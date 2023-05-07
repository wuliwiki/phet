// Copyright 2014-2021, University of Colorado Boulder

/**
 * Model element that represents a beaker that can contain other thermal model elements.
 *
 * @author John Blanco
 */

import Range from '../../../../dot/js/Range.js';
import Rectangle from '../../../../dot/js/Rectangle.js';
import required from '../../../../phet-core/js/required.js';
import EFACConstants from '../../common/EFACConstants.js';
import Beaker from '../../common/model/Beaker.js';
import energyFormsAndChanges from '../../energyFormsAndChanges.js';

// counter used by constructor to create unique IDs
let idCounter = 0;
class BeakerContainer extends Beaker {
  /**
   * @param {Vector2} initialPosition
   * @param {number} width
   * @param {number} height
   * @param {Array.<Block>} potentiallyContainedElements
   * @param {BooleanProperty} energyChunksVisibleProperty
   * @param {EnergyChunkGroup} energyChunkGroup
   * @param {Object} config
   */
  constructor(initialPosition, width, height, potentiallyContainedElements, energyChunksVisibleProperty, energyChunkGroup, config) {
    required(config.energyChunkWanderControllerGroup);
    super(initialPosition, width, height, energyChunksVisibleProperty, energyChunkGroup, config);

    // @public (read-only) {string} - id of this beaker
    this.id = `beaker-container-${idCounter++}`;

    // @private
    this.potentiallyContainedElements = potentiallyContainedElements;
  }

  /**
   * Update the fluid level in the beaker based upon any displacement that could be caused by the given rectangles.
   * This algorithm is strictly two dimensional, even though displacement is more of the 3D concept.
   * @param {Rectangle[]} potentiallyDisplacingRectangles
   * @public
   */
  updateFluidDisplacement(potentiallyDisplacingRectangles) {
    // calculate the amount of overlap between the rectangle that represents the fluid and the displacing rectangles
    const fluidRectangle = new Rectangle(this.getBounds().minX, this.getBounds().minY, this.width, this.height * this.fluidProportionProperty.value);
    let overlappingArea = 0;
    potentiallyDisplacingRectangles.forEach(rectangle => {
      if (rectangle.intersectsBounds(fluidRectangle)) {
        const intersection = rectangle.intersection(fluidRectangle);
        overlappingArea += intersection.width * intersection.height;
      }
    });

    // Map the overlap to a new fluid level.  The scaling factor was empirically determined to look good.
    const newFluidProportion = Math.min(EFACConstants.INITIAL_FLUID_PROPORTION + overlappingArea * 120, 1);
    this.fluidProportionProperty.set(newFluidProportion);
  }

  /**
   * @param {EnergyChunk} energyChunk
   * @returns {boolean}
   * @private
   */
  isEnergyChunkObscured(energyChunk) {
    let isObscured = false;
    this.potentiallyContainedElements.forEach(element => {
      if (this.thermalContactArea.containsBounds(element.getBounds()) && element.getProjectedShape().containsPoint(energyChunk.positionProperty.value)) {
        isObscured = true;
      }
    });
    return isObscured;
  }

  /**
   * @param {number} dt
   * @override
   * @private
   */
  animateNonContainedEnergyChunks(dt) {
    const controllers = this.energyChunkWanderControllers.slice();
    controllers.forEach(controller => {
      const ec = controller.energyChunk;

      // this chunk is being transferred from a container in the beaker to the fluid, so move it sideways
      if (this.isEnergyChunkObscured(ec)) {
        const xVel = 0.05 * dt * (this.getCenterPoint().x > ec.positionProperty.value.x ? -1 : 1);
        ec.translate(xVel, 0);
      }

      // wander chunk towards the container
      else {
        controller.updatePosition(dt);
      }

      // chunk is in a place where it can migrate to the slices and stop moving
      if (!this.isEnergyChunkObscured(ec) && this.getSliceBounds().containsPoint(ec.positionProperty.value)) {
        this.moveEnergyChunkToSlices(controller.energyChunk);
      }
    });
  }

  /**
   * @param {EnergyChunk} energyChunk
   * @override
   * @public
   */
  addEnergyChunk(energyChunk) {
    if (this.isEnergyChunkObscured(energyChunk)) {
      // the chunk is obscured by a model element in the beaker, so move it to the front of the z-order
      energyChunk.zPositionProperty.set(0);
      this.approachingEnergyChunks.push(energyChunk);
      this.energyChunkWanderControllers.push(this.energyChunkWanderControllerGroup.createNextElement(energyChunk, this.positionProperty));
    } else {
      super.addEnergyChunk(energyChunk);

      // If the energy chunk is above the beaker, it's coming from the air, and must be constrained to the width of
      // the beaker to avoid being clipped.
      const ecPosition = energyChunk.positionProperty.get();
      const beakerBounds = this.getBounds();
      if (ecPosition.y > beakerBounds.maxY && ecPosition.x > beakerBounds.minX && ecPosition.x < beakerBounds.maxX) {
        const wanderController = _.find(this.energyChunkWanderControllers.getArray(), controller => {
          return controller.energyChunk === energyChunk;
        });
        assert && assert(wanderController, 'no wander controller found for energy chunk');

        // Set the horizontal motion constraint to be slightly narrower than the beaker to account for the width of
        // the energy chunk nodes.
        wanderController.setHorizontalWanderConstraint(new Range(beakerBounds.minX + beakerBounds.width * 0.1, beakerBounds.maxX - beakerBounds.width * 0.1));
      }
    }
  }
}
energyFormsAndChanges.register('BeakerContainer', BeakerContainer);
export default BeakerContainer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJSYW5nZSIsIlJlY3RhbmdsZSIsInJlcXVpcmVkIiwiRUZBQ0NvbnN0YW50cyIsIkJlYWtlciIsImVuZXJneUZvcm1zQW5kQ2hhbmdlcyIsImlkQ291bnRlciIsIkJlYWtlckNvbnRhaW5lciIsImNvbnN0cnVjdG9yIiwiaW5pdGlhbFBvc2l0aW9uIiwid2lkdGgiLCJoZWlnaHQiLCJwb3RlbnRpYWxseUNvbnRhaW5lZEVsZW1lbnRzIiwiZW5lcmd5Q2h1bmtzVmlzaWJsZVByb3BlcnR5IiwiZW5lcmd5Q2h1bmtHcm91cCIsImNvbmZpZyIsImVuZXJneUNodW5rV2FuZGVyQ29udHJvbGxlckdyb3VwIiwiaWQiLCJ1cGRhdGVGbHVpZERpc3BsYWNlbWVudCIsInBvdGVudGlhbGx5RGlzcGxhY2luZ1JlY3RhbmdsZXMiLCJmbHVpZFJlY3RhbmdsZSIsImdldEJvdW5kcyIsIm1pblgiLCJtaW5ZIiwiZmx1aWRQcm9wb3J0aW9uUHJvcGVydHkiLCJ2YWx1ZSIsIm92ZXJsYXBwaW5nQXJlYSIsImZvckVhY2giLCJyZWN0YW5nbGUiLCJpbnRlcnNlY3RzQm91bmRzIiwiaW50ZXJzZWN0aW9uIiwibmV3Rmx1aWRQcm9wb3J0aW9uIiwiTWF0aCIsIm1pbiIsIklOSVRJQUxfRkxVSURfUFJPUE9SVElPTiIsInNldCIsImlzRW5lcmd5Q2h1bmtPYnNjdXJlZCIsImVuZXJneUNodW5rIiwiaXNPYnNjdXJlZCIsImVsZW1lbnQiLCJ0aGVybWFsQ29udGFjdEFyZWEiLCJjb250YWluc0JvdW5kcyIsImdldFByb2plY3RlZFNoYXBlIiwiY29udGFpbnNQb2ludCIsInBvc2l0aW9uUHJvcGVydHkiLCJhbmltYXRlTm9uQ29udGFpbmVkRW5lcmd5Q2h1bmtzIiwiZHQiLCJjb250cm9sbGVycyIsImVuZXJneUNodW5rV2FuZGVyQ29udHJvbGxlcnMiLCJzbGljZSIsImNvbnRyb2xsZXIiLCJlYyIsInhWZWwiLCJnZXRDZW50ZXJQb2ludCIsIngiLCJ0cmFuc2xhdGUiLCJ1cGRhdGVQb3NpdGlvbiIsImdldFNsaWNlQm91bmRzIiwibW92ZUVuZXJneUNodW5rVG9TbGljZXMiLCJhZGRFbmVyZ3lDaHVuayIsInpQb3NpdGlvblByb3BlcnR5IiwiYXBwcm9hY2hpbmdFbmVyZ3lDaHVua3MiLCJwdXNoIiwiY3JlYXRlTmV4dEVsZW1lbnQiLCJlY1Bvc2l0aW9uIiwiZ2V0IiwiYmVha2VyQm91bmRzIiwieSIsIm1heFkiLCJtYXhYIiwid2FuZGVyQ29udHJvbGxlciIsIl8iLCJmaW5kIiwiZ2V0QXJyYXkiLCJhc3NlcnQiLCJzZXRIb3Jpem9udGFsV2FuZGVyQ29uc3RyYWludCIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiQmVha2VyQ29udGFpbmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE0LTIwMjEsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIE1vZGVsIGVsZW1lbnQgdGhhdCByZXByZXNlbnRzIGEgYmVha2VyIHRoYXQgY2FuIGNvbnRhaW4gb3RoZXIgdGhlcm1hbCBtb2RlbCBlbGVtZW50cy5cclxuICpcclxuICogQGF1dGhvciBKb2huIEJsYW5jb1xyXG4gKi9cclxuXHJcbmltcG9ydCBSYW5nZSBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvUmFuZ2UuanMnO1xyXG5pbXBvcnQgUmVjdGFuZ2xlIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9SZWN0YW5nbGUuanMnO1xyXG5pbXBvcnQgcmVxdWlyZWQgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL3JlcXVpcmVkLmpzJztcclxuaW1wb3J0IEVGQUNDb25zdGFudHMgZnJvbSAnLi4vLi4vY29tbW9uL0VGQUNDb25zdGFudHMuanMnO1xyXG5pbXBvcnQgQmVha2VyIGZyb20gJy4uLy4uL2NvbW1vbi9tb2RlbC9CZWFrZXIuanMnO1xyXG5pbXBvcnQgZW5lcmd5Rm9ybXNBbmRDaGFuZ2VzIGZyb20gJy4uLy4uL2VuZXJneUZvcm1zQW5kQ2hhbmdlcy5qcyc7XHJcblxyXG4vLyBjb3VudGVyIHVzZWQgYnkgY29uc3RydWN0b3IgdG8gY3JlYXRlIHVuaXF1ZSBJRHNcclxubGV0IGlkQ291bnRlciA9IDA7XHJcblxyXG5jbGFzcyBCZWFrZXJDb250YWluZXIgZXh0ZW5kcyBCZWFrZXIge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1ZlY3RvcjJ9IGluaXRpYWxQb3NpdGlvblxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICAgKiBAcGFyYW0ge0FycmF5LjxCbG9jaz59IHBvdGVudGlhbGx5Q29udGFpbmVkRWxlbWVudHNcclxuICAgKiBAcGFyYW0ge0Jvb2xlYW5Qcm9wZXJ0eX0gZW5lcmd5Q2h1bmtzVmlzaWJsZVByb3BlcnR5XHJcbiAgICogQHBhcmFtIHtFbmVyZ3lDaHVua0dyb3VwfSBlbmVyZ3lDaHVua0dyb3VwXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCBpbml0aWFsUG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgICAgICAgIHBvdGVudGlhbGx5Q29udGFpbmVkRWxlbWVudHMsXHJcbiAgICAgICAgICAgICAgIGVuZXJneUNodW5rc1Zpc2libGVQcm9wZXJ0eSxcclxuICAgICAgICAgICAgICAgZW5lcmd5Q2h1bmtHcm91cCxcclxuICAgICAgICAgICAgICAgY29uZmlnICkge1xyXG5cclxuICAgIHJlcXVpcmVkKCBjb25maWcuZW5lcmd5Q2h1bmtXYW5kZXJDb250cm9sbGVyR3JvdXAgKTtcclxuXHJcbiAgICBzdXBlciggaW5pdGlhbFBvc2l0aW9uLCB3aWR0aCwgaGVpZ2h0LCBlbmVyZ3lDaHVua3NWaXNpYmxlUHJvcGVydHksIGVuZXJneUNodW5rR3JvdXAsIGNvbmZpZyApO1xyXG5cclxuICAgIC8vIEBwdWJsaWMgKHJlYWQtb25seSkge3N0cmluZ30gLSBpZCBvZiB0aGlzIGJlYWtlclxyXG4gICAgdGhpcy5pZCA9IGBiZWFrZXItY29udGFpbmVyLSR7aWRDb3VudGVyKyt9YDtcclxuXHJcbiAgICAvLyBAcHJpdmF0ZVxyXG4gICAgdGhpcy5wb3RlbnRpYWxseUNvbnRhaW5lZEVsZW1lbnRzID0gcG90ZW50aWFsbHlDb250YWluZWRFbGVtZW50cztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgZmx1aWQgbGV2ZWwgaW4gdGhlIGJlYWtlciBiYXNlZCB1cG9uIGFueSBkaXNwbGFjZW1lbnQgdGhhdCBjb3VsZCBiZSBjYXVzZWQgYnkgdGhlIGdpdmVuIHJlY3RhbmdsZXMuXHJcbiAgICogVGhpcyBhbGdvcml0aG0gaXMgc3RyaWN0bHkgdHdvIGRpbWVuc2lvbmFsLCBldmVuIHRob3VnaCBkaXNwbGFjZW1lbnQgaXMgbW9yZSBvZiB0aGUgM0QgY29uY2VwdC5cclxuICAgKiBAcGFyYW0ge1JlY3RhbmdsZVtdfSBwb3RlbnRpYWxseURpc3BsYWNpbmdSZWN0YW5nbGVzXHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIHVwZGF0ZUZsdWlkRGlzcGxhY2VtZW50KCBwb3RlbnRpYWxseURpc3BsYWNpbmdSZWN0YW5nbGVzICkge1xyXG5cclxuICAgIC8vIGNhbGN1bGF0ZSB0aGUgYW1vdW50IG9mIG92ZXJsYXAgYmV0d2VlbiB0aGUgcmVjdGFuZ2xlIHRoYXQgcmVwcmVzZW50cyB0aGUgZmx1aWQgYW5kIHRoZSBkaXNwbGFjaW5nIHJlY3RhbmdsZXNcclxuICAgIGNvbnN0IGZsdWlkUmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZShcclxuICAgICAgdGhpcy5nZXRCb3VuZHMoKS5taW5YLFxyXG4gICAgICB0aGlzLmdldEJvdW5kcygpLm1pblksXHJcbiAgICAgIHRoaXMud2lkdGgsXHJcbiAgICAgIHRoaXMuaGVpZ2h0ICogdGhpcy5mbHVpZFByb3BvcnRpb25Qcm9wZXJ0eS52YWx1ZVxyXG4gICAgKTtcclxuXHJcbiAgICBsZXQgb3ZlcmxhcHBpbmdBcmVhID0gMDtcclxuICAgIHBvdGVudGlhbGx5RGlzcGxhY2luZ1JlY3RhbmdsZXMuZm9yRWFjaCggcmVjdGFuZ2xlID0+IHtcclxuICAgICAgaWYgKCByZWN0YW5nbGUuaW50ZXJzZWN0c0JvdW5kcyggZmx1aWRSZWN0YW5nbGUgKSApIHtcclxuICAgICAgICBjb25zdCBpbnRlcnNlY3Rpb24gPSByZWN0YW5nbGUuaW50ZXJzZWN0aW9uKCBmbHVpZFJlY3RhbmdsZSApO1xyXG4gICAgICAgIG92ZXJsYXBwaW5nQXJlYSArPSBpbnRlcnNlY3Rpb24ud2lkdGggKiBpbnRlcnNlY3Rpb24uaGVpZ2h0O1xyXG4gICAgICB9XHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gTWFwIHRoZSBvdmVybGFwIHRvIGEgbmV3IGZsdWlkIGxldmVsLiAgVGhlIHNjYWxpbmcgZmFjdG9yIHdhcyBlbXBpcmljYWxseSBkZXRlcm1pbmVkIHRvIGxvb2sgZ29vZC5cclxuICAgIGNvbnN0IG5ld0ZsdWlkUHJvcG9ydGlvbiA9IE1hdGgubWluKCBFRkFDQ29uc3RhbnRzLklOSVRJQUxfRkxVSURfUFJPUE9SVElPTiArIG92ZXJsYXBwaW5nQXJlYSAqIDEyMCwgMSApO1xyXG4gICAgdGhpcy5mbHVpZFByb3BvcnRpb25Qcm9wZXJ0eS5zZXQoIG5ld0ZsdWlkUHJvcG9ydGlvbiApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtFbmVyZ3lDaHVua30gZW5lcmd5Q2h1bmtcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIGlzRW5lcmd5Q2h1bmtPYnNjdXJlZCggZW5lcmd5Q2h1bmsgKSB7XHJcbiAgICBsZXQgaXNPYnNjdXJlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMucG90ZW50aWFsbHlDb250YWluZWRFbGVtZW50cy5mb3JFYWNoKCBlbGVtZW50ID0+IHtcclxuICAgICAgaWYgKCB0aGlzLnRoZXJtYWxDb250YWN0QXJlYS5jb250YWluc0JvdW5kcyggZWxlbWVudC5nZXRCb3VuZHMoKSApICYmXHJcbiAgICAgICAgICAgZWxlbWVudC5nZXRQcm9qZWN0ZWRTaGFwZSgpLmNvbnRhaW5zUG9pbnQoIGVuZXJneUNodW5rLnBvc2l0aW9uUHJvcGVydHkudmFsdWUgKSApIHtcclxuICAgICAgICBpc09ic2N1cmVkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSApO1xyXG5cclxuICAgIHJldHVybiBpc09ic2N1cmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGR0XHJcbiAgICogQG92ZXJyaWRlXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBhbmltYXRlTm9uQ29udGFpbmVkRW5lcmd5Q2h1bmtzKCBkdCApIHtcclxuICAgIGNvbnN0IGNvbnRyb2xsZXJzID0gdGhpcy5lbmVyZ3lDaHVua1dhbmRlckNvbnRyb2xsZXJzLnNsaWNlKCk7XHJcblxyXG4gICAgY29udHJvbGxlcnMuZm9yRWFjaCggY29udHJvbGxlciA9PiB7XHJcbiAgICAgIGNvbnN0IGVjID0gY29udHJvbGxlci5lbmVyZ3lDaHVuaztcclxuXHJcbiAgICAgIC8vIHRoaXMgY2h1bmsgaXMgYmVpbmcgdHJhbnNmZXJyZWQgZnJvbSBhIGNvbnRhaW5lciBpbiB0aGUgYmVha2VyIHRvIHRoZSBmbHVpZCwgc28gbW92ZSBpdCBzaWRld2F5c1xyXG4gICAgICBpZiAoIHRoaXMuaXNFbmVyZ3lDaHVua09ic2N1cmVkKCBlYyApICkge1xyXG4gICAgICAgIGNvbnN0IHhWZWwgPSAwLjA1ICogZHQgKiAoIHRoaXMuZ2V0Q2VudGVyUG9pbnQoKS54ID4gZWMucG9zaXRpb25Qcm9wZXJ0eS52YWx1ZS54ID8gLTEgOiAxICk7XHJcbiAgICAgICAgZWMudHJhbnNsYXRlKCB4VmVsLCAwICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHdhbmRlciBjaHVuayB0b3dhcmRzIHRoZSBjb250YWluZXJcclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgY29udHJvbGxlci51cGRhdGVQb3NpdGlvbiggZHQgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gY2h1bmsgaXMgaW4gYSBwbGFjZSB3aGVyZSBpdCBjYW4gbWlncmF0ZSB0byB0aGUgc2xpY2VzIGFuZCBzdG9wIG1vdmluZ1xyXG4gICAgICBpZiAoICF0aGlzLmlzRW5lcmd5Q2h1bmtPYnNjdXJlZCggZWMgKSAmJiB0aGlzLmdldFNsaWNlQm91bmRzKCkuY29udGFpbnNQb2ludCggZWMucG9zaXRpb25Qcm9wZXJ0eS52YWx1ZSApICkge1xyXG4gICAgICAgIHRoaXMubW92ZUVuZXJneUNodW5rVG9TbGljZXMoIGNvbnRyb2xsZXIuZW5lcmd5Q2h1bmsgKTtcclxuICAgICAgfVxyXG4gICAgfSApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtFbmVyZ3lDaHVua30gZW5lcmd5Q2h1bmtcclxuICAgKiBAb3ZlcnJpZGVcclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgYWRkRW5lcmd5Q2h1bmsoIGVuZXJneUNodW5rICkge1xyXG4gICAgaWYgKCB0aGlzLmlzRW5lcmd5Q2h1bmtPYnNjdXJlZCggZW5lcmd5Q2h1bmsgKSApIHtcclxuXHJcbiAgICAgIC8vIHRoZSBjaHVuayBpcyBvYnNjdXJlZCBieSBhIG1vZGVsIGVsZW1lbnQgaW4gdGhlIGJlYWtlciwgc28gbW92ZSBpdCB0byB0aGUgZnJvbnQgb2YgdGhlIHotb3JkZXJcclxuICAgICAgZW5lcmd5Q2h1bmsuelBvc2l0aW9uUHJvcGVydHkuc2V0KCAwICk7XHJcbiAgICAgIHRoaXMuYXBwcm9hY2hpbmdFbmVyZ3lDaHVua3MucHVzaCggZW5lcmd5Q2h1bmsgKTtcclxuICAgICAgdGhpcy5lbmVyZ3lDaHVua1dhbmRlckNvbnRyb2xsZXJzLnB1c2goXHJcbiAgICAgICAgdGhpcy5lbmVyZ3lDaHVua1dhbmRlckNvbnRyb2xsZXJHcm91cC5jcmVhdGVOZXh0RWxlbWVudCggZW5lcmd5Q2h1bmssIHRoaXMucG9zaXRpb25Qcm9wZXJ0eSApXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgc3VwZXIuYWRkRW5lcmd5Q2h1bmsoIGVuZXJneUNodW5rICk7XHJcblxyXG4gICAgICAvLyBJZiB0aGUgZW5lcmd5IGNodW5rIGlzIGFib3ZlIHRoZSBiZWFrZXIsIGl0J3MgY29taW5nIGZyb20gdGhlIGFpciwgYW5kIG11c3QgYmUgY29uc3RyYWluZWQgdG8gdGhlIHdpZHRoIG9mXHJcbiAgICAgIC8vIHRoZSBiZWFrZXIgdG8gYXZvaWQgYmVpbmcgY2xpcHBlZC5cclxuICAgICAgY29uc3QgZWNQb3NpdGlvbiA9IGVuZXJneUNodW5rLnBvc2l0aW9uUHJvcGVydHkuZ2V0KCk7XHJcbiAgICAgIGNvbnN0IGJlYWtlckJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCk7XHJcbiAgICAgIGlmICggZWNQb3NpdGlvbi55ID4gYmVha2VyQm91bmRzLm1heFkgJiZcclxuICAgICAgICAgICBlY1Bvc2l0aW9uLnggPiBiZWFrZXJCb3VuZHMubWluWCAmJlxyXG4gICAgICAgICAgIGVjUG9zaXRpb24ueCA8IGJlYWtlckJvdW5kcy5tYXhYICkge1xyXG5cclxuICAgICAgICBjb25zdCB3YW5kZXJDb250cm9sbGVyID0gXy5maW5kKCB0aGlzLmVuZXJneUNodW5rV2FuZGVyQ29udHJvbGxlcnMuZ2V0QXJyYXkoKSwgY29udHJvbGxlciA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gY29udHJvbGxlci5lbmVyZ3lDaHVuayA9PT0gZW5lcmd5Q2h1bms7XHJcbiAgICAgICAgfSApO1xyXG5cclxuICAgICAgICBhc3NlcnQgJiYgYXNzZXJ0KCB3YW5kZXJDb250cm9sbGVyLCAnbm8gd2FuZGVyIGNvbnRyb2xsZXIgZm91bmQgZm9yIGVuZXJneSBjaHVuaycgKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IHRoZSBob3Jpem9udGFsIG1vdGlvbiBjb25zdHJhaW50IHRvIGJlIHNsaWdodGx5IG5hcnJvd2VyIHRoYW4gdGhlIGJlYWtlciB0byBhY2NvdW50IGZvciB0aGUgd2lkdGggb2ZcclxuICAgICAgICAvLyB0aGUgZW5lcmd5IGNodW5rIG5vZGVzLlxyXG4gICAgICAgIHdhbmRlckNvbnRyb2xsZXIuc2V0SG9yaXpvbnRhbFdhbmRlckNvbnN0cmFpbnQoIG5ldyBSYW5nZShcclxuICAgICAgICAgIGJlYWtlckJvdW5kcy5taW5YICsgYmVha2VyQm91bmRzLndpZHRoICogMC4xLFxyXG4gICAgICAgICAgYmVha2VyQm91bmRzLm1heFggLSBiZWFrZXJCb3VuZHMud2lkdGggKiAwLjFcclxuICAgICAgICApICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmVuZXJneUZvcm1zQW5kQ2hhbmdlcy5yZWdpc3RlciggJ0JlYWtlckNvbnRhaW5lcicsIEJlYWtlckNvbnRhaW5lciApO1xyXG5leHBvcnQgZGVmYXVsdCBCZWFrZXJDb250YWluZXI7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLEtBQUssTUFBTSw2QkFBNkI7QUFDL0MsT0FBT0MsU0FBUyxNQUFNLGlDQUFpQztBQUN2RCxPQUFPQyxRQUFRLE1BQU0sc0NBQXNDO0FBQzNELE9BQU9DLGFBQWEsTUFBTSwrQkFBK0I7QUFDekQsT0FBT0MsTUFBTSxNQUFNLDhCQUE4QjtBQUNqRCxPQUFPQyxxQkFBcUIsTUFBTSxnQ0FBZ0M7O0FBRWxFO0FBQ0EsSUFBSUMsU0FBUyxHQUFHLENBQUM7QUFFakIsTUFBTUMsZUFBZSxTQUFTSCxNQUFNLENBQUM7RUFFbkM7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0VJLFdBQVdBLENBQUVDLGVBQWUsRUFDZkMsS0FBSyxFQUNMQyxNQUFNLEVBQ05DLDRCQUE0QixFQUM1QkMsMkJBQTJCLEVBQzNCQyxnQkFBZ0IsRUFDaEJDLE1BQU0sRUFBRztJQUVwQmIsUUFBUSxD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