// Copyright 2020-2023, University of Colorado Boulder

/**
 * A collection of radio buttons that controls skater image, independent of mass. Does not use RectangularRadioButtonGroup
 * because the buttons are in a layout that RectangularRadioButtonGroup does not yet support. But in the future, improvements
 * to RectangularRadioButtonGroup may make it possible to use that class, and this should be re-written accordingly.
 *
 * See https://github.com/phetsims/energy-skate-park/issues/263#issuecomment-620829413
 *
 * @author Jesse Greenberg
 */

import merge from '../../../../phet-core/js/merge.js';
import { HBox, Image, Node, VBox } from '../../../../scenery/js/imports.js';
import RectangularRadioButton from '../../../../sun/js/buttons/RectangularRadioButton.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import EnergySkateParkColorScheme from './EnergySkateParkColorScheme.js';
import { Shape } from '../../../../kite/js/imports.js';
const BUTTON_SPACING = 5;
class SkaterRadioButtonGroup extends Node {
  /**
   * @param {Property.<Image>} skaterImageSetProperty - Property for the skater image
   * @param {SkaterCharacterSet} skaterCharacterSet - The set of characters that this button group selects from
   * @param {Tandem} tandem
   */
  constructor(skaterImageSetProperty, skaterCharacterSet, tandem) {
    super();
    const buttonOptions = {
      xMargin: 1,
      yMargin: 1,
      cornerRadius: EnergySkateParkConstants.RADIO_BUTTON_CORNER_RADIUS,
      baseColor: EnergySkateParkColorScheme.radioButtonBaseColor,
      buttonAppearanceStrategyOptions: {
        selectedStroke: EnergySkateParkColorScheme.radioButtonSelectedStroke
      }
    };
    const imageScale = 0.5;

    // Description of the radio buttons
    const contentArray = [{
      value: skaterCharacterSet.imageSet1,
      node: new Image(skaterCharacterSet.imageSet1.headshotImage, {
        scale: imageScale
      }),
      tandemName: 'skater1RadioButton'
    }, {
      value: skaterCharacterSet.imageSet2,
      node: new Image(skaterCharacterSet.imageSet2.headshotImage, {
        scale: imageScale
      }),
      tandemName: 'skater2RadioButton'
    }, {
      value: skaterCharacterSet.imageSet3,
      node: new Image(skaterCharacterSet.imageSet3.headshotImage, {
        scale: imageScale
      }),
      tandemName: 'skater3RadioButton'
    }, {
      value: skaterCharacterSet.imageSet4,
      node: new Image(skaterCharacterSet.imageSet4.headshotImage, {
        scale: imageScale
      }),
      tandemName: 'skater4RadioButton'
    }, {
      value: skaterCharacterSet.imageSet5,
      node: new Image(skaterCharacterSet.imageSet5.headshotImage, {
        scale: imageScale
      }),
      tandemName: 'skater5RadioButton'
    }, {
      value: skaterCharacterSet.imageSet6,
      node: new Image(skaterCharacterSet.imageSet6.headshotImage, {
        scale: imageScale
      }),
      tandemName: 'skater6RadioButton'
    }, {
      value: skaterCharacterSet.imageSet7,
      node: new Image(skaterCharacterSet.imageSet7.headshotImage, {
        scale: imageScale
      }),
      tandemName: 'skater7RadioButton'
    }, {
      value: skaterCharacterSet.imageSet8,
      node: new Image(skaterCharacterSet.imageSet8.headshotImage, {
        scale: imageScale
      }),
      tandemName: 'skater8RadioButton'
    }];
    const buttons = [];
    contentArray.forEach(content => {
      // Round clipping the corners to avoid pointy images in the radio buttons
      content.node.clipArea = Shape.roundRect(content.node.localBounds.left, content.node.localBounds.top, content.node.localBounds.width, content.node.localBounds.height, 4, 4);
      buttons.push(new RectangularRadioButton(skaterImageSetProperty, content.value, merge({
        content: content.node,
        tandem: tandem.createTandem(content.tandemName)
      }, buttonOptions)));
    });
    const rows = [];
    for (let i = 0; i < buttons.length; i += 4) {
      rows.push(new HBox({
        children: buttons.slice(i, i + 4),
        spacing: BUTTON_SPACING,
        resize: false
      }));
    }

    // arrange buttons in a 2D grid
    this.addChild(new VBox({
      children: rows,
      spacing: BUTTON_SPACING,
      resize: false
    }));

    // so that the selected button cannot continue to be clicked, a feature of RectangularRadioButtonGroup - this component is
    // never destroyed, no need to dispose
    skaterImageSetProperty.link(value => {
      for (let i = 0; i < contentArray.length; i++) {
        if (contentArray[i].value === value) {
          buttons[i].pickable = false;
          buttons[i].cursor = null;
        } else {
          buttons[i].pickable = true;
          buttons[i].cursor = 'pointer';
        }
      }
    });
  }
}
energySkatePark.register('SkaterRadioButtonGroup', SkaterRadioButtonGroup);
export default SkaterRadioButtonGroup;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtZXJnZSIsIkhCb3giLCJJbWFnZSIsIk5vZGUiLCJWQm94IiwiUmVjdGFuZ3VsYXJSYWRpb0J1dHRvbiIsImVuZXJneVNrYXRlUGFyayIsIkVuZXJneVNrYXRlUGFya0NvbnN0YW50cyIsIkVuZXJneVNrYXRlUGFya0NvbG9yU2NoZW1lIiwiU2hhcGUiLCJCVVRUT05fU1BBQ0lORyIsIlNrYXRlclJhZGlvQnV0dG9uR3JvdXAiLCJjb25zdHJ1Y3RvciIsInNrYXRlckltYWdlU2V0UHJvcGVydHkiLCJza2F0ZXJDaGFyYWN0ZXJTZXQiLCJ0YW5kZW0iLCJidXR0b25PcHRpb25zIiwieE1hcmdpbiIsInlNYXJnaW4iLCJjb3JuZXJSYWRpdXMiLCJSQURJT19CVVRUT05fQ09STkVSX1JBRElVUyIsImJhc2VDb2xvciIsInJhZGlvQnV0dG9uQmFzZUNvbG9yIiwiYnV0dG9uQXBwZWFyYW5jZVN0cmF0ZWd5T3B0aW9ucyIsInNlbGVjdGVkU3Ryb2tlIiwicmFkaW9CdXR0b25TZWxlY3RlZFN0cm9rZSIsImltYWdlU2NhbGUiLCJjb250ZW50QXJyYXkiLCJ2YWx1ZSIsImltYWdlU2V0MSIsIm5vZGUiLCJoZWFkc2hvdEltYWdlIiwic2NhbGUiLCJ0YW5kZW1OYW1lIiwiaW1hZ2VTZXQyIiwiaW1hZ2VTZXQzIiwiaW1hZ2VTZXQ0IiwiaW1hZ2VTZXQ1IiwiaW1hZ2VTZXQ2IiwiaW1hZ2VTZXQ3IiwiaW1hZ2VTZXQ4IiwiYnV0dG9ucyIsImZvckVhY2giLCJjb250ZW50IiwiY2xpcEFyZWEiLCJyb3VuZFJlY3QiLCJsb2NhbEJvdW5kcyIsImxlZnQiLCJ0b3AiLCJ3aWR0aCIsImhlaWdodCIsInB1c2giLCJjcmVhdGVUYW5kZW0iLCJyb3dzIiwiaSIsImxlbmd0aCIsImNoaWxkcmVuIiwic2xpY2UiLCJzcGFjaW5nIiwicmVzaXplIiwiYWRkQ2hpbGQiLCJsaW5rIiwicGlja2FibGUiLCJjdXJzb3IiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIlNrYXRlclJhZGlvQnV0dG9uR3JvdXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogQSBjb2xsZWN0aW9uIG9mIHJhZGlvIGJ1dHRvbnMgdGhhdCBjb250cm9scyBza2F0ZXIgaW1hZ2UsIGluZGVwZW5kZW50IG9mIG1hc3MuIERvZXMgbm90IHVzZSBSZWN0YW5ndWxhclJhZGlvQnV0dG9uR3JvdXBcclxuICogYmVjYXVzZSB0aGUgYnV0dG9ucyBhcmUgaW4gYSBsYXlvdXQgdGhhdCBSZWN0YW5ndWxhclJhZGlvQnV0dG9uR3JvdXAgZG9lcyBub3QgeWV0IHN1cHBvcnQuIEJ1dCBpbiB0aGUgZnV0dXJlLCBpbXByb3ZlbWVudHNcclxuICogdG8gUmVjdGFuZ3VsYXJSYWRpb0J1dHRvbkdyb3VwIG1heSBtYWtlIGl0IHBvc3NpYmxlIHRvIHVzZSB0aGF0IGNsYXNzLCBhbmQgdGhpcyBzaG91bGQgYmUgcmUtd3JpdHRlbiBhY2NvcmRpbmdseS5cclxuICpcclxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9waGV0c2ltcy9lbmVyZ3ktc2thdGUtcGFyay9pc3N1ZXMvMjYzI2lzc3VlY29tbWVudC02MjA4Mjk0MTNcclxuICpcclxuICogQGF1dGhvciBKZXNzZSBHcmVlbmJlcmdcclxuICovXHJcblxyXG5pbXBvcnQgbWVyZ2UgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL21lcmdlLmpzJztcclxuaW1wb3J0IHsgSEJveCwgSW1hZ2UsIE5vZGUsIFZCb3ggfSBmcm9tICcuLi8uLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgUmVjdGFuZ3VsYXJSYWRpb0J1dHRvbiBmcm9tICcuLi8uLi8uLi8uLi9zdW4vanMvYnV0dG9ucy9SZWN0YW5ndWxhclJhZGlvQnV0dG9uLmpzJztcclxuaW1wb3J0IGVuZXJneVNrYXRlUGFyayBmcm9tICcuLi8uLi9lbmVyZ3lTa2F0ZVBhcmsuanMnO1xyXG5pbXBvcnQgRW5lcmd5U2thdGVQYXJrQ29uc3RhbnRzIGZyb20gJy4uL0VuZXJneVNrYXRlUGFya0NvbnN0YW50cy5qcyc7XHJcbmltcG9ydCBFbmVyZ3lTa2F0ZVBhcmtDb2xvclNjaGVtZSBmcm9tICcuL0VuZXJneVNrYXRlUGFya0NvbG9yU2NoZW1lLmpzJztcclxuaW1wb3J0IHsgU2hhcGUgfSBmcm9tICcuLi8uLi8uLi8uLi9raXRlL2pzL2ltcG9ydHMuanMnO1xyXG5cclxuY29uc3QgQlVUVE9OX1NQQUNJTkcgPSA1O1xyXG5cclxuY2xhc3MgU2thdGVyUmFkaW9CdXR0b25Hcm91cCBleHRlbmRzIE5vZGUge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1Byb3BlcnR5LjxJbWFnZT59IHNrYXRlckltYWdlU2V0UHJvcGVydHkgLSBQcm9wZXJ0eSBmb3IgdGhlIHNrYXRlciBpbWFnZVxyXG4gICAqIEBwYXJhbSB7U2thdGVyQ2hhcmFjdGVyU2V0fSBza2F0ZXJDaGFyYWN0ZXJTZXQgLSBUaGUgc2V0IG9mIGNoYXJhY3RlcnMgdGhhdCB0aGlzIGJ1dHRvbiBncm91cCBzZWxlY3RzIGZyb21cclxuICAgKiBAcGFyYW0ge1RhbmRlbX0gdGFuZGVtXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoIHNrYXRlckltYWdlU2V0UHJvcGVydHksIHNrYXRlckNoYXJhY3RlclNldCwgdGFuZGVtICkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICBjb25zdCBidXR0b25PcHRpb25zID0ge1xyXG4gICAgICB4TWFyZ2luOiAxLFxyXG4gICAgICB5TWFyZ2luOiAxLFxyXG4gICAgICBjb3JuZXJSYWRpdXM6IEVuZXJneVNrYXRlUGFya0NvbnN0YW50cy5SQURJT19CVVRUT05fQ09STkVSX1JBRElVUyxcclxuICAgICAgYmFzZUNvbG9yOiBFbmVyZ3lTa2F0ZVBhcmtDb2xvclNjaGVtZS5yYWRpb0J1dHRvbkJhc2VDb2xvcixcclxuICAgICAgYnV0dG9uQXBwZWFyYW5jZVN0cmF0ZWd5T3B0aW9uczoge1xyXG4gICAgICAgIHNlbGVjdGVkU3Ryb2tlOiBFbmVyZ3lTa2F0ZVBhcmtDb2xvclNjaGVtZS5yYWRpb0J1dHRvblNlbGVjdGVkU3Ryb2tlXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaW1hZ2VTY2FsZSA9IDAuNTtcclxuXHJcbiAgICAvLyBEZXNjcmlwdGlvbiBvZiB0aGUgcmFkaW8gYnV0dG9uc1xyXG4gICAgY29uc3QgY29udGVudEFycmF5ID0gW1xyXG4gICAgICB7XHJcbiAgICAgICAgdmFsdWU6IHNrYXRlckNoYXJhY3RlclNldC5pbWFnZVNldDEsXHJcbiAgICAgICAgbm9kZTogbmV3IEltYWdlKCBza2F0ZXJDaGFyYWN0ZXJTZXQuaW1hZ2VTZXQxLmhlYWRzaG90SW1hZ2UsIHsgc2NhbGU6IGltYWdlU2NhbGUgfSApLFxyXG4gICAgICAgIHRhbmRlbU5hbWU6ICdza2F0ZXIxUmFkaW9CdXR0b24nXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB2YWx1ZTogc2thdGVyQ2hhcmFjdGVyU2V0LmltYWdlU2V0MixcclxuICAgICAgICBub2RlOiBuZXcgSW1hZ2UoIHNrYXRlckNoYXJhY3RlclNldC5pbWFnZVNldDIuaGVhZHNob3RJbWFnZSwgeyBzY2FsZTogaW1hZ2VTY2FsZSB9ICksXHJcbiAgICAgICAgdGFuZGVtTmFtZTogJ3NrYXRlcjJSYWRpb0J1dHRvbidcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHZhbHVlOiBza2F0ZXJDaGFyYWN0ZXJTZXQuaW1hZ2VTZXQzLFxyXG4gICAgICAgIG5vZGU6IG5ldyBJbWFnZSggc2thdGVyQ2hhcmFjdGVyU2V0LmltYWdlU2V0My5oZWFkc2hvdEltYWdlLCB7IHNjYWxlOiBpbWFnZVNjYWxlIH0gKSxcclxuICAgICAgICB0YW5kZW1OYW1lOiAnc2thdGVyM1JhZGlvQnV0dG9uJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdmFsdWU6IHNrYXRlckNoYXJhY3RlclNldC5pbWFnZVNldDQsXHJcbiAgICAgICAgbm9kZTogbmV3IEltYWdlKCBza2F0ZXJDaGFyYWN0ZXJTZXQuaW1hZ2VTZXQ0LmhlYWRzaG90SW1hZ2UsIHsgc2NhbGU6IGltYWdlU2NhbGUgfSApLFxyXG4gICAgICAgIHRhbmRlbU5hbWU6ICdza2F0ZXI0UmFkaW9CdXR0b24nXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB2YWx1ZTogc2thdGVyQ2hhcmFjdGVyU2V0LmltYWdlU2V0NSxcclxuICAgICAgICBub2RlOiBuZXcgSW1hZ2UoIHNrYXRlckNoYXJhY3RlclNldC5pbWFnZVNldDUuaGVhZHNob3RJbWFnZSwgeyBzY2FsZTogaW1hZ2VTY2FsZSB9ICksXHJcbiAgICAgICAgdGFuZGVtTmFtZTogJ3NrYXRlcjVSYWRpb0J1dHRvbidcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHZhbHVlOiBza2F0ZXJDaGFyYWN0ZXJTZXQuaW1hZ2VTZXQ2LFxyXG4gICAgICAgIG5vZGU6IG5ldyBJbWFnZSggc2thdGVyQ2hhcmFjdGVyU2V0LmltYWdlU2V0Ni5oZWFkc2hvdEltYWdlLCB7IHNjYWxlOiBpbWFnZVNjYWxlIH0gKSxcclxuICAgICAgICB0YW5kZW1OYW1lOiAnc2thdGVyNlJhZGlvQnV0dG9uJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdmFsdWU6IHNrYXRlckNoYXJhY3RlclNldC5pbWFnZVNldDcsXHJcbiAgICAgICAgbm9kZTogbmV3IEltYWdlKCBza2F0ZXJDaGFyYWN0ZXJTZXQuaW1hZ2VTZXQ3LmhlYWRzaG90SW1hZ2UsIHsgc2NhbGU6IGltYWdlU2NhbGUgfSApLFxyXG4gICAgICAgIHRhbmRlbU5hbWU6ICdza2F0ZXI3UmFkaW9CdXR0b24nXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB2YWx1ZTogc2thdGVyQ2hhcmFjdGVyU2V0LmltYWdlU2V0OCxcclxuICAgICAgICBub2RlOiBuZXcgSW1hZ2UoIHNrYXRlckNoYXJhY3RlclNldC5pbWFnZVNldDguaGVhZHNob3RJbWFnZSwgeyBzY2FsZTogaW1hZ2VTY2FsZSB9ICksXHJcbiAgICAgICAgdGFuZGVtTmFtZTogJ3NrYXRlcjhSYWRpb0J1dHRvbidcclxuICAgICAgfVxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBidXR0b25zID0gW107XHJcbiAgICBjb250ZW50QXJyYXkuZm9yRWFjaCggY29udGVudCA9PiB7XHJcbiAgICAgIC8vIFJvdW5kIGNsaXBwaW5nIHRoZSBjb3JuZXJzIHRvIGF2b2lkIHBvaW50eSBpbWFnZXMgaW4gdGhlIHJhZGlvIGJ1dHRvbnNcclxuICAgICAgY29udGVudC5ub2RlLmNsaXBBcmVhID0gU2hhcGUucm91bmRSZWN0KFxyXG4gICAgICAgIGNvbnRlbnQubm9kZS5sb2NhbEJvdW5kcy5sZWZ0LFxyXG4gICAgICAgIGNvbnRlbnQubm9kZS5sb2NhbEJvdW5kcy50b3AsXHJcbiAgICAgICAgY29udGVudC5ub2RlLmxvY2FsQm91bmRzLndpZHRoLFxyXG4gICAgICAgIGNvbnRlbnQubm9kZS5sb2NhbEJvdW5kcy5oZWlnaHQsXHJcbiAgICAgICAgNCxcclxuICAgICAgICA0XHJcbiAgICAgICk7XHJcbiAgICAgIGJ1dHRvbnMucHVzaCggbmV3IFJlY3Rhbmd1bGFyUmFkaW9CdXR0b24oIHNrYXRlckltYWdlU2V0UHJvcGVydHksIGNvbnRlbnQudmFsdWUsIG1lcmdlKCB7XHJcbiAgICAgICAgY29udGVudDogY29udGVudC5ub2RlLFxyXG4gICAgICAgIHRhbmRlbTogdGFuZGVtLmNyZWF0ZVRhbmRlbSggY29udGVudC50YW5kZW1OYW1lIClcclxuICAgICAgfSwgYnV0dG9uT3B0aW9ucyApICkgKTtcclxuICAgIH0gKTtcclxuXHJcbiAgICBjb25zdCByb3dzID0gW107XHJcbiAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBidXR0b25zLmxlbmd0aDsgaSArPSA0ICkge1xyXG4gICAgICByb3dzLnB1c2goIG5ldyBIQm94KCB7XHJcbiAgICAgICAgY2hpbGRyZW46IGJ1dHRvbnMuc2xpY2UoIGksIGkgKyA0ICksXHJcbiAgICAgICAgc3BhY2luZzogQlVUVE9OX1NQQUNJTkcsXHJcbiAgICAgICAgcmVzaXplOiBmYWxzZVxyXG4gICAgICB9ICkgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhcnJhbmdlIGJ1dHRvbnMgaW4gYSAyRCBncmlkXHJcbiAgICB0aGlzLmFkZENoaWxkKCBuZXcgVkJveCgge1xyXG4gICAgICBjaGlsZHJlbjogcm93cyxcclxuICAgICAgc3BhY2luZzogQlVUVE9OX1NQQUNJTkcsXHJcbiAgICAgIHJlc2l6ZTogZmFsc2VcclxuICAgIH0gKSApO1xyXG5cclxuICAgIC8vIHNvIHRoYXQgdGhlIHNlbGVjdGVkIGJ1dHRvbiBjYW5ub3QgY29udGludWUgdG8gYmUgY2xpY2tlZCwgYSBmZWF0dXJlIG9mIFJlY3Rhbmd1bGFyUmFkaW9CdXR0b25Hcm91cCAtIHRoaXMgY29tcG9uZW50IGlzXHJcbiAgICAvLyBuZXZlciBkZXN0cm95ZWQsIG5vIG5lZWQgdG8gZGlzcG9zZVxyXG4gICAgc2thdGVySW1hZ2VTZXRQcm9wZXJ0eS5saW5rKCB2YWx1ZSA9PiB7XHJcbiAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IGNvbnRlbnRBcnJheS5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICBpZiAoIGNvbnRlbnRBcnJheVsgaSBdLnZhbHVlID09PSB2YWx1ZSApIHtcclxuICAgICAgICAgIGJ1dHRvbnNbIGkgXS5waWNrYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgYnV0dG9uc1sgaSBdLmN1cnNvciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgYnV0dG9uc1sgaSBdLnBpY2thYmxlID0gdHJ1ZTtcclxuICAgICAgICAgIGJ1dHRvbnNbIGkgXS5jdXJzb3IgPSAncG9pbnRlcic7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9ICk7XHJcbiAgfVxyXG59XHJcblxyXG5lbmVyZ3lTa2F0ZVBhcmsucmVnaXN0ZXIoICdTa2F0ZXJSYWRpb0J1dHRvbkdyb3VwJywgU2thdGVyUmFkaW9CdXR0b25Hcm91cCApO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2thdGVyUmFkaW9CdXR0b25Hcm91cDtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsS0FBSyxNQUFNLG1DQUFtQztBQUNyRCxTQUFTQyxJQUFJLEVBQUVDLEtBQUssRUFBRUMsSUFBSSxFQUFFQyxJQUFJLFFBQVEsbUNBQW1DO0FBQzNFLE9BQU9DLHNCQUFzQixNQUFNLHNEQUFzRDtBQUN6RixPQUFPQyxlQUFlLE1BQU0sMEJBQTBCO0FBQ3RELE9BQU9DLHdCQUF3QixNQUFNLGdDQUFnQztBQUNyRSxPQUFPQywwQkFBMEIsTUFBTSxpQ0FBaUM7QUFDeEUsU0FBU0MsS0FBSyxRQUFRLGdDQUFnQztBQUV0RCxNQUFNQyxjQUFjLEdBQUcsQ0FBQztBQUV4QixNQUFNQyxzQkFBc0IsU0FBU1IsSUFBSSxDQUFDO0VBRXhDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7RUFDRVMsV0FBV0EsQ0FBRUMsc0JBQXNCLEVBQUVDLGtCQUFrQixFQUFFQyxNQUFNLEVBQUc7SUFDaEUsS0FBSyxDQUFDLENBQUM7SUFFUCxNQUFNQyxhQUFhLEdBQUc7TUFDcEJDLE9BQU8sRUFBRSxDQUFDO01BQ1ZDLE9BQU8sRUFBRSxDQUFDO01BQ1ZDLFlBQVksRUFBRVosd0JBQXdCLENBQUNhLDBCQUEwQjtNQUNqRUMsU0FBUyxFQUFFYiwwQkFBMEIsQ0FBQ2Msb0JBQW9CO01BQzFEQywrQkFBK0IsRUFBRTtRQUMvQkMsY0FBYyxFQUFFaEIsMEJBQTBCLENBQUNpQjtNQUM3QztJQUNGLENBQUM7SUFFRCxNQUFNQyxVQUFVLEdBQUcsR0FBRzs7SUFFdEI7SUFDQSxNQUFNQyxZQUFZLEdBQUcsQ0FDbkI7TUFDRUMsS0FBSyxFQUFFZCxrQkFBa0IsQ0FB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