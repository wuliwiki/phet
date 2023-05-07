// Copyright 2015-2023, University of Colorado Boulder

/**
 * Renders the lifelike/schematic view for an Inductor.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Matrix3 from '../../../dot/js/Matrix3.js';
import Utils from '../../../dot/js/Utils.js';
import { LineStyles, Shape } from '../../../kite/js/imports.js';
import { combineOptions } from '../../../phet-core/js/optionize.js';
import { Color, Node, Path } from '../../../scenery/js/imports.js';
import CCKCConstants from '../CCKCConstants.js';
import circuitConstructionKitCommon from '../circuitConstructionKitCommon.js';
import FixedCircuitElementNode from './FixedCircuitElementNode.js';

// constants
// dimensions for schematic
const NUMBER_OF_BUMPS = 4;
const SCHEMATIC_WIDTH = CCKCConstants.INDUCTOR_LENGTH;
const SCHEMATIC_MARGIN = 20;
const SCHEMATIC_ARC_RADIUS = (SCHEMATIC_WIDTH - SCHEMATIC_MARGIN * 2) / NUMBER_OF_BUMPS / 2;
const schematicShape = new Shape().moveTo(0, 0) // left wire
.lineTo(SCHEMATIC_MARGIN, 0).arc(SCHEMATIC_MARGIN + SCHEMATIC_ARC_RADIUS * 1, 0, SCHEMATIC_ARC_RADIUS, Math.PI, 0, false).arc(SCHEMATIC_MARGIN + SCHEMATIC_ARC_RADIUS * 3, 0, SCHEMATIC_ARC_RADIUS, Math.PI, 0, false).arc(SCHEMATIC_MARGIN + SCHEMATIC_ARC_RADIUS * 5, 0, SCHEMATIC_ARC_RADIUS, Math.PI, 0, false).arc(SCHEMATIC_MARGIN + SCHEMATIC_ARC_RADIUS * 7, 0, SCHEMATIC_ARC_RADIUS, Math.PI, 0, false).lineTo(SCHEMATIC_WIDTH, 0);
const LIFELIKE_HEIGHT = 60;
const LIFELIKE_WIDTH = CCKCConstants.INDUCTOR_LENGTH;
const LIFELIKE_RADIUS_X = 5;
const LIFELIKE_RADIUS_Y = LIFELIKE_HEIGHT / 2;
const LIFELIKE_WIRE_LINE_WIDTH = 4;
const LIFELIKE_PATH_OUTLINE_STYLES = new LineStyles({
  lineWidth: LIFELIKE_WIRE_LINE_WIDTH,
  lineCap: 'round',
  lineJoin: 'round'
});
const LIFELIKE_PATH_FILL_STYLES = new LineStyles({
  lineWidth: LIFELIKE_WIRE_LINE_WIDTH - 1.5,
  lineCap: 'round',
  lineJoin: 'round'
});
export default class InductorNode extends FixedCircuitElementNode {
  // Identifies the images used to render this node so they can be prepopulated in the WebGL sprite sheet.
  static webglSpriteNodes = [];

  /**
   * @param screenView - main screen view, null for isIcon
   * @param circuitNode, null for icon
   * @param inductor
   * @param viewTypeProperty
   * @param tandem
   * @param [providedOptions]
   */
  constructor(screenView, circuitNode, inductor, viewTypeProperty, tandem, providedOptions) {
    providedOptions = combineOptions({
      isIcon: false,
      useHitTestForSensors: true
    }, providedOptions);

    // Padding on the left and right for the lifelike cylinder
    const inset = 7;

    // The main body, in front.
    const lifelikeBodyShape = new Shape().ellipticalArc(LIFELIKE_WIDTH - inset, LIFELIKE_HEIGHT / 2, LIFELIKE_RADIUS_X, LIFELIKE_RADIUS_Y, 0, -Math.PI / 2, Math.PI / 2, false).ellipticalArc(inset, LIFELIKE_HEIGHT / 2, LIFELIKE_RADIUS_X, LIFELIKE_RADIUS_Y, 0, Math.PI / 2, -Math.PI / 2, true).close();
    const lifelikeBodyPath = new Path(lifelikeBodyShape, {
      fill: 'white',
      stroke: 'black'
    });

    // The elliptical edge shown to the left of the main body.
    const lifelikeEndCapShape = Shape.ellipse(inset, LIFELIKE_HEIGHT / 2, LIFELIKE_RADIUS_X, LIFELIKE_RADIUS_Y, Math.PI * 2);
    const lifelikeEndCapPath = new Path(lifelikeEndCapShape, {
      fill: '#c4c4c4',
      stroke: 'black'
    });

    // Container that has individual wire loops.
    const wireWrapNode = new Node();
    inductor.inductanceProperty.link(inductance => {
      // Determine the number of loops, including the start and end segments, which are each half.
      const numLoops = Utils.roundSymmetric(Utils.linear(5, 10, 12, 20, inductance));
      const children = [];
      for (let i = 0; i < numLoops; i++) {
        // Loops for the main body, with special cases for the start end end loop, which are halved.
        const startAngle = i === numLoops - 1 ? Math.PI / 2 : -Math.PI / 2;
        const endAngle = i === 0 || i === numLoops - 1 ? 0 : Math.PI / 2;
        const anticounterclockwise = i === numLoops - 1;

        // Positioning for the loop arc
        const x = Utils.linear(numLoops / 2, numLoops / 2 + 1, LIFELIKE_WIDTH / 2 + LIFELIKE_RADIUS_X / 2, LIFELIKE_WIDTH / 2 + LIFELIKE_WIRE_LINE_WIDTH + LIFELIKE_RADIUS_X / 2, i);
        const pathShape = new Shape().ellipticalArc(x, LIFELIKE_HEIGHT / 2, LIFELIKE_RADIUS_X, LIFELIKE_RADIUS_Y, 0, startAngle, endAngle, anticounterclockwise);

        // Wire segments for the start and end
        if (i === 0) {
          pathShape.lineTo(0, LIFELIKE_HEIGHT / 2);
        }
        if (i === numLoops - 1) {
          pathShape.lineTo(LIFELIKE_WIDTH + LIFELIKE_RADIUS_X, LIFELIKE_HEIGHT / 2);
        }

        // Using a single path with fill+stroke leaves an artifact at the corners.  As a workaround, use two fills,
        // see https://github.com/phetsims/circuit-construction-kit-common/issues/537#issuecomment-558917786
        // and the corresponding kite issue https://github.com/phetsims/kite/issues/83
        const createPath = (lineStyles, fill) => new Path(pathShape.getStrokedShape(lineStyles), {
          fill: fill
        });
        children.push(createPath(LIFELIKE_PATH_OUTLINE_STYLES, 'black'));
        children.push(createPath(LIFELIKE_PATH_FILL_STYLES, '#dc9180'));
      }
      wireWrapNode.children = children;
    });
    const lifelikeNode = new Node({
      children: [lifelikeEndCapPath, lifelikeBodyPath, wireWrapNode],
      centerY: 0
    });
    const scale = LIFELIKE_WIDTH / schematicShape.bounds.width;

    // Scale to fit the correct width
    const scaledShape = schematicShape.transformed(Matrix3.scale(scale, scale));
    const schematicNode = new Path(scaledShape, {
      stroke: Color.BLACK,
      lineWidth: CCKCConstants.SCHEMATIC_LINE_WIDTH
    });

    // Expand the pointer areas with a defensive copy, see https://github.com/phetsims/circuit-construction-kit-common/issues/310
    schematicNode.mouseArea = schematicNode.bounds.dilated(2);
    schematicNode.touchArea = schematicNode.bounds.dilated(2);
    super(screenView, circuitNode, inductor, viewTypeProperty, lifelikeNode, schematicNode, tandem, providedOptions);
    this.inductor = inductor;
  }
}
circuitConstructionKitCommon.register('InductorNode', InductorNode);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJNYXRyaXgzIiwiVXRpbHMiLCJMaW5lU3R5bGVzIiwiU2hhcGUiLCJjb21iaW5lT3B0aW9ucyIsIkNvbG9yIiwiTm9kZSIsIlBhdGgiLCJDQ0tDQ29uc3RhbnRzIiwiY2lyY3VpdENvbnN0cnVjdGlvbktpdENvbW1vbiIsIkZpeGVkQ2lyY3VpdEVsZW1lbnROb2RlIiwiTlVNQkVSX09GX0JVTVBTIiwiU0NIRU1BVElDX1dJRFRIIiwiSU5EVUNUT1JfTEVOR1RIIiwiU0NIRU1BVElDX01BUkdJTiIsIlNDSEVNQVRJQ19BUkNfUkFESVVTIiwic2NoZW1hdGljU2hhcGUiLCJtb3ZlVG8iLCJsaW5lVG8iLCJhcmMiLCJNYXRoIiwiUEkiLCJMSUZFTElLRV9IRUlHSFQiLCJMSUZFTElLRV9XSURUSCIsIkxJRkVMSUtFX1JBRElVU19YIiwiTElGRUxJS0VfUkFESVVTX1kiLCJMSUZFTElLRV9XSVJFX0xJTkVfV0lEVEgiLCJMSUZFTElLRV9QQVRIX09VVExJTkVfU1RZTEVTIiwibGluZVdpZHRoIiwibGluZUNhcCIsImxpbmVKb2luIiwiTElGRUxJS0VfUEFUSF9GSUxMX1NUWUxFUyIsIkluZHVjdG9yTm9kZSIsIndlYmdsU3ByaXRlTm9kZXMiLCJjb25zdHJ1Y3RvciIsInNjcmVlblZpZXciLCJjaXJjdWl0Tm9kZSIsImluZHVjdG9yIiwidmlld1R5cGVQcm9wZXJ0eSIsInRhbmRlbSIsInByb3ZpZGVkT3B0aW9ucyIsImlzSWNvbiIsInVzZUhpdFRlc3RGb3JTZW5zb3JzIiwiaW5zZXQiLCJsaWZlbGlrZUJvZHlTaGFwZSIsImVsbGlwdGljYWxBcmMiLCJjbG9zZSIsImxpZmVsaWtlQm9keVBhdGgiLCJmaWxsIiwic3Ryb2tlIiwibGlmZWxpa2VFbmRDYXBTaGFwZSIsImVsbGlwc2UiLCJsaWZlbGlrZUVuZENhcFBhdGgiLCJ3aXJlV3JhcE5vZGUiLCJpbmR1Y3RhbmNlUHJvcGVydHkiLCJsaW5rIiwiaW5kdWN0YW5jZSIsIm51bUxvb3BzIiwicm91bmRTeW1tZXRyaWMiLCJsaW5lYXIiLCJjaGlsZHJlbiIsImkiLCJzdGFydEFuZ2xlIiwiZW5kQW5nbGUiLCJhbnRpY291bnRlcmNsb2Nrd2lzZSIsIngiLCJwYXRoU2hhcGUiLCJjcmVhdGVQYXRoIiwibGluZVN0eWxlcyIsImdldFN0cm9rZWRTaGFwZSIsInB1c2giLCJsaWZlbGlrZU5vZGUiLCJjZW50ZXJZIiwic2NhbGUiLCJib3VuZHMiLCJ3aWR0aCIsInNjYWxlZFNoYXBlIiwidHJhbnNmb3JtZWQiLCJzY2hlbWF0aWNOb2RlIiwiQkxBQ0siLCJTQ0hFTUFUSUNfTElORV9XSURUSCIsIm1vdXNlQXJlYSIsImRpbGF0ZWQiLCJ0b3VjaEFyZWEiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkluZHVjdG9yTm9kZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNS0yMDIzLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBSZW5kZXJzIHRoZSBsaWZlbGlrZS9zY2hlbWF0aWMgdmlldyBmb3IgYW4gSW5kdWN0b3IuXHJcbiAqXHJcbiAqIEBhdXRob3IgU2FtIFJlaWQgKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqL1xyXG5cclxuaW1wb3J0IFByb3BlcnR5IGZyb20gJy4uLy4uLy4uL2F4b24vanMvUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgTWF0cml4MyBmcm9tICcuLi8uLi8uLi9kb3QvanMvTWF0cml4My5qcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi8uLi9kb3QvanMvVXRpbHMuanMnO1xyXG5pbXBvcnQgeyBMaW5lU3R5bGVzLCBTaGFwZSB9IGZyb20gJy4uLy4uLy4uL2tpdGUvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCB7IGNvbWJpbmVPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vcGhldC1jb3JlL2pzL29wdGlvbml6ZS5qcyc7XHJcbmltcG9ydCB7IENvbG9yLCBOb2RlLCBQYXRoLCBUUGFpbnQgfSBmcm9tICcuLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgVGFuZGVtIGZyb20gJy4uLy4uLy4uL3RhbmRlbS9qcy9UYW5kZW0uanMnO1xyXG5pbXBvcnQgQ0NLQ0NvbnN0YW50cyBmcm9tICcuLi9DQ0tDQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IGNpcmN1aXRDb25zdHJ1Y3Rpb25LaXRDb21tb24gZnJvbSAnLi4vY2lyY3VpdENvbnN0cnVjdGlvbktpdENvbW1vbi5qcyc7XHJcbmltcG9ydCBDaXJjdWl0RWxlbWVudFZpZXdUeXBlIGZyb20gJy4uL21vZGVsL0NpcmN1aXRFbGVtZW50Vmlld1R5cGUuanMnO1xyXG5pbXBvcnQgSW5kdWN0b3IgZnJvbSAnLi4vbW9kZWwvSW5kdWN0b3IuanMnO1xyXG5pbXBvcnQgQ0NLQ1NjcmVlblZpZXcgZnJvbSAnLi9DQ0tDU2NyZWVuVmlldy5qcyc7XHJcbmltcG9ydCBDaXJjdWl0Tm9kZSBmcm9tICcuL0NpcmN1aXROb2RlLmpzJztcclxuaW1wb3J0IEZpeGVkQ2lyY3VpdEVsZW1lbnROb2RlLCB7IEZpeGVkQ2lyY3VpdEVsZW1lbnROb2RlT3B0aW9ucyB9IGZyb20gJy4vRml4ZWRDaXJjdWl0RWxlbWVudE5vZGUuanMnO1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbi8vIGRpbWVuc2lvbnMgZm9yIHNjaGVtYXRpY1xyXG5jb25zdCBOVU1CRVJfT0ZfQlVNUFMgPSA0O1xyXG5jb25zdCBTQ0hFTUFUSUNfV0lEVEggPSBDQ0tDQ29uc3RhbnRzLklORFVDVE9SX0xFTkdUSDtcclxuY29uc3QgU0NIRU1BVElDX01BUkdJTiA9IDIwO1xyXG5jb25zdCBTQ0hFTUFUSUNfQVJDX1JBRElVUyA9ICggU0NIRU1BVElDX1dJRFRIIC0gU0NIRU1BVElDX01BUkdJTiAqIDIgKSAvIE5VTUJFUl9PRl9CVU1QUyAvIDI7XHJcblxyXG5jb25zdCBzY2hlbWF0aWNTaGFwZSA9IG5ldyBTaGFwZSgpXHJcbiAgLm1vdmVUbyggMCwgMCApIC8vIGxlZnQgd2lyZVxyXG4gIC5saW5lVG8oIFNDSEVNQVRJQ19NQVJHSU4sIDAgKVxyXG4gIC5hcmMoIFNDSEVNQVRJQ19NQVJHSU4gKyBTQ0hFTUFUSUNfQVJDX1JBRElVUyAqIDEsIDAsIFNDSEVNQVRJQ19BUkNfUkFESVVTLCBNYXRoLlBJLCAwLCBmYWxzZSApXHJcbiAgLmFyYyggU0NIRU1BVElDX01BUkdJTiArIFNDSEVNQVRJQ19BUkNfUkFESVVTICogMywgMCwgU0NIRU1BVElDX0FSQ19SQURJVVMsIE1hdGguUEksIDAsIGZhbHNlIClcclxuICAuYXJjKCBTQ0hFTUFUSUNfTUFSR0lOICsgU0NIRU1BVElDX0FSQ19SQURJVVMgKiA1LCAwLCBTQ0hFTUFUSUNfQVJDX1JBRElVUywgTWF0aC5QSSwgMCwgZmFsc2UgKVxyXG4gIC5hcmMoIFNDSEVNQVRJQ19NQVJHSU4gKyBTQ0hFTUFUSUNfQVJDX1JBRElVUyAqIDcsIDAsIFNDSEVNQVRJQ19BUkNfUkFESVVTLCBNYXRoLlBJLCAwLCBmYWxzZSApXHJcbiAgLmxpbmVUbyggU0NIRU1BVElDX1dJRFRILCAwICk7XHJcblxyXG5jb25zdCBMSUZFTElLRV9IRUlHSFQgPSA2MDtcclxuY29uc3QgTElGRUxJS0VfV0lEVEggPSBDQ0tDQ29uc3RhbnRzLklORFVDVE9SX0xFTkdUSDtcclxuY29uc3QgTElGRUxJS0VfUkFESVVTX1ggPSA1O1xyXG5jb25zdCBMSUZFTElLRV9SQURJVVNfWSA9IExJRkVMSUtFX0hFSUdIVCAvIDI7XHJcbmNvbnN0IExJRkVMSUtFX1dJUkVfTElORV9XSURUSCA9IDQ7XHJcbmNvbnN0IExJRkVMSUtFX1BBVEhfT1VUTElORV9TVFlMRVMgPSBuZXcgTGluZVN0eWxlcygge1xyXG4gIGxpbmVXaWR0aDogTElGRUxJS0VfV0lSRV9MSU5FX1dJRFRILFxyXG4gIGxpbmVDYXA6ICdyb3VuZCcsXHJcbiAgbGluZUpvaW46ICdyb3VuZCdcclxufSApO1xyXG5jb25zdCBMSUZFTElLRV9QQVRIX0ZJTExfU1RZTEVTID0gbmV3IExpbmVTdHlsZXMoIHtcclxuICBsaW5lV2lkdGg6IExJRkVMSUtFX1dJUkVfTElORV9XSURUSCAtIDEuNSxcclxuICBsaW5lQ2FwOiAncm91bmQnLFxyXG4gIGxpbmVKb2luOiAncm91bmQnXHJcbn0gKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZHVjdG9yTm9kZSBleHRlbmRzIEZpeGVkQ2lyY3VpdEVsZW1lbnROb2RlIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGluZHVjdG9yOiBJbmR1Y3RvcjtcclxuXHJcbiAgLy8gSWRlbnRpZmllcyB0aGUgaW1hZ2VzIHVzZWQgdG8gcmVuZGVyIHRoaXMgbm9kZSBzbyB0aGV5IGNhbiBiZSBwcmVwb3B1bGF0ZWQgaW4gdGhlIFdlYkdMIHNwcml0ZSBzaGVldC5cclxuICBwdWJsaWMgc3RhdGljIG92ZXJyaWRlIHJlYWRvbmx5IHdlYmdsU3ByaXRlTm9kZXMgPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHNjcmVlblZpZXcgLSBtYWluIHNjcmVlbiB2aWV3LCBudWxsIGZvciBpc0ljb25cclxuICAgKiBAcGFyYW0gY2lyY3VpdE5vZGUsIG51bGwgZm9yIGljb25cclxuICAgKiBAcGFyYW0gaW5kdWN0b3JcclxuICAgKiBAcGFyYW0gdmlld1R5cGVQcm9wZXJ0eVxyXG4gICAqIEBwYXJhbSB0YW5kZW1cclxuICAgKiBAcGFyYW0gW3Byb3ZpZGVkT3B0aW9uc11cclxuICAgKi9cclxuICBwdWJsaWMgY29uc3RydWN0b3IoIHNjcmVlblZpZXc6IENDS0NTY3JlZW5WaWV3IHwgbnVsbCwgY2lyY3VpdE5vZGU6IENpcmN1aXROb2RlIHwgbnVsbCwgaW5kdWN0b3I6IEluZHVjdG9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdmlld1R5cGVQcm9wZXJ0eTogUHJvcGVydHk8Q2lyY3VpdEVsZW1lbnRWaWV3VHlwZT4sIHRhbmRlbTogVGFuZGVtLCBwcm92aWRlZE9wdGlvbnM/OiBGaXhlZENpcmN1aXRFbGVtZW50Tm9kZU9wdGlvbnMgKSB7XHJcblxyXG4gICAgcHJvdmlkZWRPcHRpb25zID0gY29tYmluZU9wdGlvbnM8Rml4ZWRDaXJjdWl0RWxlbWVudE5vZGVPcHRpb25zPiggeyBpc0ljb246IGZhbHNlLCB1c2VIaXRUZXN0Rm9yU2Vuc29yczogdHJ1ZSB9LCBwcm92aWRlZE9wdGlvbnMgKTtcclxuXHJcbiAgICAvLyBQYWRkaW5nIG9uIHRoZSBsZWZ0IGFuZCByaWdodCBmb3IgdGhlIGxpZmVsaWtlIGN5bGluZGVyXHJcbiAgICBjb25zdCBpbnNldCA9IDc7XHJcblxyXG4gICAgLy8gVGhlIG1haW4gYm9keSwgaW4gZnJvbnQuXHJcbiAgICBjb25zdCBsaWZlbGlrZUJvZHlTaGFwZSA9IG5ldyBTaGFwZSgpXHJcbiAgICAgIC5lbGxpcHRpY2FsQXJjKCBMSUZFTElLRV9XSURUSCAtIGluc2V0LCBMSUZFTElLRV9IRUlHSFQgLyAyLCBMSUZFTElLRV9SQURJVVNfWCwgTElGRUxJS0VfUkFESVVTX1ksIDAsIC1NYXRoLlBJIC8gMiwgTWF0aC5QSSAvIDIsIGZhbHNlIClcclxuICAgICAgLmVsbGlwdGljYWxBcmMoIGluc2V0LCBMSUZFTElLRV9IRUlHSFQgLyAyLCBMSUZFTElLRV9SQURJVVNfWCwgTElGRUxJS0VfUkFESVVTX1ksIDAsIE1hdGguUEkgLyAyLCAtTWF0aC5QSSAvIDIsIHRydWUgKVxyXG4gICAgICAuY2xvc2UoKTtcclxuICAgIGNvbnN0IGxpZmVsaWtlQm9keVBhdGggPSBuZXcgUGF0aCggbGlmZWxpa2VCb2R5U2hhcGUsIHsgZmlsbDogJ3doaXRlJywgc3Ryb2tlOiAnYmxhY2snIH0gKTtcclxuXHJcbiAgICAvLyBUaGUgZWxsaXB0aWNhbCBlZGdlIHNob3duIHRvIHRoZSBsZWZ0IG9mIHRoZSBtYWluIGJvZHkuXHJcbiAgICBjb25zdCBsaWZlbGlrZUVuZENhcFNoYXBlID0gU2hhcGUuZWxsaXBzZSggaW5zZXQsIExJRkVMSUtFX0hFSUdIVCAvIDIsIExJRkVMSUtFX1JBRElVU19YLCBMSUZFTElLRV9SQURJVVNfWSwgTWF0aC5QSSAqIDIgKTtcclxuICAgIGNvbnN0IGxpZmVsaWtlRW5kQ2FwUGF0aCA9IG5ldyBQYXRoKCBsaWZlbGlrZUVuZENhcFNoYXBlLCB7XHJcbiAgICAgIGZpbGw6ICcjYzRjNGM0JyxcclxuICAgICAgc3Ryb2tlOiAnYmxhY2snXHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gQ29udGFpbmVyIHRoYXQgaGFzIGluZGl2aWR1YWwgd2lyZSBsb29wcy5cclxuICAgIGNvbnN0IHdpcmVXcmFwTm9kZSA9IG5ldyBOb2RlKCk7XHJcbiAgICBpbmR1Y3Rvci5pbmR1Y3RhbmNlUHJvcGVydHkubGluayggaW5kdWN0YW5jZSA9PiB7XHJcblxyXG4gICAgICAvLyBEZXRlcm1pbmUgdGhlIG51bWJlciBvZiBsb29wcywgaW5jbHVkaW5nIHRoZSBzdGFydCBhbmQgZW5kIHNlZ21lbnRzLCB3aGljaCBhcmUgZWFjaCBoYWxmLlxyXG4gICAgICBjb25zdCBudW1Mb29wcyA9IFV0aWxzLnJvdW5kU3ltbWV0cmljKCBVdGlscy5saW5lYXIoIDUsIDEwLCAxMiwgMjAsIGluZHVjdGFuY2UgKSApO1xyXG4gICAgICBjb25zdCBjaGlsZHJlbiA9IFtdO1xyXG4gICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBudW1Mb29wczsgaSsrICkge1xyXG5cclxuICAgICAgICAvLyBMb29wcyBmb3IgdGhlIG1haW4gYm9keSwgd2l0aCBzcGVjaWFsIGNhc2VzIGZvciB0aGUgc3RhcnQgZW5kIGVuZCBsb29wLCB3aGljaCBhcmUgaGFsdmVkLlxyXG4gICAgICAgIGNvbnN0IHN0YXJ0QW5nbGUgPSBpID09PSBudW1Mb29wcyAtIDEgPyBNYXRoLlBJIC8gMiA6IC1NYXRoLlBJIC8gMjtcclxuICAgICAgICBjb25zdCBlbmRBbmdsZSA9IGkgPT09IDAgfHwgaSA9PT0gbnVtTG9vcHMgLSAxID8gMCA6IE1hdGguUEkgLyAyO1xyXG4gICAgICAgIGNvbnN0IGFudGljb3VudGVyY2xvY2t3aXNlID0gaSA9PT0gbnVtTG9vcHMgLSAxO1xyXG5cclxuICAgICAgICAvLyBQb3NpdGlvbmluZyBmb3IgdGhlIGxvb3AgYXJjXHJcbiAgICAgICAgY29uc3QgeCA9IFV0aWxzLmxpbmVhcihcclxuICAgICAgICAgIG51bUxvb3BzIC8gMiwgbnVtTG9vcHMgLyAyICsgMSxcclxuICAgICAgICAgIExJRkVMSUtFX1dJRFRIIC8gMiArIExJRkVMSUtFX1JBRElVU19YIC8gMiwgTElGRUxJS0VfV0lEVEggLyAyICsgTElGRUxJS0VfV0lSRV9MSU5FX1dJRFRIICsgTElGRUxJS0VfUkFESVVTX1ggLyAyLFxyXG4gICAgICAgICAgaSApO1xyXG4gICAgICAgIGNvbnN0IHBhdGhTaGFwZSA9IG5ldyBTaGFwZSgpXHJcbiAgICAgICAgICAuZWxsaXB0aWNhbEFyYyggeCwgTElGRUxJS0VfSEVJR0hUIC8gMiwgTElGRUxJS0VfUkFESVVTX1gsIExJRkVMSUtFX1JBRElVU19ZLCAwLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgYW50aWNvdW50ZXJjbG9ja3dpc2UgKTtcclxuXHJcbiAgICAgICAgLy8gV2lyZSBzZWdtZW50cyBmb3IgdGhlIHN0YXJ0IGFuZCBlbmRcclxuICAgICAgICBpZiAoIGkgPT09IDAgKSB7XHJcbiAgICAgICAgICBwYXRoU2hhcGUubGluZVRvKCAwLCBMSUZFTElLRV9IRUlHSFQgLyAyICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggaSA9PT0gbnVtTG9vcHMgLSAxICkge1xyXG4gICAgICAgICAgcGF0aFNoYXBlLmxpbmVUbyggTElGRUxJS0VfV0lEVEggKyBMSUZFTElLRV9SQURJVVNfWCwgTElGRUxJS0VfSEVJR0hUIC8gMiApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXNpbmcgYSBzaW5nbGUgcGF0aCB3aXRoIGZpbGwrc3Ryb2tlIGxlYXZlcyBhbiBhcnRpZmFjdCBhdCB0aGUgY29ybmVycy4gIEFzIGEgd29ya2Fyb3VuZCwgdXNlIHR3byBmaWxscyxcclxuICAgICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3BoZXRzaW1zL2NpcmN1aXQtY29uc3RydWN0aW9uLWtpdC1jb21tb24vaXNzdWVzLzUzNyNpc3N1ZWNvbW1lbnQtNTU4OTE3Nzg2XHJcbiAgICAgICAgLy8gYW5kIHRoZSBjb3JyZXNwb25kaW5nIGtpdGUgaXNzdWUgaHR0cHM6Ly9naXRodWIuY29tL3BoZXRzaW1zL2tpdGUvaXNzdWVzLzgzXHJcbiAgICAgICAgY29uc3QgY3JlYXRlUGF0aCA9ICggbGluZVN0eWxlczogTGluZVN0eWxlcywgZmlsbDogVFBhaW50ICkgPT4gbmV3IFBhdGgoIHBhdGhTaGFwZS5nZXRTdHJva2VkU2hhcGUoIGxpbmVTdHlsZXMgKSwgeyBmaWxsOiBmaWxsIH0gKTtcclxuICAgICAgICBjaGlsZHJlbi5wdXNoKCBjcmVhdGVQYXRoKCBMSUZFTElLRV9QQVRIX09VVExJTkVfU1RZTEVTLCAnYmxhY2snICkgKTtcclxuICAgICAgICBjaGlsZHJlbi5wdXNoKCBjcmVhdGVQYXRoKCBMSUZFTElLRV9QQVRIX0ZJTExfU1RZTEVTLCAnI2RjOTE4MCcgKSApO1xyXG4gICAgICB9XHJcbiAgICAgIHdpcmVXcmFwTm9kZS5jaGlsZHJlbiA9IGNoaWxkcmVuO1xyXG4gICAgfSApO1xyXG5cclxuICAgIGNvbnN0IGxpZmVsaWtlTm9kZSA9IG5ldyBOb2RlKCB7XHJcbiAgICAgIGNoaWxkcmVuOiBbIGxpZmVsaWtlRW5kQ2FwUGF0aCwgbGlmZWxpa2VCb2R5UGF0aCwgd2lyZVdyYXBOb2RlIF0sXHJcbiAgICAgIGNlbnRlclk6IDBcclxuICAgIH0gKTtcclxuXHJcbiAgICBjb25zdCBzY2FsZSA9IExJRkVMSUtFX1dJRFRIIC8gc2NoZW1hdGljU2hhcGUuYm91bmRzLndpZHRoO1xyXG5cclxuICAgIC8vIFNjYWxlIHRvIGZpdCB0aGUgY29ycmVjdCB3aWR0aFxyXG4gICAgY29uc3Qgc2NhbGVkU2hhcGUgPSBzY2hlbWF0aWNTaGFwZS50cmFuc2Zvcm1lZCggTWF0cml4My5zY2FsZSggc2NhbGUsIHNjYWxlICkgKTtcclxuICAgIGNvbnN0IHNjaGVtYXRpY05vZGUgPSBuZXcgUGF0aCggc2NhbGVkU2hhcGUsIHtcclxuICAgICAgc3Ryb2tlOiBDb2xvci5CTEFDSyxcclxuICAgICAgbGluZVdpZHRoOiBDQ0tDQ29uc3RhbnRzLlNDSEVNQVRJQ19MSU5FX1dJRFRIXHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gRXhwYW5kIHRoZSBwb2ludGVyIGFyZWFzIHdpdGggYSBkZWZlbnNpdmUgY29weSwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9waGV0c2ltcy9jaXJjdWl0LWNvbnN0cnVjdGlvbi1raXQtY29tbW9uL2lzc3Vlcy8zMTBcclxuICAgIHNjaGVtYXRpY05vZGUubW91c2VBcmVhID0gc2NoZW1hdGljTm9kZS5ib3VuZHMuZGlsYXRlZCggMiApO1xyXG4gICAgc2NoZW1hdGljTm9kZS50b3VjaEFyZWEgPSBzY2hlbWF0aWNOb2RlLmJvdW5kcy5kaWxhdGVkKCAyICk7XHJcblxyXG4gICAgc3VwZXIoXHJcbiAgICAgIHNjcmVlblZpZXcsXHJcbiAgICAgIGNpcmN1aXROb2RlLFxyXG4gICAgICBpbmR1Y3RvcixcclxuICAgICAgdmlld1R5cGVQcm9wZXJ0eSxcclxuICAgICAgbGlmZWxpa2VOb2RlLFxyXG4gICAgICBzY2hlbWF0aWNOb2RlLFxyXG4gICAgICB0YW5kZW0sXHJcbiAgICAgIHByb3ZpZGVkT3B0aW9uc1xyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmluZHVjdG9yID0gaW5kdWN0b3I7XHJcbiAgfVxyXG59XHJcblxyXG5jaXJjdWl0Q29uc3RydWN0aW9uS2l0Q29tbW9uLnJlZ2lzdGVyKCAnSW5kdWN0b3JOb2RlJywgSW5kdWN0b3JOb2RlICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBLE9BQU9BLE9BQU8sTUFBTSw0QkFBNEI7QUFDaEQsT0FBT0MsS0FBSyxNQUFNLDBCQUEwQjtBQUM1QyxTQUFTQyxVQUFVLEVBQUVDLEtBQUssUUFBUSw2QkFBNkI7QUFDL0QsU0FBU0MsY0FBYyxR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