// Copyright 2020-2023, University of Colorado Boulder

/**
 * Contains the kit background and controls for switching between kits
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Property from '../../../../axon/js/Property.js';
import { Color, Node } from '../../../../scenery/js/imports.js';
import Carousel from '../../../../sun/js/Carousel.js';
import PageControl from '../../../../sun/js/PageControl.js';
import nullSoundPlayer from '../../../../tambo/js/shared-sound-players/nullSoundPlayer.js';
import buildAMolecule from '../../buildAMolecule.js';
import BAMConstants from '../BAMConstants.js';
import KitNode from './KitNode.js';
class KitPanel extends Node {
  /**
   * @param {KitCollection} kitCollection
   * @param {number} kitNodeWidth
   * @param {number} kitNodeHeight
   * @param {MoleculeCollectingScreenView|BAMScreenView} view
   * @param {boolean} isCollectingView
   */
  constructor(kitCollection, kitNodeWidth, kitNodeHeight, view, isCollectingView) {
    super();

    // Keep track of the KitCollection
    const kitCollectionProperty = new Property(kitCollection);

    // create kitNodes and unify their heights
    const kitNodes = [];
    kitCollectionProperty.link(kitCollection => {
      kitCollection.kits.forEach(kit => {
        kitNodes.push({
          createNode: tandem => {
            const kitNode = new KitNode(kit, view);
            const kitNodeBounds = kitNode.getLocalBounds();
            kitNode.setLocalBounds(kitNodeBounds.dilatedY((kitNodeHeight - kitNodeBounds.getHeight()) / 2));

            // We only want to adjust width of kit panel on collection views.
            if (isCollectingView) {
              kitNode.setLocalBounds(kitNodeBounds.dilatedX((kitNodeWidth - kitNodeBounds.getWidth()) / 2));
            } else {
              kitNode.setLocalBounds(kitNodeBounds.dilatedX((kitNodeWidth - kitNodeBounds.getWidth()) * 0.02));
            }
            return kitNode;
          }
        });
      });
    });

    // @public {Carousel} Treats each kit as an item in the Carousel.
    this.kitCarousel = new Carousel(kitNodes, {
      fill: BAMConstants.KIT_BACKGROUND,
      stroke: BAMConstants.KIT_BORDER,
      itemsPerPage: 1,
      buttonOptions: {
        soundPlayer: nullSoundPlayer
      }
    });

    // When the page number changes update the current collection.
    this.kitCarousel.pageNumberProperty.link(page => {
      kitCollectionProperty.value.currentKitProperty.value = kitCollectionProperty.value.kits[page];
    });
    this.addChild(this.kitCarousel);

    // Page control for input carousel
    const inputPageControl = new PageControl(this.kitCarousel.pageNumberProperty, this.kitCarousel.numberOfPagesProperty, {
      top: this.kitCarousel.bottom + BAMConstants.VIEW_PADDING / 2,
      centerX: this.kitCarousel.centerX,
      pageFill: Color.WHITE,
      pageStroke: Color.BLACK,
      interactive: true
    });
    this.addChild(inputPageControl);
  }

  /**
   * @public
   * @override
   */
  reset() {
    this.kitCarousel.reset();
  }
}
buildAMolecule.register('KitPanel', KitPanel);
export default KitPanel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQcm9wZXJ0eSIsIkNvbG9yIiwiTm9kZSIsIkNhcm91c2VsIiwiUGFnZUNvbnRyb2wiLCJudWxsU291bmRQbGF5ZXIiLCJidWlsZEFNb2xlY3VsZSIsIkJBTUNvbnN0YW50cyIsIktpdE5vZGUiLCJLaXRQYW5lbCIsImNvbnN0cnVjdG9yIiwia2l0Q29sbGVjdGlvbiIsImtpdE5vZGVXaWR0aCIsImtpdE5vZGVIZWlnaHQiLCJ2aWV3IiwiaXNDb2xsZWN0aW5nVmlldyIsImtpdENvbGxlY3Rpb25Qcm9wZXJ0eSIsImtpdE5vZGVzIiwibGluayIsImtpdHMiLCJmb3JFYWNoIiwia2l0IiwicHVzaCIsImNyZWF0ZU5vZGUiLCJ0YW5kZW0iLCJraXROb2RlIiwia2l0Tm9kZUJvdW5kcyIsImdldExvY2FsQm91bmRzIiwic2V0TG9jYWxCb3VuZHMiLCJkaWxhdGVkWSIsImdldEhlaWdodCIsImRpbGF0ZWRYIiwiZ2V0V2lkdGgiLCJraXRDYXJvdXNlbCIsImZpbGwiLCJLSVRfQkFDS0dST1VORCIsInN0cm9rZSIsIktJVF9CT1JERVIiLCJpdGVtc1BlclBhZ2UiLCJidXR0b25PcHRpb25zIiwic291bmRQbGF5ZXIiLCJwYWdlTnVtYmVyUHJvcGVydHkiLCJwYWdlIiwidmFsdWUiLCJjdXJyZW50S2l0UHJvcGVydHkiLCJhZGRDaGlsZCIsImlucHV0UGFnZUNvbnRyb2wiLCJudW1iZXJPZlBhZ2VzUHJvcGVydHkiLCJ0b3AiLCJib3R0b20iLCJWSUVXX1BBRERJTkciLCJjZW50ZXJYIiwicGFnZUZpbGwiLCJXSElURSIsInBhZ2VTdHJva2UiLCJCTEFDSyIsImludGVyYWN0aXZlIiwicmVzZXQiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIktpdFBhbmVsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDIwLTIwMjMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIENvbnRhaW5zIHRoZSBraXQgYmFja2dyb3VuZCBhbmQgY29udHJvbHMgZm9yIHN3aXRjaGluZyBiZXR3ZWVuIGtpdHNcclxuICpcclxuICogQGF1dGhvciBEZW56ZWxsIEJhcm5ldHQgKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqIEBhdXRob3IgSm9uYXRoYW4gT2xzb24gPGpvbmF0aGFuLm9sc29uQGNvbG9yYWRvLmVkdT5cclxuICovXHJcblxyXG5pbXBvcnQgUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9Qcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCB7IENvbG9yLCBOb2RlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IENhcm91c2VsIGZyb20gJy4uLy4uLy4uLy4uL3N1bi9qcy9DYXJvdXNlbC5qcyc7XHJcbmltcG9ydCBQYWdlQ29udHJvbCBmcm9tICcuLi8uLi8uLi8uLi9zdW4vanMvUGFnZUNvbnRyb2wuanMnO1xyXG5pbXBvcnQgbnVsbFNvdW5kUGxheWVyIGZyb20gJy4uLy4uLy4uLy4uL3RhbWJvL2pzL3NoYXJlZC1zb3VuZC1wbGF5ZXJzL251bGxTb3VuZFBsYXllci5qcyc7XHJcbmltcG9ydCBidWlsZEFNb2xlY3VsZSBmcm9tICcuLi8uLi9idWlsZEFNb2xlY3VsZS5qcyc7XHJcbmltcG9ydCBCQU1Db25zdGFudHMgZnJvbSAnLi4vQkFNQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IEtpdE5vZGUgZnJvbSAnLi9LaXROb2RlLmpzJztcclxuXHJcbmNsYXNzIEtpdFBhbmVsIGV4dGVuZHMgTm9kZSB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtLaXRDb2xsZWN0aW9ufSBraXRDb2xsZWN0aW9uXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGtpdE5vZGVXaWR0aFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBraXROb2RlSGVpZ2h0XHJcbiAgICogQHBhcmFtIHtNb2xlY3VsZUNvbGxlY3RpbmdTY3JlZW5WaWV3fEJBTVNjcmVlblZpZXd9IHZpZXdcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzQ29sbGVjdGluZ1ZpZXdcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcigga2l0Q29sbGVjdGlvbiwga2l0Tm9kZVdpZHRoLCBraXROb2RlSGVpZ2h0LCB2aWV3LCBpc0NvbGxlY3RpbmdWaWV3ICkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICAvLyBLZWVwIHRyYWNrIG9mIHRoZSBLaXRDb2xsZWN0aW9uXHJcbiAgICBjb25zdCBraXRDb2xsZWN0aW9uUHJvcGVydHkgPSBuZXcgUHJvcGVydHkoIGtpdENvbGxlY3Rpb24gKTtcclxuXHJcbiAgICAvLyBjcmVhdGUga2l0Tm9kZXMgYW5kIHVuaWZ5IHRoZWlyIGhlaWdodHNcclxuICAgIGNvbnN0IGtpdE5vZGVzID0gW107XHJcbiAgICBraXRDb2xsZWN0aW9uUHJvcGVydHkubGluaygga2l0Q29sbGVjdGlvbiA9PiB7XHJcbiAgICAgIGtpdENvbGxlY3Rpb24ua2l0cy5mb3JFYWNoKCBraXQgPT4ge1xyXG5cclxuICAgICAgICBraXROb2Rlcy5wdXNoKCB7XHJcbiAgICAgICAgICBjcmVhdGVOb2RlOiB0YW5kZW0gPT4ge1xyXG5cclxuICAgICAgICAgICAgY29uc3Qga2l0Tm9kZSA9IG5ldyBLaXROb2RlKCBraXQsIHZpZXcgKTtcclxuICAgICAgICAgICAgY29uc3Qga2l0Tm9kZUJvdW5kcyA9IGtpdE5vZGUuZ2V0TG9jYWxCb3VuZHMoKTtcclxuICAgICAgICAgICAga2l0Tm9kZS5zZXRMb2NhbEJvdW5kcygga2l0Tm9kZUJvdW5kcy5kaWxhdGVkWSggKCBraXROb2RlSGVpZ2h0IC0ga2l0Tm9kZUJvdW5kcy5nZXRIZWlnaHQoKSApIC8gMiApICk7XHJcblxyXG4gICAgICAgICAgICAvLyBXZSBvbmx5IHdhbnQgdG8gYWRqdXN0IHdpZHRoIG9mIGtpdCBwYW5lbCBvbiBjb2xsZWN0aW9uIHZpZXdzLlxyXG4gICAgICAgICAgICBpZiAoIGlzQ29sbGVjdGluZ1ZpZXcgKSB7XHJcbiAgICAgICAgICAgICAga2l0Tm9kZS5zZXRMb2NhbEJvdW5kcygga2l0Tm9kZUJvdW5kcy5kaWxhdGVkWCggKCBraXROb2RlV2lkdGggLSBraXROb2RlQm91bmRzLmdldFdpZHRoKCkgKSAvIDIgKSApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgIGtpdE5vZGUuc2V0TG9jYWxCb3VuZHMoIGtpdE5vZGVCb3VuZHMuZGlsYXRlZFgoICgga2l0Tm9kZVdpZHRoIC0ga2l0Tm9kZUJvdW5kcy5nZXRXaWR0aCgpICkgKiAwLjAyICkgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4ga2l0Tm9kZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9ICk7XHJcbiAgICAgIH0gKTtcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBAcHVibGljIHtDYXJvdXNlbH0gVHJlYXRzIGVhY2gga2l0IGFzIGFuIGl0ZW0gaW4gdGhlIENhcm91c2VsLlxyXG4gICAgdGhpcy5raXRDYXJvdXNlbCA9IG5ldyBDYXJvdXNlbCgga2l0Tm9kZXMsIHtcclxuICAgICAgZmlsbDogQkFNQ29uc3RhbnRzLktJVF9CQUNLR1JPVU5ELFxyXG4gICAgICBzdHJva2U6IEJBTUNvbnN0YW50cy5LSVRfQk9SREVSLFxyXG4gICAgICBpdGVtc1BlclBhZ2U6IDEsXHJcbiAgICAgIGJ1dHRvbk9wdGlvbnM6IHtcclxuICAgICAgICBzb3VuZFBsYXllcjogbnVsbFNvdW5kUGxheWVyXHJcbiAgICAgIH1cclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBXaGVuIHRoZSBwYWdlIG51bWJlciBjaGFuZ2VzIHVwZGF0ZSB0aGUgY3VycmVudCBjb2xsZWN0aW9uLlxyXG4gICAgdGhpcy5raXRDYXJvdXNlbC5wYWdlTnVtYmVyUHJvcGVydHkubGluayggcGFnZSA9PiB7XHJcbiAgICAgIGtpdENvbGxlY3Rpb25Qcm9wZXJ0eS52YWx1ZS5jdXJyZW50S2l0UHJvcGVydHkudmFsdWUgPSBraXRDb2xsZWN0aW9uUHJvcGVydHkudmFsdWUua2l0c1sgcGFnZSBdO1xyXG4gICAgfSApO1xyXG4gICAgdGhpcy5hZGRDaGlsZCggdGhpcy5raXRDYXJvdXNlbCApO1xyXG5cclxuICAgIC8vIFBhZ2UgY29udHJvbCBmb3IgaW5wdXQgY2Fyb3VzZWxcclxuICAgIGNvbnN0IGlucHV0UGFnZUNvbnRyb2wgPSBuZXcgUGFnZUNvbnRyb2woIHRoaXMua2l0Q2Fyb3VzZWwucGFnZU51bWJlclByb3BlcnR5LCB0aGlzLmtpdENhcm91c2VsLm51bWJlck9mUGFnZXNQcm9wZXJ0eSwge1xyXG4gICAgICB0b3A6IHRoaXMua2l0Q2Fyb3VzZWwuYm90dG9tICsgQkFNQ29uc3RhbnRzLlZJRVdfUEFERElORyAvIDIsXHJcbiAgICAgIGNlbnRlclg6IHRoaXMua2l0Q2Fyb3VzZWwuY2VudGVyWCxcclxuICAgICAgcGFnZUZpbGw6IENvbG9yLldISVRFLFxyXG4gICAgICBwYWdlU3Ryb2tlOiBDb2xvci5CTEFDSyxcclxuICAgICAgaW50ZXJhY3RpdmU6IHRydWVcclxuICAgIH0gKTtcclxuICAgIHRoaXMuYWRkQ2hpbGQoIGlucHV0UGFnZUNvbnRyb2wgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwdWJsaWNcclxuICAgKiBAb3ZlcnJpZGVcclxuICAgKi9cclxuICByZXNldCgpIHtcclxuICAgIHRoaXMua2l0Q2Fyb3VzZWwucmVzZXQoKTtcclxuICB9XHJcbn1cclxuXHJcbmJ1aWxkQU1vbGVjdWxlLnJlZ2lzdGVyKCAnS2l0UGFuZWwnLCBLaXRQYW5lbCApO1xyXG5leHBvcnQgZGVmYXVsdCBLaXRQYW5lbDsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxRQUFRLE1BQU0saUNBQWlDO0FBQ3RELFNBQVNDLEtBQUssRUFBRUMsSUFBSSxRQUFRLG1DQUFtQztBQUMvRCxPQUFPQyxRQUFRLE1BQU0sZ0NBQWdDO0FBQ3JELE9BQU9D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