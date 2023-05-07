/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhc3luY0xvYWRlciIsImJhc2U2NFNvdW5kVG9CeXRlQXJyYXkiLCJXcmFwcGVkQXVkaW9CdWZmZXIiLCJwaGV0QXVkaW9Db250ZXh0Iiwic291bmRVUkkiLCJzb3VuZEJ5dGVBcnJheSIsInVubG9jayIsImNyZWF0ZUxvY2siLCJ3cmFwcGVkQXVkaW9CdWZmZXIiLCJ1bmxvY2tlZCIsInNhZmVVbmxvY2siLCJvbkRlY29kZVN1Y2Nlc3MiLCJkZWNvZGVkQXVkaW8iLCJhdWRpb0J1ZmZlclByb3BlcnR5IiwidmFsdWUiLCJzZXQiLCJvbkRlY29kZUVycm9yIiwiZGVjb2RlRXJyb3IiLCJjb25zb2xlIiwid2FybiIsImNyZWF0ZUJ1ZmZlciIsInNhbXBsZVJhdGUiLCJkZWNvZGVQcm9taXNlIiwiZGVjb2RlQXVkaW9EYXRhIiwiYnVmZmVyIiwidGhlbiIsImNhdGNoIiwiZSJdLCJzb3VyY2VzIjpbInNlbGVjdGlvbkFycGVnZ2lvMDA0X21wMy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG5pbXBvcnQgYXN5bmNMb2FkZXIgZnJvbSAnLi4vLi4vcGhldC1jb3JlL2pzL2FzeW5jTG9hZGVyLmpzJztcclxuaW1wb3J0IGJhc2U2NFNvdW5kVG9CeXRlQXJyYXkgZnJvbSAnLi4vLi4vdGFtYm8vanMvYmFzZTY0U291bmRUb0J5dGVBcnJheS5qcyc7XHJcbmltcG9ydCBXcmFwcGVkQXVkaW9CdWZmZXIgZnJvbSAnLi4vLi4vdGFtYm8vanMvV3JhcHBlZEF1ZGlvQnVmZmVyLmpzJztcclxuaW1wb3J0IHBoZXRBdWRpb0NvbnRleHQgZnJvbSAnLi4vLi4vdGFtYm8vanMvcGhldEF1ZGlvQ29udGV4dC5qcyc7XHJcblxyXG5jb25zdCBzb3VuZFVSSSA9ICdkYXRhOmF1ZGlvL21wZWc7YmFzZTY0LC8vc3d4QUFEQmxnWkFPTVlSRkVmbWFQQ3NOQUFBRVNvUURBaXRCTWdMT0lqd3NRNWt5Q2JjUW13aXVUTk4wRkZVamhNQTVJQ2ZVR1BRNlFsejdELytKNWQ4dURrb2NoYVNwVm1OWnJTRGx2aEhVbERZd2VlMGRXTndFQkJrSW1Zbk92Y3pKaEtJZU9BWU0zZENJQUVnS0RGeE4rbWNMaExsOHZxL29kLy8vMnpNMyttbmJyTDZSdVlHbi8vd2VEQ3AvbUgrVUxOU3lHM2JvM3QvL3N5eEFZQUNTRHRRaG1ZQUFFUWlhblhOb0FBQ09BM2lWeFdCc1Rkbk4wRTlLa01RZ0I5MU01d09uR3FKelBQV1ZFS2lkTEprVkYrNzhyS05FbS8vZHFiUDdWMWZvMXVnMy9YL24rNytUOG9Cd0lHdnRJRnNtQURqRFJDY1BBQVNrODRkSFFVM3RMTGdIWHBBWENGUHNMWXQxNUo4TUJaQ3hwb05iTEZLV0p4WDg4aWRseFFGQitpZUtzUjhtNlJqMGN0MmYvTFZlQWxyYmNiS1AvN01zUURBQWhRVTJGZGt3QXhCd3JuZ1k0WXFBU3RMNU0xWXM3c0VnaWNISkdZVXBKQmwwb1pyVU14SzZBR1JNSnduQjhmdW5OWXlyWitlQTJOdVhhRUQ2enNOdUtBUE9lSVBwZGVwM0VkWWRockYvM0FVeE1xRFdndVBBZ1kvU0h6TVptQzVEV2t3Rm5UTldoUlNQdWpJYTBYZ2lTQVJ1SUV0NXJ6bGF6T3FUS1hWWGkxS3NaRHY3YnRleWRYOUU2aTZsVzhnQjZ5eVdRQkFCWC8rekxFQklBSWhIRnJyS1J3c1FvSmFxVE5HSllBUUNrT2g2bzJYMklBbjZMcStnNU1zQWFtNHBncEVKWmNCb0R2UFc3Z25GalNZb1lSUklIc29sZGlhb2RucUdLblJES0o3K0xUWC8vLzlGQUFxMTlJR1lySFE3RGd3OG9GS0RMNkIwb2VRdXdRQmdobzRZUEN5QmFVTzA3Y1QxVzFKNklSU0FSNHVWYU1CeGVzOG9GVEwyQUZXa1ZkRlJycEs5VnR3Tkt4Z0EvKzNiVUFBRW9lLy9zd3hBVUFDR0JiZDZaa3l2a1JpZXBrelNDZVRxSG9UdEVDNWVIZGMrcko1dyt3alVSRVppRXdtR0xXb0NsVTFORnZzbEpWU0p4NkZHbVlIUk8yVG5RWUhOa1lzT29jK0ova3ZxdkJjQUh1L3BBelVRY3dCZU1aMTBtMmtESlUvWWhieGdKUWV1Z1VMQ1lzVDZucmIxY3F6dDVOY2pnVUNydENpYVZ1aHBMbHFVUlJROFNsVHcwd0RRNlN5SDZOYnFsVkJBQUFUa2thSUFGNi8vc3l4QVNBU0ZoVFJhQnd3WEQ1Q2lXaDdCMk9qcEYxbVJDMkpMTTFpUndhZ3pQeGNWQUJMTVoxQ0RnZ3hiSXJRM08vSXBFa2hEeVJJaEt6ZEd5eHdTZWFLcGlXMUI1akZsbGhvT3ErV0FBQVpFdGZwMVZOaTBwZ1FncEdGMGdNWTY0SFJuK0QzbUtRRmliUEFacGhoQXZHSFcxQVk5UVdoZ1VnUm1nUmVOUVJuRHZ6bmR4MVRYaU4rb1ZOQUFBSWdBQXF4aHcxYkFhQk1kQU5KZi83TXNRSUFnY0FVUzB0ZEVWZzNJV2w5WTZZcExnTXppb1BZY0tNaWI0TnFuck1PaHVOYTlLUDdoUU1Td0pCUVFGODFCR3NQL1NaOUg0UCtFY0FpUUFBQmdXcVdOUDZwa1pwbVM2Mm1rUXBtcFZPbUlyS0g3SXdtSTRDbWY4K25vQWdnWVVrUlcra0FnMDZkOVAvLy8vLy8vLzFLZ0FBSXdNQ05ib0krd2dzQTJZM1EyWWJBeVk5MFVZZHBDZTBwc1lTa0tGVkF6R3NDYkJvRHdMLyt6TEVGQUFIU0NzdEx2bnFNT1VGWmVtdWRNNFVnQnpxdG9uTSs3Ly8rdXB6di8vLysvb0JBQW9EQm9Cais4dnZ5b3lkb0NmMDZZaXg1Z2F3bkRGWUNDS1pyWkthV2lxWUtBTWcrd3h5NDNMTFptMnYreHVyLzIxL3R2L2QvLzc2QUFBQUczZ0dpUUdQYk1hYVNLZ1lkeHhxa1NIQnFnYUdlWjY4UUpnMER4cGtMQjRPQVFzTnBFcGpqOXl1Z3VzaTlDTlgvLyszczlIL3QvdkEvL3N3eEI0Q0IyZ3JKNjUzQ0dEV2hXUzBiblJjQTRvRkNFSGc4RWNOR3d5eThqSGd1T2VsVXhmS0RuajNNQW5JQ2NZY1Nqb1lHQW1nS2JqSEp5ZXN2cCtqLy8vVi8vOUgvOU9tbHNOT2lrY0tBdVpTc09iSENXY2ZLcVliMUVhbElUSmc3aHFHUXJIZ1lKWW14Z2RnbG1qUUZLWElXSTBPQkxidi8vLy8vOWYwV0lXQUt5QlJXTEFMSWlGWmhWQUlPVGsxRmQ0eHBKVThWVWdBLy9zeXhDa0RCeVF0RWc3N0NFRGFCV0tNYkhSQUJXYXMxVWR4QllKRW1UQTRtZXl4OUluY2IvLy8yZkpxK245UC8vOWlBQUFBRmNtZ0JLQ21NQnZveE0yM001WjB6ZEV6RFRCTjFGd3hFTFRJOGhQVENNSEJwWEw5WHRCdFhVODZsSHdzbzE3bi8vL2Ivc2UzMCtvQXdNTlNSSFB5WG1NMDREeXlBeG9VSXhVQ2s0bUpjd3NETXdtdnMybUY4S2dRc0RCVTNidlgzZi8vL3Mzby8vLzdNc1ExQXdkZ0p4dWg2NEpRM1FWaUNHMzBTTW4ycGNsTzcyOXFhZ0FBQUJiUUl3QUJyRmlIalFRR1A5eGo0d2Rxd21hM3hxN3lMRlpqZEFwZ29GSVlBREw0Y2pkT0NkVjNiLy9xMVlqK3ZYK3p0WmZOM09vYmNSQTZ6VGs1QVB0TmRHTVJrNDgrY2djY2pRazdONGdFbUVpdGJ5US9LNm0vLy8vN0tjZlNYZU1yV0g1ZGdxT0lqSWlTVUxnUXNPUTk2UkhWQUFCOXVNZ0FoRzMvK3pMRVA0TkhTQ2NSbzIraXdPK0ZZUUE5Y0VoYWRFZDFIMlRUeENGQ0lUejBBZ3dIeW0xbnVMWXA3aFR0cjMveG43LysvbyszN2FidU1CcHFJZ0JnbVIxSW1DUHBpbUpLV0J6NERad0ZkZ2w2VWlwRFZSTk8yV0ttdjd2eG4rYzdMVUZlTktxcVFZZWFaTEpRQUtrb2tBQ0ZUUW5kYjVXUjNHVXpBaFVqVUZwR3hDdXhIb0cvcUtYcUpEaXkyLzJyNXE5ekY0eGdJT3o2TjcrQS8vc3d4RWdDQmJnakVVRG5RbEREZytIb0hHUktCYWJpSUFRaWxJcktsUTlBeThPajQxVExwUWt1TEFSZ1ZwclAvaWlHYXNpNnUzZE14Tk11MWtSUkZab0NEUmZKNzdFQUEwbW5XQUFCUk5ET0ZNNjdsMThubC9ja2YvM3IvMzE0Y2YxemNKa2x0Q3RjYWFZNnloZy9HY3JHVmN4bHpVcytzc0YxWmdBb1VDRS8xbDhNUC8rSjVmLy8vMzhVNGhUQ3Z4dG12S3BmcnNLY0JBVlUvL3N5eEZ3QUJmZ2REMENIQUZESkE2Rm9FTEFLb0ZBVjh3cXJac3NTSlZUSmFham5janNzU29zRklzaXFURUZOUlRNdU9Ua3VNNnFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXYvN01zUnZBRWJKR3dPaEJISEkzQ1FlSkJHYnlhcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxbz0nO1xyXG5jb25zdCBzb3VuZEJ5dGVBcnJheSA9IGJhc2U2NFNvdW5kVG9CeXRlQXJyYXkoIHBoZXRBdWRpb0NvbnRleHQsIHNvdW5kVVJJICk7XHJcbmNvbnN0IHVubG9jayA9IGFzeW5jTG9hZGVyLmNyZWF0ZUxvY2soIHNvdW5kVVJJICk7XHJcbmNvbnN0IHdyYXBwZWRBdWRpb0J1ZmZlciA9IG5ldyBXcmFwcGVkQXVkaW9CdWZmZXIoKTtcclxuXHJcbi8vIHNhZmUgd2F5IHRvIHVubG9ja1xyXG5sZXQgdW5sb2NrZWQgPSBmYWxzZTtcclxuY29uc3Qgc2FmZVVubG9jayA9ICgpID0+IHtcclxuICBpZiAoICF1bmxvY2tlZCApIHtcclxuICAgIHVubG9jaygpO1xyXG4gICAgdW5sb2NrZWQgPSB0cnVlO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IG9uRGVjb2RlU3VjY2VzcyA9IGRlY29kZWRBdWRpbyA9PiB7XHJcbiAgaWYgKCB3cmFwcGVkQXVkaW9CdWZmZXIuYXVkaW9CdWZmZXJQcm9wZXJ0eS52YWx1ZSA9PT0gbnVsbCApIHtcclxuICAgIHdyYXBwZWRBdWRpb0J1ZmZlci5hdWRpb0J1ZmZlclByb3BlcnR5LnNldCggZGVjb2RlZEF1ZGlvICk7XHJcbiAgICBzYWZlVW5sb2NrKCk7XHJcbiAgfVxyXG59O1xyXG5jb25zdCBvbkRlY29kZUVycm9yID0gZGVjb2RlRXJyb3IgPT4ge1xyXG4gIGNvbnNvbGUud2FybiggJ2RlY29kZSBvZiBhdWRpbyBkYXRhIGZhaWxlZCwgdXNpbmcgc3R1YmJlZCBzb3VuZCwgZXJyb3I6ICcgKyBkZWNvZGVFcnJvciApO1xyXG4gIHdyYXBwZWRBdWRpb0J1ZmZlci5hdWRpb0J1ZmZlclByb3BlcnR5LnNldCggcGhldEF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXIoIDEsIDEsIHBoZXRBdWRpb0NvbnRleHQuc2FtcGxlUmF0ZSApICk7XHJcbiAgc2FmZVVubG9jaygpO1xyXG59O1xyXG5jb25zdCBkZWNvZGVQcm9taXNlID0gcGhldEF1ZGlvQ29udGV4dC5kZWNvZGVBdWRpb0RhdGEoIHNvdW5kQnl0ZUFycmF5LmJ1ZmZlciwgb25EZWNvZGVTdWNjZXNzLCBvbkRlY29kZUVycm9yICk7XHJcbmlmICggZGVjb2RlUHJvbWlzZSApIHtcclxuICBkZWNvZGVQcm9taXNlXHJcbiAgICAudGhlbiggZGVjb2RlZEF1ZGlvID0+IHtcclxuICAgICAgaWYgKCB3cmFwcGVkQXVkaW9CdWZmZXIuYXVkaW9CdWZmZXJQcm9wZXJ0eS52YWx1ZSA9PT0gbnVsbCApIHtcclxuICAgICAgICB3cmFwcGVkQXVkaW9CdWZmZXIuYXVkaW9CdWZmZXJQcm9wZXJ0eS5zZXQoIGRlY29kZWRBdWRpbyApO1xyXG4gICAgICAgIHNhZmVVbmxvY2soKTtcclxuICAgICAgfVxyXG4gICAgfSApXHJcbiAgICAuY2F0Y2goIGUgPT4ge1xyXG4gICAgICBjb25zb2xlLndhcm4oICdwcm9taXNlIHJlamVjdGlvbiBjYXVnaHQgZm9yIGF1ZGlvIGRlY29kZSwgZXJyb3IgPSAnICsgZSApO1xyXG4gICAgICBzYWZlVW5sb2NrKCk7XHJcbiAgICB9ICk7XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgd3JhcHBlZEF1ZGlvQnVmZmVyOyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxPQUFPQSxXQUFXLE1BQU0sbUNBQW1DO0FBQzNELE9BQU9DLHNCQUFzQixNQUFNLDBDQUEwQztBQUM3RSxPQUFPQyxrQkFBa0IsTUFBTSxzQ0FBc0M7QUFDckUsT0FBT0MsZ0JBQWdCLE1BQU0sb0NBQW9DO0FBRWpFLE1BQU1DLFFBQVEsR0FBRyx5bEdBQXlsRztBQUMxbUcsTUFBTUMsY0FBYyxHQUFHSixzQkFBc0IsQ0FBRUUsZ0JBQWdCLEVBQUVDLFFBQVMsQ0FBQztBQUMzRSxNQUFNRSxNQUFNLEdBQUdOLFdBQVcsQ0FBQ08sVUFBVSxDQUFFSCxRQUFTLENBQUM7QUFDakQsTUFBTUksa0JBQWtCLEdBQUcsSUFBSU4sa0JBQWtCLENBQUMsQ0FBQzs7QUFFbkQ7QUFDQSxJQUFJTyxRQUFRLEdBQUcsS0FBSztBQUNwQixNQUFNQyxVQUFVLEdBQUdBLENBQUEsS0FBTTtFQUN2QixJQUFLLENBQUNELFFBQVEsRUFBRztJQUNmSCxNQUFNLENBQUMsQ0FBQztJQUNSRyxRQUFRLEdBQUcsSUFBSTtFQUNqQjtBQUNGLENBQUM7QUFFRCxNQUFNRSxlQUFlLEdBQUdDLFlBQVksSUFBSTtFQUN0QyxJQUFLSixrQkFBa0IsQ0FBQ0ssbUJBQW1CLENBQUNDLEtBQUssS0FBSyxJQUFJLEVBQUc7SUFDM0ROLGtCQUFrQixDQUFDSyxtQkFBbUIsQ0FBQ0UsR0FBRyxDQUFFSCxZQUFhLENBQUM7SUFDMURGLFVBQVUsQ0FBQyxDQUFDO0VBQ2Q7QUFDRixDQUFDO0FBQ0QsTUFBTU0sYUFBYSxHQUFHQyxXQUFXLElBQUk7RUFDbkNDLE9BQU8sQ0FBQ0MsSUFBSSxDQUFFLDJEQUEyRCxHQUFHRixXQUFZLENBQUM7RUFDekZULGtCQUFrQixDQUFDSyxtQkFBbUIsQ0FBQ0UsR0FBRyxDQUFFWixnQkFBZ0IsQ0FBQ2lCLFlBQVksQ0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFakIsZ0JBQWdCLENBQUNrQixVQUFXLENBQUUsQ0FBQztFQUNoSFgsVUFBVSxDQUFDLENBQUM7QUFDZCxDQUFDO0FBQ0QsTUFBTVksYUFBYSxHQUFHbkIsZ0JBQWdCLENBQUNvQixlQUFlLENBQUVsQixjQUFjLENBQUNtQixNQUFNLEVBQUViLGVBQWUsRUFBRUssYUFBYyxDQUFDO0FBQy9HLElBQUtNLGFBQWEsRUFBRztFQUNuQkEsYUFBYSxDQUNWRyxJQUFJLENBQUViLFlBQVksSUFBSTtJQUNyQixJQUFLSixrQkFBa0IsQ0FBQ0ssbUJBQW1CLENBQUNDLEtBQUssS0FBSyxJQUFJLEVBQUc7TUFDM0ROLGtCQUFrQixDQUFDSyxtQkFBbUIsQ0FBQ0UsR0FBRyxDQUFFSCxZQUFhLENBQUM7TUFDMURGLFVBQVUsQ0FBQyxDQUFDO0lBQ2Q7RUFDRixDQUFFLENBQUMsQ0FDRmdCLEtBQUssQ0FBRUMsQ0FBQyxJQUFJO0lBQ1hULE9BQU8sQ0FBQ0MsSUFBSSxDQUFFLHFEQUFxRCxHQUFHUSxDQUFFLENBQUM7SUFDekVqQixVQUFVLENBQUMsQ0FBQztFQUNkLENBQUUsQ0FBQztBQUNQO0FBQ0EsZUFBZUYsa0JBQWtCIn0=