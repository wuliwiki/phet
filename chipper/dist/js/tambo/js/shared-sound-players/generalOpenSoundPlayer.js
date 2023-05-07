// Copyright 2020-2022, University of Colorado Boulder

/**
 * shared sound generator for when something is opened, uses singleton pattern
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import generalOpen_mp3 from '../../sounds/generalOpen_mp3.js';
import SoundClipPlayer from '../sound-generators/SoundClipPlayer.js';
import tambo from '../tambo.js';

// create the shared sound instance
const generalOpenSoundPlayer = new SoundClipPlayer(generalOpen_mp3, {
  soundClipOptions: {
    initialOutputLevel: 0.4
  },
  soundManagerOptions: {
    categoryName: 'user-interface'
  }
});
tambo.register('generalOpenSoundPlayer', generalOpenSoundPlayer);
export default generalOpenSoundPlayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJnZW5lcmFsT3Blbl9tcDMiLCJTb3VuZENsaXBQbGF5ZXIiLCJ0YW1ibyIsImdlbmVyYWxPcGVuU291bmRQbGF5ZXIiLCJzb3VuZENsaXBPcHRpb25zIiwiaW5pdGlhbE91dHB1dExldmVsIiwic291bmRNYW5hZ2VyT3B0aW9ucyIsImNhdGVnb3J5TmFtZSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiZ2VuZXJhbE9wZW5Tb3VuZFBsYXllci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBzaGFyZWQgc291bmQgZ2VuZXJhdG9yIGZvciB3aGVuIHNvbWV0aGluZyBpcyBvcGVuZWQsIHVzZXMgc2luZ2xldG9uIHBhdHRlcm5cclxuICpcclxuICogQGF1dGhvciBKb2huIEJsYW5jbyAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgZ2VuZXJhbE9wZW5fbXAzIGZyb20gJy4uLy4uL3NvdW5kcy9nZW5lcmFsT3Blbl9tcDMuanMnO1xyXG5pbXBvcnQgU291bmRDbGlwUGxheWVyIGZyb20gJy4uL3NvdW5kLWdlbmVyYXRvcnMvU291bmRDbGlwUGxheWVyLmpzJztcclxuaW1wb3J0IHRhbWJvIGZyb20gJy4uL3RhbWJvLmpzJztcclxuXHJcbi8vIGNyZWF0ZSB0aGUgc2hhcmVkIHNvdW5kIGluc3RhbmNlXHJcbmNvbnN0IGdlbmVyYWxPcGVuU291bmRQbGF5ZXIgPSBuZXcgU291bmRDbGlwUGxheWVyKCBnZW5lcmFsT3Blbl9tcDMsIHtcclxuICBzb3VuZENsaXBPcHRpb25zOiB7IGluaXRpYWxPdXRwdXRMZXZlbDogMC40IH0sXHJcbiAgc291bmRNYW5hZ2VyT3B0aW9uczogeyBjYXRlZ29yeU5hbWU6ICd1c2VyLWludGVyZmFjZScgfVxyXG59ICk7XHJcblxyXG50YW1iby5yZWdpc3RlciggJ2dlbmVyYWxPcGVuU291bmRQbGF5ZXInLCBnZW5lcmFsT3BlblNvdW5kUGxheWVyICk7XHJcbmV4cG9ydCBkZWZhdWx0IGdlbmVyYWxPcGVuU291bmRQbGF5ZXI7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLGVBQWUsTUFBTSxpQ0FBaUM7QUFDN0QsT0FBT0MsZUFBZSxNQUFNLHdDQUF3QztBQUNwRSxPQUFPQyxLQUFLLE1BQU0sYUFBYTs7QUFFL0I7QUFDQSxNQUFNQyxzQkFBc0IsR0FBRyxJQUFJRixlQUFlLENBQUVELGVBQWUsRUFBRTtFQUNuRUksZ0JBQWdCLEVBQUU7SUFBRUMsa0JBQWtCLEVBQUU7RUFBSSxDQUFDO0VBQzdDQyxtQkFBbUIsRUFBRTtJQUFFQyxZQUFZLEVBQUU7RUFBaUI7QUFDeEQsQ0FBRSxDQUFDO0FBRUhMLEtBQUssQ0FBQ00sUUFBUSxDQUFFLHdCQUF3QixFQUFFTCxzQkFBdUIsQ0FBQztBQUNsRSxlQUFlQSxzQkFBc0IifQ==