// Copyright 2014-2021, University of Colorado Boulder

/**
 * Model for the 'Intro' screen
 *
 * @author Martin Veillette (Berea College)
 */

import PlinkoProbabilityCommonModel from '../../common/model/PlinkoProbabilityCommonModel.js';
import PlinkoProbabilityConstants from '../../common/PlinkoProbabilityConstants.js';
import PlinkoProbabilityQueryParameters from '../../common/PlinkoProbabilityQueryParameters.js';
import plinkoProbability from '../../plinkoProbability.js';
import IntroBall from './IntroBall.js';

// constants
const MAX_BALLS = PlinkoProbabilityQueryParameters.maxBallsIntro;
const PERSPECTIVE_TILT = Math.PI / 1.4; // in radians

class IntroModel extends PlinkoProbabilityCommonModel {
  /**
   */
  constructor() {
    super();

    const bounds = PlinkoProbabilityConstants.HISTOGRAM_BOUNDS;
    // the width of one bin is the total width divided by the number of columns
    const binWidth = bounds.width / ( this.numberOfRowsProperty.get() + 1 );
    const cylinderWidth = 0.95 * binWidth; // there is a small gap between each cylinder
    const ellipseHeight = cylinderWidth * Math.sin( PERSPECTIVE_TILT ); // the height is the width times some perspective tilt

    this.cylinderInfo = { // @public (read-only)
      cylinderWidth: cylinderWidth,
      cylinderHeight: bounds.height * 0.87, // we want the cylinders to be shorter than the histogram
      ellipseHeight: ellipseHeight, // the height of the ellipse
      verticalOffset: 0.035, // gap between pegboard and cylinders
      top: bounds.maxY // the top of the cylinders
    };

    // @private
    this.launchedBallsNumber = 0; // number of balls created
    this.ballsToCreateNumber = 0; // number of balls in the creation queue

    // Stop dispensing balls when the ball mode is changed.
    this.ballModeProperty.lazyLink( ballMode => {
      if ( this.ballsToCreateNumber > 0 ) {
        this.ballsToCreateNumber = 0;
        this.isBallCapReachedProperty.set( this.launchedBallsNumber >= MAX_BALLS );
      }
    } );
  }


  /**
   * Time step function that is responsible for updating the position and status of the balls.
   *
   * @param {number} dt - time interval
   * @public
   */
  step( dt ) {

    // Keep track of the time elapsed since the last ball was created
    this.ballCreationTimeElapsed += dt;

    // we only want to create a ball if:
    // there are balls waiting in line &&
    // the minimum time interval has passed 150 milliseconds &&
    // the number of launched balls is less than the maximum number of balls
    if ( this.ballsToCreateNumber > 0 && this.ballCreationTimeElapsed > 0.150 && this.launchedBallsNumber < MAX_BALLS ) {
      this.addNewBall(); // add a new ball
    }

    // Move balls
    let ballsMoved = false;
    const dtCapped = Math.min( 0.1, dt * 5 ); // Cap the dt so that the balls don't make a big jump
    this.balls.forEach( ball => {
      const ballMoved = ball.step( dtCapped );
      ballsMoved = ( ballMoved || ballsMoved );
    } );

    // Notify if balls moved
    if ( ballsMoved ) {
      this.ballsMovedEmitter.emit();
    }
  }

  /**
   * @override
   * @public
   */
  erase() {
    super.erase();
    this.ballsToCreateNumber = 0;
    this.launchedBallsNumber = 0;
  }

  /**
   * This function updates the number of balls to be launched which depends on the status of ballMode.
   * The cap of of the maximum number of balls to be launches is enforced by the step() function.
   *
   * @private
   */
  updateBallsToCreateNumber() {
    switch( this.ballModeProperty.get() ) {

      // add one ball to the queue
      case 'oneBall':
        this.ballsToCreateNumber++;
        break;

      // add ten ball to the queue
      case 'tenBalls':
        this.ballsToCreateNumber += 10;
        break;

      // add max number of balls to the queue
      case 'maxBalls':
        this.ballsToCreateNumber += MAX_BALLS;
        break;

      default:
        throw new Error( `invalid ballMode: ${this.ballModeProperty.get()}` );
    }
  }

  /**
   * Add a new Ball to the model
   *
   * @private
   */
  addNewBall() {

    // create a new ball
    const addedBall = new IntroBall( this.probabilityProperty.get(), this.numberOfRowsProperty.get(),
      this.histogram.bins, this.cylinderInfo );

    this.launchedBallsNumber++; // increment the number of launched balls
    this.ballsToCreateNumber--; // decrease the number of balls in the queue

    this.ballCreationTimeElapsed = 0; //reset the time elapsed since the launched of the last ball

    // Disable the playButton when all the balls have been queued
    if ( this.launchedBallsNumber + this.ballsToCreateNumber >= MAX_BALLS ) {
      this.isBallCapReachedProperty.set( true );
    }

    this.histogram.updateBinCountAndOrientation( addedBall );
    this.balls.push( addedBall );

    // ballOutOfPegsEmitter is emitted when the addedBall leaves the last peg on the Galton board.
    const ballOutOfPegsListener = () => {
      this.histogram.addBallToHistogram( addedBall );
      addedBall.ballOutOfPegsEmitter.removeListener( ballOutOfPegsListener );
    };
    addedBall.ballOutOfPegsEmitter.addListener( ballOutOfPegsListener );
  }
}

plinkoProbability.register( 'IntroModel', IntroModel );

export default IntroModel;