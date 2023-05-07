/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';
const soundURI = 'data:audio/mpeg;base64,SUQzAwAAAAAAIVRYWFgAAAAXAAAAU29mdHdhcmUATGF2ZjU3LjI1LjEwMP/7MMQAAAbY3S0UEYABJRCqwzaAAAABCAAcAAAWAHjGPiIiJ6f/9REKu7uiIn/u7n8RHd3P+oiIX///+if/uiIiIiIBgYP8QeD4fl02kLBSQNgWzHUg3x6TDh8WdkdBkBZjnm/roLlYofIEiZhw8DgVifzH6BSHQfC3+72n/x/+92YgVDXgnB8HQaCoS5Q5xc6Hf/1psAADDcFjEv/7MsQDg0fAQT5d14AxBwglAc9sF0RDNHjwKIpC2RjQbIKK0wPM4QhEYGAmYLgYAgCMAQQiCMxggB8CqLAgjKa40KLV7/G32YGKDW03uPzHtGNvLzowyQYDC/WgNucTkmDvMSUgc+gHMgNT9IIyIRMjGxJpBQcf+LFYWKgQs9QyYCAWoIe3JkWNDW+gtQ1YCgOQlI0dETp/xZMbwIf/+zLEB4JJHDsoTntggQGHZmmvaBQxPR3DhLBCMLsBkxahcTpzEwEkPceygQIGVWkRDZzysjiIw0eVuBADOwVJvaP8zIEuPV/s///+7+nQAUEAOWHN7CNmw/Aw4QMjAnGTM0kJoiA7C4hQCXBU4dsmRAiyqcaHAELYwSh0orzJu3OfKO/IVs/7f////9f7OtUAKfcAcDARqoOH1mFi//syxAaCCMw7Js57YEESh2VZv2wKZEwOBhDqVmPyNQBVk+HFAYiATU+90CAswAuFgIuedWkIHjBepdJUzb0k/4H5QXt3/Ql/q+j6t+v9JWokAHfRtcKdPTAJi7gDmEsamZqAbhnRWcJ6mNiIiSzjhpKALjSkE9TfARZpUF04Jpm2NB34zfrRcUvp93Rfq/9rv/3oAAAIARgIA4kdM//7MMQFAgiQOytN+2CBAQdlWc9sCu3DiDlaMPAHQwYhbzTkAgMEYAAACPGNgAIHjqjFciux4BHQYyk7focCUYLOPaC/qJYfJ//6/3f///7whECBoUYGF4Ka11k5hJhLmEENsaFAVZpQoc+XmgBBAnG5j7XiwH8HQEzE2cdgJQEW9cuX9yXl2eX/5z/0f///sQAACAAIDNxcK0hiVv/7MsQGAgc0OzEt+4AQ9Ydmpa9oDvmGAqBgYM5xyJBs0MUIlAeFwOAmFF3ZYvAgQcXsoFu6vfrv0n1Zwp///////1gNBCAG7HGO3mNWsOYKAHpgNisGIKCyYUQZSkn0KDzNBIdY1B7xAJfPNgfL6P9X/v8+iS7/6//2///wJkfoAABcADORszmYNTJ64w0QNjApEUMzECMSdHRHDzj/+zLEDoLGtDstDftAYNAHZVWvbA4GCg3SxVG5xEnyRFNlQA3t9zOZX/lvbllZT+ljsZzdzXrMS4BEwhw9TNjBaM5DzLLMBFYFIjLyWLKHsVXgZ0LuoQgTjzDN8/v/NdudQgAAjAAHngfI2GBlDDVAMBgzpivg8F3zUYiI0gnE1S40GaWGhbHClHla7sY1/fu7+jaQYIBcOaxka5pJ//syxB2Chig7Lwz7QGjeB2Xlr2QKxhdAUA0acw+gcC4J44E1IwiZTUBq5U+h6ZxkteJq+qvN3/lHbtr////////srgYNvEjV8s5hImzE9BRMJ4dk0HgYDTA0G/Jd0vgdcCiwASBzfkAEZIbu4/5WC3pVndv/PrOf////p/tBY1okwXYzhVoDBAAuMCAFAyMAFxZw3Mhp4dOFV3SWVP/7MMQtAsdINSQt+2BAu4dl4a9kDlI2EjSN8VRXa/3e/S540VUABFgANaKJNpi6KkhcDswChFjEgBRAARw0BBDRhfqD3LexkIOonWjvdqWc3/1v1eCYIDKhwDgMNpRIwLwFCrIjNZFeYdJ6uSQEiMDP6z+hbIKgW41WpRNP7v/oVH/+pQAEkAA3EmM8sTSThfMNYF8wZxnDLDBlNv/7MsQ7gkXwOzENeyBwvAamJa9wBiKO4iHoYgCjflVqdqzktzWln7SVTglbkcu3tSi+FTMKADLmrYeWZEY2gUYBgqbMgITBGXoywqDFnaYvor5lpRJRQa1HVD++fbv6v+3Xd//7e7/TtTnQ43g3OkVKMxkgCDCPJnMyEMgzMrMT0QYAmEgxOxp5lQEagOgBnZW60OlYBi/3at76Xtf/+zLEUAIGmDUnDftAYNwGpiWe5Apn/////+pJaAIxnspoBBsjQgRgFCMmAYCMqqN4SDIUgYU+8bUFthcVeOFYLbi83z6y3L+n////////egCAodUGbTobbqgBhoAkGAcNWZNwMwsWmRygsEFqTcgB+UnZS4BnAK8iiTNbka7/Pobv////9f+7/RA8zRw4x2ZNUhuswmQTTBcADMvA//syxF4CR0A5IA37YEDShqXlj2AOAsouG79jxgUSGiLtcd1oa0gFrgZKTH7v/e+kV+mn//s+qjTyUk5DQVoKEALhgcDUGW4ESJMDoMSieARh/y6gw4CWsh6YZNGSUA99qMc1e+2Mf//////0Iv6vrjQCJANNHDDKMwDHbzBQBfBI5BghBDjpYA9EAg4NNaSjaZVlmBmB8ONyanhX/f/7MMRqgkcsNSSte2BA1Iakmb9oCHPs3ql7lrt///7/9VPdAqA0wlQBjzF+NgPGMRQGCpfGeoOreM/0mVVQfR+WXubDxNqjuNS3WuPC3+igXV7/T//0ha5r1WdFd16IkSQIDwljgbzUrZHMPACkwbQiiZa8exnKjhEMhCHCMvYVQuCyTRDIq8bHtRXmufdu1t3a/o/3er6O7//btf/7MsR2gwcYNSAN+0BA7Iakjb9oCDXhTkrjbAQiMQMBgwAxQTKjBwFhssTxdILixpoWnkmK0NRQKD8oVTalehXdf9Tv3v/6P///xT2fWlfcxzCk6Y3xg2wQHTDuAqMC0eEwswjguPNirElIqHOWYaelpFn3NeGgdP2m3O/r/vq1drf3/T/+79ab9P9U0gVyNzlNuA/Mw3QFTBKHNMf/+zLEgIIHcCss7PcAUPUGpA2vaAgYGwygc12cteMHTiBGrIcnkdEI4PKgXINWuXP+z4j//6P+1H9t86vcR1/Sk0sTMcpjYta0MIgFQwNA6zMQAOEkQRTQcBCIINkF3IcdfqqRho3GlUWoc/9d+tPf/5aj/ZgLa2yRnujYprTBBbCQ1dU1skAuiaS0XJgdg5mCcJUZewPJrAx3zYGg//syxIgDR4Q7Hg17YEDuBqPJr2gIEi45I9/kCOllmdOQ+4KtF/fNZfQl/+v7v9vQi8Qaah/UYLMKxaXQ9iglIkgQGbFgnsYgq6hgWgPGBJwbEKrqGECitdI8HHafjL3zgkPZBcc3V69irtvXX+inp9+136+3o+5vejSxgxyLMd9rMwiATTAtGWMS0Gkxo4zVxLoULmgFPyrNB7PjOv/7MMSQA8dwNxwNe0BBCoajQb9sCAZE3R7c6PyJe5f20f/b0d39utNlcgKo6JkzIc0tgzcFOjCdAWMA0LoyFwBR4kAqxMQQwExL2tKhxo5KOuqOTvZM57iH3/d//cj+rt1JwyTVd00VJTRBgDdHRp2fG48bJhGIZpyCgYWYGKu0ti0fYnRSgIJsQVmXvZynvV7qoz6rutej/ZTqmP/7MsSUAgg4NRgN+0BA64Vj3a9wAD/6RqMTDNE4QYOEmCgiJh2gnK3ml0TBLvG6nPWBqxIezo2xSfeH/37t+j9n/b8Dahltz3f2uYvYaKOVEwzUoP7WWMbgcFUXMnhASFO9igpAMCIm5bJ3pLIWY8+YrexP6+3/r+Y36/teK6DwAaLmBFOW3BuoCA5IA0nN0XmGIDmJNYL8ELSqVw7/+zLEmYPHoC0aDftAQOWFY0GvaAjODRbIHwtRxE3DODxm9WyAHGHWv037q8UUn2cV/rV9m69tKgBtEBAYOMXG1NMAgCDAgo/QDWYBAhby2k75qCrGY0BX6GeXUZ5DVue9n9Gpf/Rb208lZ0/QFIokCAHJDlZmJTYABEQDwZAA6rYYyMEjxF6/b5MpcWZLfRsRXtfdTd71f2V9tH16//swxKIDBsgnIGx3IEDgBqNBn2QI2vvxr/pTAAAaqpca+KgQwtVBIDFTwDLzgP7KmUVWHmRJ+XpXJ6We9VHd1s9ua1QIro3fUpXu6gAKmkCBAHGBDzcfNBRRMFTAeJq+L0OfAJMG2bva6us5l3rt09Hufd/3cXX+34GdT/fYAG0yENuiscCgQ0NoHDfSbAUnh6HLaBupHazMu56e//syxK4CBtwnGgz3AEDiBOPZnuwA29TMeNe9/gIDvA/SlTOr3a/b/6w10BiUScB2VEhxMAr07YhrZKFeq4EfHaqwi578yV3NnPVKa7/c5pMiz0s9K9NtYv25KmnKVQBAABkoDgGf0OIKQZqI5nARfNIEKpHpBW0dAsW0kVgkSLPRa66eGpT7X1YqhGHXHG5tbBQPpYLExUkYaZFRIv/7MsS6AgacJx7M92AA2ATj3Z7gCB73uBw2SadHQEskQCo/zeDAgOUreS3hveXf5tR7Tpzm3HIptalki7n/ypp0/vmRyzq+hpx4jqbGaHap/VfLJ6IBgAQxi0cyM3jbSlgiQVnbuWYABbPojcq4c/vd704FPSml1k5ImTb3mpn2JeXDpVmJU1veHmuSSO/U3OiOhTkdgmTmZmoNT23/+zLEyIIGICcnLmXiEMeEo/WObABFhwp0stA2cAYBCMpFQgadpQKETk02OVmNFHJ2eAqhNkwMKF75KW6f3ZUrr6vyM120curX9l3V0RSIj6MJnOjzI6sZYJ1NJ826AJ2hAAzFUDEhi61KI6El2eUwxbou97Ycy79lp/vc9Dl8v79+a865Oj6MXHOWkUaAlcT0LDSx+ioPVyYg+4xg//swxNsCBjgnIM5p4hDRhOOZzTxIBRbh2gBQIQCHWJASAKw8ONJOFd2hXhIRK5evkcB0rO2k/lSMvPY2/LKRy9vq/dSOPCIuJ++y57S4tXcGppfGBBBIXSq+AH9bwD4QAMuBwC1FiCxBw5GvutY1jHnm2ZtwHW1L7nkRtsR9Lv5b+/mR9uD4x/5xoq3NyJZsayLOnEQdo1CPvEYk//syxOsCiOQpFs5pgkEJHqJVwI25Ft45OXzDdgAwBAgELwR4lYN1Zgxa6xvvMIRXlMMPxZh+Hi4V/b43/1SVmZmbUtVVVVVYMBMzexf/sy9CiSbWNsx1S4GFYU+KCm5JakxBTUUzLjk5LjOqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7MsTqAEiRCxAOBG3JBCHiYcCI+aqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTkuM6qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+zLE6wAIYQ0QLgRlyRcd4iG0jEGqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//swxOqACH0NDkZgYAkRoOCk8I15qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//syxLuDwAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqg==';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhc3luY0xvYWRlciIsImJhc2U2NFNvdW5kVG9CeXRlQXJyYXkiLCJXcmFwcGVkQXVkaW9CdWZmZXIiLCJwaGV0QXVkaW9Db250ZXh0Iiwic291bmRVUkkiLCJzb3VuZEJ5dGVBcnJheSIsInVubG9jayIsImNyZWF0ZUxvY2siLCJ3cmFwcGVkQXVkaW9CdWZmZXIiLCJ1bmxvY2tlZCIsInNhZmVVbmxvY2siLCJvbkRlY29kZVN1Y2Nlc3MiLCJkZWNvZGVkQXVkaW8iLCJhdWRpb0J1ZmZlclByb3BlcnR5IiwidmFsdWUiLCJzZXQiLCJvbkRlY29kZUVycm9yIiwiZGVjb2RlRXJyb3IiLCJjb25zb2xlIiwid2FybiIsImNyZWF0ZUJ1ZmZlciIsInNhbXBsZVJhdGUiLCJkZWNvZGVQcm9taXNlIiwiZGVjb2RlQXVkaW9EYXRhIiwiYnVmZmVyIiwidGhlbiIsImNhdGNoIiwiZSJdLCJzb3VyY2VzIjpbInNpbXBsZURyb3BfbXAzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXHJcbmltcG9ydCBhc3luY0xvYWRlciBmcm9tICcuLi8uLi9waGV0LWNvcmUvanMvYXN5bmNMb2FkZXIuanMnO1xyXG5pbXBvcnQgYmFzZTY0U291bmRUb0J5dGVBcnJheSBmcm9tICcuLi8uLi90YW1iby9qcy9iYXNlNjRTb3VuZFRvQnl0ZUFycmF5LmpzJztcclxuaW1wb3J0IFdyYXBwZWRBdWRpb0J1ZmZlciBmcm9tICcuLi8uLi90YW1iby9qcy9XcmFwcGVkQXVkaW9CdWZmZXIuanMnO1xyXG5pbXBvcnQgcGhldEF1ZGlvQ29udGV4dCBmcm9tICcuLi8uLi90YW1iby9qcy9waGV0QXVkaW9Db250ZXh0LmpzJztcclxuXHJcbmNvbnN0IHNvdW5kVVJJID0gJ2RhdGE6YXVkaW8vbXBlZztiYXNlNjQsU1VRekF3QUFBQUFBSVZSWVdGZ0FBQUFYQUFBQVUyOW1kSGRoY21VQVRHRjJaalUzTGpJMUxqRXdNUC83TU1RQUFBYlkzUzBVRVlBQkpSQ3F3emFBQUFBQkNBQWNBQUFXQUhqR1BpSWlKNmYvOVJFS3U3dWlJbi91N244UkhkM1Arb2lJWC8vLytpZi91aUlpSWlJQmdZUDhRZUQ0ZmwwMmtMQlNRTmdXekhVZzN4NlREaDhXZGtkQmtCWmpubS9yb0xsWW9mSUVpWmh3OERnVmlmekg2QlNIUWZDMys3Mm4veC8rOTJZZ1ZEWGduQjhIUWFDb1M1UTV4YzZIZi8xcHNBQUREY0ZqRXYvN01zUURnMGZBUVQ1ZDE0QXhCd2dsQWM5c0YwUkROSGp3S0lwQzJSalFiSUtLMHdQTTRRaEVZR0FtWUxnWUFnQ01BUVFpQ014Z2dCOENxTEFnakthNDBLTFY3L0czMllHS0RXMDN1UHpIdEdOdkx6b3d5UVlEQy9XZ051Y1RrbUR2TVNVZ2MrZ0hNZ05UOUlJeUlSTWpHeEpwQlFjZitMRllXS2dRczlReVlDQVdvSWUzSmtXTkRXK2d0UTFZQ2dPUWxJMGRFVHAveFpNYndJZi8rekxFQjRKSkhEc29UbnRnZ1FHSFptbXZhQlF4UFIzRGhMQkNNTHNCa3hhaGNUcHpFd0VrUGNleWdRSUdWV2tSRFp6eXNqaUl3MGVWdUJBRE93Vkp2YVA4eklFdVBWL3MvLy8rNytuUUFVRUFPV0hON0NObXcvQXc0UU1qQW5HVE0wa0pvaUE3QzRoUUNYQlU0ZHNtUkFpeXFjYUhBRUxZd1NoMG9yekp1M09mS08vSVZzLzdmLy8vLzlmN090VUFLZmNBY0RBUnFvT0gxbUZpLy9zeXhBYUNDTXc3SnM1N1lFRVNoMlZadjJ3S1pFd09CaERxVm1QeU5RQlZrK0hGQVlpQVRVKzkwQ0Fzd0F1RmdJdWVkV2tJSGpCZXBkSlV6YjBrLzRINVFYdDMvUWwvcStqNnQrdjlKV29rQUhmUnRjS2RQVEFKaTdnRG1Fc2FtWnFBYmhuUldjSjZtTmlJaVN6amhwS0FMalNrRTlUZkFSWnBVRjA0SnBtMk5CMzR6ZnJSY1V2cDkzUmZxLzlydi8zb0FBQUlBUmdJQTRrZE0vLzdNTVFGQWdpUU95dE4rMkNCQVFkbFdjOXNDdTNEaURsYU1QQUhRd1loYnpUa0FnTUVZQUFBQ1BHTmdBSUhqcWpGY2l1eDRCSFFZeWs3Zm9jQ1VZTE9QYUMvcUpZZkovLzYvM2YvLy83d2hFQ0JvVVlHRjRLYTExazVoSmhMbUVFTnNhRkFWWnBRb2MrWG1nQkJBbkc1ajdYaXdIOEhRRXpFMmNkZ0pRRVc5Y3VYOXlYbDJlWC81ei8wZi8vL3NRQUFDQUFJRE54Y0swaGlWdi83TXNRR0FnYzBPekV0KzRBUTlZZG1wYTlvRHZtR0FxQmdZTTV4eUpCczBNVUlsQWVGd09BbUZGM1pZdkFnUWNYc29GdTZ2ZnJ2MG4xWndwLy8vLy8vLzFnTkJDQUc3SEdPM21OV3NPWUtBSHBnTmlzR0lLQ3lZVVFaU2tuMEtEek5CSWRZMUI3eEFKZlBOZ2ZMNlA5WC92OCtpUzcvNi8vMi8vL3dKa2ZvQUFCY0FET1Jzem1ZTlRKNjR3MFFOakFwRVVNekVDTVNkSFJIRHpqLyt6TEVEb0xHdERzdERmdEFZTkFIWlZXdmJBNEdDZzNTeFZHNXhFbnlSRk5sUUEzdDl6T1pYL2x2YmxsWlQrbGpzWnpkelhyTVM0QkV3aHc5VE5qQmFNNUR6TExNQkZZRklqTHlXTEtIc1ZYZ1owTHVvUWdUanpETjgvdi9OZHVkUWdBQWpBQUhuZ2ZJMkdCbEREVkFNQmd6cGl2ZzhGM3pVWWlJMGduRTFTNDBHYVdHaGJIQ2xIbGE3c1kxL2Z1NytqYVFZSUJjT2F4a2E1cEovL3N5eEIyQ2hpZzdMd3o3UUdqZUIyWGxyMlFLeGhkQVVBMGFjdytnY0M0SjQ0RTFJd2laVFVCcTVVK2g2WnhrdGVKcStxdk4zL2xIYnRyLy8vLy8vLy9zcmdZTnZFalY4czVoSW16RTlCUk1KNGRrMEhnWURUQTBHL0pkMHZnZGNDaXdBU0J6ZmtBRVpJYnU0LzVXQzNwVm5kdi9Qck9mLy8vL3AvdEJZMW9rd1hZemhWb0RCQUF1TUNBRkF5TUFGeFp3M01ocDRkT0ZWM1NXVlAvN01NUXRBc2RJTlNRdCsyQkF1NGRsNGE5a0RsSTJFalNOOFZSWGEvM2UvUzU0MFZVQUJGZ0FOYUtKTnBpNktraGNEc3dDaEZqRWdCUkFBUncwQkJEUmhmcUQzTGV4a0lPb25XanZkcVdjMy8xdjFlQ1lJREtod0RnTU5wUkl3THdGQ3JJak5aRmVZZEo2dVNRRWlNRFA2eitoYklLZ1c0MVdwUk5QN3Yvb1ZILytwUUFFa0FBM0VtTThzVFNUaGZNTllGOHdaeG5ETERCbE52LzdNc1E3Z2tYd096RU5leUJ3dkFhbUphOXdCaUtPNGlIb1lnQ2pmbFZxZHF6a3R6V2xuN1NWVGdsYmtjdTN0U2krRlRNS0FETG1yWWVXWkVZMmdVWUJncWJNZ0lUQkdYb3l3cURGbmFZdm9yNWxwUkpSUWExSFZEKytmYnY2diszWGQvLzdlNy9UdFRuUTQzZzNPa1ZLTXhrZ0NEQ1BKbk15RU1nek1yTVQwUVlBbUVneE94cDVsUUVhZ09nQm5aVzYwT2xZQmkvM2F0NzZYdGYvK3pMRVVBSUdtRFVuRGZ0QVlOd0dwaVdlNUFwbi8vLy8vK3BKYUFJeG5zcG9CQnNqUWdSZ0ZDTW1BWUNNcXFONFNESVVnWVUrOGJVRnRoY1ZlT0ZZTGJpODN6NnkzTCtuLy8vLy8vLy9lZ0NBb2RVR2JUb2JicWdCaG9Ba0dBY05XWk53TXdzV21SeWdzRUZxVGNnQitVblpTNEJuQUs4aWlUTmJrYTcvUG9idi8vLy85Zis3L1JBOHpSdzR4MlpOVWh1c3dtUVRUQmNBRE12QS8vc3l4RjRDUjBBNUlBMzdZRURTaHFYbGoyQU9Bc291Rzc5anhnVVNHaUx0Y2Qxb2EwZ0ZyZ1pLVEg3di9lK2tWK21uLy9zK3FqVHlVazVEUVZvS0VBTGhnY0RVR1c0RVNKTURvTVNpZUFSaC95Nmd3NENXc2g2WVpOR1NVQTk5cU1jMWUrMk1mLy8vLy8vMEl2NnZyalFDSkFOTkhEREtNd0RIYnpCUUJmQkk1QmdoQkRqcFlBOUVBZzROTmFTamFaVmxtQm1COE9OeWFuaFgvZi83TU1ScWdrY3NOU1N0ZTJCQTFJYWttYjlvQ0hQczNxbDdscnQvLy83LzlWUGRBcUEwd2xRQmp6RitOZ1BHTVJRR0NwZkdlb09yZU0vMG1WVlFmUitXWHViRHhOcWp1TlMzV3VQQzMraWdYVjcvVC8vMGhhNXIxV2RGZDE2SWtTUUlEd2xqZ2J6VXJaSE1QQUNrd2JRaWlaYThleG5LamhFTWhDSENNdllWUXVDeVRSRElxOGJIdFJYbXVmZHUxdDNhL28vM2VyNk83Ly9idGYvN01zUjJnd2NZTlNBTiswQkE3SWFramI5b0NEWGhUa3JqYkFRaU1RTUJnd0F4UVRLakJ3Rmhzc1R4ZElMaXhwb1dua21LME5SUUtEOG9WVGFsZWhYZGY5VHYzdi82UC8vL3hUMmZXbGZjeHpDazZZM3hnMndRSFREdUFxTUMwZUV3c3dqZ3VQTmlyRWxJcUhPV1lhZWxwRm4zTmVHZ2RQMm0zTy9yL3ZxMWRyZjMvVC8rNzlhYjlQOVUwZ1Z5TnpsTnVBL013M1FGVEJLSE5NZi8rekxFZ0lJSGNDc3M3UGNBVVBVR3BBMnZhQWdZR3d5Z2MxMmN0ZU1IVGlCR3JJY25rZEVJNFBLZ1hJTld1WFArejRqLy82UCsxSDl0ODZ2Y1IxL1NrMHNUTWNwall0YTBNSWdGUXdOQTZ6TVFBT0VrUVJUUWNCQ0lJTmtGM0ljZGZxcVJobzNHbFVXb2MvOWQrdFBmLzVhai9aZ0xhMnlSbnVqWXByVEJCYkNRMWRVMXNrQXVpYVMwWEpnZGc1bUNjSlVaZXdQSnJBeDN6WUdnLy9zeXhJZ0RSNFE3SGcxN1lFRHVCcVBKcjJnSUVpNDVJOS9rQ09sbG1kT1ErNEt0Ri9mTlpmUWwvK3Y3djl2UWk4UWFhaC9VWUxNS3hhWFE5aWdsSWtnUUdiRmduc1lncTZoZ1dnUEdCSndiRUtycUdFQ2l0ZEk4SEhhZmpMM3pna1BaQmNjM1Y2OWlydHZYWCtpbnA5KzEzNiszbys1dmVqU3hneHlMTWQ5ck13aUFUVEF0R1dNUzBHa3hvNHpWeExvVUxtZ0ZQeXJOQjdQak92LzdNTVNRQThkd054d05lMEJCQ29halFiOXNDQVpFM1I3YzZQeUplNWYyMGYvYjBkMzl1dE5sY2dLbzZKa3pJYzB0Z3pjRk9qQ2RBV01BMExveUZ3QlI0a0FxeE1RUXdFeEwydEtoeG81S091cU9UdlpNNTdpSDMvZC8vY2orcnQxSnd5VFZkMDBWSlRSQmdEZEhScDJmRzQ4YkpoR0lacHlDZ1lXWUdLdTB0aTBmWW5SU2dJSnNRVm1Ydlp5bnZWN3FvejZydXRlai9aVHFtUC83TXNTVUFnZzROUmdOKzBCQTY0VmozYTl3QUQvNlJxTVRETkU0UVlPRW1DZ2lKaDJnbkszbWwwVEJMdkc2blBXQnF4SWV6bzJ4U2ZlSC8zN3QrajluL2I4RGFobHR6M2YydVl2WWFLT1ZFd3pVb1A3V1dNYmdjRlVYTW5oQVNGTzlpZ3BBTUNJbTViSjNwTElXWTgrWXJleFA2KzMvcitZMzYvdGVLNkR3QWFMbUJGT1czQnVvQ0E1SUEwbk4wWG1HSURtSk5ZTDhFTFNxVnc3Lyt6TEVtWVBIb0MwYURmdEFRT1dGWTBHdmFBak9EUmJJSHd0UnhFM0RPRHhtOVd5QUhHSFd2MDM3cThVVW4yY1YvclY5bTY5dEtnQnRFQkFZT01YRzFOTUFnQ0RBZ28vUURXWUJBaGJ5Mms3NXFDckdZMEJYNkdlWFVaNURWdWU5bjlHcGYvUmIyMDhsWjAvUUZJb2tDQUhKRGxabUpUWUFCRVFEd1pBQTZyWVl5TUVqeEY2L2I1TXBjV1pMZlJzUlh0ZmRUZDcxZjJWOXRIMTYvL3N3eEtJREJzZ25JR3gzSUVEZ0JxTkJuMlFJMnZ2eHIvcFRBQUFhcXBjYStLZ1F3dFZCSURGVHdETHpnUDdLbVVWV0htUkorWHBYSjZXZTlWSGQxczl1YTFRSXJvM2ZVcFh1NmdBS21rQ0JBSEdCRHpjZk5CUlJNRlRBZUpxK0wwT2ZBSk1HMmJ2YTZ1czVsM3J0MDlIdWZkLzNjWFgrMzRHZFQvZllBRzB5RU51aXNjQ2dRME5vSERmU2JBVW5oNkhMYUJ1cEhhek11NTZlLy9zeXhLNENCdHduR2d6M0FFRGlCT1BabnV3QTI5VE1lTmU5L2dJRHZBL1NsVE9yM2EvYi82dzEwQmlVU2NCMlZFaHhNQXIwN1loclpLRmVxNEVmSGFxd2k1Nzh5VjNOblBWS2E3L2M1cE1pejBzOUs5TnRZdjI1S21uS1ZRQkFBQmtvRGdHZjBPSUtRWnFJNW5BUmZOSUVLcEhwQlcwZEFzVzBrVmdrU0xQUmE2NmVHcFQ3WDFZcWhHSFhIRzV0YkJRUHBZTEV4VWtZYVpGUkl2LzdNc1M2QWdhY0p4N005MkFBMkFUajNaN2dDQjczdUJ3MlNhZEhRRXNrUUNvL3plREFnT1VyZVMzaHZlWGY1dFI3VHB6bTNISXB0YWxraTduL3lwcDAvdm1SeXpxK2hweDRqcWJHYUhhcC9WZkxKNklCZ0FReGkwY3lNM2piU2xnaVFWbmJ1V1lBQmJQb2pjcTRjL3ZkNzA0RlBTbWwxazVJbVRiM21wbjJKZVhEcFZtSlUxdmVIbXVTU08vVTNPaU9oVGtkZ21UbVptb05UMjMvK3pMRXlJSUdJQ2NuTG1YaUVNZUVvL1dPYkFCRmh3cDBzdEEyY0FZQkNNcEZRZ2FkcFFLRVRrMDJPVm1ORkhKMmVBcWhOa3dNS0Y3NUtXNmYzWlVycjZ2eU0xMjBjdXJYOWwzVjBSU0lqNk1Kbk9qekk2c1pZSjFOSjgyNkFKMmhBQXpGVURFaGk2MUtJNkVsMmVVd3hib3U5N1ljeTc5bHAvdmM5RGw4djc5K2E4NjVPajZNWEhPV2tVYUFsY1QwTERTeCtpb1BWeVlnKzR4Zy8vc3d4TnNDQmpnbklNNXA0aERSaE9PWnpUeElCUmJoMmdCUUlRQ0hXSkFTQUt3OE9OSk9GZDJoWGhJUks1ZXZrY0Iwck8yay9sU012UFkyL0xLUnk5dnEvZFNPUENJdUorK3k1N1M0dFhjR3BwZkdCQkJJWFNxK0FIOWJ3RDRRQU11QndDMUZpQ3hCdzVHdnV0WTFqSG5tMlp0d0hXMUw3bmtSdHNSOUx2NWIrL21SOXVENHgvNXhvcTNOeUpac2F5TE9uRVFkbzFDUHZFWWsvL3N5eE9zQ2lPUXBGczVwZ2tFSkhxSlZ3STI1RnQ0NU9YekRkZ0F3QkFnRUx3UjRsWU4xWmd4YTZ4dnZNSVJYbE1NUHhaaCtIaTRWL2I0My8xU1ZtWm1iVXRWVlZWVllNQk16ZXhmL3N5OUNpU2JXTnN4MVM0R0ZZVStLQ201SmFreEJUVVV6TGprNUxqT3FxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXYvN01zVHFBRWlSQ3hBT0JHM0pCQ0hpWWNDSSthcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxVEVGTlJUTXVPVGt1TTZxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxci8rekxFNndBSVlRMFFMZ1JseVJjZDRpRzBqRUdxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxLy9zd3hPcUFDSDBORGtaZ1lBa1JvT0NrOEkxNXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcS8vc3l4THVEd0FBQnBBQUFBQ0FBQURTQUFBQUVxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxZz09JztcclxuY29uc3Qgc291bmRCeXRlQXJyYXkgPSBiYXNlNjRTb3VuZFRvQnl0ZUFycmF5KCBwaGV0QXVkaW9Db250ZXh0LCBzb3VuZFVSSSApO1xyXG5jb25zdCB1bmxvY2sgPSBhc3luY0xvYWRlci5jcmVhdGVMb2NrKCBzb3VuZFVSSSApO1xyXG5jb25zdCB3cmFwcGVkQXVkaW9CdWZmZXIgPSBuZXcgV3JhcHBlZEF1ZGlvQnVmZmVyKCk7XHJcblxyXG4vLyBzYWZlIHdheSB0byB1bmxvY2tcclxubGV0IHVubG9ja2VkID0gZmFsc2U7XHJcbmNvbnN0IHNhZmVVbmxvY2sgPSAoKSA9PiB7XHJcbiAgaWYgKCAhdW5sb2NrZWQgKSB7XHJcbiAgICB1bmxvY2soKTtcclxuICAgIHVubG9ja2VkID0gdHJ1ZTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBvbkRlY29kZVN1Y2Nlc3MgPSBkZWNvZGVkQXVkaW8gPT4ge1xyXG4gIGlmICggd3JhcHBlZEF1ZGlvQnVmZmVyLmF1ZGlvQnVmZmVyUHJvcGVydHkudmFsdWUgPT09IG51bGwgKSB7XHJcbiAgICB3cmFwcGVkQXVkaW9CdWZmZXIuYXVkaW9CdWZmZXJQcm9wZXJ0eS5zZXQoIGRlY29kZWRBdWRpbyApO1xyXG4gICAgc2FmZVVubG9jaygpO1xyXG4gIH1cclxufTtcclxuY29uc3Qgb25EZWNvZGVFcnJvciA9IGRlY29kZUVycm9yID0+IHtcclxuICBjb25zb2xlLndhcm4oICdkZWNvZGUgb2YgYXVkaW8gZGF0YSBmYWlsZWQsIHVzaW5nIHN0dWJiZWQgc291bmQsIGVycm9yOiAnICsgZGVjb2RlRXJyb3IgKTtcclxuICB3cmFwcGVkQXVkaW9CdWZmZXIuYXVkaW9CdWZmZXJQcm9wZXJ0eS5zZXQoIHBoZXRBdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyKCAxLCAxLCBwaGV0QXVkaW9Db250ZXh0LnNhbXBsZVJhdGUgKSApO1xyXG4gIHNhZmVVbmxvY2soKTtcclxufTtcclxuY29uc3QgZGVjb2RlUHJvbWlzZSA9IHBoZXRBdWRpb0NvbnRleHQuZGVjb2RlQXVkaW9EYXRhKCBzb3VuZEJ5dGVBcnJheS5idWZmZXIsIG9uRGVjb2RlU3VjY2Vzcywgb25EZWNvZGVFcnJvciApO1xyXG5pZiAoIGRlY29kZVByb21pc2UgKSB7XHJcbiAgZGVjb2RlUHJvbWlzZVxyXG4gICAgLnRoZW4oIGRlY29kZWRBdWRpbyA9PiB7XHJcbiAgICAgIGlmICggd3JhcHBlZEF1ZGlvQnVmZmVyLmF1ZGlvQnVmZmVyUHJvcGVydHkudmFsdWUgPT09IG51bGwgKSB7XHJcbiAgICAgICAgd3JhcHBlZEF1ZGlvQnVmZmVyLmF1ZGlvQnVmZmVyUHJvcGVydHkuc2V0KCBkZWNvZGVkQXVkaW8gKTtcclxuICAgICAgICBzYWZlVW5sb2NrKCk7XHJcbiAgICAgIH1cclxuICAgIH0gKVxyXG4gICAgLmNhdGNoKCBlID0+IHtcclxuICAgICAgY29uc29sZS53YXJuKCAncHJvbWlzZSByZWplY3Rpb24gY2F1Z2h0IGZvciBhdWRpbyBkZWNvZGUsIGVycm9yID0gJyArIGUgKTtcclxuICAgICAgc2FmZVVubG9jaygpO1xyXG4gICAgfSApO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHdyYXBwZWRBdWRpb0J1ZmZlcjsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsT0FBT0EsV0FBVyxNQUFNLG1DQUFtQztBQUMzRCxPQUFPQyxzQkFBc0IsTUFBTSwwQ0FBMEM7QUFDN0UsT0FBT0Msa0JBQWtCLE1BQU0sc0NBQXNDO0FBQ3JFLE9BQU9DLGdCQUFnQixNQUFNLG9DQUFvQztBQUVqRSxNQUFNQyxRQUFRLEdBQUcsaWdNQUFpZ007QUFDbGhNLE1BQU1DLGNBQWMsR0FBR0osc0JBQXNCLENBQUVFLGdCQUFnQixFQUFFQyxRQUFTLENBQUM7QUFDM0UsTUFBTUUsTUFBTSxHQUFHTixXQUFXLENBQUNPLFVBQVUsQ0FBRUgsUUFBUyxDQUFDO0FBQ2pELE1BQU1JLGtCQUFrQixHQUFHLElBQUlOLGtCQUFrQixDQUFDLENBQUM7O0FBRW5EO0FBQ0EsSUFBSU8sUUFBUSxHQUFHLEtBQUs7QUFDcEIsTUFBTUMsVUFBVSxHQUFHQSxDQUFBLEtBQU07RUFDdkIsSUFBSyxDQUFDRCxRQUFRLEVBQUc7SUFDZkgsTUFBTSxDQUFDLENBQUM7SUFDUkcsUUFBUSxHQUFHLElBQUk7RUFDakI7QUFDRixDQUFDO0FBRUQsTUFBTUUsZUFBZSxHQUFHQyxZQUFZLElBQUk7RUFDdEMsSUFBS0osa0JBQWtCLENBQUNLLG1CQUFtQixDQUFDQyxLQUFLLEtBQUssSUFBSSxFQUFHO0lBQzNETixrQkFBa0IsQ0FBQ0ssbUJBQW1CLENBQUNFLEdBQUcsQ0FBRUgsWUFBYSxDQUFDO0lBQzFERixVQUFVLENBQUMsQ0FBQztFQUNkO0FBQ0YsQ0FBQztBQUNELE1BQU1NLGFBQWEsR0FBR0MsV0FBVyxJQUFJO0VBQ25DQyxPQUFPLENBQUNDLElBQUksQ0FBRSwyREFBMkQsR0FBR0YsV0FBWSxDQUFDO0VBQ3pGVCxrQkFBa0IsQ0FBQ0ssbUJBQW1CLENBQUNFLEdBQUcsQ0FBRVosZ0JBQWdCLENBQUNpQixZQUFZLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRWpCLGdCQUFnQixDQUFDa0IsVUFBVyxDQUFFLENBQUM7RUFDaEhYLFVBQVUsQ0FBQyxDQUFDO0FBQ2QsQ0FBQztBQUNELE1BQU1ZLGFBQWEsR0FBR25CLGdCQUFnQixDQUFDb0IsZUFBZSxDQUFFbEIsY0FBYyxDQUFDbUIsTUFBTSxFQUFFYixlQUFlLEVBQUVLLGFBQWMsQ0FBQztBQUMvRyxJQUFLTSxhQUFhLEVBQUc7RUFDbkJBLGFBQWEsQ0FDVkcsSUFBSSxDQUFFYixZQUFZLElBQUk7SUFDckIsSUFBS0osa0JBQWtCLENBQUNLLG1CQUFtQixDQUFDQyxLQUFLLEtBQUssSUFBSSxFQUFHO01BQzNETixrQkFBa0IsQ0FBQ0ssbUJBQW1CLENBQUNFLEdBQUcsQ0FBRUgsWUFBYSxDQUFDO01BQzFERixVQUFVLENBQUMsQ0FBQztJQUNkO0VBQ0YsQ0FBRSxDQUFDLENBQ0ZnQixLQUFLLENBQUVDLENBQUMsSUFBSTtJQUNYVCxPQUFPLENBQUNDLElBQUksQ0FBRSxxREFBcUQsR0FBR1EsQ0FBRSxDQUFDO0lBQ3pFakIsVUFBVSxDQUFDLENBQUM7RUFDZCxDQUFFLENBQUM7QUFDUDtBQUNBLGVBQWVGLGtCQUFrQiJ9