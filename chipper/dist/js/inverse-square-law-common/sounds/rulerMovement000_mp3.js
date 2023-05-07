/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';
const soundURI = 'data:audio/mpeg;base64,//swxAAABziHXLRjAAEXGXG3GNACgEAnfvv8EAGAyewQIIcyM99s8Z7u//3u78ZzCBAgQQxyYAQcHC09iLPTtQIOEAIHC4IHFh/4n//+T9tlkrkljYICAgFAgAACoBGjxzxOBLZpKoE9LCwoFFSOTy+WEoF8C0wKMXrnTg96VfvYupf/qTSR//RWYqar//mxIVX/4SVUNXkSQCKT//syxAOACFiVb/z0ADENmmx09gj2TcAzXjkGSeJr6XK0ZTj5EeeM3KFhYbJIKRFFW5r9l+Va5qjdv9rwarUf/6/Pk0R6pYW9hLCf08SuF1+sJb8rOtJuRgf4LsFWdQMZXmjsAmzoSh70vuLo5tcxLhwrdt2DM/MrO6IbokEOr/3K3NM5W7AxLjOVs31V9WC8Skgm9CoB+u2AlJQMe//7MsQEAAhYjzdMGE9Awg5ndPEZPmWHL0CPtQn5ZUu1typbKSM5nbbn5wMSrvc5+SO/yXMURjHbdnkhoUpgJW+ywwcMEiz542GzjNh6v/+sEJNKRoIklQT/LYOYIp/jPZ8KA+/qmpS+/qUxiNZ+xJeHAJIqzj0k1B1u/9X//dT6KgBq+RIBKgC3JDKhZQii7l30f6ZS66ZWpUBRIRb/+zLEDgIF0HElRGCiMOOhYXScCEtF6jygL9RXrLSrvCiv3f4dDfkk60gQnKAEnLh5YMOVGcl5dauwk2pHmf2hf0Mn0cpWVi/7yqy0N8zxxNJf6KZSt/Xq3YrPbzGDHJMVIAbstjSTbgDBERlAOtsQqHob5qV0r6vTlLuFb0QM//ujqJUTlK1C3AXI8qg7b5b8kDSiAE7sPpLSFUio//swxB4ARlCrCaC8QnB8g6A0FIwOZQ58HWRLeWJQ7iUiJh7tR7ypEkGgKnZG0AABIgGtyPaBGgKocuTsN5mNiAwfJe////7+R//9NUxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//syxDiDxAwaq4zhIKAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7MsRsA8AAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhc3luY0xvYWRlciIsImJhc2U2NFNvdW5kVG9CeXRlQXJyYXkiLCJXcmFwcGVkQXVkaW9CdWZmZXIiLCJwaGV0QXVkaW9Db250ZXh0Iiwic291bmRVUkkiLCJzb3VuZEJ5dGVBcnJheSIsInVubG9jayIsImNyZWF0ZUxvY2siLCJ3cmFwcGVkQXVkaW9CdWZmZXIiLCJ1bmxvY2tlZCIsInNhZmVVbmxvY2siLCJvbkRlY29kZVN1Y2Nlc3MiLCJkZWNvZGVkQXVkaW8iLCJhdWRpb0J1ZmZlclByb3BlcnR5IiwidmFsdWUiLCJzZXQiLCJvbkRlY29kZUVycm9yIiwiZGVjb2RlRXJyb3IiLCJjb25zb2xlIiwid2FybiIsImNyZWF0ZUJ1ZmZlciIsInNhbXBsZVJhdGUiLCJkZWNvZGVQcm9taXNlIiwiZGVjb2RlQXVkaW9EYXRhIiwiYnVmZmVyIiwidGhlbiIsImNhdGNoIiwiZSJdLCJzb3VyY2VzIjpbInJ1bGVyTW92ZW1lbnQwMDBfbXAzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXHJcbmltcG9ydCBhc3luY0xvYWRlciBmcm9tICcuLi8uLi9waGV0LWNvcmUvanMvYXN5bmNMb2FkZXIuanMnO1xyXG5pbXBvcnQgYmFzZTY0U291bmRUb0J5dGVBcnJheSBmcm9tICcuLi8uLi90YW1iby9qcy9iYXNlNjRTb3VuZFRvQnl0ZUFycmF5LmpzJztcclxuaW1wb3J0IFdyYXBwZWRBdWRpb0J1ZmZlciBmcm9tICcuLi8uLi90YW1iby9qcy9XcmFwcGVkQXVkaW9CdWZmZXIuanMnO1xyXG5pbXBvcnQgcGhldEF1ZGlvQ29udGV4dCBmcm9tICcuLi8uLi90YW1iby9qcy9waGV0QXVkaW9Db250ZXh0LmpzJztcclxuXHJcbmNvbnN0IHNvdW5kVVJJID0gJ2RhdGE6YXVkaW8vbXBlZztiYXNlNjQsLy9zd3hBQUFCemlIWExSakFBRVhHWEczR05BQ2dFQW5mdnY4RUFHQXlld1FJSWN5TTk5czhaN3UvLzN1NzhaekNCQWdRUXh5WUFRY0hDMDlpTFBUdFFJT0VBSUhDNElIRmgvNG4vLytUOXRsa3JrbGpZSUNBZ0ZBZ0FBQ29CR2p4enhPQkxacEtvRTlMQ3dvRkZTT1R5K1dFb0Y4QzB3S01Ycm5UZzk2VmZ2WXVwZi9xVFNSLy9SV1lxYXIvL214SVZYLzRTVlVOWGtTUUNLVC8vc3l4QU9BQ0ZpVmIvejBBREVObW14MDlnajJUY0F6WGprR1NlSnI2WEswWlRqNUVlZU0zS0ZoWWJKSUtSRkZXNXI5bCtWYTVxamR2OXJ3YXJVZi82L1BrMFI2cFlXOWhMQ2YwOFN1RjErc0piOHJPdEp1UmdmNExzRldkUU1aWG1qc0Ftem9TaDcwdnVMbzV0Y3hMaHdyZHQyRE0vTXJPNklib2tFT3IvM0szTk01VzdBeExqT1ZzMzFWOVdDOFNrZ205Q29CK3UyQWxKUU1lLy83TXNRRUFBaFlqemRNR0U5QXdnNW5kUEVaUG1XSEwwQ1B0UW41WlV1MXR5cGJLU001bmJibjV3TVNydmM1K1NPL3lYTVVSakhiZG5raG9VcGdKVyt5d3djTUVpejU0Mkd6ak5oNnYvK3NFSk5LUm9Ja2xRVC9MWU9ZSXAvalBaOEtBKy9xbXBTKy9xVXhpTloreEplSEFKSXF6ajBrMUIxdS85WC8vZFQ2S2dCcStSSUJLZ0MzSkRLaFpRaWk3bDMwZjZaUzY2WldwVUJSSVJiLyt6TEVEZ0lGMEhFbFJHQ2lNT09oWVhTY0NFdEY2anlnTDlSWHJMU3J2Q2l2M2Y0ZERma2s2MGdRbktBRW5MaDVZTU9WR2NsNWRhdXdrMnBIbWYyaGYwTW4wY3BXVmkvN3lxeTBOOHp4eE5KZjZLWlN0L1hxM1lyUGJ6R0RISk1WSUFic3RqU1RiZ0RCRVJsQU90c1FxSG9iNXFWMHI2dlRsTHVGYjBRTS8vdWpxSlVUbEsxQzNBWEk4cWc3YjViOGtEU2lBRTdzUHBMU0ZVaW8vL3N3eEI0QVJsQ3JDYUM4UW5COGc2QTBGSXdPWlE1OEhXUkxlV0pRN2lVaUpoN3RSN3lwRWtHZ0tuWkcwQUFCSWdHdHlQYUJHZ0tvY3VUc041bU5pQXdmSmUvLy8vNytSLy85TlV4QlRVVXpMams1TGpWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWLy9zeXhEaUR4QXdhcTR6aElLQUFBRFNBQUFBRVZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZmLzdNc1JzQThBQUFhUUFBQUFnQUFBMGdBQUFCRlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlU9JztcclxuY29uc3Qgc291bmRCeXRlQXJyYXkgPSBiYXNlNjRTb3VuZFRvQnl0ZUFycmF5KCBwaGV0QXVkaW9Db250ZXh0LCBzb3VuZFVSSSApO1xyXG5jb25zdCB1bmxvY2sgPSBhc3luY0xvYWRlci5jcmVhdGVMb2NrKCBzb3VuZFVSSSApO1xyXG5jb25zdCB3cmFwcGVkQXVkaW9CdWZmZXIgPSBuZXcgV3JhcHBlZEF1ZGlvQnVmZmVyKCk7XHJcblxyXG4vLyBzYWZlIHdheSB0byB1bmxvY2tcclxubGV0IHVubG9ja2VkID0gZmFsc2U7XHJcbmNvbnN0IHNhZmVVbmxvY2sgPSAoKSA9PiB7XHJcbiAgaWYgKCAhdW5sb2NrZWQgKSB7XHJcbiAgICB1bmxvY2soKTtcclxuICAgIHVubG9ja2VkID0gdHJ1ZTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBvbkRlY29kZVN1Y2Nlc3MgPSBkZWNvZGVkQXVkaW8gPT4ge1xyXG4gIGlmICggd3JhcHBlZEF1ZGlvQnVmZmVyLmF1ZGlvQnVmZmVyUHJvcGVydHkudmFsdWUgPT09IG51bGwgKSB7XHJcbiAgICB3cmFwcGVkQXVkaW9CdWZmZXIuYXVkaW9CdWZmZXJQcm9wZXJ0eS5zZXQoIGRlY29kZWRBdWRpbyApO1xyXG4gICAgc2FmZVVubG9jaygpO1xyXG4gIH1cclxufTtcclxuY29uc3Qgb25EZWNvZGVFcnJvciA9IGRlY29kZUVycm9yID0+IHtcclxuICBjb25zb2xlLndhcm4oICdkZWNvZGUgb2YgYXVkaW8gZGF0YSBmYWlsZWQsIHVzaW5nIHN0dWJiZWQgc291bmQsIGVycm9yOiAnICsgZGVjb2RlRXJyb3IgKTtcclxuICB3cmFwcGVkQXVkaW9CdWZmZXIuYXVkaW9CdWZmZXJQcm9wZXJ0eS5zZXQoIHBoZXRBdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyKCAxLCAxLCBwaGV0QXVkaW9Db250ZXh0LnNhbXBsZVJhdGUgKSApO1xyXG4gIHNhZmVVbmxvY2soKTtcclxufTtcclxuY29uc3QgZGVjb2RlUHJvbWlzZSA9IHBoZXRBdWRpb0NvbnRleHQuZGVjb2RlQXVkaW9EYXRhKCBzb3VuZEJ5dGVBcnJheS5idWZmZXIsIG9uRGVjb2RlU3VjY2Vzcywgb25EZWNvZGVFcnJvciApO1xyXG5pZiAoIGRlY29kZVByb21pc2UgKSB7XHJcbiAgZGVjb2RlUHJvbWlzZVxyXG4gICAgLnRoZW4oIGRlY29kZWRBdWRpbyA9PiB7XHJcbiAgICAgIGlmICggd3JhcHBlZEF1ZGlvQnVmZmVyLmF1ZGlvQnVmZmVyUHJvcGVydHkudmFsdWUgPT09IG51bGwgKSB7XHJcbiAgICAgICAgd3JhcHBlZEF1ZGlvQnVmZmVyLmF1ZGlvQnVmZmVyUHJvcGVydHkuc2V0KCBkZWNvZGVkQXVkaW8gKTtcclxuICAgICAgICBzYWZlVW5sb2NrKCk7XHJcbiAgICAgIH1cclxuICAgIH0gKVxyXG4gICAgLmNhdGNoKCBlID0+IHtcclxuICAgICAgY29uc29sZS53YXJuKCAncHJvbWlzZSByZWplY3Rpb24gY2F1Z2h0IGZvciBhdWRpbyBkZWNvZGUsIGVycm9yID0gJyArIGUgKTtcclxuICAgICAgc2FmZVVubG9jaygpO1xyXG4gICAgfSApO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHdyYXBwZWRBdWRpb0J1ZmZlcjsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsT0FBT0EsV0FBVyxNQUFNLG1DQUFtQztBQUMzRCxPQUFPQyxzQkFBc0IsTUFBTSwwQ0FBMEM7QUFDN0UsT0FBT0Msa0JBQWtCLE1BQU0sc0NBQXNDO0FBQ3JFLE9BQU9DLGdCQUFnQixNQUFNLG9DQUFvQztBQUVqRSxNQUFNQyxRQUFRLEdBQUcsaTlDQUFpOUM7QUFDbCtDLE1BQU1DLGNBQWMsR0FBR0osc0JBQXNCLENBQUVFLGdCQUFnQixFQUFFQyxRQUFTLENBQUM7QUFDM0UsTUFBTUUsTUFBTSxHQUFHTixXQUFXLENBQUNPLFVBQVUsQ0FBRUgsUUFBUyxDQUFDO0FBQ2pELE1BQU1JLGtCQUFrQixHQUFHLElBQUlOLGtCQUFrQixDQUFDLENBQUM7O0FBRW5EO0FBQ0EsSUFBSU8sUUFBUSxHQUFHLEtBQUs7QUFDcEIsTUFBTUMsVUFBVSxHQUFHQSxDQUFBLEtBQU07RUFDdkIsSUFBSyxDQUFDRCxRQUFRLEVBQUc7SUFDZkgsTUFBTSxDQUFDLENBQUM7SUFDUkcsUUFBUSxHQUFHLElBQUk7RUFDakI7QUFDRixDQUFDO0FBRUQsTUFBTUUsZUFBZSxHQUFHQyxZQUFZLElBQUk7RUFDdEMsSUFBS0osa0JBQWtCLENBQUNLLG1CQUFtQixDQUFDQyxLQUFLLEtBQUssSUFBSSxFQUFHO0lBQzNETixrQkFBa0IsQ0FBQ0ssbUJBQW1CLENBQUNFLEdBQUcsQ0FBRUgsWUFBYSxDQUFDO0lBQzFERixVQUFVLENBQUMsQ0FBQztFQUNkO0FBQ0YsQ0FBQztBQUNELE1BQU1NLGFBQWEsR0FBR0MsV0FBVyxJQUFJO0VBQ25DQyxPQUFPLENBQUNDLElBQUksQ0FBRSwyREFBMkQsR0FBR0YsV0FBWSxDQUFDO0VBQ3pGVCxrQkFBa0IsQ0FBQ0ssbUJBQW1CLENBQUNFLEdBQUcsQ0FBRVosZ0JBQWdCLENBQUNpQixZQUFZLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRWpCLGdCQUFnQixDQUFDa0IsVUFBVyxDQUFFLENBQUM7RUFDaEhYLFVBQVUsQ0FBQyxDQUFDO0FBQ2QsQ0FBQztBQUNELE1BQU1ZLGFBQWEsR0FBR25CLGdCQUFnQixDQUFDb0IsZUFBZSxDQUFFbEIsY0FBYyxDQUFDbUIsTUFBTSxFQUFFYixlQUFlLEVBQUVLLGFBQWMsQ0FBQztBQUMvRyxJQUFLTSxhQUFhLEVBQUc7RUFDbkJBLGFBQWEsQ0FDVkcsSUFBSSxDQUFFYixZQUFZLElBQUk7SUFDckIsSUFBS0osa0JBQWtCLENBQUNLLG1CQUFtQixDQUFDQyxLQUFLLEtBQUssSUFBSSxFQUFHO01BQzNETixrQkFBa0IsQ0FBQ0ssbUJBQW1CLENBQUNFLEdBQUcsQ0FBRUgsWUFBYSxDQUFDO01BQzFERixVQUFVLENBQUMsQ0FBQztJQUNkO0VBQ0YsQ0FBRSxDQUFDLENBQ0ZnQixLQUFLLENBQUVDLENBQUMsSUFBSTtJQUNYVCxPQUFPLENBQUNDLElBQUksQ0FBRSxxREFBcUQsR0FBR1EsQ0FBRSxDQUFDO0lBQ3pFakIsVUFBVSxDQUFDLENBQUM7RUFDZCxDQUFFLENBQUM7QUFDUDtBQUNBLGVBQWVGLGtCQUFrQiJ9