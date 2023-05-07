// Copyright 2014-2023, University of Colorado Boulder

/**
 * A Scenery node that is used to show the user what they entered for a 'Find the Area' style of challenge.  It can be
 * dynamically updated if needed.
 *
 * @author John Blanco
 */

import { Text } from '../../../../scenery/js/imports.js';
import areaBuilder from '../../areaBuilder.js';
import AreaBuilderStrings from '../../AreaBuilderStrings.js';
import FeedbackWindow from './FeedbackWindow.js';
const youEnteredString = AreaBuilderStrings.youEntered;

// constants
const LINE_SPACING = 5;
class YouEnteredWindow extends FeedbackWindow {
  /**
   * Constructor for the window that shows the user what they built.  It is constructed with no contents, and the
   * contents are added later when the build spec is set.
   *
   * @param maxWidth
   * @param {Object} [options]
   */
  constructor(maxWidth, options) {
    super(youEnteredString, maxWidth, options);

    // value entered text
    this.valueEnteredNode = new Text(99, {
      font: FeedbackWindow.NORMAL_TEXT_FONT,
      top: this.titleNode.bottom + LINE_SPACING
    });
    this.contentNode.addChild(this.valueEnteredNode);
  }

  // @public
  setValueEntered(valueEntered) {
    this.valueEnteredNode.string = valueEntered.toString();
    this.valueEnteredNode.centerX = this.titleNode.centerX;
  }
}
areaBuilder.register('YouEnteredWindow', YouEnteredWindow);
export default YouEnteredWindow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJUZXh0IiwiYXJlYUJ1aWxkZXIiLCJBcmVhQnVpbGRlclN0cmluZ3MiLCJGZWVkYmFja1dpbmRvdyIsInlvdUVudGVyZWRTdHJpbmciLCJ5b3VFbnRlcmVkIiwiTElORV9TUEFDSU5HIiwiWW91RW50ZXJlZFdpbmRvdyIsImNvbnN0cnVjdG9yIiwibWF4V2lkdGgiLCJvcHRpb25zIiwidmFsdWVFbnRlcmVkTm9kZSIsImZvbnQiLCJOT1JNQUxfVEVYVF9GT05UIiwidG9wIiwidGl0bGVOb2RlIiwiYm90dG9tIiwiY29udGVudE5vZGUiLCJhZGRDaGlsZCIsInNldFZhbHVlRW50ZXJlZCIsInZhbHVlRW50ZXJlZCIsInN0cmluZyIsInRvU3RyaW5nIiwiY2VudGVyWCIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiWW91RW50ZXJlZFdpbmRvdy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNC0yMDIzLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBBIFNjZW5lcnkgbm9kZSB0aGF0IGlzIHVzZWQgdG8gc2hvdyB0aGUgdXNlciB3aGF0IHRoZXkgZW50ZXJlZCBmb3IgYSAnRmluZCB0aGUgQXJlYScgc3R5bGUgb2YgY2hhbGxlbmdlLiAgSXQgY2FuIGJlXHJcbiAqIGR5bmFtaWNhbGx5IHVwZGF0ZWQgaWYgbmVlZGVkLlxyXG4gKlxyXG4gKiBAYXV0aG9yIEpvaG4gQmxhbmNvXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgVGV4dCB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBhcmVhQnVpbGRlciBmcm9tICcuLi8uLi9hcmVhQnVpbGRlci5qcyc7XHJcbmltcG9ydCBBcmVhQnVpbGRlclN0cmluZ3MgZnJvbSAnLi4vLi4vQXJlYUJ1aWxkZXJTdHJpbmdzLmpzJztcclxuaW1wb3J0IEZlZWRiYWNrV2luZG93IGZyb20gJy4vRmVlZGJhY2tXaW5kb3cuanMnO1xyXG5cclxuY29uc3QgeW91RW50ZXJlZFN0cmluZyA9IEFyZWFCdWlsZGVyU3RyaW5ncy55b3VFbnRlcmVkO1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IExJTkVfU1BBQ0lORyA9IDU7XHJcblxyXG5jbGFzcyBZb3VFbnRlcmVkV2luZG93IGV4dGVuZHMgRmVlZGJhY2tXaW5kb3cge1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIHdpbmRvdyB0aGF0IHNob3dzIHRoZSB1c2VyIHdoYXQgdGhleSBidWlsdC4gIEl0IGlzIGNvbnN0cnVjdGVkIHdpdGggbm8gY29udGVudHMsIGFuZCB0aGVcclxuICAgKiBjb250ZW50cyBhcmUgYWRkZWQgbGF0ZXIgd2hlbiB0aGUgYnVpbGQgc3BlYyBpcyBzZXQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gbWF4V2lkdGhcclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoIG1heFdpZHRoLCBvcHRpb25zICkge1xyXG5cclxuICAgIHN1cGVyKCB5b3VFbnRlcmVkU3RyaW5nLCBtYXhXaWR0aCwgb3B0aW9ucyApO1xyXG5cclxuICAgIC8vIHZhbHVlIGVudGVyZWQgdGV4dFxyXG4gICAgdGhpcy52YWx1ZUVudGVyZWROb2RlID0gbmV3IFRleHQoICggOTkgKSwge1xyXG4gICAgICBmb250OiBGZWVkYmFja1dpbmRvdy5OT1JNQUxfVEVYVF9GT05ULFxyXG4gICAgICB0b3A6IHRoaXMudGl0bGVOb2RlLmJvdHRvbSArIExJTkVfU1BBQ0lOR1xyXG4gICAgfSApO1xyXG4gICAgdGhpcy5jb250ZW50Tm9kZS5hZGRDaGlsZCggdGhpcy52YWx1ZUVudGVyZWROb2RlICk7XHJcbiAgfVxyXG5cclxuICAvLyBAcHVibGljXHJcbiAgc2V0VmFsdWVFbnRlcmVkKCB2YWx1ZUVudGVyZWQgKSB7XHJcbiAgICB0aGlzLnZhbHVlRW50ZXJlZE5vZGUuc3RyaW5nID0gdmFsdWVFbnRlcmVkLnRvU3RyaW5nKCk7XHJcbiAgICB0aGlzLnZhbHVlRW50ZXJlZE5vZGUuY2VudGVyWCA9IHRoaXMudGl0bGVOb2RlLmNlbnRlclg7XHJcbiAgfVxyXG59XHJcblxyXG5hcmVhQnVpbGRlci5yZWdpc3RlciggJ1lvdUVudGVyZWRXaW5kb3cnLCBZb3VFbnRlcmVkV2luZG93ICk7XHJcbmV4cG9ydCBkZWZhdWx0IFlvdUVudGVyZWRXaW5kb3c7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsSUFBSSxRQUFRLG1DQUFtQztBQUN4RCxPQUFPQyxXQUFXLE1BQU0sc0JBQXNCO0FBQzlDLE9BQU9DLGtCQUFrQixNQUFNLDZCQUE2QjtBQUM1RCxPQUFPQyxjQUFjLE1BQU0scUJBQXFCO0FBRWhELE1BQU1DLGdCQUFnQixHQUFHRixrQkFBa0IsQ0FBQ0csVUFBVTs7QUFFdEQ7QUFDQSxNQUFNQyxZQUFZLEdBQUcsQ0FBQztBQUV0QixNQUFNQyxnQkFBZ0IsU0FBU0osY0FBYyxDQUFDO0VBRTVDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0VLLFdBQVdBLENBQUVDLFFBQVEsRUFBRUMsT0FBTyxFQUFHO0lBRS9CLEtBQUssQ0FBRU4sZ0JBQWdCLEVBQUVLLFFBQVEsRUFBRUMsT0FBUSxDQUFDOztJQUU1QztJQUNBLElBQUksQ0FBQ0MsZ0JBQWdCLEdBQUcsSUFBSVgsSUFBSSxDQUFJLEVBQUUsRUFBSTtNQUN4Q1ksSUFBSSxFQUFFVCxjQUFjLENBQUNVLGdCQUFnQjtNQUNyQ0MsR0FBRyxFQUFFLElBQUksQ0FBQ0MsU0FBUyxDQUFDQyxNQUFNLEdBQUdWO0lBQy9CLENBQUUsQ0FBQztJQUNILElBQUksQ0FBQ1csV0FBVyxDQUFDQyxRQUFRLENBQUUsSUFBSSxDQUFDUCxnQkFBaUIsQ0FBQztFQUNwRDs7RUFFQTtFQUNBUSxlQUFlQSxDQUFFQyxZQUFZLEVBQUc7SUFDOUIsSUFBSSxDQUFDVCxnQkFBZ0IsQ0FBQ1UsTUFBTSxHQUFHRCxZQUFZLENBQUNFLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELElBQUksQ0FBQ1gsZ0JBQWdCLENBQUNZLE9BQU8sR0FBRyxJQUFJLENBQUNSLFNBQVMsQ0FBQ1EsT0FBTztFQUN4RDtBQUNGO0FBRUF0QixXQUFXLENBQUN1QixRQUFRLENBQUUsa0JBQWtCLEVBQUVqQixnQkFBaUIsQ0FBQztBQUM1RCxlQUFlQSxnQkFBZ0IifQ==