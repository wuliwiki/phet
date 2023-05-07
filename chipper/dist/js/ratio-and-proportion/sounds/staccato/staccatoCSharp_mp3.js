/* eslint-disable */
import asyncLoader from '../../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../../tambo/js/phetAudioContext.js';
const soundURI = 'data:audio/mpeg;base64,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';
const soundByteArray = base64SoundToByteArray(phetAudioContext, soundURI);
const unlock = asyncLoader.createLock(soundURI);
const wrappedAudioBuffer = new WrappedAudioBuffer();

// safe way to unlock
let unlocked = false;
const safeUnlock = () => {
  if (!unlocked) {
    unlock();
    unlocked = true;
  }
};
const onDecodeSuccess = decodedAudio => {
  if (wrappedAudioBuffer.audioBufferProperty.value === null) {
    wrappedAudioBuffer.audioBufferProperty.set(decodedAudio);
    safeUnlock();
  }
};
const onDecodeError = decodeError => {
  console.warn('decode of audio data failed, using stubbed sound, error: ' + decodeError);
  wrappedAudioBuffer.audioBufferProperty.set(phetAudioContext.createBuffer(1, 1, phetAudioContext.sampleRate));
  safeUnlock();
};
const decodePromise = phetAudioContext.decodeAudioData(soundByteArray.buffer, onDecodeSuccess, onDecodeError);
if (decodePromise) {
  decodePromise.then(decodedAudio => {
    if (wrappedAudioBuffer.audioBufferProperty.value === null) {
      wrappedAudioBuffer.audioBufferProperty.set(decodedAudio);
      safeUnlock();
    }
  }).catch(e => {
    console.warn('promise rejection caught for audio decode, error = ' + e);
    safeUnlock();
  });
}
export default wrappedAudioBuffer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhc3luY0xvYWRlciIsImJhc2U2NFNvdW5kVG9CeXRlQXJyYXkiLCJXcmFwcGVkQXVkaW9CdWZmZXIiLCJwaGV0QXVkaW9Db250ZXh0Iiwic291bmRVUkkiLCJzb3VuZEJ5dGVBcnJheSIsInVubG9jayIsImNyZWF0ZUxvY2siLCJ3cmFwcGVkQXVkaW9CdWZmZXIiLCJ1bmxvY2tlZCIsInNhZmVVbmxvY2siLCJvbkRlY29kZVN1Y2Nlc3MiLCJkZWNvZGVkQXVkaW8iLCJhdWRpb0J1ZmZlclByb3BlcnR5IiwidmFsdWUiLCJzZXQiLCJvbkRlY29kZUVycm9yIiwiZGVjb2RlRXJyb3IiLCJjb25zb2xlIiwid2FybiIsImNyZWF0ZUJ1ZmZlciIsInNhbXBsZVJhdGUiLCJkZWNvZGVQcm9taXNlIiwiZGVjb2RlQXVkaW9EYXRhIiwiYnVmZmVyIiwidGhlbiIsImNhdGNoIiwiZSJdLCJzb3VyY2VzIjpbInN0YWNjYXRvQ1NoYXJwX21wMy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG5pbXBvcnQgYXN5bmNMb2FkZXIgZnJvbSAnLi4vLi4vLi4vcGhldC1jb3JlL2pzL2FzeW5jTG9hZGVyLmpzJztcclxuaW1wb3J0IGJhc2U2NFNvdW5kVG9CeXRlQXJyYXkgZnJvbSAnLi4vLi4vLi4vdGFtYm8vanMvYmFzZTY0U291bmRUb0J5dGVBcnJheS5qcyc7XHJcbmltcG9ydCBXcmFwcGVkQXVkaW9CdWZmZXIgZnJvbSAnLi4vLi4vLi4vdGFtYm8vanMvV3JhcHBlZEF1ZGlvQnVmZmVyLmpzJztcclxuaW1wb3J0IHBoZXRBdWRpb0NvbnRleHQgZnJvbSAnLi4vLi4vLi4vdGFtYm8vanMvcGhldEF1ZGlvQ29udGV4dC5qcyc7XHJcblxyXG5jb25zdCBzb3VuZFVSSSA9ICdkYXRhOmF1ZGlvL21wZWc7YmFzZTY0LC8vdVF4QUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFXR2x1WndBQUFBOEFBQUFIQUFBR0dnQTZPam82T2pvNk9qbzZPam82T21KaVltSmlZbUppWW1KaVltSmlpNHVMaTR1TGk0dUxpNHVMaTR1dXJxNnVycTZ1cnE2dXJxNnVycTdSMGRIUjBkSFIwZEhSMGRIUjBlam82T2pvNk9qbzZPam82T2pvLy8vLy8vLy8vLy8vLy8vLy8vOEFBQUE2VEVGTlJUTXVPVGx5QW5FQUFBQUFBQUFBQUJRd0pBWDlRZ0FBTUFBQUJocnRBZVBmQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUEvL3RneEFBQUJ0eE5JSFdFZ0FKM0hXcXJOWkFBQUpkd0FQbWprWldnS2xOc3p2YzV2QXoycHEzb3JxRHJIWGUxK0g3OUlHeWVTQkF4Yyt1am50S0lJV2dRRFFmZjhQLzRZLytHRkFBQWFMc1d5MjZUYXBnQUJZd2JoTVpsZ2FEZUdEZ1hHUXNOY2NDMUU4TzA1cFE4MUlNR1JRRWhXeERBNGxFTTdXT0pnbDhCYkVyUXlaMjErd2xabVJVaTBhN0l1NG5QVG5Td2x6elNOczBWa0RPSElpbCtVRnVZRVZ5OHpwTmtsZG1Ick1zZitYOXNWMjlsRFhzNE9wWUhvSlhVb3JzL1NXUHp6emlVcGlPNTdIUGQvN3ZmeHNiN3ZQOE1NS2VXMGQyT1pSbXRlQ1VUQlFqOEJHQnlnQVlZcHh5UUFpVXhtR0RUMHZWQTZDRWVIaTBvS2djVnhXWkkvL3RBeEEyQVN1Q25aMTJGZ0RGYmthaE4zWnk3RDViU3FxQVpXY21UYUtsVHFJZVhPY1hiVHBxV3BHUEZscmJvMU9sSmJUYWk0SjBQcHptdHJ1TC85Sy8rVFVxR2g0U1BQaFhFY3NvS3lTK1dBU2hoR0NCZjB3SEI0MlFqNEJHVUhBSUNjMDBsY0VRR2txWjdXZ3JCVHFKUlV6MCtaVzNBZFJneFJoNnV2anVsVWxSWDZ5aDBpNFZEbWhZVzBCYzlNMGVhT2c1YWpJZU5XbkkvcVJkNEtLL2JCMjErZlkyTEFjWW9BR2pnVStOQ3FmWHNHUGIvKzBERUJ3SUtISFU0YnZFajBVQ0taK21PNENiZ0JFWXhoUVQ4QW9JaUtxdWFxazVpME1wNkFnT214Z1NOQVZueGdFK0J3Tm5yeXFONzJGSnhUVkJjeHNSTG5MWjdRNTYzMlE1S210OVo0cEhnMUkyTC8vL1lEVGNzcmJCeVNxb1lDZytjT0oyWW1nYTB3SEE2YWZCV2dBSVFHTUJDb0RCcVlpU3FNTlgrdkJleE0vbnRLbzhIU1ZGbm01Ty9rajNYK1NyZjZqWFZQUjJJUlRkbU5sRDB6YWpZRzMvLy80OEFBQ2tSRzBZQWVLQzRzQ0RjZGYvN01NUUhBZ2tJUXpWTmQyQXhLZ2VrRGE5MEFtOVlERUlLajVoSDRlWTRpQUFMUUhFeVFLUklmYWNheVJNM2tDNmlZYW5ldjdZK1ZMKy9VU3RmbExwTzcrdjZhYkhQUDNmN1dkamZYL3BDUUNDNFBTd01mT01FSVc4MENyN3pjUXZRRUlSakRpaDZPU29PSGNBREdZTVUyWlVCU0JRR0Fncm1aUUlCZ0t1dVFDS0VEMHlWL21WWCtaeUwvdTg5V2tkLy85ZjBmLy85bUJFQUFQLzdNTVFCQUFmSUxUVk9ieUp3NTRUbDhiMDhadkk1R3dnQ0lBSSttQ1FzWkU1d1p4RkFhWWFZSGhpeUk3RXpnTEpsNTJPRi9hbWErUlpxbDVETGlmcjZFcjNMdSszNjQ1ekk1UC9yV3RYUnhVQUFnRk9mOVNDUHJGeElVTy91d0d3U2FKU1owVWpZMDlnS3VMOVVMeElITFZTUXVUenk2ZXlwK2oydUFMVmZ1KzFybnQyclJGS2Z1YlNxQUFBSkVNb3JBV0VGTEdOVUNma25Kdi83RU1RSUFBYTRKUmRNY3dDQWtRTW0vQmVZRGpRM2d3UkFCUm1qQWVHaGRVQ3BLYXIyYmkvRU8ycVV5ajIxTC8renI2dER2MS8vTC8ra0JFUklsQ0hHdGxqQW02RmVKTmtzQXd4NkszRnRZYWcwL28va2Zrdi9pTCsvLytkb3pMeXdBQUFBQUFBRS8vc1F4QVNEd2pRUS84WXd3RGdBQURTQUFBQUVnNUZSREVFd0FGZ0ZURUZOUlRNdU9Ua3VOVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlU9JztcclxuY29uc3Qgc291bmRCeXRlQXJyYXkgPSBiYXNlNjRTb3VuZFRvQnl0ZUFycmF5KCBwaGV0QXVkaW9Db250ZXh0LCBzb3VuZFVSSSApO1xyXG5jb25zdCB1bmxvY2sgPSBhc3luY0xvYWRlci5jcmVhdGVMb2NrKCBzb3VuZFVSSSApO1xyXG5jb25zdCB3cmFwcGVkQXVkaW9CdWZmZXIgPSBuZXcgV3JhcHBlZEF1ZGlvQnVmZmVyKCk7XHJcblxyXG4vLyBzYWZlIHdheSB0byB1bmxvY2tcclxubGV0IHVubG9ja2VkID0gZmFsc2U7XHJcbmNvbnN0IHNhZmVVbmxvY2sgPSAoKSA9PiB7XHJcbiAgaWYgKCAhdW5sb2NrZWQgKSB7XHJcbiAgICB1bmxvY2soKTtcclxuICAgIHVubG9ja2VkID0gdHJ1ZTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBvbkRlY29kZVN1Y2Nlc3MgPSBkZWNvZGVkQXVkaW8gPT4ge1xyXG4gIGlmICggd3JhcHBlZEF1ZGlvQnVmZmVyLmF1ZGlvQnVmZmVyUHJvcGVydHkudmFsdWUgPT09IG51bGwgKSB7XHJcbiAgICB3cmFwcGVkQXVkaW9CdWZmZXIuYXVkaW9CdWZmZXJQcm9wZXJ0eS5zZXQoIGRlY29kZWRBdWRpbyApO1xyXG4gICAgc2FmZVVubG9jaygpO1xyXG4gIH1cclxufTtcclxuY29uc3Qgb25EZWNvZGVFcnJvciA9IGRlY29kZUVycm9yID0+IHtcclxuICBjb25zb2xlLndhcm4oICdkZWNvZGUgb2YgYXVkaW8gZGF0YSBmYWlsZWQsIHVzaW5nIHN0dWJiZWQgc291bmQsIGVycm9yOiAnICsgZGVjb2RlRXJyb3IgKTtcclxuICB3cmFwcGVkQXVkaW9CdWZmZXIuYXVkaW9CdWZmZXJQcm9wZXJ0eS5zZXQoIHBoZXRBdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyKCAxLCAxLCBwaGV0QXVkaW9Db250ZXh0LnNhbXBsZVJhdGUgKSApO1xyXG4gIHNhZmVVbmxvY2soKTtcclxufTtcclxuY29uc3QgZGVjb2RlUHJvbWlzZSA9IHBoZXRBdWRpb0NvbnRleHQuZGVjb2RlQXVkaW9EYXRhKCBzb3VuZEJ5dGVBcnJheS5idWZmZXIsIG9uRGVjb2RlU3VjY2Vzcywgb25EZWNvZGVFcnJvciApO1xyXG5pZiAoIGRlY29kZVByb21pc2UgKSB7XHJcbiAgZGVjb2RlUHJvbWlzZVxyXG4gICAgLnRoZW4oIGRlY29kZWRBdWRpbyA9PiB7XHJcbiAgICAgIGlmICggd3JhcHBlZEF1ZGlvQnVmZmVyLmF1ZGlvQnVmZmVyUHJvcGVydHkudmFsdWUgPT09IG51bGwgKSB7XHJcbiAgICAgICAgd3JhcHBlZEF1ZGlvQnVmZmVyLmF1ZGlvQnVmZmVyUHJvcGVydHkuc2V0KCBkZWNvZGVkQXVkaW8gKTtcclxuICAgICAgICBzYWZlVW5sb2NrKCk7XHJcbiAgICAgIH1cclxuICAgIH0gKVxyXG4gICAgLmNhdGNoKCBlID0+IHtcclxuICAgICAgY29uc29sZS53YXJuKCAncHJvbWlzZSByZWplY3Rpb24gY2F1Z2h0IGZvciBhdWRpbyBkZWNvZGUsIGVycm9yID0gJyArIGUgKTtcclxuICAgICAgc2FmZVVubG9jaygpO1xyXG4gICAgfSApO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHdyYXBwZWRBdWRpb0J1ZmZlcjsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsT0FBT0EsV0FBVyxNQUFNLHNDQUFzQztBQUM5RCxPQUFPQyxzQkFBc0IsTUFBTSw2Q0FBNkM7QUFDaEYsT0FBT0Msa0JBQWtCLE1BQU0seUNBQXlDO0FBQ3hFLE9BQU9DLGdCQUFnQixNQUFNLHVDQUF1QztBQUVwRSxNQUFNQyxRQUFRLEdBQUcsNmpFQUE2akU7QUFDOWtFLE1BQU1DLGNBQWMsR0FBR0osc0JBQXNCLENBQUVFLGdCQUFnQixFQUFFQyxRQUFTLENBQUM7QUFDM0UsTUFBTUUsTUFBTSxHQUFHTixXQUFXLENBQUNPLFVBQVUsQ0FBRUgsUUFBUyxDQUFDO0FBQ2pELE1BQU1JLGtCQUFrQixHQUFHLElBQUlOLGtCQUFrQixDQUFDLENBQUM7O0FBRW5EO0FBQ0EsSUFBSU8sUUFBUSxHQUFHLEtBQUs7QUFDcEIsTUFBTUMsVUFBVSxHQUFHQSxDQUFBLEtBQU07RUFDdkIsSUFBSyxDQUFDRCxRQUFRLEVBQUc7SUFDZkgsTUFBTSxDQUFDLENBQUM7SUFDUkcsUUFBUSxHQUFHLElBQUk7RUFDakI7QUFDRixDQUFDO0FBRUQsTUFBTUUsZUFBZSxHQUFHQyxZQUFZLElBQUk7RUFDdEMsSUFBS0osa0JBQWtCLENBQUNLLG1CQUFtQixDQUFDQyxLQUFLLEtBQUssSUFBSSxFQUFHO0lBQzNETixrQkFBa0IsQ0FBQ0ssbUJBQW1CLENBQUNFLEdBQUcsQ0FBRUgsWUFBYSxDQUFDO0lBQzFERixVQUFVLENBQUMsQ0FBQztFQUNkO0FBQ0YsQ0FBQztBQUNELE1BQU1NLGFBQWEsR0FBR0MsV0FBVyxJQUFJO0VBQ25DQyxPQUFPLENBQUNDLElBQUksQ0FBRSwyREFBMkQsR0FBR0YsV0FBWSxDQUFDO0VBQ3pGVCxrQkFBa0IsQ0FBQ0ssbUJBQW1CLENBQUNFLEdBQUcsQ0FBRVosZ0JBQWdCLENBQUNpQixZQUFZLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRWpCLGdCQUFnQixDQUFDa0IsVUFBVyxDQUFFLENBQUM7RUFDaEhYLFVBQVUsQ0FBQyxDQUFDO0FBQ2QsQ0FBQztBQUNELE1BQU1ZLGFBQWEsR0FBR25CLGdCQUFnQixDQUFDb0IsZUFBZSxDQUFFbEIsY0FBYyxDQUFDbUIsTUFBTSxFQUFFYixlQUFlLEVBQUVLLGFBQWMsQ0FBQztBQUMvRyxJQUFLTSxhQUFhLEVBQUc7RUFDbkJBLGFBQWEsQ0FDVkcsSUFBSSxDQUFFYixZQUFZLElBQUk7SUFDckIsSUFBS0osa0JBQWtCLENBQUNLLG1CQUFtQixDQUFDQyxLQUFLLEtBQUssSUFBSSxFQUFHO01BQzNETixrQkFBa0IsQ0FBQ0ssbUJBQW1CLENBQUNFLEdBQUcsQ0FBRUgsWUFBYSxDQUFDO01BQzFERixVQUFVLENBQUMsQ0FBQztJQUNkO0VBQ0YsQ0FBRSxDQUFDLENBQ0ZnQixLQUFLLENBQUVDLENBQUMsSUFBSTtJQUNYVCxPQUFPLENBQUNDLElBQUksQ0FBRSxxREFBcUQsR0FBR1EsQ0FBRSxDQUFDO0lBQ3pFakIsVUFBVSxDQUFDLENBQUM7RUFDZCxDQUFFLENBQUM7QUFDUDtBQUNBLGVBQWVGLGtCQUFrQiJ9