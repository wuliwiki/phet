// Copyright 2016-2022, University of Colorado Boulder

/**
 * a node that is placed on the top layer of an expression to allow it to be dragged and to prevent input events from
 * getting to the constituents of the expression
 *
 * @author John Blanco
 */

import Multilink from '../../../../axon/js/Multilink.js';
import stepTimer from '../../../../axon/js/stepTimer.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { Shape } from '../../../../kite/js/imports.js';
import { DragListener, Node, Path } from '../../../../scenery/js/imports.js';
import expressionExchange from '../../expressionExchange.js';
import EESharedConstants from '../EESharedConstants.js';
import BreakApartButton from './BreakApartButton.js';
import EditExpressionButton from './EditExpressionButton.js';

// constants
const MIN_EXPRESSION_IN_BOUNDS_WIDTH = 70; // in screen coords, min horizontal amount of expression that must stay in bounds
const BUTTON_SPACING = 11; // in screen coordinates

class ExpressionOverlayNode extends Node {
  /**
   * @param {Expression} expression - model of an expression
   * @param {Bounds2} layoutBounds - bounds of the main view layout
   */
  constructor(expression, layoutBounds) {
    super({
      pickable: true,
      cursor: 'pointer'
    });
    const self = this;

    // shape and path for the overlay
    const expressionShapeNode = new Path(null, {
      fill: 'transparent'
    }); // essentially invisible
    this.addChild(expressionShapeNode);

    // update the shape if the height or width change
    const updateShapeMultilink = Multilink.multilink([expression.widthProperty, expression.heightProperty], () => {
      expressionShapeNode.shape = Shape.rect(0, 0, expression.widthProperty.get(), expression.heightProperty.get());
    });

    // update the expression's position as this node moves
    const translationLinkHandle = position => {
      this.translation = position;
    };
    expression.upperLeftCornerProperty.link(translationLinkHandle);

    // become invisible if the expression goes into edit mode so that the user can interact with the coin terms within
    function updateVisibility(inEditMode) {
      self.visible = !inEditMode;
    }
    expression.inEditModeProperty.link(updateVisibility);

    // add the parent node that will contain the pop-up buttons
    this.popUpButtonsNode = new Node({
      visible: false
    }); // @private
    this.addChild(this.popUpButtonsNode);

    // add the button used to break apart the expression
    const breakApartButton = new BreakApartButton();
    this.popUpButtonsNode.addChild(breakApartButton);

    // adjust the touch area for the break apart button so that is is easy to touch but doesn't overlap other button
    const breakApartButtonTouchArea = breakApartButton.localBounds.copy();
    breakApartButtonTouchArea.minX = breakApartButtonTouchArea.minX - breakApartButton.width;
    breakApartButtonTouchArea.maxX = breakApartButtonTouchArea.maxX + BUTTON_SPACING * 0.3;
    breakApartButtonTouchArea.minY = breakApartButtonTouchArea.minY - breakApartButton.height;
    breakApartButton.touchArea = breakApartButtonTouchArea;

    // add the button used to put the expression into edit mode
    const editExpressionButton = new EditExpressionButton({
      left: breakApartButton.right + BUTTON_SPACING
    });
    this.popUpButtonsNode.addChild(editExpressionButton);

    // adjust the touch area for the edit button so that is is easy to touch but doesn't overlap other button
    const editExpressionButtonTouchArea = editExpressionButton.localBounds.copy();
    editExpressionButtonTouchArea.minX = editExpressionButtonTouchArea.minX - BUTTON_SPACING * 0.3;
    editExpressionButtonTouchArea.maxX = editExpressionButtonTouchArea.maxX + editExpressionButton.width;
    editExpressionButtonTouchArea.minY = editExpressionButtonTouchArea.minY - editExpressionButton.height;
    editExpressionButton.touchArea = editExpressionButtonTouchArea;

    // @private {function} - timer used to hide the button
    this.hideButtonsTimerCallback = null;

    // add a listener to the pop up button node to prevent it from disappearing if the user is hovering over it
    this.popUpButtonsNode.addInputListener({
      enter: () => {
        if (!expression.userControlledProperty.get()) {
          this.clearHideButtonsTimer();
        }
      },
      exit: () => {
        if (!expression.userControlledProperty.get()) {
          this.startHideButtonsTimer();
        }
      }
    });

    // add the listener that will initiate the break apart, and will also hide the buttons
    breakApartButton.addListener(() => {
      expression.breakApart();
      this.hidePopUpButtons();
      this.clearHideButtonsTimer();
    });

    // add the listener that will put the expression into edit mode, and will also hide the buttons
    editExpressionButton.addListener(() => {
      if (!expression.userControlledProperty.get()) {
        expression.inEditModeProperty.set(true);
        this.hidePopUpButtons();
        this.clearHideButtonsTimer();
      }
    });

    // pre-allocated vectors, used for calculating allowable positions for the expression
    const unboundedUpperLeftCornerPosition = Vector2.ZERO.copy();
    const boundedUpperLeftCornerPosition = Vector2.ZERO.copy();
    const dragOffset = Vector2.ZERO.copy();

    // add the handler that will allow the expression to be dragged and will hide and show the buttons
    const dragListener = new DragListener({
      allowTouchSnag: true,
      start: event => {
        expression.userControlledProperty.set(true);
        unboundedUpperLeftCornerPosition.set(expression.upperLeftCornerProperty.value);
        boundedUpperLeftCornerPosition.set(unboundedUpperLeftCornerPosition);
        dragOffset.set(this.globalToParentPoint(event.pointer.point).minus(expression.upperLeftCornerProperty.value));
        this.clearHideButtonsTimer(); // in case it's running
        this.showPopUpButtons(this.globalToLocalPoint(event.pointer.point).x);
      },
      drag: event => {
        // figure out where the expression would go if unbounded
        unboundedUpperLeftCornerPosition.set(this.globalToParentPoint(event.pointer.point).minus(dragOffset));

        // set the expression position, but bound it so the user doesn't drag it completely out of the usable area
        expression.setPositionAndDestination(new Vector2(Utils.clamp(unboundedUpperLeftCornerPosition.x, layoutBounds.minX - expression.widthProperty.get() + MIN_EXPRESSION_IN_BOUNDS_WIDTH, layoutBounds.maxX - MIN_EXPRESSION_IN_BOUNDS_WIDTH), Utils.clamp(unboundedUpperLeftCornerPosition.y, layoutBounds.minY, layoutBounds.maxY - expression.heightProperty.get())));
      },
      end: () => {
        expression.userControlledProperty.set(false);
        assert && assert(this.hideButtonsTimerCallback === null, 'a timer for hiding the buttons was running at end of drag');
        if (breakApartButton.visible) {
          this.startHideButtonsTimer();
        }
      }
    });
    let dragHandlerAttached = false;

    // Helper function that adds the drag handler when we want this expression to be draggable and removes it when we
    // don't.  This is done instead of setting pickability because we need to prevent interaction with the coin terms
    // underneath this overlay node.
    function updateDragHandlerAttachmentState(inProgressAnimation, collected) {
      if (!dragHandlerAttached && inProgressAnimation === null && !collected) {
        expressionShapeNode.addInputListener(dragListener);
        dragHandlerAttached = true;
        self.cursor = 'pointer';
      } else if (dragHandlerAttached && (inProgressAnimation || collected)) {
        expressionShapeNode.removeInputListener(dragListener);
        dragListener.clearOverPointers(); // done so that state errors don't occur when added back, see #146
        dragHandlerAttached = false;
        self.cursor = null;
      }
    }
    const updateDragHandlerAttachmentMultilink = Multilink.multilink([expression.inProgressAnimationProperty, expression.collectedProperty], updateDragHandlerAttachmentState);

    // update popup button visibility whenever the expression is added to or removed from a collection area
    expression.collectedProperty.lazyLink(collected => {
      if (collected) {
        this.hidePopUpButtons();
      }
    });

    // create a dispose function
    this.disposeExpressionOverlayNode = () => {
      editExpressionButton.dispose();
      breakApartButton.dispose();
      expression.upperLeftCornerProperty.unlink(translationLinkHandle);
      expression.inEditModeProperty.unlink(updateVisibility);
      updateShapeMultilink.dispose();
      updateDragHandlerAttachmentMultilink.dispose();
    };
  }

  /**
   * @param {number} xPosition
   * @private
   */
  showPopUpButtons(xPosition) {
    this.popUpButtonsNode.visible = true;
    this.popUpButtonsNode.centerX = xPosition;
    this.popUpButtonsNode.bottom = -2;
  }

  /**
   * @private
   */
  hidePopUpButtons() {
    this.popUpButtonsNode.visible = false;
    this.popUpButtonsNode.translation = Vector2.ZERO;
  }

  /**
   * clear the button used to hide the timer
   * @private
   */
  clearHideButtonsTimer() {
    if (this.hideButtonsTimerCallback) {
      stepTimer.clearTimeout(this.hideButtonsTimerCallback);
      this.hideButtonsTimerCallback = null;
    }
  }

  /**
   * @private
   */
  startHideButtonsTimer() {
    this.clearHideButtonsTimer(); // just in case one is already running
    this.hideButtonsTimerCallback = stepTimer.setTimeout(() => {
      this.hidePopUpButtons();
      this.hideButtonsTimerCallback = null;
    }, EESharedConstants.POPUP_BUTTON_SHOW_TIME * 1000);
  }

  // @public
  dispose() {
    this.disposeExpressionOverlayNode();
    super.dispose();
  }
}
expressionExchange.register('ExpressionOverlayNode', ExpressionOverlayNode);
export default ExpressionOverlayNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJNdWx0aWxpbmsiLCJzdGVwVGltZXIiLCJVdGlscyIsIlZlY3RvcjIiLCJTaGFwZSIsIkRyYWdMaXN0ZW5lciIsIk5vZGUiLCJQYXRoIiwiZXhwcmVzc2lvbkV4Y2hhbmdlIiwiRUVTaGFyZWRDb25zdGFudHMiLCJCcmVha0FwYXJ0QnV0dG9uIiwiRWRpdEV4cHJlc3Npb25CdXR0b24iLCJNSU5fRVhQUkVTU0lPTl9JTl9CT1VORFNfV0lEVEgiLCJCVVRUT05fU1BBQ0lORyIsIkV4cHJlc3Npb25PdmVybGF5Tm9kZSIsImNvbnN0cnVjdG9yIiwiZXhwcmVzc2lvbiIsImxheW91dEJvdW5kcyIsInBpY2thYmxlIiwiY3Vyc29yIiwic2VsZiIsImV4cHJlc3Npb25TaGFwZU5vZGUiLCJmaWxsIiwiYWRkQ2hpbGQiLCJ1cGRhdGVTaGFwZU11bHRpbGluayIsIm11bHRpbGluayIsIndpZHRoUHJvcGVydHkiLCJoZWlnaHRQcm9wZXJ0eSIsInNoYXBlIiwicmVjdCIsImdldCIsInRyYW5zbGF0aW9uTGlua0hhbmRsZSIsInBvc2l0aW9uIiwidHJhbnNsYXRpb24iLCJ1cHBlckxlZnRDb3JuZXJQcm9wZXJ0eSIsImxpbmsiLCJ1cGRhdGVWaXNpYmlsaXR5IiwiaW5FZGl0TW9kZSIsInZpc2libGUiLCJpbkVkaXRNb2RlUHJvcGVydHkiLCJwb3BVcEJ1dHRvbnNOb2RlIiwiYnJlYWtBcGFydEJ1dHRvbiIsImJyZWFrQXBhcnRCdXR0b25Ub3VjaEFyZWEiLCJsb2NhbEJvdW5kcyIsImNvcHkiLCJtaW5YIiwid2lkdGgiLCJtYXhYIiwibWluWSIsImhlaWdodCIsInRvdWNoQXJlYSIsImVkaXRFeHByZXNzaW9uQnV0dG9uIiwibGVmdCIsInJpZ2h0IiwiZWRpdEV4cHJlc3Npb25CdXR0b25Ub3VjaEFyZWEiLCJoaWRlQnV0dG9uc1RpbWVyQ2FsbGJhY2siLCJhZGRJbnB1dExpc3RlbmVyIiwiZW50ZXIiLCJ1c2VyQ29udHJvbGxlZFByb3BlcnR5IiwiY2xlYXJIaWRlQnV0dG9uc1RpbWVyIiwiZXhpdCIsInN0YXJ0SGlkZUJ1dHRvbnNUaW1lciIsImFkZExpc3RlbmVyIiwiYnJlYWtBcGFydCIsImhpZGVQb3BVcEJ1dHRvbnMiLCJzZXQiLCJ1bmJvdW5kZWRVcHBlckxlZnRDb3JuZXJQb3NpdGlvbiIsIlpFUk8iLCJib3VuZGVkVXBwZXJMZWZ0Q29ybmVyUG9zaXRpb24iLCJkcmFnT2Zmc2V0IiwiZHJhZ0xpc3RlbmVyIiwiYWxsb3dUb3VjaFNuYWciLCJzdGFydCIsImV2ZW50IiwidmFsdWUiLCJnbG9iYWxUb1BhcmVudFBvaW50IiwicG9pbnRlciIsInBvaW50IiwibWludXMiLCJzaG93UG9wVXBCdXR0b25zIiwiZ2xvYmFsVG9Mb2NhbFBvaW50IiwieCIsImRyYWciLCJzZXRQb3NpdGlvbkFuZERlc3RpbmF0aW9uIiwiY2xhbXAiLCJ5IiwibWF4WSIsImVuZCIsImFzc2VydCIsImRyYWdIYW5kbGVyQXR0YWNoZWQiLCJ1cGRhdGVEcmFnSGFuZGxlckF0dGFjaG1lbnRTdGF0ZSIsImluUHJvZ3Jlc3NBbmltYXRpb24iLCJjb2xsZWN0ZWQiLCJyZW1vdmVJbnB1dExpc3RlbmVyIiwiY2xlYXJPdmVyUG9pbnRlcnMiLCJ1cGRhdGVEcmFnSGFuZGxlckF0dGFjaG1lbnRNdWx0aWxpbmsiLCJpblByb2dyZXNzQW5pbWF0aW9uUHJvcGVydHkiLCJjb2xsZWN0ZWRQcm9wZXJ0eSIsImxhenlMaW5rIiwiZGlzcG9zZUV4cHJlc3Npb25PdmVybGF5Tm9kZSIsImRpc3Bvc2UiLCJ1bmxpbmsiLCJ4UG9zaXRpb24iLCJjZW50ZXJYIiwiYm90dG9tIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsIlBPUFVQX0JVVFRPTl9TSE9XX1RJTUUiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkV4cHJlc3Npb25PdmVybGF5Tm9kZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNi0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBhIG5vZGUgdGhhdCBpcyBwbGFjZWQgb24gdGhlIHRvcCBsYXllciBvZiBhbiBleHByZXNzaW9uIHRvIGFsbG93IGl0IHRvIGJlIGRyYWdnZWQgYW5kIHRvIHByZXZlbnQgaW5wdXQgZXZlbnRzIGZyb21cclxuICogZ2V0dGluZyB0byB0aGUgY29uc3RpdHVlbnRzIG9mIHRoZSBleHByZXNzaW9uXHJcbiAqXHJcbiAqIEBhdXRob3IgSm9obiBCbGFuY29cclxuICovXHJcblxyXG5pbXBvcnQgTXVsdGlsaW5rIGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvTXVsdGlsaW5rLmpzJztcclxuaW1wb3J0IHN0ZXBUaW1lciBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL3N0ZXBUaW1lci5qcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvVXRpbHMuanMnO1xyXG5pbXBvcnQgVmVjdG9yMiBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvVmVjdG9yMi5qcyc7XHJcbmltcG9ydCB7IFNoYXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4va2l0ZS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IHsgRHJhZ0xpc3RlbmVyLCBOb2RlLCBQYXRoIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IGV4cHJlc3Npb25FeGNoYW5nZSBmcm9tICcuLi8uLi9leHByZXNzaW9uRXhjaGFuZ2UuanMnO1xyXG5pbXBvcnQgRUVTaGFyZWRDb25zdGFudHMgZnJvbSAnLi4vRUVTaGFyZWRDb25zdGFudHMuanMnO1xyXG5pbXBvcnQgQnJlYWtBcGFydEJ1dHRvbiBmcm9tICcuL0JyZWFrQXBhcnRCdXR0b24uanMnO1xyXG5pbXBvcnQgRWRpdEV4cHJlc3Npb25CdXR0b24gZnJvbSAnLi9FZGl0RXhwcmVzc2lvbkJ1dHRvbi5qcyc7XHJcblxyXG4vLyBjb25zdGFudHNcclxuY29uc3QgTUlOX0VYUFJFU1NJT05fSU5fQk9VTkRTX1dJRFRIID0gNzA7IC8vIGluIHNjcmVlbiBjb29yZHMsIG1pbiBob3Jpem9udGFsIGFtb3VudCBvZiBleHByZXNzaW9uIHRoYXQgbXVzdCBzdGF5IGluIGJvdW5kc1xyXG5jb25zdCBCVVRUT05fU1BBQ0lORyA9IDExOyAvLyBpbiBzY3JlZW4gY29vcmRpbmF0ZXNcclxuXHJcbmNsYXNzIEV4cHJlc3Npb25PdmVybGF5Tm9kZSBleHRlbmRzIE5vZGUge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge0V4cHJlc3Npb259IGV4cHJlc3Npb24gLSBtb2RlbCBvZiBhbiBleHByZXNzaW9uXHJcbiAgICogQHBhcmFtIHtCb3VuZHMyfSBsYXlvdXRCb3VuZHMgLSBib3VuZHMgb2YgdGhlIG1haW4gdmlldyBsYXlvdXRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggZXhwcmVzc2lvbiwgbGF5b3V0Qm91bmRzICkge1xyXG5cclxuICAgIHN1cGVyKCB7IHBpY2thYmxlOiB0cnVlLCBjdXJzb3I6ICdwb2ludGVyJyB9ICk7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAvLyBzaGFwZSBhbmQgcGF0aCBmb3IgdGhlIG92ZXJsYXlcclxuICAgIGNvbnN0IGV4cHJlc3Npb25TaGFwZU5vZGUgPSBuZXcgUGF0aCggbnVsbCwgeyBmaWxsOiAndHJhbnNwYXJlbnQnIH0gKTsgLy8gZXNzZW50aWFsbHkgaW52aXNpYmxlXHJcbiAgICB0aGlzLmFkZENoaWxkKCBleHByZXNzaW9uU2hhcGVOb2RlICk7XHJcblxyXG4gICAgLy8gdXBkYXRlIHRoZSBzaGFwZSBpZiB0aGUgaGVpZ2h0IG9yIHdpZHRoIGNoYW5nZVxyXG4gICAgY29uc3QgdXBkYXRlU2hhcGVNdWx0aWxpbmsgPSBNdWx0aWxpbmsubXVsdGlsaW5rKFxyXG4gICAgICBbIGV4cHJlc3Npb24ud2lkdGhQcm9wZXJ0eSwgZXhwcmVzc2lvbi5oZWlnaHRQcm9wZXJ0eSBdLFxyXG4gICAgICAoKSA9PiB7XHJcbiAgICAgICAgZXhwcmVzc2lvblNoYXBlTm9kZS5zaGFwZSA9IFNoYXBlLnJlY3QoIDAsIDAsIGV4cHJlc3Npb24ud2lkdGhQcm9wZXJ0eS5nZXQoKSwgZXhwcmVzc2lvbi5oZWlnaHRQcm9wZXJ0eS5nZXQoKSApO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIC8vIHVwZGF0ZSB0aGUgZXhwcmVzc2lvbidzIHBvc2l0aW9uIGFzIHRoaXMgbm9kZSBtb3Zlc1xyXG4gICAgY29uc3QgdHJhbnNsYXRpb25MaW5rSGFuZGxlID0gcG9zaXRpb24gPT4ge3RoaXMudHJhbnNsYXRpb24gPSBwb3NpdGlvbjt9O1xyXG4gICAgZXhwcmVzc2lvbi51cHBlckxlZnRDb3JuZXJQcm9wZXJ0eS5saW5rKCB0cmFuc2xhdGlvbkxpbmtIYW5kbGUgKTtcclxuXHJcbiAgICAvLyBiZWNvbWUgaW52aXNpYmxlIGlmIHRoZSBleHByZXNzaW9uIGdvZXMgaW50byBlZGl0IG1vZGUgc28gdGhhdCB0aGUgdXNlciBjYW4gaW50ZXJhY3Qgd2l0aCB0aGUgY29pbiB0ZXJtcyB3aXRoaW5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVZpc2liaWxpdHkoIGluRWRpdE1vZGUgKSB7XHJcbiAgICAgIHNlbGYudmlzaWJsZSA9ICFpbkVkaXRNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cHJlc3Npb24uaW5FZGl0TW9kZVByb3BlcnR5LmxpbmsoIHVwZGF0ZVZpc2liaWxpdHkgKTtcclxuXHJcbiAgICAvLyBhZGQgdGhlIHBhcmVudCBub2RlIHRoYXQgd2lsbCBjb250YWluIHRoZSBwb3AtdXAgYnV0dG9uc1xyXG4gICAgdGhpcy5wb3BVcEJ1dHRvbnNOb2RlID0gbmV3IE5vZGUoIHsgdmlzaWJsZTogZmFsc2UgfSApOyAvLyBAcHJpdmF0ZVxyXG4gICAgdGhpcy5hZGRDaGlsZCggdGhpcy5wb3BVcEJ1dHRvbnNOb2RlICk7XHJcblxyXG4gICAgLy8gYWRkIHRoZSBidXR0b24gdXNlZCB0byBicmVhayBhcGFydCB0aGUgZXhwcmVzc2lvblxyXG4gICAgY29uc3QgYnJlYWtBcGFydEJ1dHRvbiA9IG5ldyBCcmVha0FwYXJ0QnV0dG9uKCk7XHJcbiAgICB0aGlzLnBvcFVwQnV0dG9uc05vZGUuYWRkQ2hpbGQoIGJyZWFrQXBhcnRCdXR0b24gKTtcclxuXHJcbiAgICAvLyBhZGp1c3QgdGhlIHRvdWNoIGFyZWEgZm9yIHRoZSBicmVhayBhcGFydCBidXR0b24gc28gdGhhdCBpcyBpcyBlYXN5IHRvIHRvdWNoIGJ1dCBkb2Vzbid0IG92ZXJsYXAgb3RoZXIgYnV0dG9uXHJcbiAgICBjb25zdCBicmVha0FwYXJ0QnV0dG9uVG91Y2hBcmVhID0gYnJlYWtBcGFydEJ1dHRvbi5sb2NhbEJvdW5kcy5jb3B5KCk7XHJcbiAgICBicmVha0FwYXJ0QnV0dG9uVG91Y2hBcmVhLm1pblggPSBicmVha0FwYXJ0QnV0dG9uVG91Y2hBcmVhLm1pblggLSBicmVha0FwYXJ0QnV0dG9uLndpZHRoO1xyXG4gICAgYnJlYWtBcGFydEJ1dHRvblRvdWNoQXJlYS5tYXhYID0gYnJlYWtBcGFydEJ1dHRvblRvdWNoQXJlYS5tYXhYICsgQlVUVE9OX1NQQUNJTkcgKiAwLjM7XHJcbiAgICBicmVha0FwYXJ0QnV0dG9uVG91Y2hBcmVhLm1pblkgPSBicmVha0FwYXJ0QnV0dG9uVG91Y2hBcmVhLm1pblkgLSBicmVha0FwYXJ0QnV0dG9uLmhlaWdodDtcclxuICAgIGJyZWFrQXBhcnRCdXR0b24udG91Y2hBcmVhID0gYnJlYWtBcGFydEJ1dHRvblRvdWNoQXJlYTtcclxuXHJcbiAgICAvLyBhZGQgdGhlIGJ1dHRvbiB1c2VkIHRvIHB1dCB0aGUgZXhwcmVzc2lvbiBpbnRvIGVkaXQgbW9kZVxyXG4gICAgY29uc3QgZWRpdEV4cHJlc3Npb25CdXR0b24gPSBuZXcgRWRpdEV4cHJlc3Npb25CdXR0b24oIHsgbGVmdDogYnJlYWtBcGFydEJ1dHRvbi5yaWdodCArIEJVVFRPTl9TUEFDSU5HIH0gKTtcclxuICAgIHRoaXMucG9wVXBCdXR0b25zTm9kZS5hZGRDaGlsZCggZWRpdEV4cHJlc3Npb25CdXR0b24gKTtcclxuXHJcbiAgICAvLyBhZGp1c3QgdGhlIHRvdWNoIGFyZWEgZm9yIHRoZSBlZGl0IGJ1dHRvbiBzbyB0aGF0IGlzIGlzIGVhc3kgdG8gdG91Y2ggYnV0IGRvZXNuJ3Qgb3ZlcmxhcCBvdGhlciBidXR0b25cclxuICAgIGNvbnN0IGVkaXRFeHByZXNzaW9uQnV0dG9uVG91Y2hBcmVhID0gZWRpdEV4cHJlc3Npb25CdXR0b24ubG9jYWxCb3VuZHMuY29weSgpO1xyXG4gICAgZWRpdEV4cHJlc3Npb25CdXR0b25Ub3VjaEFyZWEubWluWCA9IGVkaXRFeHByZXNzaW9uQnV0dG9uVG91Y2hBcmVhLm1pblggLSBCVVRUT05fU1BBQ0lORyAqIDAuMztcclxuICAgIGVkaXRFeHByZXNzaW9uQnV0dG9uVG91Y2hBcmVhLm1heFggPSBlZGl0RXhwcmVzc2lvbkJ1dHRvblRvdWNoQXJlYS5tYXhYICsgZWRpdEV4cHJlc3Npb25CdXR0b24ud2lkdGg7XHJcbiAgICBlZGl0RXhwcmVzc2lvbkJ1dHRvblRvdWNoQXJlYS5taW5ZID0gZWRpdEV4cHJlc3Npb25CdXR0b25Ub3VjaEFyZWEubWluWSAtIGVkaXRFeHByZXNzaW9uQnV0dG9uLmhlaWdodDtcclxuICAgIGVkaXRFeHByZXNzaW9uQnV0dG9uLnRvdWNoQXJlYSA9IGVkaXRFeHByZXNzaW9uQnV0dG9uVG91Y2hBcmVhO1xyXG5cclxuICAgIC8vIEBwcml2YXRlIHtmdW5jdGlvbn0gLSB0aW1lciB1c2VkIHRvIGhpZGUgdGhlIGJ1dHRvblxyXG4gICAgdGhpcy5oaWRlQnV0dG9uc1RpbWVyQ2FsbGJhY2sgPSBudWxsO1xyXG5cclxuICAgIC8vIGFkZCBhIGxpc3RlbmVyIHRvIHRoZSBwb3AgdXAgYnV0dG9uIG5vZGUgdG8gcHJldmVudCBpdCBmcm9tIGRpc2FwcGVhcmluZyBpZiB0aGUgdXNlciBpcyBob3ZlcmluZyBvdmVyIGl0XHJcbiAgICB0aGlzLnBvcFVwQnV0dG9uc05vZGUuYWRkSW5wdXRMaXN0ZW5lcigge1xyXG4gICAgICBlbnRlcjogKCkgPT4ge1xyXG4gICAgICAgIGlmICggIWV4cHJlc3Npb24udXNlckNvbnRyb2xsZWRQcm9wZXJ0eS5nZXQoKSApIHtcclxuICAgICAgICAgIHRoaXMuY2xlYXJIaWRlQnV0dG9uc1RpbWVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBleGl0OiAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCAhZXhwcmVzc2lvbi51c2VyQ29udHJvbGxlZFByb3BlcnR5LmdldCgpICkge1xyXG4gICAgICAgICAgdGhpcy5zdGFydEhpZGVCdXR0b25zVGltZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBhZGQgdGhlIGxpc3RlbmVyIHRoYXQgd2lsbCBpbml0aWF0ZSB0aGUgYnJlYWsgYXBhcnQsIGFuZCB3aWxsIGFsc28gaGlkZSB0aGUgYnV0dG9uc1xyXG4gICAgYnJlYWtBcGFydEJ1dHRvbi5hZGRMaXN0ZW5lciggKCkgPT4ge1xyXG4gICAgICBleHByZXNzaW9uLmJyZWFrQXBhcnQoKTtcclxuICAgICAgdGhpcy5oaWRlUG9wVXBCdXR0b25zKCk7XHJcbiAgICAgIHRoaXMuY2xlYXJIaWRlQnV0dG9uc1RpbWVyKCk7XHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gYWRkIHRoZSBsaXN0ZW5lciB0aGF0IHdpbGwgcHV0IHRoZSBleHByZXNzaW9uIGludG8gZWRpdCBtb2RlLCBhbmQgd2lsbCBhbHNvIGhpZGUgdGhlIGJ1dHRvbnNcclxuICAgIGVkaXRFeHByZXNzaW9uQnV0dG9uLmFkZExpc3RlbmVyKCAoKSA9PiB7XHJcblxyXG4gICAgICBpZiAoICFleHByZXNzaW9uLnVzZXJDb250cm9sbGVkUHJvcGVydHkuZ2V0KCkgKSB7XHJcbiAgICAgICAgZXhwcmVzc2lvbi5pbkVkaXRNb2RlUHJvcGVydHkuc2V0KCB0cnVlICk7XHJcbiAgICAgICAgdGhpcy5oaWRlUG9wVXBCdXR0b25zKCk7XHJcbiAgICAgICAgdGhpcy5jbGVhckhpZGVCdXR0b25zVGltZXIoKTtcclxuICAgICAgfVxyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIHByZS1hbGxvY2F0ZWQgdmVjdG9ycywgdXNlZCBmb3IgY2FsY3VsYXRpbmcgYWxsb3dhYmxlIHBvc2l0aW9ucyBmb3IgdGhlIGV4cHJlc3Npb25cclxuICAgIGNvbnN0IHVuYm91bmRlZFVwcGVyTGVmdENvcm5lclBvc2l0aW9uID0gVmVjdG9yMi5aRVJPLmNvcHkoKTtcclxuICAgIGNvbnN0IGJvdW5kZWRVcHBlckxlZnRDb3JuZXJQb3NpdGlvbiA9IFZlY3RvcjIuWkVSTy5jb3B5KCk7XHJcbiAgICBjb25zdCBkcmFnT2Zmc2V0ID0gVmVjdG9yMi5aRVJPLmNvcHkoKTtcclxuXHJcbiAgICAvLyBhZGQgdGhlIGhhbmRsZXIgdGhhdCB3aWxsIGFsbG93IHRoZSBleHByZXNzaW9uIHRvIGJlIGRyYWdnZWQgYW5kIHdpbGwgaGlkZSBhbmQgc2hvdyB0aGUgYnV0dG9uc1xyXG4gICAgY29uc3QgZHJhZ0xpc3RlbmVyID0gbmV3IERyYWdMaXN0ZW5lcigge1xyXG5cclxuICAgICAgYWxsb3dUb3VjaFNuYWc6IHRydWUsXHJcblxyXG4gICAgICBzdGFydDogZXZlbnQgPT4ge1xyXG4gICAgICAgIGV4cHJlc3Npb24udXNlckNvbnRyb2xsZWRQcm9wZXJ0eS5zZXQoIHRydWUgKTtcclxuICAgICAgICB1bmJvdW5kZWRVcHBlckxlZnRDb3JuZXJQb3NpdGlvbi5zZXQoIGV4cHJlc3Npb24udXBwZXJMZWZ0Q29ybmVyUHJvcGVydHkudmFsdWUgKTtcclxuICAgICAgICBib3VuZGVkVXBwZXJMZWZ0Q29ybmVyUG9zaXRpb24uc2V0KCB1bmJvdW5kZWRVcHBlckxlZnRDb3JuZXJQb3NpdGlvbiApO1xyXG4gICAgICAgIGRyYWdPZmZzZXQuc2V0KCB0aGlzLmdsb2JhbFRvUGFyZW50UG9pbnQoIGV2ZW50LnBvaW50ZXIucG9pbnQgKS5taW51cyggZXhwcmVzc2lvbi51cHBlckxlZnRDb3JuZXJQcm9wZXJ0eS52YWx1ZSApICk7XHJcbiAgICAgICAgdGhpcy5jbGVhckhpZGVCdXR0b25zVGltZXIoKTsgLy8gaW4gY2FzZSBpdCdzIHJ1bm5pbmdcclxuICAgICAgICB0aGlzLnNob3dQb3BVcEJ1dHRvbnMoIHRoaXMuZ2xvYmFsVG9Mb2NhbFBvaW50KCBldmVudC5wb2ludGVyLnBvaW50ICkueCApO1xyXG4gICAgICB9LFxyXG5cclxuICAgICAgZHJhZzogZXZlbnQgPT4ge1xyXG5cclxuICAgICAgICAvLyBmaWd1cmUgb3V0IHdoZXJlIHRoZSBleHByZXNzaW9uIHdvdWxkIGdvIGlmIHVuYm91bmRlZFxyXG4gICAgICAgIHVuYm91bmRlZFVwcGVyTGVmdENvcm5lclBvc2l0aW9uLnNldCggdGhpcy5nbG9iYWxUb1BhcmVudFBvaW50KCBldmVudC5wb2ludGVyLnBvaW50ICkubWludXMoIGRyYWdPZmZzZXQgKSApO1xyXG5cclxuICAgICAgICAvLyBzZXQgdGhlIGV4cHJlc3Npb24gcG9zaXRpb24sIGJ1dCBib3VuZCBpdCBzbyB0aGUgdXNlciBkb2Vzbid0IGRyYWcgaXQgY29tcGxldGVseSBvdXQgb2YgdGhlIHVzYWJsZSBhcmVhXHJcbiAgICAgICAgZXhwcmVzc2lvbi5zZXRQb3NpdGlvbkFuZERlc3RpbmF0aW9uKCBuZXcgVmVjdG9yMihcclxuICAgICAgICAgIFV0aWxzLmNsYW1wKFxyXG4gICAgICAgICAgICB1bmJvdW5kZWRVcHBlckxlZnRDb3JuZXJQb3NpdGlvbi54LFxyXG4gICAgICAgICAgICBsYXlvdXRCb3VuZHMubWluWCAtIGV4cHJlc3Npb24ud2lkdGhQcm9wZXJ0eS5nZXQoKSArIE1JTl9FWFBSRVNTSU9OX0lOX0JPVU5EU19XSURUSCxcclxuICAgICAgICAgICAgbGF5b3V0Qm91bmRzLm1heFggLSBNSU5fRVhQUkVTU0lPTl9JTl9CT1VORFNfV0lEVEhcclxuICAgICAgICAgICksXHJcbiAgICAgICAgICBVdGlscy5jbGFtcChcclxuICAgICAgICAgICAgdW5ib3VuZGVkVXBwZXJMZWZ0Q29ybmVyUG9zaXRpb24ueSxcclxuICAgICAgICAgICAgbGF5b3V0Qm91bmRzLm1pblksXHJcbiAgICAgICAgICAgIGxheW91dEJvdW5kcy5tYXhZIC0gZXhwcmVzc2lvbi5oZWlnaHRQcm9wZXJ0eS5nZXQoKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICkgKTtcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGVuZDogKCkgPT4ge1xyXG4gICAgICAgIGV4cHJlc3Npb24udXNlckNvbnRyb2xsZWRQcm9wZXJ0eS5zZXQoIGZhbHNlICk7XHJcbiAgICAgICAgYXNzZXJ0ICYmIGFzc2VydCggdGhpcy5oaWRlQnV0dG9uc1RpbWVyQ2FsbGJhY2sgPT09IG51bGwsICdhIHRpbWVyIGZvciBoaWRpbmcgdGhlIGJ1dHRvbnMgd2FzIHJ1bm5pbmcgYXQgZW5kIG9mIGRyYWcnICk7XHJcbiAgICAgICAgaWYgKCBicmVha0FwYXJ0QnV0dG9uLnZpc2libGUgKSB7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0SGlkZUJ1dHRvbnNUaW1lcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSApO1xyXG4gICAgbGV0IGRyYWdIYW5kbGVyQXR0YWNoZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBIZWxwZXIgZnVuY3Rpb24gdGhhdCBhZGRzIHRoZSBkcmFnIGhhbmRsZXIgd2hlbiB3ZSB3YW50IHRoaXMgZXhwcmVzc2lvbiB0byBiZSBkcmFnZ2FibGUgYW5kIHJlbW92ZXMgaXQgd2hlbiB3ZVxyXG4gICAgLy8gZG9uJ3QuICBUaGlzIGlzIGRvbmUgaW5zdGVhZCBvZiBzZXR0aW5nIHBpY2thYmlsaXR5IGJlY2F1c2Ugd2UgbmVlZCB0byBwcmV2ZW50IGludGVyYWN0aW9uIHdpdGggdGhlIGNvaW4gdGVybXNcclxuICAgIC8vIHVuZGVybmVhdGggdGhpcyBvdmVybGF5IG5vZGUuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVEcmFnSGFuZGxlckF0dGFjaG1lbnRTdGF0ZSggaW5Qcm9ncmVzc0FuaW1hdGlvbiwgY29sbGVjdGVkICkge1xyXG4gICAgICBpZiAoICFkcmFnSGFuZGxlckF0dGFjaGVkICYmIGluUHJvZ3Jlc3NBbmltYXRpb24gPT09IG51bGwgJiYgIWNvbGxlY3RlZCApIHtcclxuICAgICAgICBleHByZXNzaW9uU2hhcGVOb2RlLmFkZElucHV0TGlzdGVuZXIoIGRyYWdMaXN0ZW5lciApO1xyXG4gICAgICAgIGRyYWdIYW5kbGVyQXR0YWNoZWQgPSB0cnVlO1xyXG4gICAgICAgIHNlbGYuY3Vyc29yID0gJ3BvaW50ZXInO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKCBkcmFnSGFuZGxlckF0dGFjaGVkICYmICggaW5Qcm9ncmVzc0FuaW1hdGlvbiB8fCBjb2xsZWN0ZWQgKSApIHtcclxuICAgICAgICBleHByZXNzaW9uU2hhcGVOb2RlLnJlbW92ZUlucHV0TGlzdGVuZXIoIGRyYWdMaXN0ZW5lciApO1xyXG4gICAgICAgIGRyYWdMaXN0ZW5lci5jbGVhck92ZXJQb2ludGVycygpOyAvLyBkb25lIHNvIHRoYXQgc3RhdGUgZXJyb3JzIGRvbid0IG9jY3VyIHdoZW4gYWRkZWQgYmFjaywgc2VlICMxNDZcclxuICAgICAgICBkcmFnSGFuZGxlckF0dGFjaGVkID0gZmFsc2U7XHJcbiAgICAgICAgc2VsZi5jdXJzb3IgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXBkYXRlRHJhZ0hhbmRsZXJBdHRhY2htZW50TXVsdGlsaW5rID0gTXVsdGlsaW5rLm11bHRpbGluayhcclxuICAgICAgWyBleHByZXNzaW9uLmluUHJvZ3Jlc3NBbmltYXRpb25Qcm9wZXJ0eSwgZXhwcmVzc2lvbi5jb2xsZWN0ZWRQcm9wZXJ0eSBdLFxyXG4gICAgICB1cGRhdGVEcmFnSGFuZGxlckF0dGFjaG1lbnRTdGF0ZVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyB1cGRhdGUgcG9wdXAgYnV0dG9uIHZpc2liaWxpdHkgd2hlbmV2ZXIgdGhlIGV4cHJlc3Npb24gaXMgYWRkZWQgdG8gb3IgcmVtb3ZlZCBmcm9tIGEgY29sbGVjdGlvbiBhcmVhXHJcbiAgICBleHByZXNzaW9uLmNvbGxlY3RlZFByb3BlcnR5LmxhenlMaW5rKCBjb2xsZWN0ZWQgPT4ge1xyXG4gICAgICBpZiAoIGNvbGxlY3RlZCApIHtcclxuICAgICAgICB0aGlzLmhpZGVQb3BVcEJ1dHRvbnMoKTtcclxuICAgICAgfVxyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBhIGRpc3Bvc2UgZnVuY3Rpb25cclxuICAgIHRoaXMuZGlzcG9zZUV4cHJlc3Npb25PdmVybGF5Tm9kZSA9ICgpID0+IHtcclxuICAgICAgZWRpdEV4cHJlc3Npb25CdXR0b24uZGlzcG9zZSgpO1xyXG4gICAgICBicmVha0FwYXJ0QnV0dG9uLmRpc3Bvc2UoKTtcclxuICAgICAgZXhwcmVzc2lvbi51cHBlckxlZnRDb3JuZXJQcm9wZXJ0eS51bmxpbmsoIHRyYW5zbGF0aW9uTGlua0hhbmRsZSApO1xyXG4gICAgICBleHByZXNzaW9uLmluRWRpdE1vZGVQcm9wZXJ0eS51bmxpbmsoIHVwZGF0ZVZpc2liaWxpdHkgKTtcclxuICAgICAgdXBkYXRlU2hhcGVNdWx0aWxpbmsuZGlzcG9zZSgpO1xyXG4gICAgICB1cGRhdGVEcmFnSGFuZGxlckF0dGFjaG1lbnRNdWx0aWxpbmsuZGlzcG9zZSgpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4UG9zaXRpb25cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHNob3dQb3BVcEJ1dHRvbnMoIHhQb3NpdGlvbiApIHtcclxuICAgIHRoaXMucG9wVXBCdXR0b25zTm9kZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgIHRoaXMucG9wVXBCdXR0b25zTm9kZS5jZW50ZXJYID0geFBvc2l0aW9uO1xyXG4gICAgdGhpcy5wb3BVcEJ1dHRvbnNOb2RlLmJvdHRvbSA9IC0yO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBoaWRlUG9wVXBCdXR0b25zKCkge1xyXG4gICAgdGhpcy5wb3BVcEJ1dHRvbnNOb2RlLnZpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMucG9wVXBCdXR0b25zTm9kZS50cmFuc2xhdGlvbiA9IFZlY3RvcjIuWkVSTztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNsZWFyIHRoZSBidXR0b24gdXNlZCB0byBoaWRlIHRoZSB0aW1lclxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgY2xlYXJIaWRlQnV0dG9uc1RpbWVyKCkge1xyXG4gICAgaWYgKCB0aGlzLmhpZGVCdXR0b25zVGltZXJDYWxsYmFjayApIHtcclxuICAgICAgc3RlcFRpbWVyLmNsZWFyVGltZW91dCggdGhpcy5oaWRlQnV0dG9uc1RpbWVyQ2FsbGJhY2sgKTtcclxuICAgICAgdGhpcy5oaWRlQnV0dG9uc1RpbWVyQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBzdGFydEhpZGVCdXR0b25zVGltZXIoKSB7XHJcbiAgICB0aGlzLmNsZWFySGlkZUJ1dHRvbnNUaW1lcigpOyAvLyBqdXN0IGluIGNhc2Ugb25lIGlzIGFscmVhZHkgcnVubmluZ1xyXG4gICAgdGhpcy5oaWRlQnV0dG9uc1RpbWVyQ2FsbGJhY2sgPSBzdGVwVGltZXIuc2V0VGltZW91dCggKCkgPT4ge1xyXG4gICAgICB0aGlzLmhpZGVQb3BVcEJ1dHRvbnMoKTtcclxuICAgICAgdGhpcy5oaWRlQnV0dG9uc1RpbWVyQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgfSwgRUVTaGFyZWRDb25zdGFudHMuUE9QVVBfQlVUVE9OX1NIT1dfVElNRSAqIDEwMDAgKTtcclxuICB9XHJcblxyXG4gIC8vIEBwdWJsaWNcclxuICBkaXNwb3NlKCkge1xyXG4gICAgdGhpcy5kaXNwb3NlRXhwcmVzc2lvbk92ZXJsYXlOb2RlKCk7XHJcbiAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHByZXNzaW9uRXhjaGFuZ2UucmVnaXN0ZXIoICdFeHByZXNzaW9uT3ZlcmxheU5vZGUnLCBFeHByZXNzaW9uT3ZlcmxheU5vZGUgKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cHJlc3Npb25PdmVybGF5Tm9kZTtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsU0FBUyxNQUFNLGtDQUFrQztBQUN4RCxPQUFPQyxTQUFTLE1BQU0sa0NBQWtDO0FBQ3hELE9BQU9DLEtBQUssTUFBTSw2QkFBNkI7QUFDL0MsT0FBT0MsT0FBTyxNQUFNLCtCQUErQjtBQUNuRCxTQUFTQyxLQUFLLFFBQVEsZ0NBQWdDO0FBQ3RELFNBQVNDLFlBQVksRUFBRUMsSUFBSSxFQUFFQyxJQUFJLFFBQVEsbUNBQW1DO0FBQzVFLE9BQU9DLGtCQUFrQixNQUFNLDZCQUE2QjtBQUM1RCxPQUFPQyxpQkFBaUIsTUFBTSx5QkFBeUI7QUFDdkQsT0FBT0MsZ0JBQWdCLE1BQU0sdUJBQXVCO0FBQ3BELE9BQU9DLG9CQUFvQixNQUFNLDJCQUEyQjs7QUFFNUQ7QUFDQSxNQUFNQyw4QkFBOEIsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUMzQyxNQUFNQyxjQUFjLEdBQUcsRUFBRSxDQUFDLENBQUM7O0FBRTNCLE1BQU1DLHFCQUFxQixTQUFTUixJQUFJLENBQUM7RUFFdkM7QUFDRjtBQUNBO0FBQ0E7RUFDRVMsV0FBV0EsQ0FBRUMsVUFBVSxFQUFFQyxZQUFZLEVBQUc7SUFFdEMsS0FBSyxDQUFFO01BQUVDLFFBQVEsRUFBRSxJQUFJO01BQUVDLE1BQU0sRUFBRTtJQUFVLENBQUUsQ0FBQztJQUM5QyxNQUFNQyxJQUFJLEdBQUcsSUFBSTs7SUFFakI7SUFDQSxNQUFNQyxtQkFBbUIsR0FBRyxJQUFJZCxJQUFJLENBQUUsSUFBSSxFQUFFO01BQUVlLElBQUksRUFBRTtJQUFjLENBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkUsSUFBSSxDQUFDQyxRQUFRLENBQUVGLG1CQUFvQixD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