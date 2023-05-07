// Copyright 2022, University of Colorado Boulder

/**
 * FramedImageMaskNode is the mask for a framed image.
 * It's used to fine-tune how translucent the image is where its 3D perspective occludes the optical axis and rays.
 * See https://github.com/phetsims/geometric-optics/issues/283.
 *
 * To visually inspect this mask, run with ?debugMask.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Shape } from '../../../../kite/js/imports.js';
import geometricOptics from '../../geometricOptics.js';
import Matrix3 from '../../../../dot/js/Matrix3.js';
import { Node, Path } from '../../../../scenery/js/imports.js';
import GOColors from '../GOColors.js';
import GOQueryParameters from '../GOQueryParameters.js';
export default class FramedImageMaskNode extends Node {
  // Shapes for the 2 orientations of a frame image

  constructor(imageWidth, imageHeight) {
    const rightFacingMaskShape = new MaskShape(imageWidth, imageHeight);

    // Same shape as the right-facing mask, but reflected about the y-axis, and shifted to the right.
    const leftFacingMaskShape = new MaskShape(imageWidth, imageHeight).transformed(new Matrix3().rowMajor(-1, 0, imageWidth, 0, 1, 0, 0, 0, 1));
    const path = new Path(rightFacingMaskShape, {
      fill: GOColors.screenBackgroundColorProperty,
      opacity: GOQueryParameters.frameImageMaskOpacity,
      stroke: GOQueryParameters.debugMask ? 'red' : null
    });
    super({
      children: [path] // wrapped in Node so we don't expose Path API
    });

    this.path = path;
    this.rightFacingMaskShape = rightFacingMaskShape;
    this.leftFacingMaskShape = leftFacingMaskShape;
  }
  setIsRightFacing(isRightFacing) {
    this.path.shape = isRightFacing ? this.rightFacingMaskShape : this.leftFacingMaskShape;
  }
}

/**
 * MaskShape is the Shape of the framed-image mask, in right-facing orientation. Use when the image is on the left
 * side of the optic, and its 3D perspective shows the image facing right, towards the optic.
 *
 * The original approach was to use imageNode.getSelfShape to create a Shape that matched the image exactly. But
 * getSelfShape is expensive, and caused performance issues when dragging the optical image. See
 * https://github.com/phetsims/geometric-optics/issues/361.  So I switched to drawing a specific Shape that matches
 * the image 'close enough'. This Shape was created empirically, by manually fiddling with the Shape until it matched
 * the outline of framed images. It is dependent on the .PNG files for the framed images, and also assumes that
 * all .PNG files for frames images have the same dimensions.
 */
class MaskShape extends Shape {
  constructor(imageWidth, imageHeight) {
    // insets are numbered as they are used, as we move clockwise
    const xInset1 = 1;
    const xInset2 = 12;
    const xInset3 = 10;
    const yInset1 = 6;
    const yInset2 = 3;
    const yInset3 = 55;
    super();

    // Outline a right-facing framed image, starting at topLeft and moving clockwise.
    this.moveTo(xInset1, yInset1).lineTo(xInset3, yInset2).lineTo(imageWidth - xInset2, yInset3).lineTo(imageWidth - xInset2, imageHeight - yInset3).lineTo(xInset3, imageHeight - yInset2).lineTo(xInset1, imageHeight - yInset1).close();
  }
}
geometricOptics.register('FramedImageMaskNode', FramedImageMaskNode);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTaGFwZSIsImdlb21ldHJpY09wdGljcyIsIk1hdHJpeDMiLCJOb2RlIiwiUGF0aCIsIkdPQ29sb3JzIiwiR09RdWVyeVBhcmFtZXRlcnMiLCJGcmFtZWRJbWFnZU1hc2tOb2RlIiwiY29uc3RydWN0b3IiLCJpbWFnZVdpZHRoIiwiaW1hZ2VIZWlnaHQiLCJyaWdodEZhY2luZ01hc2tTaGFwZSIsIk1hc2tTaGFwZSIsImxlZnRGYWNpbmdNYXNrU2hhcGUiLCJ0cmFuc2Zvcm1lZCIsInJvd01ham9yIiwicGF0aCIsImZpbGwiLCJzY3JlZW5CYWNrZ3JvdW5kQ29sb3JQcm9wZXJ0eSIsIm9wYWNpdHkiLCJmcmFtZUltYWdlTWFza09wYWNpdHkiLCJzdHJva2UiLCJkZWJ1Z01hc2siLCJjaGlsZHJlbiIsInNldElzUmlnaHRGYWNpbmciLCJpc1JpZ2h0RmFjaW5nIiwic2hhcGUiLCJ4SW5zZXQxIiwieEluc2V0MiIsInhJbnNldDMiLCJ5SW5zZXQxIiwieUluc2V0MiIsInlJbnNldDMiLCJtb3ZlVG8iLCJsaW5lVG8iLCJjbG9zZSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiRnJhbWVkSW1hZ2VNYXNrTm9kZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMiwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogRnJhbWVkSW1hZ2VNYXNrTm9kZSBpcyB0aGUgbWFzayBmb3IgYSBmcmFtZWQgaW1hZ2UuXHJcbiAqIEl0J3MgdXNlZCB0byBmaW5lLXR1bmUgaG93IHRyYW5zbHVjZW50IHRoZSBpbWFnZSBpcyB3aGVyZSBpdHMgM0QgcGVyc3BlY3RpdmUgb2NjbHVkZXMgdGhlIG9wdGljYWwgYXhpcyBhbmQgcmF5cy5cclxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9waGV0c2ltcy9nZW9tZXRyaWMtb3B0aWNzL2lzc3Vlcy8yODMuXHJcbiAqXHJcbiAqIFRvIHZpc3VhbGx5IGluc3BlY3QgdGhpcyBtYXNrLCBydW4gd2l0aCA/ZGVidWdNYXNrLlxyXG4gKlxyXG4gKiBAYXV0aG9yIENocmlzIE1hbGxleSAoUGl4ZWxab29tLCBJbmMuKVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IFNoYXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4va2l0ZS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IGdlb21ldHJpY09wdGljcyBmcm9tICcuLi8uLi9nZW9tZXRyaWNPcHRpY3MuanMnO1xyXG5pbXBvcnQgTWF0cml4MyBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvTWF0cml4My5qcyc7XHJcbmltcG9ydCB7IE5vZGUsIFBhdGggfSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgR09Db2xvcnMgZnJvbSAnLi4vR09Db2xvcnMuanMnO1xyXG5pbXBvcnQgR09RdWVyeVBhcmFtZXRlcnMgZnJvbSAnLi4vR09RdWVyeVBhcmFtZXRlcnMuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJhbWVkSW1hZ2VNYXNrTm9kZSBleHRlbmRzIE5vZGUge1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IHBhdGg6IFBhdGg7XHJcblxyXG4gIC8vIFNoYXBlcyBmb3IgdGhlIDIgb3JpZW50YXRpb25zIG9mIGEgZnJhbWUgaW1hZ2VcclxuICBwcml2YXRlIHJlYWRvbmx5IHJpZ2h0RmFjaW5nTWFza1NoYXBlOiBTaGFwZTtcclxuICBwcml2YXRlIHJlYWRvbmx5IGxlZnRGYWNpbmdNYXNrU2hhcGU6IFNoYXBlO1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoIGltYWdlV2lkdGg6IG51bWJlciwgaW1hZ2VIZWlnaHQ6IG51bWJlciApIHtcclxuXHJcbiAgICBjb25zdCByaWdodEZhY2luZ01hc2tTaGFwZSA9IG5ldyBNYXNrU2hhcGUoIGltYWdlV2lkdGgsIGltYWdlSGVpZ2h0ICk7XHJcblxyXG4gICAgLy8gU2FtZSBzaGFwZSBhcyB0aGUgcmlnaHQtZmFjaW5nIG1hc2ssIGJ1dCByZWZsZWN0ZWQgYWJvdXQgdGhlIHktYXhpcywgYW5kIHNoaWZ0ZWQgdG8gdGhlIHJpZ2h0LlxyXG4gICAgY29uc3QgbGVmdEZhY2luZ01hc2tTaGFwZSA9IG5ldyBNYXNrU2hhcGUoIGltYWdlV2lkdGgsIGltYWdlSGVpZ2h0ICkudHJhbnNmb3JtZWQoIG5ldyBNYXRyaXgzKCkucm93TWFqb3IoXHJcbiAgICAgIC0xLCAwLCBpbWFnZVdpZHRoLFxyXG4gICAgICAwLCAxLCAwLFxyXG4gICAgICAwLCAwLCAxXHJcbiAgICApICk7XHJcblxyXG4gICAgY29uc3QgcGF0aCA9IG5ldyBQYXRoKCByaWdodEZhY2luZ01hc2tTaGFwZSwge1xyXG4gICAgICBmaWxsOiBHT0NvbG9ycy5zY3JlZW5CYWNrZ3JvdW5kQ29sb3JQcm9wZXJ0eSxcclxuICAgICAgb3BhY2l0eTogR09RdWVyeVBhcmFtZXRlcnMuZnJhbWVJbWFnZU1hc2tPcGFjaXR5LFxyXG4gICAgICBzdHJva2U6IEdPUXVlcnlQYXJhbWV0ZXJzLmRlYnVnTWFzayA/ICdyZWQnIDogbnVsbFxyXG4gICAgfSApO1xyXG5cclxuICAgIHN1cGVyKCB7XHJcbiAgICAgIGNoaWxkcmVuOiBbIHBhdGggXSAvLyB3cmFwcGVkIGluIE5vZGUgc28gd2UgZG9uJ3QgZXhwb3NlIFBhdGggQVBJXHJcbiAgICB9ICk7XHJcblxyXG4gICAgdGhpcy5wYXRoID0gcGF0aDtcclxuICAgIHRoaXMucmlnaHRGYWNpbmdNYXNrU2hhcGUgPSByaWdodEZhY2luZ01hc2tTaGFwZTtcclxuICAgIHRoaXMubGVmdEZhY2luZ01hc2tTaGFwZSA9IGxlZnRGYWNpbmdNYXNrU2hhcGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0SXNSaWdodEZhY2luZyggaXNSaWdodEZhY2luZzogYm9vbGVhbiApOiB2b2lkIHtcclxuICAgIHRoaXMucGF0aC5zaGFwZSA9ICggaXNSaWdodEZhY2luZyA/IHRoaXMucmlnaHRGYWNpbmdNYXNrU2hhcGUgOiB0aGlzLmxlZnRGYWNpbmdNYXNrU2hhcGUgKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNYXNrU2hhcGUgaXMgdGhlIFNoYXBlIG9mIHRoZSBmcmFtZWQtaW1hZ2UgbWFzaywgaW4gcmlnaHQtZmFjaW5nIG9yaWVudGF0aW9uLiBVc2Ugd2hlbiB0aGUgaW1hZ2UgaXMgb24gdGhlIGxlZnRcclxuICogc2lkZSBvZiB0aGUgb3B0aWMsIGFuZCBpdHMgM0QgcGVyc3BlY3RpdmUgc2hvd3MgdGhlIGltYWdlIGZhY2luZyByaWdodCwgdG93YXJkcyB0aGUgb3B0aWMuXHJcbiAqXHJcbiAqIFRoZSBvcmlnaW5hbCBhcHByb2FjaCB3YXMgdG8gdXNlIGltYWdlTm9kZS5nZXRTZWxmU2hhcGUgdG8gY3JlYXRlIGEgU2hhcGUgdGhhdCBtYXRjaGVkIHRoZSBpbWFnZSBleGFjdGx5LiBCdXRcclxuICogZ2V0U2VsZlNoYXBlIGlzIGV4cGVuc2l2ZSwgYW5kIGNhdXNlZCBwZXJmb3JtYW5jZSBpc3N1ZXMgd2hlbiBkcmFnZ2luZyB0aGUgb3B0aWNhbCBpbWFnZS4gU2VlXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9waGV0c2ltcy9nZW9tZXRyaWMtb3B0aWNzL2lzc3Vlcy8zNjEuICBTbyBJIHN3aXRjaGVkIHRvIGRyYXdpbmcgYSBzcGVjaWZpYyBTaGFwZSB0aGF0IG1hdGNoZXNcclxuICogdGhlIGltYWdlICdjbG9zZSBlbm91Z2gnLiBUaGlzIFNoYXBlIHdhcyBjcmVhdGVkIGVtcGlyaWNhbGx5LCBieSBtYW51YWxseSBmaWRkbGluZyB3aXRoIHRoZSBTaGFwZSB1bnRpbCBpdCBtYXRjaGVkXHJcbiAqIHRoZSBvdXRsaW5lIG9mIGZyYW1lZCBpbWFnZXMuIEl0IGlzIGRlcGVuZGVudCBvbiB0aGUgLlBORyBmaWxlcyBmb3IgdGhlIGZyYW1lZCBpbWFnZXMsIGFuZCBhbHNvIGFzc3VtZXMgdGhhdFxyXG4gKiBhbGwgLlBORyBmaWxlcyBmb3IgZnJhbWVzIGltYWdlcyBoYXZlIHRoZSBzYW1lIGRpbWVuc2lvbnMuXHJcbiAqL1xyXG5jbGFzcyBNYXNrU2hhcGUgZXh0ZW5kcyBTaGFwZSB7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggaW1hZ2VXaWR0aDogbnVtYmVyLCBpbWFnZUhlaWdodDogbnVtYmVyICkge1xyXG5cclxuICAgIC8vIGluc2V0cyBhcmUgbnVtYmVyZWQgYXMgdGhleSBhcmUgdXNlZCwgYXMgd2UgbW92ZSBjbG9ja3dpc2VcclxuICAgIGNvbnN0IHhJbnNldDEgPSAxO1xyXG4gICAgY29uc3QgeEluc2V0MiA9IDEyO1xyXG4gICAgY29uc3QgeEluc2V0MyA9IDEwO1xyXG4gICAgY29uc3QgeUluc2V0MSA9IDY7XHJcbiAgICBjb25zdCB5SW5zZXQyID0gMztcclxuICAgIGNvbnN0IHlJbnNldDMgPSA1NTtcclxuXHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIC8vIE91dGxpbmUgYSByaWdodC1mYWNpbmcgZnJhbWVkIGltYWdlLCBzdGFydGluZyBhdCB0b3BMZWZ0IGFuZCBtb3ZpbmcgY2xvY2t3aXNlLlxyXG4gICAgdGhpcy5tb3ZlVG8oIHhJbnNldDEsIHlJbnNldDEgKVxyXG4gICAgICAubGluZVRvKCB4SW5zZXQzLCB5SW5zZXQyIClcclxuICAgICAgLmxpbmVUbyggaW1hZ2VXaWR0aCAtIHhJbnNldDIsIHlJbnNldDMgKVxyXG4gICAgICAubGluZVRvKCBpbWFnZVdpZHRoIC0geEluc2V0MiwgaW1hZ2VIZWlnaHQgLSB5SW5zZXQzIClcclxuICAgICAgLmxpbmVUbyggeEluc2V0MywgaW1hZ2VIZWlnaHQgLSB5SW5zZXQyIClcclxuICAgICAgLmxpbmVUbyggeEluc2V0MSwgaW1hZ2VIZWlnaHQgLSB5SW5zZXQxIClcclxuICAgICAgLmNsb3NlKCk7XHJcbiAgfVxyXG59XHJcblxyXG5nZW9tZXRyaWNPcHRpY3MucmVnaXN0ZXIoICdGcmFtZWRJbWFnZU1hc2tOb2RlJywgRnJhbWVkSW1hZ2VNYXNrTm9kZSApOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLEtBQUssUUFBUSxnQ0FBZ0M7QUFDdEQsT0FBT0MsZUFBZSxNQUFNLDBCQUEwQjtBQUN0RCxPQUFPQyxPQUFPLE1BQU0sK0JBQStCO0FBQ25ELFNBQVNDLElBQUksRUFBRUMsSUFBSSxRQUFRLG1DQUFtQztBQUM5RCxPQUFPQyxRQUFRLE1BQU0sZ0JBQWdCO0FBQ3JDLE9BQU9DLGlCQUFpQixNQUFNLHlCQUF5QjtBQUV2RCxlQUFlLE1BQU1DLG1CQUFtQixTQUFTSixJQUFJLENBQUM7RUFJcEQ7O0VBSU9LLFdBQVdBLENBQUVDLFVBQWtCLEVBQUVDLFdBQW1CLEVBQUc7SUFFNUQsTUFBTUMsb0JBQW9CLEdBQUcsSUFBSUMsU0FBUyxDQUFFSCxVQUFVLEVBQUVDLFdBQVksQ0FBQzs7SUFFckU7SUFDQSxNQUFNRyxtQkFBbUIsR0FBRyxJQUFJRCxTQUFTLENBQUVILFVBQVUsRUFBRUMsV0FBWSxDQUFDLENBQUNJLFdBQVcsQ0FBRSxJQUFJWixPQUFPLENBQUMsQ0FBQyxDQUFDYSxRQUFRLENBQ3RHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRU4sVUFBVSxFQUNqQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFDUCxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQ1IsQ0FBRSxDQUFDO0lBRUgsTUFBTU8sSUFBSSxHQUFHLElBQUlaLElBQUksQ0FBRU8sb0JBQW9CLEVBQUU7TUFDM0NNLElBQUksRUFBRVosUUFBUSxDQUFDYSw2QkFBNkI7TUFDNUNDLE9BQU8sRUFBRWIsaUJBQWlCLENBQUNjLHFCQUFxQjtNQUNoREMsTUFBTSxFQUFFZixpQkFBaUIsQ0FBQ2dCLFNBQVMsR0FBRyxLQUFLLEdBQUc7SUFDaEQsQ0FBRSxDQUFDO0lBRUgsS0FBSyxDQUFFO01BQ0xDLFFBQVEsRUFBRSxDQUFFUCxJQUFJLENBQUUsQ0FBQztJQUNyQixDQUFFLENBQUM7O0lBRUgsSUFBSSxDQUFDQSxJQUFJLEdBQUdBLElBQUk7SUFDaEIsSUFBSSxDQUFDTCxvQkFBb0IsR0FBR0Esb0JBQW9CO0lBQ2hELElBQUksQ0FBQ0UsbUJBQW1CLEdBQUdBLG1CQUFtQjtFQUNoRDtFQUVPVyxnQkFBZ0JBLENBQUVDLGFBQXNCLEVBQVM7SUFDdEQsSUFBSSxDQUFDVCxJQUFJLENBQUNVLEtBQUssR0FBS0QsYUFBYSxHQUFHLElBQUksQ0FBQ2Qsb0JBQW9CLEdBQUcsSUFBSSxDQUFDRSxtQkFBcUI7RUFDNUY7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTUQsU0FBUyxTQUFTWixLQUFLLENBQUM7RUFFckJRLFdBQVdBLENBQUVDLFVBQWtCLEVBQUVDLFdBQW1CLEVBQUc7SUFFNUQ7SUFDQSxNQUFNaUIsT0FBTyxHQUFHLENBQUM7SUFDakIsTUFBTUMsT0FBTyxHQUFHLEVBQUU7SUFDbEIsTUFBTUMsT0FBTyxHQUFHLEVBQUU7SUFDbEIsTUFBTUMsT0FBTyxHQUFHLENBQUM7SUFDakIsTUFBTUMsT0FBTyxHQUFHLENBQUM7SUFDakIsTUFBTUMsT0FBTyxHQUFHLEVBQUU7SUFFbEIsS0FBSyxDQUFDLENBQUM7O0lBRVA7SUFDQSxJQUFJLENBQUNDLE1BQU0sQ0FBRU4sT0FBTyxFQUFFRyxPQUFRLENBQUMsQ0FDNUJJLE1BQU0sQ0FBRUwsT0FBTyxFQUFFRSxPQUFRLENBQUMsQ0FDMUJHLE1BQU0sQ0FBRXpCLFVBQVUsR0FBR21CLE9BQU8sRUFBRUksT0FBUSxDQUFDLENBQ3ZDRSxNQUFNLENBQUV6QixVQUFVLEdBQUdtQixPQUFPLEVBQUVsQixXQUFXLEdBQUdzQixPQUFRLENBQUMsQ0FDckRFLE1BQU0sQ0FBRUwsT0FBTyxFQUFFbkIsV0FBVyxHQUFHcUIsT0FBUSxDQUFDLENBQ3hDRyxNQUFNLENBQUVQLE9BQU8sRUFBRWpCLFdBQVcsR0FBR29CLE9BQVEsQ0FBQyxDQUN4Q0ssS0FBSyxDQUFDLENBQUM7RUFDWjtBQUNGO0FBRUFsQyxlQUFlLENBQUNtQyxRQUFRLENBQUUscUJBQXFCLEVBQUU3QixtQkFBb0IsQ0FBQyJ9