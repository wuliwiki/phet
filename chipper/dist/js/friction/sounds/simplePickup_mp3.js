/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';
const soundURI = 'data:audio/mpeg;base64,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VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//swxNACRggTHw5hAhDGAiLB3KRAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//syxOKCBrARGUfwwEDfguPmtiACVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7MsTvgBAVHxsZx4AAAAA0g4AABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhc3luY0xvYWRlciIsImJhc2U2NFNvdW5kVG9CeXRlQXJyYXkiLCJXcmFwcGVkQXVkaW9CdWZmZXIiLCJwaGV0QXVkaW9Db250ZXh0Iiwic291bmRVUkkiLCJzb3VuZEJ5dGVBcnJheSIsInVubG9jayIsImNyZWF0ZUxvY2siLCJ3cmFwcGVkQXVkaW9CdWZmZXIiLCJ1bmxvY2tlZCIsInNhZmVVbmxvY2siLCJvbkRlY29kZVN1Y2Nlc3MiLCJkZWNvZGVkQXVkaW8iLCJhdWRpb0J1ZmZlclByb3BlcnR5IiwidmFsdWUiLCJzZXQiLCJvbkRlY29kZUVycm9yIiwiZGVjb2RlRXJyb3IiLCJjb25zb2xlIiwid2FybiIsImNyZWF0ZUJ1ZmZlciIsInNhbXBsZVJhdGUiLCJkZWNvZGVQcm9taXNlIiwiZGVjb2RlQXVkaW9EYXRhIiwiYnVmZmVyIiwidGhlbiIsImNhdGNoIiwiZSJdLCJzb3VyY2VzIjpbInNpbXBsZVBpY2t1cF9tcDMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cclxuaW1wb3J0IGFzeW5jTG9hZGVyIGZyb20gJy4uLy4uL3BoZXQtY29yZS9qcy9hc3luY0xvYWRlci5qcyc7XHJcbmltcG9ydCBiYXNlNjRTb3VuZFRvQnl0ZUFycmF5IGZyb20gJy4uLy4uL3RhbWJvL2pzL2Jhc2U2NFNvdW5kVG9CeXRlQXJyYXkuanMnO1xyXG5pbXBvcnQgV3JhcHBlZEF1ZGlvQnVmZmVyIGZyb20gJy4uLy4uL3RhbWJvL2pzL1dyYXBwZWRBdWRpb0J1ZmZlci5qcyc7XHJcbmltcG9ydCBwaGV0QXVkaW9Db250ZXh0IGZyb20gJy4uLy4uL3RhbWJvL2pzL3BoZXRBdWRpb0NvbnRleHQuanMnO1xyXG5cclxuY29uc3Qgc291bmRVUkkgPSAnZGF0YTphdWRpby9tcGVnO2Jhc2U2NCxTVVF6QXdBQUFBQUFJVlJZV0ZnQUFBQVhBQUFBVTI5bWRIZGhjbVVBVEdGMlpqVTNMakkxTGpFd01QLzdNTVFBQUFjQVAwaFV3d0FSSUF2ckZ6VHdBQUFDQUNBSEJFVU5rc0c0TnhIRVFTRHpyMy9Xd0FRdzhtVFQyQ1pOUFJBQ0JRRUluZysvS081UHBxREVFQVFkS0hGZy9FNS8vL3dRQVlNZ0VBQXNZbnVnSEFBSDVqWWg4eDU0M0tXcG0xeGxSdzNzTWtSZ2lRdjFGa1VYcEdXcXRIMlR4MmZqVXpLalcwMUZzdzVpd3YvLy84UmdtNzFGaXovbFJDQVFGL1VPQUNWQWtBQUpFZi83TXNRRGdrZzhUVXo5dDRBdy9BcG5TZTdrWGhkNEtKcDd2Y1l1SkdQbHhzYUljNEttRUJaZ29nUlE3TW5LR1FhazdCTFR0UWdhejJqR2xhd1cvT29POWFkWnN6aEpwWkpFUy8vN1B2eEVPQXNGMFdYTURRR0EwL2lFVEd3R0JDRzVqalJacjRJYStoVVFUSnNlbDdMVk5uTWVGbDVJRzYyNHlCM2Q3S2c2M2Y0L1g2cVgvdVV1dVNidkx1OGtEd0FBQU9WQURGZ0V3YVFPamZyLyt6TEVCd0pKREUwMGJmdGdnUU9KcHgydmNBSkQ1TU1NQm93RGdWVENRUUpNS0VIa3lBQ01lU1QvQW9CR3RHWjBhancrNUJWQ1VtTlJnMGNFclhTQVJmbkM0MmJtcHIvdVgvK0huRXRkSVE0QUN5Wmh4eGdkQk9tb2dYOFo4REk4V2paelhQUWdjQkJnQ0R3ekFhMEhXakNNcFBGSDJFcHNWcVVGRTNIcVRyMzhydzNyZGZuL2YvMmtwSlhHM3F0cUdBQURDN0FhTUF3RXN3T1IvL3N5eEFZQ1NMeFBMazl5QnhEMENtZFozTFRtcmpXamdKTUhNR0FRZ1lHRzhnSVpMSU5DTEJoTXZIRnppRGhPeUV5T1lSWWFzNllDUkMyYW1ETElPMG1DU0ZkbUdhcktMenB0a3BYVEloYzRIRE9WQVNCSmFtYWZrR0JZWWdnS2pEdCtqRklNaENDRFh6cm9hay9acEtwNTB0QXVHNW1FVTdtb3Jzb2dzdEEvTVNBMFFNMW5YRWYxLzlNZ0FBUHlBTUduTUU0UmcyR21IekNXQlAvN01NUUlnMGdvVXpCTmUyQzVFNG1sQ2I5c0ZFVVZNUDhUNHlHQURERVFVS0hwNUM0V3dVeUhYeGdWaFdSSm5LbU03QnRkWVFsbHpkUCs2M1AxQjNQZHkzOTB6RmdBM0dNK0RqRFhEWlBjMWlReGhRSHpCOEJWTVR0S0V5d2dld1ZGQ2k4ZFFVZ2dZQUFHYkcyaHlpMDhnQ245eWk1dFE3amNJQTRpQXQ0UDkrNjluNElwZitCcEpxb0JEQUFBR0E5ZzRCb3dVQU96Wm9DQ0tQLzdNc1FJZ29pVVVUVFBkT1B4QmdtbUdhOXdBbEJNSXdoTVRKdk1adzdDZ0RFb05HUVlLd2UxMHdZQ05JTjJFT3kzOTJnTUhYZEtKV3ZRWTFkUlVDZUMwdkpmLy8vLzcxaElBOTRneUNFd1VRNWpiWFB2TlBqWUxCYzJOQlQxb1RCUkFFQWZERmNWQVNuWVNtQmtVR3RVVHp1NW1LQUhqcEthUWZ1Ti9oVTcrNUYveEtqLy8vLy85MVVBQUFxQUFBRENtRlFVTURDN09tT21NTEQvK3pMRUNRSkhVRTAzTHVGcXVPUUo1bFh0Tk9Zdk1CUWVNVkZ3TTJ3WUwwbDlRd3RWeXo1dGlxMnRXVS92UU85K0xoeHNIZHdWTXlLVlB5SzZZT0FFRXNWUUh3QUhnWWZpZUpnSEFYRlFBb3dNeVdqQk1BeUNBWXlXT0FYYW91c3pDTklPZGdOYjJPd0V4K1NRclZFYXBNOU9qcGx5dFFBQkNJQUFCSWJ3WUJSaE9UWjcvenhpdUVaZ3NCQmtLVkJvb0JBWWZMcEhSQkpGUndrYi8vc3l4Qk1DUjFoTk5TN3BSempoaWFhWjdtUk9RMVVVN1c5amdDa1dvbGdsS2kyaURIUXRpZTZaTkFFd0t3UUFHWUdnSGhwZUVUbWJnVUJRbVpKc1p0WUx2c1ZFenBxZlorVFBOVHhpNnFNcS9nS2QvM3JoUDRVMy9oUGNra3pyNlhXcUFBRUtnQUFEZ1dpNkpnVmdQR2grQnlCbUVZQUNKZ3pBbUpRNnNSSVVXTmpKYnBnUUl0RGhobzdlV0FWMkxzMXg1Wkl5YWNHMjdFMXVTdi83TU1RZEFrYzBUemN2Y2lOd3pJbm1tZDNJYmtnQWNINEJBUXdtSGsvOGpJMW9QS0NvMjZkQSsyWHdGQlF4UXJheStCQVZRMUpYaFVZVWlBZU9MMU9zdjF1MVovSTNvZ0FBQ3dBRERjRmdUTUNTME9vZUxNSndlVzBZbkswWnFnYzBBUmhEa2wyRDFUSGkwOGFialZ0YUJScldMU1BzSlZTVStxejBFc0FDZ1l5b0F3Q1F6VEN6UkFNRmprS0N3eFA4akh3d0ZRaGZaejgyZC8vN01zUXFBa2FvVFRNTzZXY3c0SW5tR2U1Z1R1emQ5VWN0ZXBGbldZRzcveDE3K2RuZWZ6djR5RC9sL0xrMUFBQUtnQUFEaG1DNEZtRUJNSHJuSm1KUU9RMlk1bDhCb0lRM0hCSjFqakRIYUdHanRjZkNCZFpBSTErZ0hkVWYrVEJrbEFHWXpKK1puUkNaQW1CV0w4R0JhQmlhQTQ4QU9ZWUNFSmt1UW11QVdEaUNhQU55SjRITkE1RVEwaVlsaGZ1QWR1UGdoYUJOVnB0T0o1SC8rekxFTndKSFFFOHhMdWxuT09BSnBtWHVTRTVsSWV6cUFBSUtRQUFHZ055L1JnVkFMbWhRQXNVTHd3V0N6RFY1TVJodE5CRjRESXVlaGt3QUVXM2NCSjVQT2tBZlkzQ3RVU0xMT3BvbVJDdk1RQ29BTUU0RUFDWU5qRWU1dXFZaGdZZ2hNVGlOQXk5aXdCd0kySmhMMERub2F1elQzNzhIRi9GVE5VdjlpOEpqVk9VVnBRQXNBQWhiQklOR0NSbm5nbjRHSEFabUJZUUdNaTNHLy9zeXhFSUNSeWhOTXk5eUEzRE9DZVpsM0N6bWVvTUNRQXBVZ0l5VmJaNDVwVUpwdHNlM28zaS9Db2pXeEwwdlZaNmJ2andDZ1lLWUFSVUFsQWdoQmhkSzBtQVlCc1NBSEdCU1VZWUdnSEJiOFZjUFo5b3l4emF6UnJvbmpZdGppYkJmSXNoV2RSQmE3V0kzQlFBQ0M0QUlCb00wSmhnYUxweEhMQmxvZUFnZzBsNEE2SWdldjRGS3pFcmc0TVJxa1ZUYUYvQzdYL1JiMmIyazl2LzdNTVJQZ2tiWVRTeXU0V3F3M3drbElleTA1ZElkUS8vLy8vLy85WWhVQVVCTXB1WUxCQWQrTGVCbmdRZ0psT1NjSUJ4b3FBWmhJbE5Nb0JXVnJtWU5Qb0J4L2IyajBoYXhyZmt2Ty8vLy8vLy83cW05U2dBQkNrQ29CWVFrY1RCOEVBZmo0UVRRRUFrQ0tDWURnbTF4WW8ybzN0MENHdlBLR3l1WnJoYTc0SGkyNFpaQ21jTTFmLy8vcC8rbi82UXNBQ2dXekFIQU1NRFlKZi83TXNSYmdrY2tSek11N1NPUTRRam1aZDI4V3MxRGlualBBVkhpR2FPZDV5VUVnb0NDQVJHRWg2dVY2QkFPbXZVTXl4eEpFRDU2eEsxMW0rN1RwdG1iVllBT1ZGakRFVXdPUmxEWHZkbk1Ia0dJaEFFTU5Bcnd4N3dPQllVQUpBZUNrZ0lIa0pvWTZURk1QUTRUQXVYRE1TYkxaVUFXLy9WYi91NC9Wc0tPZi82Zi8vN2R0L1Fnd1R3QnlxQmdBUk1UQ1hZT01CRUYwRUFtR0JmLyt6TEVab0pIT0VreEx1VG5FTjJKNVJudVNHeVdnWUhRS0FxTkJMTXlMUmk3RXpPUTBhNWEwWkZtdFhNNFY1RHFLZHlqcytXT2YvLy8vLzY3MmI5L3JUNmdEQnJ6Qk9FMk5mNXIwMHNUSTJibjJoK2dOR0VRR0lBK2E2SWhkUlV4Z1E1SlhUaXN6cTVXakZJZXcrbFVSNXVmL2R6L3VIU3YvLy9kK2o5WFo5K01VUkJYQVlCZ3dWd2F6WnpNK05WZ2t4WUN6U2ZCT2pCMGlxSFcvL3N5eEhHQ3lNUkhIaTM3WUlFQ2lPUlY3VFRnZ2RhazR4RTR3eWdXTHNZaS9iNXFJODFCRFVsTWE0alovLy9YMS8vMC8vYXFBU3RVSURRWm9qR0V3SG4vQUFrUzBNRGdrd2RhekJZWlVvVm1ERVBQUDZCQXE2OG9lcHFlK2xtdmdZTHNqcnk5dnA5Zm5aRFY5TkQyZi9UMEltSVNFWVJBV1lVaVFld3RpYVNGR0VCUnV6eWRDR3YrV0NnSVNkTThXS01mcndRdUxDV0ZrWlhmZ3YvN01NUnlBOGcwUlI0TmU0QUE2Z1prUWU1a1NLM21tbFlNRHZ1Ly9xLy8vMDBBUUlNRXhBWXdMaEZ6TmlRd0FCczB0WTlPQW0xbVdMcUltRUZxRXZpL0M3bjZmNjFqQVNwb0dwUVNOZi8vL3EvLy8vLzYybEZWV0U5aG01Z0hCZ0dFRWcrYjF3VkRWVWNOL0paYkFkSmRJYW9RL1QyNlBaMk0vNm5TdzVVLzFuMmxwdHlscGhvZmN4UURhc2dBN1lFTVlZajZlajk4ZDg2Q2h2LzdNc1IzQWtlRVJ5ck84T09RM2dhbFdkM2dTaW03TEhmamRJSHFkNlNQdVRTK0xwUHdtSm9RRk9LN1ArK243ZC9TUUFJQVFyQ1BUTUVvQVkxWGk3d0dTQ3hXa3d5ZDNKUlhZWUt1dVRVN1RiWVFhQjBFdWhNNytyYkpJYjZIb2VvbjFhUjJMYW9zMGNFbUNxRUFiU0lXQjFZUUhHcUxUUVlIbGR3SktzLzkxZTFqYjBRazNvdkdheGJGbTNtMWRJWUxIQzRvVmNUUGdVbkRnSUQvK3pMRWdRSUdpQzhpVEh0QUVOS0M1R1dQWkFJWVhCQUxqQWlDbE5GWWZRN1IwRkNsaXc5WjFaTkxRZXZYbXR2MTM2Zll6MFdPMXJVMG5ld1RPY1FtVGJhbm9RbHlrMVVBQUpDaWdBSUZiaFJJWEl3NExuTTQ0VFJidEg2bGkwWlpGU0Y1K2l0VTV2ODV2L1NyOEt2MldPZEhIT3hwaG5Ra1VTV1hpT0FVWUNrbVllNW9iK28yT0hEQURDMVU0Y1VacWtLMDdtOWt4anM3WGlaNi8vc3d4SkNDQmJ3WElNeDNRQkRUZ3VPbGoyd0FhVzJ6aTFpb29Pd08xbFVnd3VOR3FDNFQxZ0FFU0JCQUFnakNQWmdnSUJ2SkhwMkNJL2djSjVnd2ZkTFAwUkIzdU1jR3JWM0tmTzJwMWZDeXFFenhNV1QzWHVtbUpQcEY2TFlHVHdBd2hubDdpQnBzZUNNM2dRSTNJZXlxeG5jVWFMcitrZXJabnB2bm5LdmFhYWc3ZVZkQXFCQzl5YlZqd2llWWREUXd4UUFGcGNLSFd2R0EvL3N5eEtLREJvd1hHQXg3WUFEUkF1TkpqMmdBZ2FlK0VvM1ZvUVFub0lhVWxnZER4MEtuYit3a2ltaWVITU1VL1pVUzYwL0Zoa1h1dDdlNTJobFNOcGdLSkJ5T2VvREdWeUdtVFFjMDc2dHQ1VmJLLzlaUy9Xd1lPbU5yZzBrS0dpVmNKajF3Q1Bla1JsR29Hb2VwQUE2QWdBQUNBL1JkaGdlbkRwNFdkZElTY0h6TGdHd1NHYUtLOHBiYkdGMFhSMWV4Mnk3SFE2eHFsb0dGR1AvN01zU3lBa1pvRngxTWR3QUEwb01qQWR3WVNGK2N2TjFScjl5aGFWVUNKZTJBeEEwTU8wVEJ3Y0lDNTZ0T1ZPQmVQaHdxZkREemh1WVlLTHJ2WU1hdTlUb3hrMDVXdjQyT1lwdU5lZ3VqT05zYlpTb0JBQUFTQkFBQXdpQVRub2dNS2lvQkErcnd3cUFUQ2dLRGdheW5MU0tEYU1OUk43NmpuSDBKdC9FTG1oNGFvL1RwLzVld2pCT0VaQWVxMDVmLzQ5cUtOWG44YVJwTUt0Ly8rekxFd2dKRzJCVWJUdVdDQU5PQzRzSGRJRWovOGRXTUUyL1NDOVZyRXJ2Ly84djM4ZFdQSWpOV3VJTDFXLy8vKy8xSFozN0JFMUNmUHExMVdyRC8vLy85eHUvYjUvLy9DZlBxeGRWTVFVMUZNeTQ1T1M0elZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWLy9zd3hOQUNSZ2dUSHc1aEFoREdBaUxCM0tSQVZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVi8vc3l4T0tDQnJBUkdVZnd3RURmZ3VQbXRpQUNWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWZi83TXNUdmdCQVZIeHNaeDRBQUFBQTBnNEFBQkZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZVPSc7XHJcbmNvbnN0IHNvdW5kQnl0ZUFycmF5ID0gYmFzZTY0U291bmRUb0J5dGVBcnJheSggcGhldEF1ZGlvQ29udGV4dCwgc291bmRVUkkgKTtcclxuY29uc3QgdW5sb2NrID0gYXN5bmNMb2FkZXIuY3JlYXRlTG9jayggc291bmRVUkkgKTtcclxuY29uc3Qgd3JhcHBlZEF1ZGlvQnVmZmVyID0gbmV3IFdyYXBwZWRBdWRpb0J1ZmZlcigpO1xyXG5cclxuLy8gc2FmZSB3YXkgdG8gdW5sb2NrXHJcbmxldCB1bmxvY2tlZCA9IGZhbHNlO1xyXG5jb25zdCBzYWZlVW5sb2NrID0gKCkgPT4ge1xyXG4gIGlmICggIXVubG9ja2VkICkge1xyXG4gICAgdW5sb2NrKCk7XHJcbiAgICB1bmxvY2tlZCA9IHRydWU7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3Qgb25EZWNvZGVTdWNjZXNzID0gZGVjb2RlZEF1ZGlvID0+IHtcclxuICBpZiAoIHdyYXBwZWRBdWRpb0J1ZmZlci5hdWRpb0J1ZmZlclByb3BlcnR5LnZhbHVlID09PSBudWxsICkge1xyXG4gICAgd3JhcHBlZEF1ZGlvQnVmZmVyLmF1ZGlvQnVmZmVyUHJvcGVydHkuc2V0KCBkZWNvZGVkQXVkaW8gKTtcclxuICAgIHNhZmVVbmxvY2soKTtcclxuICB9XHJcbn07XHJcbmNvbnN0IG9uRGVjb2RlRXJyb3IgPSBkZWNvZGVFcnJvciA9PiB7XHJcbiAgY29uc29sZS53YXJuKCAnZGVjb2RlIG9mIGF1ZGlvIGRhdGEgZmFpbGVkLCB1c2luZyBzdHViYmVkIHNvdW5kLCBlcnJvcjogJyArIGRlY29kZUVycm9yICk7XHJcbiAgd3JhcHBlZEF1ZGlvQnVmZmVyLmF1ZGlvQnVmZmVyUHJvcGVydHkuc2V0KCBwaGV0QXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlciggMSwgMSwgcGhldEF1ZGlvQ29udGV4dC5zYW1wbGVSYXRlICkgKTtcclxuICBzYWZlVW5sb2NrKCk7XHJcbn07XHJcbmNvbnN0IGRlY29kZVByb21pc2UgPSBwaGV0QXVkaW9Db250ZXh0LmRlY29kZUF1ZGlvRGF0YSggc291bmRCeXRlQXJyYXkuYnVmZmVyLCBvbkRlY29kZVN1Y2Nlc3MsIG9uRGVjb2RlRXJyb3IgKTtcclxuaWYgKCBkZWNvZGVQcm9taXNlICkge1xyXG4gIGRlY29kZVByb21pc2VcclxuICAgIC50aGVuKCBkZWNvZGVkQXVkaW8gPT4ge1xyXG4gICAgICBpZiAoIHdyYXBwZWRBdWRpb0J1ZmZlci5hdWRpb0J1ZmZlclByb3BlcnR5LnZhbHVlID09PSBudWxsICkge1xyXG4gICAgICAgIHdyYXBwZWRBdWRpb0J1ZmZlci5hdWRpb0J1ZmZlclByb3BlcnR5LnNldCggZGVjb2RlZEF1ZGlvICk7XHJcbiAgICAgICAgc2FmZVVubG9jaygpO1xyXG4gICAgICB9XHJcbiAgICB9IClcclxuICAgIC5jYXRjaCggZSA9PiB7XHJcbiAgICAgIGNvbnNvbGUud2FybiggJ3Byb21pc2UgcmVqZWN0aW9uIGNhdWdodCBmb3IgYXVkaW8gZGVjb2RlLCBlcnJvciA9ICcgKyBlICk7XHJcbiAgICAgIHNhZmVVbmxvY2soKTtcclxuICAgIH0gKTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCB3cmFwcGVkQXVkaW9CdWZmZXI7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBLE9BQU9BLFdBQVcsTUFBTSxtQ0FBbUM7QUFDM0QsT0FBT0Msc0JBQXNCLE1BQU0sMENBQTBDO0FBQzdFLE9BQU9DLGtCQUFrQixNQUFNLHNDQUFzQztBQUNyRSxPQUFPQyxnQkFBZ0IsTUFBTSxvQ0FBb0M7QUFFakUsTUFBTUMsUUFBUSxHQUFHLDY0S0FBNjRLO0FBQzk1SyxNQUFNQyxjQUFjLEdBQUdKLHNCQUFzQixDQUFFRSxnQkFBZ0IsRUFBRUMsUUFBUyxDQUFDO0FBQzNFLE1BQU1FLE1BQU0sR0FBR04sV0FBVyxDQUFDTyxVQUFVLENBQUVILFFBQVMsQ0FBQztBQUNqRCxNQUFNSSxrQkFBa0IsR0FBRyxJQUFJTixrQkFBa0IsQ0FBQyxDQUFDOztBQUVuRDtBQUNBLElBQUlPLFFBQVEsR0FBRyxLQUFLO0FBQ3BCLE1BQU1DLFVBQVUsR0FBR0EsQ0FBQSxLQUFNO0VBQ3ZCLElBQUssQ0FBQ0QsUUFBUSxFQUFHO0lBQ2ZILE1BQU0sQ0FBQyxDQUFDO0lBQ1JHLFFBQVEsR0FBRyxJQUFJO0VBQ2pCO0FBQ0YsQ0FBQztBQUVELE1BQU1FLGVBQWUsR0FBR0MsWUFBWSxJQUFJO0VBQ3RDLElBQUtKLGtCQUFrQixDQUFDSyxtQkFBbUIsQ0FBQ0MsS0FBSyxLQUFLLElBQUksRUFBRztJQUMzRE4sa0JBQWtCLENBQUNLLG1CQUFtQixDQUFDRSxHQUFHLENBQUVILFlBQWEsQ0FBQztJQUMxREYsVUFBVSxDQUFDLENBQUM7RUFDZDtBQUNGLENBQUM7QUFDRCxNQUFNTSxhQUFhLEdBQUdDLFdBQVcsSUFBSTtFQUNuQ0MsT0FBTyxDQUFDQyxJQUFJLENBQUUsMkRBQTJELEdBQUdGLFdBQVksQ0FBQztFQUN6RlQsa0JBQWtCLENBQUNLLG1CQUFtQixDQUFDRSxHQUFHLENBQUVaLGdCQUFnQixDQUFDaUIsWUFBWSxDQUFFLENBQUMsRUFBRSxDQUFDLEVBQUVqQixnQkFBZ0IsQ0FBQ2tCLFVBQVcsQ0FBRSxDQUFDO0VBQ2hIWCxVQUFVLENBQUMsQ0FBQztBQUNkLENBQUM7QUFDRCxNQUFNWSxhQUFhLEdBQUduQixnQkFBZ0IsQ0FBQ29CLGVBQWUsQ0FBRWxCLGNBQWMsQ0FBQ21CLE1BQU0sRUFBRWIsZUFBZSxFQUFFSyxhQUFjLENBQUM7QUFDL0csSUFBS00sYUFBYSxFQUFHO0VBQ25CQSxhQUFhLENBQ1ZHLElBQUksQ0FBRWIsWUFBWSxJQUFJO0lBQ3JCLElBQUtKLGtCQUFrQixDQUFDSyxtQkFBbUIsQ0FBQ0MsS0FBSyxLQUFLLElBQUksRUFBRztNQUMzRE4sa0JBQWtCLENBQUNLLG1CQUFtQixDQUFDRSxHQUFHLENBQUVILFlBQWEsQ0FBQztNQUMxREYsVUFBVSxDQUFDLENBQUM7SUFDZDtFQUNGLENBQUUsQ0FBQyxDQUNGZ0IsS0FBSyxDQUFFQyxDQUFDLElBQUk7SUFDWFQsT0FBTyxDQUFDQyxJQUFJLENBQUUscURBQXFELEdBQUdRLENBQUUsQ0FBQztJQUN6RWpCLFVBQVUsQ0FBQyxDQUFDO0VBQ2QsQ0FBRSxDQUFDO0FBQ1A7QUFDQSxlQUFlRixrQkFBa0IifQ==