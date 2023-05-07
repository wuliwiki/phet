// Copyright 2023, University of Colorado Boulder

import buildANucleus from '../../buildANucleus.js';
import { Circle, Color, Node, RadialGradient } from '../../../../scenery/js/imports.js';
import BANConstants from '../../common/BANConstants.js';
import LinearFunction from '../../../../dot/js/LinearFunction.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
/**
 * Node that holds the ParticleView's from ParticleAtom. Rearranges particles in different node layers using z-indexing.
 *
 * @author Luisa Vargas
 * @author Marla Schulz (PhET Interactive Simulations)
 */ // empirically determined, from the ElectronCloudView radius
const MIN_ELECTRON_CLOUD_RADIUS = 42.5;
class ParticleAtomNode extends Node {
  constructor(particleViewMap, atomCenter, protonCountRange) {
    // Add the nucleonLayers
    const nucleonLayers = [];
    _.times(BANConstants.NUMBER_OF_NUCLEON_LAYERS, () => {
      const nucleonLayer = new Node();
      nucleonLayers.push(nucleonLayer);
    });

    // create and add the electron cloud
    const electronCloud = new Circle({
      radius: MIN_ELECTRON_CLOUD_RADIUS,
      fill: new RadialGradient(0, 0, 0, 0, 0, MIN_ELECTRON_CLOUD_RADIUS).addColorStop(0, 'rgba( 0, 0, 255, 200 )').addColorStop(0.9, 'rgba( 0, 0, 255, 0 )')
    });
    electronCloud.center = atomCenter;

    // create and add the dashed empty circle at the center
    const lineWidth = 1;
    const emptyAtomCircle = new Circle({
      radius: BANConstants.PARTICLE_RADIUS - lineWidth,
      stroke: Color.GRAY,
      lineDash: [2, 2],
      lineWidth: lineWidth
    });
    emptyAtomCircle.center = atomCenter;
    super({
      children: [emptyAtomCircle, electronCloud, ...nucleonLayers]
    });
    this.nucleonLayers = nucleonLayers;
    this.nucleonLayers.reverse(); // Set up the nucleon layers so that layer 0 is in front.

    this.particleViewMap = particleViewMap;
    this.atomCenter = atomCenter;
    this.protonCountRange = protonCountRange;
    this.electronCloud = electronCloud;
    this.emptyAtomCircle = emptyAtomCircle;
  }

  /**
   * Add ParticleView to the correct nucleonLayer.
   */
  addParticleView(particle) {
    const particleView = this.particleViewMap[particle.id];
    this.nucleonLayers[particle.zLayerProperty.get()].addChild(particleView);

    // Add a listener that adjusts a nucleon's z-order layering.
    particle.zLayerProperty.link(zLayer => {
      assert && assert(this.nucleonLayers.length > zLayer, 'zLayer for nucleon exceeds number of layers, max number may need increasing.');

      // Determine whether nucleon view is on the correct layer.
      let onCorrectLayer = false;
      const nucleonLayersChildren = this.nucleonLayers[zLayer].getChildren();
      nucleonLayersChildren.forEach(particleView => {
        if (particleView.particle === particle) {
          onCorrectLayer = true;
        }
      });
      if (!onCorrectLayer) {
        // Remove particle view from its current layer.
        let particleView = null;
        for (let layerIndex = 0; layerIndex < this.nucleonLayers.length && particleView === null; layerIndex++) {
          for (let childIndex = 0; childIndex < this.nucleonLayers[layerIndex].children.length; childIndex++) {
            const nucleonLayersChildren = this.nucleonLayers[layerIndex].getChildren();
            if (nucleonLayersChildren[childIndex].particle === particle) {
              particleView = nucleonLayersChildren[childIndex];
              this.nucleonLayers[layerIndex].removeChildAt(childIndex);
              break;
            }
          }
        }

        // Add the particle view to its new layer.
        assert && assert(particleView, 'Particle view not found during relayering');
        this.nucleonLayers[zLayer].addChild(particleView);
      }
    });
  }

  /**
   * This method increases the value of the smaller radius values and decreases the value of the larger ones.
   * This effectively reduces the range of radii values used.
   * This is a very specialized function for the purposes of this class.
   *
   * minChangedRadius and maxChangedRadius define the way in which an input value is increased or decreased. These values
   * can be adjusted as needed to make the cloud size appear as desired.
   */
  static reduceRadiusRange(value, minShellRadius, maxShellRadius, minChangedRadius, maxChangedRadius) {
    const compressionFunction = new LinearFunction(minShellRadius, maxShellRadius, minChangedRadius, maxChangedRadius);
    return compressionFunction.evaluate(value);
  }

  /**
   * Maps a number of electrons to a diameter in screen coordinates for the electron shell.  This mapping function is
   * based on the real size relationships between the various atoms, but has some tweakable parameters to reduce the
   * range and scale to provide values that are usable for our needs on the canvas.
   */
  getElectronShellDiameter(numElectrons, minChangedRadius, maxChangedRadius) {
    const maxElectrons = this.protonCountRange.max;
    const atomicRadius = AtomIdentifier.getAtomicRadius(numElectrons);
    if (atomicRadius) {
      return ParticleAtomNode.reduceRadiusRange(atomicRadius, this.protonCountRange.min + 1, maxElectrons, minChangedRadius, maxChangedRadius);
    } else {
      assert && assert(numElectrons <= maxElectrons, `Atom has more than supported number of electrons, ${numElectrons}`);
      return 0;
    }
  }

  /**
   * Update size of electron cloud based on protonNumber since the nuclides created are neutral, meaning the number of
   * electrons is the same as the number of protons.
   */
  updateCloudSize(protonCount, factor, minChangedRadius, maxChangedRadius) {
    if (protonCount === 0) {
      this.electronCloud.radius = 1E-5; // arbitrary non-zero value
      this.electronCloud.fill = 'transparent';
    } else {
      const radius = this.atomCenter.x - this.getElectronShellDiameter(protonCount, minChangedRadius, maxChangedRadius) / 2;
      this.electronCloud.radius = radius * factor;
      this.electronCloud.fill = new RadialGradient(0, 0, 0, 0, 0, radius * factor).addColorStop(0, 'rgba( 0, 0, 255, 200 )').addColorStop(0.9, 'rgba( 0, 0, 255, 0 )');
    }
  }
}
buildANucleus.register('ParticleAtomNode', ParticleAtomNode);
export default ParticleAtomNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJidWlsZEFOdWNsZXVzIiwiQ2lyY2xlIiwiQ29sb3IiLCJOb2RlIiwiUmFkaWFsR3JhZGllbnQiLCJCQU5Db25zdGFudHMiLCJMaW5lYXJGdW5jdGlvbiIsIkF0b21JZGVudGlmaWVyIiwiTUlOX0VMRUNUUk9OX0NMT1VEX1JBRElVUyIsIlBhcnRpY2xlQXRvbU5vZGUiLCJjb25zdHJ1Y3RvciIsInBhcnRpY2xlVmlld01hcCIsImF0b21DZW50ZXIiLCJwcm90b25Db3VudFJhbmdlIiwibnVjbGVvbkxheWVycyIsIl8iLCJ0aW1lcyIsIk5VTUJFUl9PRl9OVUNMRU9OX0xBWUVSUyIsIm51Y2xlb25MYXllciIsInB1c2giLCJlbGVjdHJvbkNsb3VkIiwicmFkaXVzIiwiZmlsbCIsImFkZENvbG9yU3RvcCIsImNlbnRlciIsImxpbmVXaWR0aCIsImVtcHR5QXRvbUNpcmNsZSIsIlBBUlRJQ0xFX1JBRElVUyIsInN0cm9rZSIsIkdSQVkiLCJsaW5lRGFzaCIsImNoaWxkcmVuIiwicmV2ZXJzZSIsImFkZFBhcnRpY2xlVmlldyIsInBhcnRpY2xlIiwicGFydGljbGVWaWV3IiwiaWQiLCJ6TGF5ZXJQcm9wZXJ0eSIsImdldCIsImFkZENoaWxkIiwibGluayIsInpMYXllciIsImFzc2VydCIsImxlbmd0aCIsIm9uQ29ycmVjdExheWVyIiwibnVjbGVvbkxheWVyc0NoaWxkcmVuIiwiZ2V0Q2hpbGRyZW4iLCJmb3JFYWNoIiwibGF5ZXJJbmRleCIsImNoaWxkSW5kZXgiLCJyZW1vdmVDaGlsZEF0IiwicmVkdWNlUmFkaXVzUmFuZ2UiLCJ2YWx1ZSIsIm1pblNoZWxsUmFkaXVzIiwibWF4U2hlbGxSYWRpdXMiLCJtaW5DaGFuZ2VkUmFkaXVzIiwibWF4Q2hhbmdlZFJhZGl1cyIsImNvbXByZXNzaW9uRnVuY3Rpb24iLCJldmFsdWF0ZSIsImdldEVsZWN0cm9uU2hlbGxEaWFtZXRlciIsIm51bUVsZWN0cm9ucyIsIm1heEVsZWN0cm9ucyIsIm1heCIsImF0b21pY1JhZGl1cyIsImdldEF0b21pY1JhZGl1cyIsIm1pbiIsInVwZGF0ZUNsb3VkU2l6ZSIsInByb3RvbkNvdW50IiwiZmFjdG9yIiwieCIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiUGFydGljbGVBdG9tTm9kZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG5pbXBvcnQgYnVpbGRBTnVjbGV1cyBmcm9tICcuLi8uLi9idWlsZEFOdWNsZXVzLmpzJztcclxuaW1wb3J0IHsgQ2lyY2xlLCBDb2xvciwgTm9kZSwgUmFkaWFsR3JhZGllbnQgfSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgeyBQYXJ0aWNsZVZpZXdNYXAgfSBmcm9tICcuLi8uLi9jb21tb24vdmlldy9CQU5TY3JlZW5WaWV3LmpzJztcclxuaW1wb3J0IEJBTkNvbnN0YW50cyBmcm9tICcuLi8uLi9jb21tb24vQkFOQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IExpbmVhckZ1bmN0aW9uIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9MaW5lYXJGdW5jdGlvbi5qcyc7XHJcbmltcG9ydCBWZWN0b3IyIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9WZWN0b3IyLmpzJztcclxuaW1wb3J0IEF0b21JZGVudGlmaWVyIGZyb20gJy4uLy4uLy4uLy4uL3NocmVkL2pzL0F0b21JZGVudGlmaWVyLmpzJztcclxuaW1wb3J0IFBhcnRpY2xlIGZyb20gJy4uLy4uLy4uLy4uL3NocmVkL2pzL21vZGVsL1BhcnRpY2xlLmpzJztcclxuaW1wb3J0IFBhcnRpY2xlVmlldyBmcm9tICcuLi8uLi8uLi8uLi9zaHJlZC9qcy92aWV3L1BhcnRpY2xlVmlldy5qcyc7XHJcbmltcG9ydCBSYW5nZSBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvUmFuZ2UuanMnO1xyXG5cclxuLyoqXHJcbiAqIE5vZGUgdGhhdCBob2xkcyB0aGUgUGFydGljbGVWaWV3J3MgZnJvbSBQYXJ0aWNsZUF0b20uIFJlYXJyYW5nZXMgcGFydGljbGVzIGluIGRpZmZlcmVudCBub2RlIGxheWVycyB1c2luZyB6LWluZGV4aW5nLlxyXG4gKlxyXG4gKiBAYXV0aG9yIEx1aXNhIFZhcmdhc1xyXG4gKiBAYXV0aG9yIE1hcmxhIFNjaHVseiAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG4vLyBlbXBpcmljYWxseSBkZXRlcm1pbmVkLCBmcm9tIHRoZSBFbGVjdHJvbkNsb3VkVmlldyByYWRpdXNcclxuY29uc3QgTUlOX0VMRUNUUk9OX0NMT1VEX1JBRElVUyA9IDQyLjU7XHJcblxyXG5jbGFzcyBQYXJ0aWNsZUF0b21Ob2RlIGV4dGVuZHMgTm9kZSB7XHJcbiAgXHJcbiAgcHJpdmF0ZSBudWNsZW9uTGF5ZXJzOiBOb2RlW107XHJcbiAgcHVibGljIHJlYWRvbmx5IGVsZWN0cm9uQ2xvdWQ6IENpcmNsZTtcclxuICBwcml2YXRlIHJlYWRvbmx5IGF0b21DZW50ZXI6IFZlY3RvcjI7XHJcbiAgcHJpdmF0ZSBwcm90b25Db3VudFJhbmdlOiBSYW5nZTtcclxuICBwcml2YXRlIHJlYWRvbmx5IHBhcnRpY2xlVmlld01hcDogUGFydGljbGVWaWV3TWFwO1xyXG4gIHB1YmxpYyByZWFkb25seSBlbXB0eUF0b21DaXJjbGU6IENpcmNsZTtcclxuICBcclxuICBwdWJsaWMgY29uc3RydWN0b3IoIHBhcnRpY2xlVmlld01hcDogUGFydGljbGVWaWV3TWFwLCBhdG9tQ2VudGVyOiBWZWN0b3IyLCBwcm90b25Db3VudFJhbmdlOiBSYW5nZSApIHtcclxuXHJcbiAgICAvLyBBZGQgdGhlIG51Y2xlb25MYXllcnNcclxuICAgIGNvbnN0IG51Y2xlb25MYXllcnM6IE5vZGVbXSA9IFtdO1xyXG4gICAgXy50aW1lcyggQkFOQ29uc3RhbnRzLk5VTUJFUl9PRl9OVUNMRU9OX0xBWUVSUywgKCkgPT4ge1xyXG4gICAgICBjb25zdCBudWNsZW9uTGF5ZXIgPSBuZXcgTm9kZSgpO1xyXG4gICAgICBudWNsZW9uTGF5ZXJzLnB1c2goIG51Y2xlb25MYXllciApO1xyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBhbmQgYWRkIHRoZSBlbGVjdHJvbiBjbG91ZFxyXG4gICAgY29uc3QgZWxlY3Ryb25DbG91ZCA9IG5ldyBDaXJjbGUoIHtcclxuICAgICAgcmFkaXVzOiBNSU5fRUxFQ1RST05fQ0xPVURfUkFESVVTLFxyXG4gICAgICBmaWxsOiBuZXcgUmFkaWFsR3JhZGllbnQoIDAsIDAsIDAsIDAsIDAsIE1JTl9FTEVDVFJPTl9DTE9VRF9SQURJVVMgKVxyXG4gICAgICAgIC5hZGRDb2xvclN0b3AoIDAsICdyZ2JhKCAwLCAwLCAyNTUsIDIwMCApJyApXHJcbiAgICAgICAgLmFkZENvbG9yU3RvcCggMC45LCAncmdiYSggMCwgMCwgMjU1LCAwICknIClcclxuICAgIH0gKTtcclxuICAgIGVsZWN0cm9uQ2xvdWQuY2VudGVyID0gYXRvbUNlbnRlcjtcclxuXHJcbiAgICAvLyBjcmVhdGUgYW5kIGFkZCB0aGUgZGFzaGVkIGVtcHR5IGNpcmNsZSBhdCB0aGUgY2VudGVyXHJcbiAgICBjb25zdCBsaW5lV2lkdGggPSAxO1xyXG4gICAgY29uc3QgZW1wdHlBdG9tQ2lyY2xlID0gbmV3IENpcmNsZSgge1xyXG4gICAgICByYWRpdXM6IEJBTkNvbnN0YW50cy5QQVJUSUNMRV9SQURJVVMgLSBsaW5lV2lkdGgsXHJcbiAgICAgIHN0cm9rZTogQ29sb3IuR1JBWSxcclxuICAgICAgbGluZURhc2g6IFsgMiwgMiBdLFxyXG4gICAgICBsaW5lV2lkdGg6IGxpbmVXaWR0aFxyXG4gICAgfSApO1xyXG4gICAgZW1wdHlBdG9tQ2lyY2xlLmNlbnRlciA9IGF0b21DZW50ZXI7XHJcblxyXG4gICAgc3VwZXIoIHsgY2hpbGRyZW46IFsgZW1wdHlBdG9tQ2lyY2xlLCBlbGVjdHJvbkNsb3VkLCAuLi5udWNsZW9uTGF5ZXJzIF0gfSApO1xyXG5cclxuICAgIHRoaXMubnVjbGVvbkxheWVycyA9IG51Y2xlb25MYXllcnM7XHJcbiAgICB0aGlzLm51Y2xlb25MYXllcnMucmV2ZXJzZSgpOyAvLyBTZXQgdXAgdGhlIG51Y2xlb24gbGF5ZXJzIHNvIHRoYXQgbGF5ZXIgMCBpcyBpbiBmcm9udC5cclxuXHJcbiAgICB0aGlzLnBhcnRpY2xlVmlld01hcCA9IHBhcnRpY2xlVmlld01hcDtcclxuICAgIHRoaXMuYXRvbUNlbnRlciA9IGF0b21DZW50ZXI7XHJcbiAgICB0aGlzLnByb3RvbkNvdW50UmFuZ2UgPSBwcm90b25Db3VudFJhbmdlO1xyXG4gICAgdGhpcy5lbGVjdHJvbkNsb3VkID0gZWxlY3Ryb25DbG91ZDtcclxuICAgIHRoaXMuZW1wdHlBdG9tQ2lyY2xlID0gZW1wdHlBdG9tQ2lyY2xlO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBQYXJ0aWNsZVZpZXcgdG8gdGhlIGNvcnJlY3QgbnVjbGVvbkxheWVyLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhZGRQYXJ0aWNsZVZpZXcoIHBhcnRpY2xlOiBQYXJ0aWNsZSApOiB2b2lkIHtcclxuICAgIGNvbnN0IHBhcnRpY2xlVmlldyA9IHRoaXMucGFydGljbGVWaWV3TWFwWyBwYXJ0aWNsZS5pZCBdO1xyXG4gICAgdGhpcy5udWNsZW9uTGF5ZXJzWyBwYXJ0aWNsZS56TGF5ZXJQcm9wZXJ0eS5nZXQoKSBdLmFkZENoaWxkKCBwYXJ0aWNsZVZpZXcgKTtcclxuXHJcbiAgICAvLyBBZGQgYSBsaXN0ZW5lciB0aGF0IGFkanVzdHMgYSBudWNsZW9uJ3Mgei1vcmRlciBsYXllcmluZy5cclxuICAgIHBhcnRpY2xlLnpMYXllclByb3BlcnR5LmxpbmsoIHpMYXllciA9PiB7XHJcbiAgICAgIGFzc2VydCAmJiBhc3NlcnQoXHJcbiAgICAgICAgdGhpcy5udWNsZW9uTGF5ZXJzLmxlbmd0aCA+IHpMYXllcixcclxuICAgICAgICAnekxheWVyIGZvciBudWNsZW9uIGV4Y2VlZHMgbnVtYmVyIG9mIGxheWVycywgbWF4IG51bWJlciBtYXkgbmVlZCBpbmNyZWFzaW5nLidcclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vIERldGVybWluZSB3aGV0aGVyIG51Y2xlb24gdmlldyBpcyBvbiB0aGUgY29ycmVjdCBsYXllci5cclxuICAgICAgbGV0IG9uQ29ycmVjdExheWVyID0gZmFsc2U7XHJcbiAgICAgIGNvbnN0IG51Y2xlb25MYXllcnNDaGlsZHJlbiA9IHRoaXMubnVjbGVvbkxheWVyc1sgekxheWVyIF0uZ2V0Q2hpbGRyZW4oKSBhcyBQYXJ0aWNsZVZpZXdbXTtcclxuICAgICAgbnVjbGVvbkxheWVyc0NoaWxkcmVuLmZvckVhY2goIHBhcnRpY2xlVmlldyA9PiB7XHJcbiAgICAgICAgaWYgKCBwYXJ0aWNsZVZpZXcucGFydGljbGUgPT09IHBhcnRpY2xlICkge1xyXG4gICAgICAgICAgb25Db3JyZWN0TGF5ZXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSApO1xyXG5cclxuICAgICAgaWYgKCAhb25Db3JyZWN0TGF5ZXIgKSB7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBwYXJ0aWNsZSB2aWV3IGZyb20gaXRzIGN1cnJlbnQgbGF5ZXIuXHJcbiAgICAgICAgbGV0IHBhcnRpY2xlVmlldyA9IG51bGw7XHJcbiAgICAgICAgZm9yICggbGV0IGxheWVySW5kZXggPSAwOyBsYXllckluZGV4IDwgdGhpcy5udWNsZW9uTGF5ZXJzLmxlbmd0aCAmJiBwYXJ0aWNsZVZpZXcgPT09IG51bGw7IGxheWVySW5kZXgrKyApIHtcclxuICAgICAgICAgIGZvciAoIGxldCBjaGlsZEluZGV4ID0gMDsgY2hpbGRJbmRleCA8IHRoaXMubnVjbGVvbkxheWVyc1sgbGF5ZXJJbmRleCBdLmNoaWxkcmVuLmxlbmd0aDsgY2hpbGRJbmRleCsrICkge1xyXG4gICAgICAgICAgICBjb25zdCBudWNsZW9uTGF5ZXJzQ2hpbGRyZW4gPSB0aGlzLm51Y2xlb25MYXllcnNbIGxheWVySW5kZXggXS5nZXRDaGlsZHJlbigpIGFzIFBhcnRpY2xlVmlld1tdO1xyXG4gICAgICAgICAgICBpZiAoIG51Y2xlb25MYXllcnNDaGlsZHJlblsgY2hpbGRJbmRleCBdLnBhcnRpY2xlID09PSBwYXJ0aWNsZSApIHtcclxuICAgICAgICAgICAgICBwYXJ0aWNsZVZpZXcgPSBudWNsZW9uTGF5ZXJzQ2hpbGRyZW5bIGNoaWxkSW5kZXggXTtcclxuICAgICAgICAgICAgICB0aGlzLm51Y2xlb25MYXllcnNbIGxheWVySW5kZXggXS5yZW1vdmVDaGlsZEF0KCBjaGlsZEluZGV4ICk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCB0aGUgcGFydGljbGUgdmlldyB0byBpdHMgbmV3IGxheWVyLlxyXG4gICAgICAgIGFzc2VydCAmJiBhc3NlcnQoIHBhcnRpY2xlVmlldywgJ1BhcnRpY2xlIHZpZXcgbm90IGZvdW5kIGR1cmluZyByZWxheWVyaW5nJyApO1xyXG4gICAgICAgIHRoaXMubnVjbGVvbkxheWVyc1sgekxheWVyIF0uYWRkQ2hpbGQoIHBhcnRpY2xlVmlldyEgKTtcclxuICAgICAgfVxyXG4gICAgfSApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBtZXRob2QgaW5jcmVhc2VzIHRoZSB2YWx1ZSBvZiB0aGUgc21hbGxlciByYWRpdXMgdmFsdWVzIGFuZCBkZWNyZWFzZXMgdGhlIHZhbHVlIG9mIHRoZSBsYXJnZXIgb25lcy5cclxuICAgKiBUaGlzIGVmZmVjdGl2ZWx5IHJlZHVjZXMgdGhlIHJhbmdlIG9mIHJhZGlpIHZhbHVlcyB1c2VkLlxyXG4gICAqIFRoaXMgaXMgYSB2ZXJ5IHNwZWNpYWxpemVkIGZ1bmN0aW9uIGZvciB0aGUgcHVycG9zZXMgb2YgdGhpcyBjbGFzcy5cclxuICAgKlxyXG4gICAqIG1pbkNoYW5nZWRSYWRpdXMgYW5kIG1heENoYW5nZWRSYWRpdXMgZGVmaW5lIHRoZSB3YXkgaW4gd2hpY2ggYW4gaW5wdXQgdmFsdWUgaXMgaW5jcmVhc2VkIG9yIGRlY3JlYXNlZC4gVGhlc2UgdmFsdWVzXHJcbiAgICogY2FuIGJlIGFkanVzdGVkIGFzIG5lZWRlZCB0byBtYWtlIHRoZSBjbG91ZCBzaXplIGFwcGVhciBhcyBkZXNpcmVkLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdGljIHJlZHVjZVJhZGl1c1JhbmdlKCB2YWx1ZTogbnVtYmVyLCBtaW5TaGVsbFJhZGl1czogbnVtYmVyLCBtYXhTaGVsbFJhZGl1czogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5DaGFuZ2VkUmFkaXVzOiBudW1iZXIsIG1heENoYW5nZWRSYWRpdXM6IG51bWJlciApOiBudW1iZXIge1xyXG4gICAgY29uc3QgY29tcHJlc3Npb25GdW5jdGlvbiA9IG5ldyBMaW5lYXJGdW5jdGlvbiggbWluU2hlbGxSYWRpdXMsIG1heFNoZWxsUmFkaXVzLCBtaW5DaGFuZ2VkUmFkaXVzLCBtYXhDaGFuZ2VkUmFkaXVzICk7XHJcbiAgICByZXR1cm4gY29tcHJlc3Npb25GdW5jdGlvbi5ldmFsdWF0ZSggdmFsdWUgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hcHMgYSBudW1iZXIgb2YgZWxlY3Ryb25zIHRvIGEgZGlhbWV0ZXIgaW4gc2NyZWVuIGNvb3JkaW5hdGVzIGZvciB0aGUgZWxlY3Ryb24gc2hlbGwuICBUaGlzIG1hcHBpbmcgZnVuY3Rpb24gaXNcclxuICAgKiBiYXNlZCBvbiB0aGUgcmVhbCBzaXplIHJlbGF0aW9uc2hpcHMgYmV0d2VlbiB0aGUgdmFyaW91cyBhdG9tcywgYnV0IGhhcyBzb21lIHR3ZWFrYWJsZSBwYXJhbWV0ZXJzIHRvIHJlZHVjZSB0aGVcclxuICAgKiByYW5nZSBhbmQgc2NhbGUgdG8gcHJvdmlkZSB2YWx1ZXMgdGhhdCBhcmUgdXNhYmxlIGZvciBvdXIgbmVlZHMgb24gdGhlIGNhbnZhcy5cclxuICAgKi9cclxuICBwcml2YXRlIGdldEVsZWN0cm9uU2hlbGxEaWFtZXRlciggbnVtRWxlY3Ryb25zOiBudW1iZXIsIG1pbkNoYW5nZWRSYWRpdXM6IG51bWJlciwgbWF4Q2hhbmdlZFJhZGl1czogbnVtYmVyICk6IG51bWJlciB7XHJcbiAgICBjb25zdCBtYXhFbGVjdHJvbnMgPSB0aGlzLnByb3RvbkNvdW50UmFuZ2UubWF4O1xyXG4gICAgY29uc3QgYXRvbWljUmFkaXVzID0gQXRvbUlkZW50aWZpZXIuZ2V0QXRvbWljUmFkaXVzKCBudW1FbGVjdHJvbnMgKTtcclxuICAgIGlmICggYXRvbWljUmFkaXVzICkge1xyXG4gICAgICByZXR1cm4gUGFydGljbGVBdG9tTm9kZS5yZWR1Y2VSYWRpdXNSYW5nZSggYXRvbWljUmFkaXVzLCB0aGlzLnByb3RvbkNvdW50UmFuZ2UubWluICsgMSwgbWF4RWxlY3Ryb25zLFxyXG4gICAgICAgIG1pbkNoYW5nZWRSYWRpdXMsIG1heENoYW5nZWRSYWRpdXMgKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBhc3NlcnQgJiYgYXNzZXJ0KCBudW1FbGVjdHJvbnMgPD0gbWF4RWxlY3Ryb25zLCBgQXRvbSBoYXMgbW9yZSB0aGFuIHN1cHBvcnRlZCBudW1iZXIgb2YgZWxlY3Ryb25zLCAke251bUVsZWN0cm9uc31gICk7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHNpemUgb2YgZWxlY3Ryb24gY2xvdWQgYmFzZWQgb24gcHJvdG9uTnVtYmVyIHNpbmNlIHRoZSBudWNsaWRlcyBjcmVhdGVkIGFyZSBuZXV0cmFsLCBtZWFuaW5nIHRoZSBudW1iZXIgb2ZcclxuICAgKiBlbGVjdHJvbnMgaXMgdGhlIHNhbWUgYXMgdGhlIG51bWJlciBvZiBwcm90b25zLlxyXG4gICAqL1xyXG4gIHB1YmxpYyB1cGRhdGVDbG91ZFNpemUoIHByb3RvbkNvdW50OiBudW1iZXIsIGZhY3RvcjogbnVtYmVyLCBtaW5DaGFuZ2VkUmFkaXVzOiBudW1iZXIsIG1heENoYW5nZWRSYWRpdXM6IG51bWJlciApOiB2b2lkIHtcclxuICAgIGlmICggcHJvdG9uQ291bnQgPT09IDAgKSB7XHJcbiAgICAgIHRoaXMuZWxlY3Ryb25DbG91ZC5yYWRpdXMgPSAxRS01OyAvLyBhcmJpdHJhcnkgbm9uLXplcm8gdmFsdWVcclxuICAgICAgdGhpcy5lbGVjdHJvbkNsb3VkLmZpbGwgPSAndHJhbnNwYXJlbnQnO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGNvbnN0IHJhZGl1cyA9IHRoaXMuYXRvbUNlbnRlci54IC0gKCB0aGlzLmdldEVsZWN0cm9uU2hlbGxEaWFtZXRlciggcHJvdG9uQ291bnQsIG1pbkNoYW5nZWRSYWRpdXMsIG1heENoYW5nZWRSYWRpdXMgKSAvIDIgKTtcclxuICAgICAgdGhpcy5lbGVjdHJvbkNsb3VkLnJhZGl1cyA9IHJhZGl1cyAqIGZhY3RvcjtcclxuICAgICAgdGhpcy5lbGVjdHJvbkNsb3VkLmZpbGwgPSBuZXcgUmFkaWFsR3JhZGllbnQoIDAsIDAsIDAsIDAsIDAsIHJhZGl1cyAqIGZhY3RvciApXHJcbiAgICAgICAgLmFkZENvbG9yU3RvcCggMCwgJ3JnYmEoIDAsIDAsIDI1NSwgMjAwICknIClcclxuICAgICAgICAuYWRkQ29sb3JTdG9wKCAwLjksICdyZ2JhKCAwLCAwLCAyNTUsIDAgKScgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcblxyXG5idWlsZEFOdWNsZXVzLnJlZ2lzdGVyKCAnUGFydGljbGVBdG9tTm9kZScsIFBhcnRpY2xlQXRvbU5vZGUgKTtcclxuZXhwb3J0IGRlZmF1bHQgUGFydGljbGVBdG9tTm9kZTtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxPQUFPQSxhQUFhLE1BQU0sd0JBQXdCO0FBQ2xELFNBQVNDLE1BQU0sRUFBRUMsS0FBSyxFQUFFQyxJQUFJLEVBQUVDLGNBQWMsUUFBUSxtQ0FBbUM7QUFFdkYsT0FBT0MsWUFBWSxNQUFNLDhCQUE4QjtBQUN2RCxPQUFPQyxjQUFjLE1B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