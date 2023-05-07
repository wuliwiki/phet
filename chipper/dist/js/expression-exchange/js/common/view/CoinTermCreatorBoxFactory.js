// Copyright 2017-2023, University of Colorado Boulder

/**
 * A static factory object that provide methods for creating the 'boxes', which are either a panel or a carousel, that
 * contain coin term creator nodes.
 *
 * This was centralized into a factory object because the simulation requires a rather large number of different
 * creator node sets, 43 at the time of this writing.
 *
 * @author John Blanco
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import merge from '../../../../phet-core/js/merge.js';
import expressionExchange from '../../expressionExchange.js';
import EESharedConstants from '../EESharedConstants.js';
import CoinTermCreatorSetID from '../enum/CoinTermCreatorSetID.js';
import CoinTermTypeID from '../enum/CoinTermTypeID.js';
import CoinTermCreatorBox from './CoinTermCreatorBox.js';
import CoinTermCreatorNode from './CoinTermCreatorNode.js';

// constants
const CREATION_LIMIT_FOR_EXPLORE_SCREENS = 8;

// descriptors for the coin term creator sets used in the explore screens
const EXPLORE_SCREEN_COIN_TERM_CREATOR_SET_DESCRIPTORS = {};
EXPLORE_SCREEN_COIN_TERM_CREATOR_SET_DESCRIPTORS[CoinTermCreatorSetID.BASICS] = [{
  typeID: CoinTermTypeID.X,
  initialCount: 1
}, {
  typeID: CoinTermTypeID.Y,
  initialCount: 1
}, {
  typeID: CoinTermTypeID.Z,
  initialCount: 1
}];
EXPLORE_SCREEN_COIN_TERM_CREATOR_SET_DESCRIPTORS[CoinTermCreatorSetID.EXPLORE] = [{
  typeID: CoinTermTypeID.X,
  initialCount: 1
}, {
  typeID: CoinTermTypeID.Y,
  initialCount: 1
}, {
  typeID: CoinTermTypeID.Z,
  initialCount: 1
}, {
  typeID: CoinTermTypeID.X,
  initialCount: 2
}, {
  typeID: CoinTermTypeID.Y,
  initialCount: 3
}, {
  typeID: CoinTermTypeID.X_TIMES_Y,
  initialCount: 1
}, {
  typeID: CoinTermTypeID.X_SQUARED,
  initialCount: 1
}, {
  typeID: CoinTermTypeID.Y_SQUARED,
  initialCount: 1
}, {
  typeID: CoinTermTypeID.X_SQUARED_TIMES_Y_SQUARED,
  initialCount: 1
}];
EXPLORE_SCREEN_COIN_TERM_CREATOR_SET_DESCRIPTORS[CoinTermCreatorSetID.VARIABLES] = [{
  typeID: CoinTermTypeID.X,
  initialCount: 1
}, {
  typeID: CoinTermTypeID.X,
  initialCount: -1
}, {
  typeID: CoinTermTypeID.CONSTANT,
  initialCount: 1
}, {
  typeID: CoinTermTypeID.CONSTANT,
  initialCount: -1
}, {
  typeID: CoinTermTypeID.X_SQUARED,
  initialCount: 1
}, {
  typeID: CoinTermTypeID.X_SQUARED,
  initialCount: -1
}, {
  typeID: CoinTermTypeID.Y,
  initialCount: 1
}, {
  typeID: CoinTermTypeID.Y,
  initialCount: -1
}];

/**
 * helper function for making coin term creator nodes for the explore screens, which use a non-staggered format
 * @param {CoinTermTypeID} typeID
 * @param {number} createdCoinTermInitialCount
 * @param {ExpressionManipulationModel} model
 * @param {ExpressionManipulationView} view
 * @returns {CoinTermCreatorNode}
 */
function makeExploreScreenCreatorNode(typeID, createdCoinTermInitialCount, model, view) {
  // Create a property that will control number of coin terms shown in this creator node.  For the explore screens,
  // only one is even shown, and the property goes to zero when the max number of this type have been added to the
  // model.
  const numberToShowProperty = new Property(1);
  const instanceCount = model.getCoinTermCountProperty(typeID, createdCoinTermInitialCount > 0 ? 1 : -1, true);
  instanceCount.link(count => {
    numberToShowProperty.set(count + Math.abs(createdCoinTermInitialCount) <= CREATION_LIMIT_FOR_EXPLORE_SCREENS ? 1 : 0);
  });

  // create the "creator node" for the specified coin term type
  return new CoinTermCreatorNode(model, view, typeID, model.coinTermFactory.createCoinTerm.bind(model.coinTermFactory), {
    dragBounds: EESharedConstants.LAYOUT_BOUNDS,
    createdCoinTermInitialCount: createdCoinTermInitialCount,
    maxNumberShown: 1,
    numberToShowProperty: numberToShowProperty
  });
}

/**
 * helper function for making coin term creator nodes for the game screens, which use a staggered format
 * @param {CoinTermTypeID} typeID
 * @param {number} createdCoinTermInitialCount
 * @param {number} numInstancesAllowed
 * @param {ExpressionManipulationModel} model
 * @param {ExpressionManipulationView} view
 * @returns {CoinTermCreatorNode}
 */
function makeGameScreenCreatorNode(typeID, createdCoinTermInitialCount, numInstancesAllowed, model, view) {
  // Create a property that will control number of coin terms shown in this creator node.  For the game screen,
  // multiple creator nodes are shown in a staggered arrangement.
  const numberToShowProperty = new DerivedProperty([model.getCoinTermCountProperty(typeID, createdCoinTermInitialCount, true)], instanceCount => numInstancesAllowed - instanceCount);

  // create the "creator node" for the specified coin term type
  const coinTermCreatorNode = new CoinTermCreatorNode(model, view, typeID, model.coinTermFactory.createCoinTerm.bind(model.coinTermFactory), {
    dragBounds: EESharedConstants.LAYOUT_BOUNDS,
    createdCoinTermInitialCount: createdCoinTermInitialCount,
    createdCoinTermDecomposable: false,
    maxNumberShown: numInstancesAllowed,
    numberToShowProperty: numberToShowProperty,
    onCard: true,
    supportShowValues: false
  });

  // dispose of the derived property in order to avoid memory leaks
  coinTermCreatorNode.disposeEmitter.addListener(() => {
    numberToShowProperty.dispose();
  });
  return coinTermCreatorNode;
}

/**
 * static factory object used to create "toolbox-ish" controls that allows the user to created coin terms by clicking
 * and dragging
 * @public
 */
const CoinTermCreatorBoxFactory = {
  /**
   *
   * @param {Object} creatorSetID
   * @param {ExpressionManipulationModel} model
   * @param {Object} [options]
   * @returns {CoinTermCreatorBox}
   * @public
   */
  createExploreScreenCreatorBox(creatorSetID, model, view, options) {
    options = merge({
      itemsPerCarouselPage: creatorSetID === CoinTermCreatorSetID.VARIABLES ? 4 : 3,
      itemSpacing: creatorSetID === CoinTermCreatorSetID.VARIABLES ? 5 : 10
    }, options);

    // create the list of creator nodes from the descriptor list
    const creatorNodes = [];
    EXPLORE_SCREEN_COIN_TERM_CREATOR_SET_DESCRIPTORS[creatorSetID].forEach(descriptor => {
      creatorNodes.push(makeExploreScreenCreatorNode(descriptor.typeID, descriptor.initialCount, model, view));
    });
    return new CoinTermCreatorBox(creatorNodes, options);
  },
  /**
   * @param {EEChallengeDescriptor} challengeDescriptor
   * @param {ExpressionManipulationModel} model
   * @param {ExpressionManipulationView} view
   * @param {Object} [options]
   * @returns {CoinTermCreatorBox}
   * @public
   */
  createGameScreenCreatorBox(challengeDescriptor, model, view, options) {
    options = merge({
      itemSpacing: 5,
      align: 'top'
    }, options);

    // create the list of creator nodes from the descriptor list
    const creatorNodes = [];
    challengeDescriptor.carouselContents.forEach(descriptor => {
      creatorNodes.push(makeGameScreenCreatorNode(descriptor.typeID, descriptor.minimumDecomposition, descriptor.creationLimit, model, view));
    });

    // set the options so that all creator nodes are always shown
    options.itemsPerCarouselPage = creatorNodes.length;
    return new CoinTermCreatorBox(creatorNodes, options);
  }
};
expressionExchange.register('CoinTermCreatorBoxFactory', CoinTermCreatorBoxFactory);
export default CoinTermCreatorBoxFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEZXJpdmVkUHJvcGVydHkiLCJQcm9wZXJ0eSIsIm1lcmdlIiwiZXhwcmVzc2lvbkV4Y2hhbmdlIiwiRUVTaGFyZWRDb25zdGFudHMiLCJDb2luVGVybUNyZWF0b3JTZXRJRCIsIkNvaW5UZXJtVHlwZUlEIiwiQ29pblRlcm1DcmVhdG9yQm94IiwiQ29pblRlcm1DcmVhdG9yTm9kZSIsIkNSRUFUSU9OX0xJTUlUX0ZPUl9FWFBMT1JFX1NDUkVFTlMiLCJFWFBMT1JFX1NDUkVFTl9DT0lOX1RFUk1fQ1JFQVRPUl9TRVRfREVTQ1JJUFRPUlMiLCJCQVNJQ1MiLCJ0eXBlSUQiLCJYIiwiaW5pdGlhbENvdW50IiwiWSIsIloiLCJFWFBMT1JFIiwiWF9USU1FU19ZIiwiWF9TUVVBUkVEIiwiWV9TUVVBUkVEIiwiWF9TUVVBUkVEX1RJTUVTX1lfU1FVQVJFRCIsIlZBUklBQkxFUyIsIkNPTlNUQU5UIiwibWFrZUV4cGxvcmVTY3JlZW5DcmVhdG9yTm9kZSIsImNyZWF0ZWRDb2luVGVybUluaXRpYWxDb3VudCIsIm1vZGVsIiwidmlldyIsIm51bWJlclRvU2hvd1Byb3BlcnR5IiwiaW5zdGFuY2VDb3VudCIsImdldENvaW5UZXJtQ291bnRQcm9wZXJ0eSIsImxpbmsiLCJjb3VudCIsInNldCIsIk1hdGgiLCJhYnMiLCJjb2luVGVybUZhY3RvcnkiLCJjcmVhdGVDb2luVGVybSIsImJpbmQiLCJkcmFnQm91bmRzIiwiTEFZT1VUX0JPVU5EUyIsIm1heE51bWJlclNob3duIiwibWFrZUdhbWVTY3JlZW5DcmVhdG9yTm9kZSIsIm51bUluc3RhbmNlc0FsbG93ZWQiLCJjb2luVGVybUNyZWF0b3JOb2RlIiwiY3JlYXRlZENvaW5UZXJtRGVjb21wb3NhYmxlIiwib25DYXJkIiwic3VwcG9ydFNob3dWYWx1ZXMiLCJkaXNwb3NlRW1pdHRlciIsImFkZExpc3RlbmVyIiwiZGlzcG9zZSIsIkNvaW5UZXJtQ3JlYXRvckJveEZhY3RvcnkiLCJjcmVhdGVFeHBsb3JlU2NyZWVuQ3JlYXRvckJveCIsImNyZWF0b3JTZXRJRCIsIm9wdGlvbnMiLCJpdGVtc1BlckNhcm91c2VsUGFnZSIsIml0ZW1TcGFjaW5nIiwiY3JlYXRvck5vZGVzIiwiZm9yRWFjaCIsImRlc2NyaXB0b3IiLCJwdXNoIiwiY3JlYXRlR2FtZVNjcmVlbkNyZWF0b3JCb3giLCJjaGFsbGVuZ2VEZXNjcmlwdG9yIiwiYWxpZ24iLCJjYXJvdXNlbENvbnRlbnRzIiwibWluaW11bURlY29tcG9zaXRpb24iLCJjcmVhdGlvbkxpbWl0IiwibGVuZ3RoIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJDb2luVGVybUNyZWF0b3JCb3hGYWN0b3J5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE3LTIwMjMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIEEgc3RhdGljIGZhY3Rvcnkgb2JqZWN0IHRoYXQgcHJvdmlkZSBtZXRob2RzIGZvciBjcmVhdGluZyB0aGUgJ2JveGVzJywgd2hpY2ggYXJlIGVpdGhlciBhIHBhbmVsIG9yIGEgY2Fyb3VzZWwsIHRoYXRcclxuICogY29udGFpbiBjb2luIHRlcm0gY3JlYXRvciBub2Rlcy5cclxuICpcclxuICogVGhpcyB3YXMgY2VudHJhbGl6ZWQgaW50byBhIGZhY3Rvcnkgb2JqZWN0IGJlY2F1c2UgdGhlIHNpbXVsYXRpb24gcmVxdWlyZXMgYSByYXRoZXIgbGFyZ2UgbnVtYmVyIG9mIGRpZmZlcmVudFxyXG4gKiBjcmVhdG9yIG5vZGUgc2V0cywgNDMgYXQgdGhlIHRpbWUgb2YgdGhpcyB3cml0aW5nLlxyXG4gKlxyXG4gKiBAYXV0aG9yIEpvaG4gQmxhbmNvXHJcbiAqL1xyXG5cclxuaW1wb3J0IERlcml2ZWRQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL0Rlcml2ZWRQcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL1Byb3BlcnR5LmpzJztcclxuaW1wb3J0IG1lcmdlIGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9tZXJnZS5qcyc7XHJcbmltcG9ydCBleHByZXNzaW9uRXhjaGFuZ2UgZnJvbSAnLi4vLi4vZXhwcmVzc2lvbkV4Y2hhbmdlLmpzJztcclxuaW1wb3J0IEVFU2hhcmVkQ29uc3RhbnRzIGZyb20gJy4uL0VFU2hhcmVkQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IENvaW5UZXJtQ3JlYXRvclNldElEIGZyb20gJy4uL2VudW0vQ29pblRlcm1DcmVhdG9yU2V0SUQuanMnO1xyXG5pbXBvcnQgQ29pblRlcm1UeXBlSUQgZnJvbSAnLi4vZW51bS9Db2luVGVybVR5cGVJRC5qcyc7XHJcbmltcG9ydCBDb2luVGVybUNyZWF0b3JCb3ggZnJvbSAnLi9Db2luVGVybUNyZWF0b3JCb3guanMnO1xyXG5pbXBvcnQgQ29pblRlcm1DcmVhdG9yTm9kZSBmcm9tICcuL0NvaW5UZXJtQ3JlYXRvck5vZGUuanMnO1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IENSRUFUSU9OX0xJTUlUX0ZPUl9FWFBMT1JFX1NDUkVFTlMgPSA4O1xyXG5cclxuLy8gZGVzY3JpcHRvcnMgZm9yIHRoZSBjb2luIHRlcm0gY3JlYXRvciBzZXRzIHVzZWQgaW4gdGhlIGV4cGxvcmUgc2NyZWVuc1xyXG5jb25zdCBFWFBMT1JFX1NDUkVFTl9DT0lOX1RFUk1fQ1JFQVRPUl9TRVRfREVTQ1JJUFRPUlMgPSB7fTtcclxuRVhQTE9SRV9TQ1JFRU5fQ09JTl9URVJNX0NSRUFUT1JfU0VUX0RFU0NSSVBUT1JTWyBDb2luVGVybUNyZWF0b3JTZXRJRC5CQVNJQ1MgXSA9IFtcclxuICB7IHR5cGVJRDogQ29pblRlcm1UeXBlSUQuWCwgaW5pdGlhbENvdW50OiAxIH0sXHJcbiAgeyB0eXBlSUQ6IENvaW5UZXJtVHlwZUlELlksIGluaXRpYWxDb3VudDogMSB9LFxyXG4gIHsgdHlwZUlEOiBDb2luVGVybVR5cGVJRC5aLCBpbml0aWFsQ291bnQ6IDEgfVxyXG5dO1xyXG5FWFBMT1JFX1NDUkVFTl9DT0lOX1RFUk1fQ1JFQVRPUl9TRVRfREVTQ1JJUFRPUlNbIENvaW5UZXJtQ3JlYXRvclNldElELkVYUExPUkUgXSA9IFtcclxuICB7IHR5cGVJRDogQ29pblRlcm1UeXBlSUQuWCwgaW5pdGlhbENvdW50OiAxIH0sXHJcbiAgeyB0eXBlSUQ6IENvaW5UZXJtVHlwZUlELlksIGluaXRpYWxDb3VudDogMSB9LFxyXG4gIHsgdHlwZUlEOiBDb2luVGVybVR5cGVJRC5aLCBpbml0aWFsQ291bnQ6IDEgfSxcclxuICB7IHR5cGVJRDogQ29pblRlcm1UeXBlSUQuWCwgaW5pdGlhbENvdW50OiAyIH0sXHJcbiAgeyB0eXBlSUQ6IENvaW5UZXJtVHlwZUlELlksIGluaXRpYWxDb3VudDogMyB9LFxyXG4gIHsgdHlwZUlEOiBDb2luVGVybVR5cGVJRC5YX1RJTUVTX1ksIGluaXRpYWxDb3VudDogMSB9LFxyXG4gIHsgdHlwZUlEOiBDb2luVGVybVR5cGVJRC5YX1NRVUFSRUQsIGluaXRpYWxDb3VudDogMSB9LFxyXG4gIHsgdHlwZUlEOiBDb2luVGVybVR5cGVJRC5ZX1NRVUFSRUQsIGluaXRpYWxDb3VudDogMSB9LFxyXG4gIHsgdHlwZUlEOiBDb2luVGVybVR5cGVJRC5YX1NRVUFSRURfVElNRVNfWV9TUVVBUkVELCBpbml0aWFsQ291bnQ6IDEgfVxyXG5dO1xyXG5FWFBMT1JFX1NDUkVFTl9DT0lOX1RFUk1fQ1JFQVRPUl9TRVRfREVTQ1JJUFRPUlNbIENvaW5UZXJtQ3JlYXRvclNldElELlZBUklBQkxFUyBdID0gW1xyXG4gIHsgdHlwZUlEOiBDb2luVGVybVR5cGVJRC5YLCBpbml0aWFsQ291bnQ6IDEgfSxcclxuICB7IHR5cGVJRDogQ29pblRlcm1UeXBlSUQuWCwgaW5pdGlhbENvdW50OiAtMSB9LFxyXG4gIHsgdHlwZUlEOiBDb2luVGVybVR5cGVJRC5DT05TVEFOVCwgaW5pdGlhbENvdW50OiAxIH0sXHJcbiAgeyB0eXBlSUQ6IENvaW5UZXJtVHlwZUlELkNPTlNUQU5ULCBpbml0aWFsQ291bnQ6IC0xIH0sXHJcbiAgeyB0eXBlSUQ6IENvaW5UZXJtVHlwZUlELlhfU1FVQVJFRCwgaW5pdGlhbENvdW50OiAxIH0sXHJcbiAgeyB0eXBlSUQ6IENvaW5UZXJtVHlwZUlELlhfU1FVQVJFRCwgaW5pdGlhbENvdW50OiAtMSB9LFxyXG4gIHsgdHlwZUlEOiBDb2luVGVybVR5cGVJRC5ZLCBpbml0aWFsQ291bnQ6IDEgfSxcclxuICB7IHR5cGVJRDogQ29pblRlcm1UeXBlSUQuWSwgaW5pdGlhbENvdW50OiAtMSB9XHJcbl07XHJcblxyXG4vKipcclxuICogaGVscGVyIGZ1bmN0aW9uIGZvciBtYWtpbmcgY29pbiB0ZXJtIGNyZWF0b3Igbm9kZXMgZm9yIHRoZSBleHBsb3JlIHNjcmVlbnMsIHdoaWNoIHVzZSBhIG5vbi1zdGFnZ2VyZWQgZm9ybWF0XHJcbiAqIEBwYXJhbSB7Q29pblRlcm1UeXBlSUR9IHR5cGVJRFxyXG4gKiBAcGFyYW0ge251bWJlcn0gY3JlYXRlZENvaW5UZXJtSW5pdGlhbENvdW50XHJcbiAqIEBwYXJhbSB7RXhwcmVzc2lvbk1hbmlwdWxhdGlvbk1vZGVsfSBtb2RlbFxyXG4gKiBAcGFyYW0ge0V4cHJlc3Npb25NYW5pcHVsYXRpb25WaWV3fSB2aWV3XHJcbiAqIEByZXR1cm5zIHtDb2luVGVybUNyZWF0b3JOb2RlfVxyXG4gKi9cclxuZnVuY3Rpb24gbWFrZUV4cGxvcmVTY3JlZW5DcmVhdG9yTm9kZSggdHlwZUlELCBjcmVhdGVkQ29pblRlcm1Jbml0aWFsQ291bnQsIG1vZGVsLCB2aWV3ICkge1xyXG5cclxuICAvLyBDcmVhdGUgYSBwcm9wZXJ0eSB0aGF0IHdpbGwgY29udHJvbCBudW1iZXIgb2YgY29pbiB0ZXJtcyBzaG93biBpbiB0aGlzIGNyZWF0b3Igbm9kZS4gIEZvciB0aGUgZXhwbG9yZSBzY3JlZW5zLFxyXG4gIC8vIG9ubHkgb25lIGlzIGV2ZW4gc2hvd24sIGFuZCB0aGUgcHJvcGVydHkgZ29lcyB0byB6ZXJvIHdoZW4gdGhlIG1heCBudW1iZXIgb2YgdGhpcyB0eXBlIGhhdmUgYmVlbiBhZGRlZCB0byB0aGVcclxuICAvLyBtb2RlbC5cclxuICBjb25zdCBudW1iZXJUb1Nob3dQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eSggMSApO1xyXG4gIGNvbnN0IGluc3RhbmNlQ291bnQgPSBtb2RlbC5nZXRDb2luVGVybUNvdW50UHJvcGVydHkoXHJcbiAgICB0eXBlSUQsXHJcbiAgICBjcmVhdGVkQ29pblRlcm1Jbml0aWFsQ291bnQgPiAwID8gMSA6IC0xLFxyXG4gICAgdHJ1ZVxyXG4gICk7XHJcbiAgaW5zdGFuY2VDb3VudC5saW5rKCBjb3VudCA9PiB7XHJcbiAgICBudW1iZXJUb1Nob3dQcm9wZXJ0eS5zZXQoIGNvdW50ICsgTWF0aC5hYnMoIGNyZWF0ZWRDb2luVGVybUluaXRpYWxDb3VudCApIDw9IENSRUFUSU9OX0xJTUlUX0ZPUl9FWFBMT1JFX1NDUkVFTlMgPyAxIDogMCApO1xyXG4gIH0gKTtcclxuXHJcbiAgLy8gY3JlYXRlIHRoZSBcImNyZWF0b3Igbm9kZVwiIGZvciB0aGUgc3BlY2lmaWVkIGNvaW4gdGVybSB0eXBlXHJcbiAgcmV0dXJuIG5ldyBDb2luVGVybUNyZWF0b3JOb2RlKFxyXG4gICAgbW9kZWwsXHJcbiAgICB2aWV3LFxyXG4gICAgdHlwZUlELFxyXG4gICAgbW9kZWwuY29pblRlcm1GYWN0b3J5LmNyZWF0ZUNvaW5UZXJtLmJpbmQoIG1vZGVsLmNvaW5UZXJtRmFjdG9yeSApLFxyXG4gICAge1xyXG4gICAgICBkcmFnQm91bmRzOiBFRVNoYXJlZENvbnN0YW50cy5MQVlPVVRfQk9VTkRTLFxyXG4gICAgICBjcmVhdGVkQ29pblRlcm1Jbml0aWFsQ291bnQ6IGNyZWF0ZWRDb2luVGVybUluaXRpYWxDb3VudCxcclxuICAgICAgbWF4TnVtYmVyU2hvd246IDEsXHJcbiAgICAgIG51bWJlclRvU2hvd1Byb3BlcnR5OiBudW1iZXJUb1Nob3dQcm9wZXJ0eVxyXG4gICAgfVxyXG4gICk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBoZWxwZXIgZnVuY3Rpb24gZm9yIG1ha2luZyBjb2luIHRlcm0gY3JlYXRvciBub2RlcyBmb3IgdGhlIGdhbWUgc2NyZWVucywgd2hpY2ggdXNlIGEgc3RhZ2dlcmVkIGZvcm1hdFxyXG4gKiBAcGFyYW0ge0NvaW5UZXJtVHlwZUlEfSB0eXBlSURcclxuICogQHBhcmFtIHtudW1iZXJ9IGNyZWF0ZWRDb2luVGVybUluaXRpYWxDb3VudFxyXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtSW5zdGFuY2VzQWxsb3dlZFxyXG4gKiBAcGFyYW0ge0V4cHJlc3Npb25NYW5pcHVsYXRpb25Nb2RlbH0gbW9kZWxcclxuICogQHBhcmFtIHtFeHByZXNzaW9uTWFuaXB1bGF0aW9uVmlld30gdmlld1xyXG4gKiBAcmV0dXJucyB7Q29pblRlcm1DcmVhdG9yTm9kZX1cclxuICovXHJcbmZ1bmN0aW9uIG1ha2VHYW1lU2NyZWVuQ3JlYXRvck5vZGUoIHR5cGVJRCwgY3JlYXRlZENvaW5UZXJtSW5pdGlhbENvdW50LCBudW1JbnN0YW5jZXNBbGxvd2VkLCBtb2RlbCwgdmlldyApIHtcclxuXHJcbiAgLy8gQ3JlYXRlIGEgcHJvcGVydHkgdGhhdCB3aWxsIGNvbnRyb2wgbnVtYmVyIG9mIGNvaW4gdGVybXMgc2hvd24gaW4gdGhpcyBjcmVhdG9yIG5vZGUuICBGb3IgdGhlIGdhbWUgc2NyZWVuLFxyXG4gIC8vIG11bHRpcGxlIGNyZWF0b3Igbm9kZXMgYXJlIHNob3duIGluIGEgc3RhZ2dlcmVkIGFycmFuZ2VtZW50LlxyXG4gIGNvbnN0IG51bWJlclRvU2hvd1Byb3BlcnR5ID0gbmV3IERlcml2ZWRQcm9wZXJ0eShcclxuICAgIFsgbW9kZWwuZ2V0Q29pblRlcm1Db3VudFByb3BlcnR5KCB0eXBlSUQsIGNyZWF0ZWRDb2luVGVybUluaXRpYWxDb3VudCwgdHJ1ZSApIF0sXHJcbiAgICBpbnN0YW5jZUNvdW50ID0+IG51bUluc3RhbmNlc0FsbG93ZWQgLSBpbnN0YW5jZUNvdW50XHJcbiAgKTtcclxuXHJcbiAgLy8gY3JlYXRlIHRoZSBcImNyZWF0b3Igbm9kZVwiIGZvciB0aGUgc3BlY2lmaWVkIGNvaW4gdGVybSB0eXBlXHJcbiAgY29uc3QgY29pblRlcm1DcmVhdG9yTm9kZSA9IG5ldyBDb2luVGVybUNyZWF0b3JOb2RlKFxyXG4gICAgbW9kZWwsXHJcbiAgICB2aWV3LFxyXG4gICAgdHlwZUlELFxyXG4gICAgbW9kZWwuY29pblRlcm1GYWN0b3J5LmNyZWF0ZUNvaW5UZXJtLmJpbmQoIG1vZGVsLmNvaW5UZXJtRmFjdG9yeSApLFxyXG4gICAge1xyXG4gICAgICBkcmFnQm91bmRzOiBFRVNoYXJlZENvbnN0YW50cy5MQVlPVVRfQk9VTkRTLFxyXG4gICAgICBjcmVhdGVkQ29pblRlcm1Jbml0aWFsQ291bnQ6IGNyZWF0ZWRDb2luVGVybUluaXRpYWxDb3VudCxcclxuICAgICAgY3JlYXRlZENvaW5UZXJtRGVjb21wb3NhYmxlOiBmYWxzZSxcclxuICAgICAgbWF4TnVtYmVyU2hvd246IG51bUluc3RhbmNlc0FsbG93ZWQsXHJcbiAgICAgIG51bWJlclRvU2hvd1Byb3BlcnR5OiBudW1iZXJUb1Nob3dQcm9wZXJ0eSxcclxuICAgICAgb25DYXJkOiB0cnVlLFxyXG4gICAgICBzdXBwb3J0U2hvd1ZhbHVlczogZmFsc2VcclxuICAgIH1cclxuICApO1xyXG5cclxuICAvLyBkaXNwb3NlIG9mIHRoZSBkZXJpdmVkIHByb3BlcnR5IGluIG9yZGVyIHRvIGF2b2lkIG1lbW9yeSBsZWFrc1xyXG4gIGNvaW5UZXJtQ3JlYXRvck5vZGUuZGlzcG9zZUVtaXR0ZXIuYWRkTGlzdGVuZXIoICgpID0+IHtcclxuICAgIG51bWJlclRvU2hvd1Byb3BlcnR5LmRpc3Bvc2UoKTtcclxuICB9ICk7XHJcblxyXG4gIHJldHVybiBjb2luVGVybUNyZWF0b3JOb2RlO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIHN0YXRpYyBmYWN0b3J5IG9iamVjdCB1c2VkIHRvIGNyZWF0ZSBcInRvb2xib3gtaXNoXCIgY29udHJvbHMgdGhhdCBhbGxvd3MgdGhlIHVzZXIgdG8gY3JlYXRlZCBjb2luIHRlcm1zIGJ5IGNsaWNraW5nXHJcbiAqIGFuZCBkcmFnZ2luZ1xyXG4gKiBAcHVibGljXHJcbiAqL1xyXG5jb25zdCBDb2luVGVybUNyZWF0b3JCb3hGYWN0b3J5ID0ge1xyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjcmVhdG9yU2V0SURcclxuICAgKiBAcGFyYW0ge0V4cHJlc3Npb25NYW5pcHVsYXRpb25Nb2RlbH0gbW9kZWxcclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXHJcbiAgICogQHJldHVybnMge0NvaW5UZXJtQ3JlYXRvckJveH1cclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgY3JlYXRlRXhwbG9yZVNjcmVlbkNyZWF0b3JCb3goIGNyZWF0b3JTZXRJRCwgbW9kZWwsIHZpZXcsIG9wdGlvbnMgKSB7XHJcblxyXG4gICAgb3B0aW9ucyA9IG1lcmdlKCB7XHJcbiAgICAgIGl0ZW1zUGVyQ2Fyb3VzZWxQYWdlOiBjcmVhdG9yU2V0SUQgPT09IENvaW5UZXJtQ3JlYXRvclNldElELlZBUklBQkxFUyA/IDQgOiAzLFxyXG4gICAgICBpdGVtU3BhY2luZzogY3JlYXRvclNldElEID09PSBDb2luVGVybUNyZWF0b3JTZXRJRC5WQVJJQUJMRVMgPyA1IDogMTBcclxuICAgIH0sIG9wdGlvbnMgKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgdGhlIGxpc3Qgb2YgY3JlYXRvciBub2RlcyBmcm9tIHRoZSBkZXNjcmlwdG9yIGxpc3RcclxuICAgIGNvbnN0IGNyZWF0b3JOb2RlcyA9IFtdO1xyXG4gICAgRVhQTE9SRV9TQ1JFRU5fQ09JTl9URVJNX0NSRUFUT1JfU0VUX0RFU0NSSVBUT1JTWyBjcmVhdG9yU2V0SUQgXS5mb3JFYWNoKCBkZXNjcmlwdG9yID0+IHtcclxuICAgICAgY3JlYXRvck5vZGVzLnB1c2goIG1ha2VFeHBsb3JlU2NyZWVuQ3JlYXRvck5vZGUoXHJcbiAgICAgICAgZGVzY3JpcHRvci50eXBlSUQsXHJcbiAgICAgICAgZGVzY3JpcHRvci5pbml0aWFsQ291bnQsXHJcbiAgICAgICAgbW9kZWwsXHJcbiAgICAgICAgdmlld1xyXG4gICAgICApICk7XHJcbiAgICB9ICk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBDb2luVGVybUNyZWF0b3JCb3goIGNyZWF0b3JOb2Rlcywgb3B0aW9ucyApO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7RUVDaGFsbGVuZ2VEZXNjcmlwdG9yfSBjaGFsbGVuZ2VEZXNjcmlwdG9yXHJcbiAgICogQHBhcmFtIHtFeHByZXNzaW9uTWFuaXB1bGF0aW9uTW9kZWx9IG1vZGVsXHJcbiAgICogQHBhcmFtIHtFeHByZXNzaW9uTWFuaXB1bGF0aW9uVmlld30gdmlld1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuICAgKiBAcmV0dXJucyB7Q29pblRlcm1DcmVhdG9yQm94fVxyXG4gICAqIEBwdWJsaWNcclxuICAgKi9cclxuICBjcmVhdGVHYW1lU2NyZWVuQ3JlYXRvckJveCggY2hhbGxlbmdlRGVzY3JpcHRvciwgbW9kZWwsIHZpZXcsIG9wdGlvbnMgKSB7XHJcbiAgICBvcHRpb25zID0gbWVyZ2UoIHtcclxuICAgICAgaXRlbVNwYWNpbmc6IDUsXHJcbiAgICAgIGFsaWduOiAndG9wJ1xyXG4gICAgfSwgb3B0aW9ucyApO1xyXG5cclxuICAgIC8vIGNyZWF0ZSB0aGUgbGlzdCBvZiBjcmVhdG9yIG5vZGVzIGZyb20gdGhlIGRlc2NyaXB0b3IgbGlzdFxyXG4gICAgY29uc3QgY3JlYXRvck5vZGVzID0gW107XHJcbiAgICBjaGFsbGVuZ2VEZXNjcmlwdG9yLmNhcm91c2VsQ29udGVudHMuZm9yRWFjaCggZGVzY3JpcHRvciA9PiB7XHJcbiAgICAgIGNyZWF0b3JOb2Rlcy5wdXNoKCBtYWtlR2FtZVNjcmVlbkNyZWF0b3JOb2RlKFxyXG4gICAgICAgIGRlc2NyaXB0b3IudHlwZUlELFxyXG4gICAgICAgIGRlc2NyaXB0b3IubWluaW11bURlY29tcG9zaXRpb24sXHJcbiAgICAgICAgZGVzY3JpcHRvci5jcmVhdGlvbkxpbWl0LFxyXG4gICAgICAgIG1vZGVsLFxyXG4gICAgICAgIHZpZXdcclxuICAgICAgKSApO1xyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIHNldCB0aGUgb3B0aW9ucyBzbyB0aGF0IGFsbCBjcmVhdG9yIG5vZGVzIGFyZSBhbHdheXMgc2hvd25cclxuICAgIG9wdGlvbnMuaXRlbXNQZXJDYXJvdXNlbFBhZ2UgPSBjcmVhdG9yTm9kZXMubGVuZ3RoO1xyXG5cclxuICAgIHJldHVybiBuZXcgQ29pblRlcm1DcmVhdG9yQm94KCBjcmVhdG9yTm9kZXMsIG9wdGlvbnMgKTtcclxuICB9XHJcbn07XHJcblxyXG5leHByZXNzaW9uRXhjaGFuZ2UucmVnaXN0ZXIoICdDb2luVGVybUNyZWF0b3JCb3hGYWN0b3J5JywgQ29pblRlcm1DcmVhdG9yQm94RmFjdG9yeSApO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29pblRlcm1DcmVhdG9yQm94RmFjdG9yeTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxlQUFlLE1BQU0sd0NBQXdDO0FBQ3BFLE9BQU9DLFFBQVEsTUFBTSxpQ0FBaUM7QUFDdEQsT0FBT0MsS0FBSyxNQUFNLG1DQUFtQztBQUNyRCxPQUFPQyxrQkFBa0IsTUFBTSw2QkFBNkI7QUFDNUQsT0FBT0MsaUJBQWlCLE1BQU0seUJBQXlCO0FBQ3ZELE9BQU9DLG9CQUFvQixNQUFNLGlDQUFpQztBQUNsRSxPQUFPQyxjQUFjLE1BQU0sMkJBQTJCO0FBQ3RELE9BQU9DLGtCQUFrQixNQUFNLHlCQUF5QjtBQUN4RCxPQUFPQyxtQkFBbUIsTUFBTSwwQkFBMEI7O0FBRTFEO0FBQ0EsTUFBTUMsa0NBQWtDLEdBQUcsQ0FBQzs7QUFFNUM7QUFDQSxNQUFNQyxnREFBZ0QsR0FBRyxDQUFDLENBQUM7QUFDM0RBLGdE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