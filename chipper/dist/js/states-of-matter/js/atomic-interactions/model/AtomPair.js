// Copyright 2015-2022, University of Colorado Boulder

/**
 * AtomPair enumeration
 * @author John Blanco (PhET Interactive Simulations)
 */

import EnumerationDeprecated from '../../../../phet-core/js/EnumerationDeprecated.js';
import AtomType from '../../common/model/AtomType.js';
import statesOfMatter from '../../statesOfMatter.js';
const AtomPair = EnumerationDeprecated.byMap({
  NEON_NEON: {
    fixedAtomType: AtomType.NEON,
    movableAtomType: AtomType.NEON
  },
  ARGON_ARGON: {
    fixedAtomType: AtomType.ARGON,
    movableAtomType: AtomType.ARGON
  },
  OXYGEN_OXYGEN: {
    fixedAtomType: AtomType.OXYGEN,
    movableAtomType: AtomType.OXYGEN
  },
  NEON_ARGON: {
    fixedAtomType: AtomType.NEON,
    movableAtomType: AtomType.ARGON
  },
  NEON_OXYGEN: {
    fixedAtomType: AtomType.NEON,
    movableAtomType: AtomType.OXYGEN
  },
  ARGON_OXYGEN: {
    fixedAtomType: AtomType.ARGON,
    movableAtomType: AtomType.OXYGEN
  },
  ADJUSTABLE: {
    fixedAtomType: AtomType.ADJUSTABLE,
    movableAtomType: AtomType.ADJUSTABLE
  }
});
statesOfMatter.register('AtomPair', AtomPair);
export default AtomPair;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJFbnVtZXJhdGlvbkRlcHJlY2F0ZWQiLCJBdG9tVHlwZSIsInN0YXRlc09mTWF0dGVyIiwiQXRvbVBhaXIiLCJieU1hcCIsIk5FT05fTkVPTiIsImZpeGVkQXRvbVR5cGUiLCJORU9OIiwibW92YWJsZUF0b21UeXBlIiwiQVJHT05fQVJHT04iLCJBUkdPTiIsIk9YWUdFTl9PWFlHRU4iLCJPWFlHRU4iLCJORU9OX0FSR09OIiwiTkVPTl9PWFlHRU4iLCJBUkdPTl9PWFlHRU4iLCJBREpVU1RBQkxFIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJBdG9tUGFpci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNS0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBBdG9tUGFpciBlbnVtZXJhdGlvblxyXG4gKiBAYXV0aG9yIEpvaG4gQmxhbmNvIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCBFbnVtZXJhdGlvbkRlcHJlY2F0ZWQgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL0VudW1lcmF0aW9uRGVwcmVjYXRlZC5qcyc7XHJcbmltcG9ydCBBdG9tVHlwZSBmcm9tICcuLi8uLi9jb21tb24vbW9kZWwvQXRvbVR5cGUuanMnO1xyXG5pbXBvcnQgc3RhdGVzT2ZNYXR0ZXIgZnJvbSAnLi4vLi4vc3RhdGVzT2ZNYXR0ZXIuanMnO1xyXG5cclxuY29uc3QgQXRvbVBhaXIgPSBFbnVtZXJhdGlvbkRlcHJlY2F0ZWQuYnlNYXAoIHtcclxuICAgIE5FT05fTkVPTjogeyBmaXhlZEF0b21UeXBlOiBBdG9tVHlwZS5ORU9OLCBtb3ZhYmxlQXRvbVR5cGU6IEF0b21UeXBlLk5FT04gfSxcclxuICAgIEFSR09OX0FSR09OOiB7IGZpeGVkQXRvbVR5cGU6IEF0b21UeXBlLkFSR09OLCBtb3ZhYmxlQXRvbVR5cGU6IEF0b21UeXBlLkFSR09OIH0sXHJcbiAgICBPWFlHRU5fT1hZR0VOOiB7IGZpeGVkQXRvbVR5cGU6IEF0b21UeXBlLk9YWUdFTiwgbW92YWJsZUF0b21UeXBlOiBBdG9tVHlwZS5PWFlHRU4gfSxcclxuICAgIE5FT05fQVJHT046IHsgZml4ZWRBdG9tVHlwZTogQXRvbVR5cGUuTkVPTiwgbW92YWJsZUF0b21UeXBlOiBBdG9tVHlwZS5BUkdPTiB9LFxyXG4gICAgTkVPTl9PWFlHRU46IHsgZml4ZWRBdG9tVHlwZTogQXRvbVR5cGUuTkVPTiwgbW92YWJsZUF0b21UeXBlOiBBdG9tVHlwZS5PWFlHRU4gfSxcclxuICAgIEFSR09OX09YWUdFTjogeyBmaXhlZEF0b21UeXBlOiBBdG9tVHlwZS5BUkdPTiwgbW92YWJsZUF0b21UeXBlOiBBdG9tVHlwZS5PWFlHRU4gfSxcclxuICAgIEFESlVTVEFCTEU6IHsgZml4ZWRBdG9tVHlwZTogQXRvbVR5cGUuQURKVVNUQUJMRSwgbW92YWJsZUF0b21UeXBlOiBBdG9tVHlwZS5BREpVU1RBQkxFIH1cclxuICB9XHJcbik7XHJcblxyXG5zdGF0ZXNPZk1hdHRlci5yZWdpc3RlciggJ0F0b21QYWlyJywgQXRvbVBhaXIgKTtcclxuZXhwb3J0IGRlZmF1bHQgQXRvbVBhaXI7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxxQkFBcUIsTUFBTSxtREFBbUQ7QUFDckYsT0FBT0MsUUFBUSxNQUFNLGdDQUFnQztBQUNyRCxPQUFPQyxjQUFjLE1BQU0seUJBQXlCO0FBRXBELE1BQU1DLFFBQVEsR0FBR0gscUJBQXFCLENBQUNJLEtBQUssQ0FBRTtFQUMxQ0MsU0FBUyxFQUFFO0lBQUVDLGFBQWEsRUFBRUwsUUFBUSxDQUFDTSxJQUFJO0lBQUVDLGVBQWUsRUFBRVAsUUFBUSxDQUFDTTtFQUFLLENBQUM7RUFDM0VFLFdBQVcsRUFBRTtJQUFFSCxhQUFhLEVBQUVMLFFBQVEsQ0FBQ1MsS0FBSztJQUFFRixlQUFlLEVBQUVQLFFBQVEsQ0FBQ1M7RUFBTSxDQUFDO0VBQy9FQyxhQUFhLEVBQUU7SUFBRUwsYUFBYSxFQUFFTCxRQUFRLENBQUNXLE1BQU07SUFBRUosZUFBZSxFQUFFUCxRQUFRLENBQUNXO0VBQU8sQ0FBQztFQUNuRkMsVUFBVSxFQUFFO0lBQUVQLGFBQWEsRUFBRUwsUUFBUSxDQUFDTSxJQUFJO0lBQUVDLGVBQWUsRUFBRVAsUUFBUSxDQUFDUztFQUFNLENBQUM7RUFDN0VJLFdBQVcsRUFBRTtJQUFFUixhQUFhLEVBQUVMLFFBQVEsQ0FBQ00sSUFBSTtJQUFFQyxlQUFlLEVBQUVQLFFBQVEsQ0FBQ1c7RUFBTyxDQUFDO0VBQy9FRyxZQUFZLEVBQUU7SUFBRVQsYUFBYSxFQUFFTCxRQUFRLENBQUNTLEtBQUs7SUFBRUYsZUFBZSxFQUFFUCxRQUFRLENBQUNXO0VBQU8sQ0FBQztFQUNqRkksVUFBVSxFQUFFO0lBQUVWLGFBQWEsRUFBRUwsUUFBUSxDQUFDZSxVQUFVO0lBQUVSLGVBQWUsRUFBRVAsUUFBUSxDQUFDZTtFQUFXO0FBQ3pGLENBQ0YsQ0FBQztBQUVEZCxjQUFjLENBQUNlLFFBQVEsQ0FBRSxVQUFVLEVBQUVkLFFBQVMsQ0FBQztBQUMvQyxlQUFlQSxRQUFRIn0=