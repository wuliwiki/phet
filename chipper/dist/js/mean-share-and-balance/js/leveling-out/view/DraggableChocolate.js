// Copyright 2022-2023, University of Colorado Boulder

/**
 * An individual chocolate bar node. These chocolate bars are draggable, and must stay within the notebook paper bounds.
 * Each chocolate bar snaps to the closest plate when dropped, which updates the parentPlate in the model.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import meanShareAndBalance from '../../meanShareAndBalance.js';
import { DragListener, InteractiveHighlighting, Node, Rectangle, Text } from '../../../../scenery/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import MeanShareAndBalanceConstants from '../../common/MeanShareAndBalanceConstants.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import MeanShareAndBalanceColors from '../../common/MeanShareAndBalanceColors.js';
// TODO: Should this be renamed ChocolateBarNode? https://github.com/phetsims/mean-share-and-balance/issues/131
export default class DraggableChocolate extends InteractiveHighlighting(Node) {
  constructor(model, chocolateBar, notebookPaperBoundsProperty, chocolateBarDropped, providedOptions) {
    const chocolateBarRectangle = new Rectangle(0, 0, MeanShareAndBalanceConstants.CHOCOLATE_WIDTH, MeanShareAndBalanceConstants.CHOCOLATE_HEIGHT, {
      fill: MeanShareAndBalanceColors.chocolateColorProperty,
      stroke: 'black'
    });
    const children = [chocolateBarRectangle];

    // In ?dev mode, show the index of the chocolate to help understand how things are organized and how they redistribute
    if (phet.chipper.queryParameters.dev) {
      children.push(new Text(chocolateBar.index, {
        fill: 'white',
        top: 0,
        left: 0
      }));
    }
    const options = optionize()({
      children: children,
      cursor: 'pointer'
    }, providedOptions);
    super(options);
    this.chocolateBar = chocolateBar;
    this.dragListener = new DragListener({
      positionProperty: this.chocolateBar.positionProperty,
      // The origin of the chocolate bar is the top left, so we must erode just on the right and bottom edge to keep
      // the chocolate fully in the paper region
      dragBoundsProperty: new DerivedProperty([notebookPaperBoundsProperty], bounds => new Bounds2(bounds.minX, bounds.minY, bounds.maxX - chocolateBarRectangle.width, bounds.maxY - chocolateBarRectangle.height)),
      start: () => {
        chocolateBar.stateProperty.set('dragging');
        model.reorganizeChocolates(chocolateBar.parentPlateProperty.value);
        this.moveToFront();
      },
      end: () => {
        chocolateBarDropped(this);
        chocolateBar.stateProperty.set('plate');
      },
      tandem: options.tandem.createTandem('dragListener')
    });
    this.addInputListener(this.dragListener);
    this.chocolateBar.positionProperty.link(position => this.setTranslation(position));
  }
}
meanShareAndBalance.register('DraggableChocolate', DraggableChocolate);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtZWFuU2hhcmVBbmRCYWxhbmNlIiwiRHJhZ0xpc3RlbmVyIiwiSW50ZXJhY3RpdmVIaWdobGlnaHRpbmciLCJOb2RlIiwiUmVjdGFuZ2xlIiwiVGV4dCIsIm9wdGlvbml6ZSIsIk1lYW5TaGFyZUFuZEJhbGFuY2VDb25zdGFudHMiLCJCb3VuZHMyIiwiRGVyaXZlZFByb3BlcnR5IiwiTWVhblNoYXJlQW5kQmFsYW5jZUNvbG9ycyIsIkRyYWdnYWJsZUNob2NvbGF0ZSIsImNvbnN0cnVjdG9yIiwibW9kZWwiLCJjaG9jb2xhdGVCYXIiLCJub3RlYm9va1BhcGVyQm91bmRzUHJvcGVydHkiLCJjaG9jb2xhdGVCYXJEcm9wcGVkIiwicHJvdmlkZWRPcHRpb25zIiwiY2hvY29sYXRlQmFyUmVjdGFuZ2xlIiwiQ0hPQ09MQVRFX1dJRFRIIiwiQ0hPQ09MQVRFX0hFSUdIVCIsImZpbGwiLCJjaG9jb2xhdGVDb2xvclByb3BlcnR5Iiwic3Ryb2tlIiwiY2hpbGRyZW4iLCJwaGV0IiwiY2hpcHBlciIsInF1ZXJ5UGFyYW1ldGVycyIsImRldiIsInB1c2giLCJpbmRleCIsInRvcCIsImxlZnQiLCJvcHRpb25zIiwiY3Vyc29yIiwiZHJhZ0xpc3RlbmVyIiwicG9zaXRpb25Qcm9wZXJ0eSIsImRyYWdCb3VuZHNQcm9wZXJ0eSIsImJvdW5kcyIsIm1pblgiLCJtaW5ZIiwibWF4WCIsIndpZHRoIiwibWF4WSIsImhlaWdodCIsInN0YXJ0Iiwic3RhdGVQcm9wZXJ0eSIsInNldCIsInJlb3JnYW5pemVDaG9jb2xhdGVzIiwicGFyZW50UGxhdGVQcm9wZXJ0eSIsInZhbHVlIiwibW92ZVRvRnJvbnQiLCJlbmQiLCJ0YW5kZW0iLCJjcmVhdGVUYW5kZW0iLCJhZGRJbnB1dExpc3RlbmVyIiwibGluayIsInBvc2l0aW9uIiwic2V0VHJhbnNsYXRpb24iLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkRyYWdnYWJsZUNob2NvbGF0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMi0yMDIzLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBBbiBpbmRpdmlkdWFsIGNob2NvbGF0ZSBiYXIgbm9kZS4gVGhlc2UgY2hvY29sYXRlIGJhcnMgYXJlIGRyYWdnYWJsZSwgYW5kIG11c3Qgc3RheSB3aXRoaW4gdGhlIG5vdGVib29rIHBhcGVyIGJvdW5kcy5cclxuICogRWFjaCBjaG9jb2xhdGUgYmFyIHNuYXBzIHRvIHRoZSBjbG9zZXN0IHBsYXRlIHdoZW4gZHJvcHBlZCwgd2hpY2ggdXBkYXRlcyB0aGUgcGFyZW50UGxhdGUgaW4gdGhlIG1vZGVsLlxyXG4gKlxyXG4gKiBAYXV0aG9yIE1hcmxhIFNjaHVseiAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICpcclxuICovXHJcblxyXG5pbXBvcnQgbWVhblNoYXJlQW5kQmFsYW5jZSBmcm9tICcuLi8uLi9tZWFuU2hhcmVBbmRCYWxhbmNlLmpzJztcclxuaW1wb3J0IHsgRHJhZ0xpc3RlbmVyLCBJbnRlcmFjdGl2ZUhpZ2hsaWdodGluZywgTm9kZSwgTm9kZU9wdGlvbnMsIFJlY3RhbmdsZSwgVGV4dCB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBvcHRpb25pemUsIHsgRW1wdHlTZWxmT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9vcHRpb25pemUuanMnO1xyXG5pbXBvcnQgTWVhblNoYXJlQW5kQmFsYW5jZUNvbnN0YW50cyBmcm9tICcuLi8uLi9jb21tb24vTWVhblNoYXJlQW5kQmFsYW5jZUNvbnN0YW50cy5qcyc7XHJcbmltcG9ydCBDaG9jb2xhdGVCYXIgZnJvbSAnLi4vbW9kZWwvQ2hvY29sYXRlQmFyLmpzJztcclxuaW1wb3J0IExldmVsaW5nT3V0TW9kZWwgZnJvbSAnLi4vbW9kZWwvTGV2ZWxpbmdPdXRNb2RlbC5qcyc7XHJcbmltcG9ydCBCb3VuZHMyIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9Cb3VuZHMyLmpzJztcclxuaW1wb3J0IFRSZWFkT25seVByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvVFJlYWRPbmx5UHJvcGVydHkuanMnO1xyXG5pbXBvcnQgRGVyaXZlZFByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvRGVyaXZlZFByb3BlcnR5LmpzJztcclxuaW1wb3J0IE1lYW5TaGFyZUFuZEJhbGFuY2VDb2xvcnMgZnJvbSAnLi4vLi4vY29tbW9uL01lYW5TaGFyZUFuZEJhbGFuY2VDb2xvcnMuanMnO1xyXG5pbXBvcnQgU3RyaWN0T21pdCBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvdHlwZXMvU3RyaWN0T21pdC5qcyc7XHJcbmltcG9ydCBXaXRoUmVxdWlyZWQgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL3R5cGVzL1dpdGhSZXF1aXJlZC5qcyc7XHJcblxyXG50eXBlIFNlbGZPcHRpb25zID0gRW1wdHlTZWxmT3B0aW9ucztcclxudHlwZSBEcmFnZ2FibGVDaG9jb2xhdGVOb2RlT3B0aW9ucyA9IFNlbGZPcHRpb25zICYgU3RyaWN0T21pdDxXaXRoUmVxdWlyZWQ8Tm9kZU9wdGlvbnMsICd0YW5kZW0nPiwgJ2NoaWxkcmVuJz47XHJcblxyXG4vLyBUT0RPOiBTaG91bGQgdGhpcyBiZSByZW5hbWVkIENob2NvbGF0ZUJhck5vZGU/IGh0dHBzOi8vZ2l0aHViLmNvbS9waGV0c2ltcy9tZWFuLXNoYXJlLWFuZC1iYWxhbmNlL2lzc3Vlcy8xMzFcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhZ2dhYmxlQ2hvY29sYXRlIGV4dGVuZHMgSW50ZXJhY3RpdmVIaWdobGlnaHRpbmcoIE5vZGUgKSB7XHJcblxyXG4gIHB1YmxpYyByZWFkb25seSBkcmFnTGlzdGVuZXI6IERyYWdMaXN0ZW5lcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgY2hvY29sYXRlQmFyOiBDaG9jb2xhdGVCYXI7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggbW9kZWw6IFBpY2s8TGV2ZWxpbmdPdXRNb2RlbCwgJ3Jlb3JnYW5pemVDaG9jb2xhdGVzJz4sXHJcbiAgICAgICAgICAgICAgICAgICAgICBjaG9jb2xhdGVCYXI6IENob2NvbGF0ZUJhcixcclxuICAgICAgICAgICAgICAgICAgICAgIG5vdGVib29rUGFwZXJCb3VuZHNQcm9wZXJ0eTogVFJlYWRPbmx5UHJvcGVydHk8Qm91bmRzMj4sXHJcbiAgICAgICAgICAgICAgICAgICAgICBjaG9jb2xhdGVCYXJEcm9wcGVkOiAoIGNob2NvbGF0ZUJhcjogRHJhZ2dhYmxlQ2hvY29sYXRlICkgPT4gdm9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVkT3B0aW9uczogRHJhZ2dhYmxlQ2hvY29sYXRlTm9kZU9wdGlvbnMgKSB7XHJcblxyXG4gICAgY29uc3QgY2hvY29sYXRlQmFyUmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZSggMCwgMCwgTWVhblNoYXJlQW5kQmFsYW5jZUNvbnN0YW50cy5DSE9DT0xBVEVfV0lEVEgsIE1lYW5TaGFyZUFuZEJhbGFuY2VDb25zdGFudHMuQ0hPQ09MQVRFX0hFSUdIVCwge1xyXG4gICAgICBmaWxsOiBNZWFuU2hhcmVBbmRCYWxhbmNlQ29sb3JzLmNob2NvbGF0ZUNvbG9yUHJvcGVydHksXHJcbiAgICAgIHN0cm9rZTogJ2JsYWNrJ1xyXG4gICAgfSApO1xyXG5cclxuICAgIGNvbnN0IGNoaWxkcmVuOiBBcnJheTxOb2RlPiA9IFsgY2hvY29sYXRlQmFyUmVjdGFuZ2xlIF07XHJcblxyXG4gICAgLy8gSW4gP2RldiBtb2RlLCBzaG93IHRoZSBpbmRleCBvZiB0aGUgY2hvY29sYXRlIHRvIGhlbHAgdW5kZXJzdGFuZCBob3cgdGhpbmdzIGFyZSBvcmdhbml6ZWQgYW5kIGhvdyB0aGV5IHJlZGlzdHJpYnV0ZVxyXG4gICAgaWYgKCBwaGV0LmNoaXBwZXIucXVlcnlQYXJhbWV0ZXJzLmRldiApIHtcclxuICAgICAgY2hpbGRyZW4ucHVzaCggbmV3IFRleHQoIGNob2NvbGF0ZUJhci5pbmRleCwgeyBmaWxsOiAnd2hpdGUnLCB0b3A6IDAsIGxlZnQ6IDAgfSApICk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbml6ZTxEcmFnZ2FibGVDaG9jb2xhdGVOb2RlT3B0aW9ucywgU2VsZk9wdGlvbnMsIE5vZGVPcHRpb25zPigpKCB7XHJcbiAgICAgIGNoaWxkcmVuOiBjaGlsZHJlbixcclxuICAgICAgY3Vyc29yOiAncG9pbnRlcidcclxuICAgIH0sIHByb3ZpZGVkT3B0aW9ucyApO1xyXG5cclxuICAgIHN1cGVyKCBvcHRpb25zICk7XHJcblxyXG4gICAgdGhpcy5jaG9jb2xhdGVCYXIgPSBjaG9jb2xhdGVCYXI7XHJcblxyXG4gICAgdGhpcy5kcmFnTGlzdGVuZXIgPSBuZXcgRHJhZ0xpc3RlbmVyKCB7XHJcbiAgICAgIHBvc2l0aW9uUHJvcGVydHk6IHRoaXMuY2hvY29sYXRlQmFyLnBvc2l0aW9uUHJvcGVydHksXHJcblxyXG4gICAgICAvLyBUaGUgb3JpZ2luIG9mIHRoZSBjaG9jb2xhdGUgYmFyIGlzIHRoZSB0b3AgbGVmdCwgc28gd2UgbXVzdCBlcm9kZSBqdXN0IG9uIHRoZSByaWdodCBhbmQgYm90dG9tIGVkZ2UgdG8ga2VlcFxyXG4gICAgICAvLyB0aGUgY2hvY29sYXRlIGZ1bGx5IGluIHRoZSBwYXBlciByZWdpb25cclxuICAgICAgZHJhZ0JvdW5kc1Byb3BlcnR5OiBuZXcgRGVyaXZlZFByb3BlcnR5KCBbIG5vdGVib29rUGFwZXJCb3VuZHNQcm9wZXJ0eSBdLCBib3VuZHMgPT5cclxuICAgICAgICBuZXcgQm91bmRzMiggYm91bmRzLm1pblgsIGJvdW5kcy5taW5ZLCBib3VuZHMubWF4WCAtIGNob2NvbGF0ZUJhclJlY3RhbmdsZS53aWR0aCwgYm91bmRzLm1heFkgLSBjaG9jb2xhdGVCYXJSZWN0YW5nbGUuaGVpZ2h0IClcclxuICAgICAgKSxcclxuICAgICAgc3RhcnQ6ICgpID0+IHtcclxuICAgICAgICBjaG9jb2xhdGVCYXIuc3RhdGVQcm9wZXJ0eS5zZXQoICdkcmFnZ2luZycgKTtcclxuICAgICAgICBtb2RlbC5yZW9yZ2FuaXplQ2hvY29sYXRlcyggY2hvY29sYXRlQmFyLnBhcmVudFBsYXRlUHJvcGVydHkudmFsdWUgKTtcclxuICAgICAgICB0aGlzLm1vdmVUb0Zyb250KCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZDogKCkgPT4ge1xyXG4gICAgICAgIGNob2NvbGF0ZUJhckRyb3BwZWQoIHRoaXMgKTtcclxuICAgICAgICBjaG9jb2xhdGVCYXIuc3RhdGVQcm9wZXJ0eS5zZXQoICdwbGF0ZScgKTtcclxuICAgICAgfSxcclxuICAgICAgdGFuZGVtOiBvcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICdkcmFnTGlzdGVuZXInIClcclxuICAgIH0gKTtcclxuXHJcbiAgICB0aGlzLmFkZElucHV0TGlzdGVuZXIoIHRoaXMuZHJhZ0xpc3RlbmVyICk7XHJcblxyXG4gICAgdGhpcy5jaG9jb2xhdGVCYXIucG9zaXRpb25Qcm9wZXJ0eS5saW5rKCBwb3NpdGlvbiA9PiB0aGlzLnNldFRyYW5zbGF0aW9uKCBwb3NpdGlvbiApICk7XHJcbiAgfVxyXG59XHJcblxyXG5tZWFuU2hhcmVBbmRCYWxhbmNlLnJlZ2lzdGVyKCAnRHJhZ2dhYmxlQ2hvY29sYXRlJywgRHJhZ2dhYmxlQ2hvY29sYXRlICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxtQkFBbUIsTUFBTSw4QkFBOEI7QUFDOUQsU0FBU0MsWUFBWSxFQUFFQyx1QkFBdUIsRUFBRUMsSUFBSSxFQUFlQyxTQUFTLEVBQUVDLElBQUksUUFBUSxtQ0FBbUM7QUFDN0gsT0FBT0MsU0FBUyxNQUE0Qix1Q0FBdUM7QUFDbkYsT0FBT0MsNEJBQTRCLE1BQU0sOENBQThDO0FBR3ZGLE9BQU9DLE9BQU8sTUFBTSwrQkFBK0I7QUFFbkQsT0FBT0MsZUFBZSxNQUFNLHdD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