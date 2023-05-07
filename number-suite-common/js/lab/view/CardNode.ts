// Copyright 2022-2023, University of Colorado Boulder

/**
 * A card with content that can be dragged.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import Animation from '../../../../twixt/js/Animation.js';
import TProperty from '../../../../axon/js/TProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import CountingCommonConstants from '../../../../counting-common/js/common/CountingCommonConstants.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { Color, DragListener, Node, PressListenerEvent, Rectangle } from '../../../../scenery/js/imports.js';
import numberSuiteCommon from '../../numberSuiteCommon.js';

// constants
const WIDTH = 50;
const CORNER_RADIUS = 10;

type SelfOptions = {
  height: number;
  width: number;
  dragBoundsProperty: TReadOnlyProperty<Bounds2>;
  includeDragListener?: boolean;
  dropListener?: () => void;
};
export type CardNodeOptions = SelfOptions;

class CardNode extends Node {
  public readonly dragListener: DragListener | null;
  public readonly positionProperty: TProperty<Vector2>;
  public animation: Animation | null;

  // The position of this CardNode's creator icon in screen coords, where we should animate back to when returned.
  public static readonly WIDTH = WIDTH;

  public constructor( content: Node, providedOptions: CardNodeOptions ) {
    super();

    const options = optionize<CardNodeOptions, SelfOptions>()( {
      includeDragListener: true,
      dropListener: _.noop
    }, providedOptions );

    this.positionProperty = new Vector2Property( Vector2.ZERO );
    this.animation = null;

    const halfWidth = options.width / 2;
    const halfHeight = options.height / 2;
    const backgroundShape = new Rectangle( {
      rectBounds: new Bounds2( -halfWidth, -halfHeight, halfWidth, halfHeight ),
      cornerRadius: CORNER_RADIUS,
      stroke: Color.BLACK,
      fill: Color.WHITE,
      lineWidth: 1
    } );
    this.addChild( backgroundShape );

    content.center = backgroundShape.center;
    backgroundShape.addChild( content );

    this.cursor = 'pointer';

    if ( options.includeDragListener ) {
      this.dragListener = new DragListener( {
        targetNode: this,
        start: ( event: PressListenerEvent, listener: DragListener ) => {
          this.moveToFront();
          this.setConstrainedDestination( options.dragBoundsProperty.value, listener.parentPoint );
        },
        drag: ( event: PressListenerEvent, listener: DragListener ) => {
          this.setConstrainedDestination( options.dragBoundsProperty.value, listener.parentPoint );
        },
        end: () => {
          options.dropListener();
        }
      } );
      this.addInputListener( this.dragListener );
    }
    else {
      this.dragListener = null;
    }

    this.positionProperty.link( position => {
      this.translation = position;
    } );
  }

  /**
   * Determine how this symbol's origin can be placed in the provided bounds.
   */
  public getOriginBounds( viewBounds: Bounds2 ): Bounds2 {
    return new Bounds2(
      viewBounds.left - this.localBounds.left,
      viewBounds.top - this.localBounds.top,
      viewBounds.right - this.localBounds.right,
      viewBounds.bottom - this.localBounds.bottom
    ).eroded( CountingCommonConstants.COUNTING_AREA_MARGIN );
  }

  /**
   * If this symbol's outside the available view bounds, move in inside those bounds.
   */
  public setConstrainedDestination( viewBounds: Bounds2, newDestination: Vector2 ): void {
    const originBounds = this.getOriginBounds( viewBounds );
    this.positionProperty.value = originBounds.closestPointTo( newDestination );
  }

  public override dispose(): void {
    super.dispose();
    this.animation && this.animation.stop();
    this.animation = null;
  }
}

numberSuiteCommon.register( 'CardNode', CardNode );
export default CardNode;