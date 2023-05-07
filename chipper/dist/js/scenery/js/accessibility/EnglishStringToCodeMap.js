// Copyright 2022-2023, University of Colorado Boulder

/**
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import { KeyboardUtils, scenery } from '../imports.js';

//
const EnglishStringToCodeMap = {
  q: KeyboardUtils.KEY_Q,
  w: KeyboardUtils.KEY_W,
  e: KeyboardUtils.KEY_E,
  r: KeyboardUtils.KEY_R,
  t: KeyboardUtils.KEY_T,
  y: KeyboardUtils.KEY_Y,
  u: KeyboardUtils.KEY_U,
  i: KeyboardUtils.KEY_I,
  o: KeyboardUtils.KEY_O,
  p: KeyboardUtils.KEY_P,
  a: KeyboardUtils.KEY_A,
  s: KeyboardUtils.KEY_S,
  d: KeyboardUtils.KEY_D,
  f: KeyboardUtils.KEY_F,
  g: KeyboardUtils.KEY_G,
  h: KeyboardUtils.KEY_H,
  j: KeyboardUtils.KEY_J,
  k: KeyboardUtils.KEY_K,
  l: KeyboardUtils.KEY_L,
  z: KeyboardUtils.KEY_Z,
  x: KeyboardUtils.KEY_X,
  c: KeyboardUtils.KEY_C,
  v: KeyboardUtils.KEY_V,
  b: KeyboardUtils.KEY_B,
  n: KeyboardUtils.KEY_N,
  m: KeyboardUtils.KEY_M,
  0: KeyboardUtils.KEY_0,
  1: KeyboardUtils.KEY_1,
  2: KeyboardUtils.KEY_2,
  3: KeyboardUtils.KEY_3,
  4: KeyboardUtils.KEY_4,
  5: KeyboardUtils.KEY_5,
  6: KeyboardUtils.KEY_6,
  7: KeyboardUtils.KEY_7,
  8: KeyboardUtils.KEY_8,
  9: KeyboardUtils.KEY_9,
  [KeyboardUtils.KEY_NUMPAD_0]: KeyboardUtils.KEY_NUMPAD_0,
  [KeyboardUtils.KEY_NUMPAD_1]: KeyboardUtils.KEY_NUMPAD_1,
  [KeyboardUtils.KEY_NUMPAD_2]: KeyboardUtils.KEY_NUMPAD_2,
  [KeyboardUtils.KEY_NUMPAD_3]: KeyboardUtils.KEY_NUMPAD_3,
  [KeyboardUtils.KEY_NUMPAD_4]: KeyboardUtils.KEY_NUMPAD_4,
  [KeyboardUtils.KEY_NUMPAD_5]: KeyboardUtils.KEY_NUMPAD_5,
  [KeyboardUtils.KEY_NUMPAD_6]: KeyboardUtils.KEY_NUMPAD_6,
  [KeyboardUtils.KEY_NUMPAD_7]: KeyboardUtils.KEY_NUMPAD_7,
  [KeyboardUtils.KEY_NUMPAD_8]: KeyboardUtils.KEY_NUMPAD_8,
  [KeyboardUtils.KEY_NUMPAD_9]: KeyboardUtils.KEY_NUMPAD_9,
  [KeyboardUtils.KEY_NUMPAD_DECIMAL]: KeyboardUtils.KEY_NUMPAD_DECIMAL,
  [KeyboardUtils.KEY_NUMPAD_DECIMAL]: KeyboardUtils.KEY_NUMPAD_DECIMAL,
  [KeyboardUtils.KEY_NUMPAD_PLUS]: KeyboardUtils.KEY_NUMPAD_PLUS,
  [KeyboardUtils.KEY_NUMPAD_MINUS]: KeyboardUtils.KEY_NUMPAD_MINUS,
  ctrl: KeyboardUtils.KEY_CONTROL,
  alt: KeyboardUtils.KEY_ALT,
  shift: KeyboardUtils.KEY_SHIFT,
  ctrlLeft: KeyboardUtils.KEY_CONTROL_LEFT,
  ctrlRight: KeyboardUtils.KEY_CONTROL_RIGHT,
  shiftLeft: KeyboardUtils.KEY_SHIFT_LEFT,
  shiftRight: KeyboardUtils.KEY_SHIFT_RIGHT,
  altLeft: KeyboardUtils.KEY_ALT_LEFT,
  altRight: KeyboardUtils.KEY_ALT_RIGHT,
  enter: KeyboardUtils.KEY_ENTER,
  tab: KeyboardUtils.KEY_TAB,
  equals: KeyboardUtils.KEY_EQUALS,
  plus: KeyboardUtils.KEY_PLUS,
  minus: KeyboardUtils.KEY_MINUS,
  period: KeyboardUtils.KEY_PERIOD,
  escape: KeyboardUtils.KEY_ESCAPE,
  delete: KeyboardUtils.KEY_DELETE,
  backspace: KeyboardUtils.KEY_BACKSPACE,
  page_up: KeyboardUtils.KEY_PAGE_UP,
  page_down: KeyboardUtils.KEY_PAGE_DOWN,
  end: KeyboardUtils.KEY_END,
  home: KeyboardUtils.KEY_HOME,
  space: KeyboardUtils.KEY_SPACE,
  arrowLeft: KeyboardUtils.KEY_LEFT_ARROW,
  arrowRight: KeyboardUtils.KEY_RIGHT_ARROW,
  arrowUp: KeyboardUtils.KEY_UP_ARROW,
  arrowDown: KeyboardUtils.KEY_DOWN_ARROW
};
scenery.register('EnglishStringToCodeMap', EnglishStringToCodeMap);
export default EnglishStringToCodeMap;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJLZXlib2FyZFV0aWxzIiwic2NlbmVyeSIsIkVuZ2xpc2hTdHJpbmdUb0NvZGVNYXAiLCJxIiwiS0VZX1EiLCJ3IiwiS0VZX1ciLCJlIiwiS0VZX0UiLCJyIiwiS0VZX1IiLCJ0IiwiS0VZX1QiLCJ5IiwiS0VZX1kiLCJ1IiwiS0VZX1UiLCJpIiwiS0VZX0kiLCJvIiwiS0VZX08iLCJwIiwiS0VZX1AiLCJhIiwiS0VZX0EiLCJzIiwiS0VZX1MiLCJkIiwiS0VZX0QiLCJmIiwiS0VZX0YiLCJnIiwiS0VZX0ciLCJoIiwiS0VZX0giLCJqIiwiS0VZX0oiLCJrIiwiS0VZX0siLCJsIiwiS0VZX0wiLCJ6IiwiS0VZX1oiLCJ4IiwiS0VZX1giLCJjIiwiS0VZX0MiLCJ2IiwiS0VZX1YiLCJiIiwiS0VZX0IiLCJuIiwiS0VZX04iLCJtIiwiS0VZX00iLCJLRVlfMCIsIktFWV8xIiwiS0VZXzIiLCJLRVlfMyIsIktFWV80IiwiS0VZXzUiLCJLRVlfNiIsIktFWV83IiwiS0VZXzgiLCJLRVlfOSIsIktFWV9OVU1QQURfMCIsIktFWV9OVU1QQURfMSIsIktFWV9OVU1QQURfMiIsIktFWV9OVU1QQURfMyIsIktFWV9OVU1QQURfNCIsIktFWV9OVU1QQURfNSIsIktFWV9OVU1QQURfNiIsIktFWV9OVU1QQURfNyIsIktFWV9OVU1QQURfOCIsIktFWV9OVU1QQURfOSIsIktFWV9OVU1QQURfREVDSU1BTCIsIktFWV9OVU1QQURfUExVUyIsIktFWV9OVU1QQURfTUlOVVMiLCJjdHJsIiwiS0VZX0NPTlRST0wiLCJhbHQiLCJLRVlfQUxUIiwic2hpZnQiLCJLRVlfU0hJRlQiLCJjdHJsTGVmdCIsIktFWV9DT05UUk9MX0xFRlQiLCJjdHJsUmlnaHQiLCJLRVlfQ09OVFJPTF9SSUdIVCIsInNoaWZ0TGVmdCIsIktFWV9TSElGVF9MRUZUIiwic2hpZnRSaWdodCIsIktFWV9TSElGVF9SSUdIVCIsImFsdExlZnQiLCJLRVlfQUxUX0xFRlQiLCJhbHRSaWdodCIsIktFWV9BTFRfUklHSFQiLCJlbnRlciIsIktFWV9FTlRFUiIsInRhYiIsIktFWV9UQUIiLCJlcXVhbHMiLCJLRVlfRVFVQUxTIiwicGx1cyIsIktFWV9QTFVTIiwibWludXMiLCJLRVlfTUlOVVMiLCJwZXJpb2QiLCJLRVlfUEVSSU9EIiwiZXNjYXBlIiwiS0VZX0VTQ0FQRSIsImRlbGV0ZSIsIktFWV9ERUxFVEUiLCJiYWNrc3BhY2UiLCJLRVlfQkFDS1NQQUNFIiwicGFnZV91cCIsIktFWV9QQUdFX1VQIiwicGFnZV9kb3duIiwiS0VZX1BBR0VfRE9XTiIsImVuZCIsIktFWV9FTkQiLCJob21lIiwiS0VZX0hPTUUiLCJzcGFjZSIsIktFWV9TUEFDRSIsImFycm93TGVmdCIsIktFWV9MRUZUX0FSUk9XIiwiYXJyb3dSaWdodCIsIktFWV9SSUdIVF9BUlJPVyIsImFycm93VXAiLCJLRVlfVVBfQVJST1ciLCJhcnJvd0Rvd24iLCJLRVlfRE9XTl9BUlJPVyIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiRW5nbGlzaFN0cmluZ1RvQ29kZU1hcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMi0yMDIzLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIEplc3NlIEdyZWVuYmVyZyAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgeyBLZXlib2FyZFV0aWxzLCBzY2VuZXJ5IH0gZnJvbSAnLi4vaW1wb3J0cy5qcyc7XHJcblxyXG4vL1xyXG5jb25zdCBFbmdsaXNoU3RyaW5nVG9Db2RlTWFwID0ge1xyXG4gIHE6IEtleWJvYXJkVXRpbHMuS0VZX1EsXHJcbiAgdzogS2V5Ym9hcmRVdGlscy5LRVlfVyxcclxuICBlOiBLZXlib2FyZFV0aWxzLktFWV9FLFxyXG4gIHI6IEtleWJvYXJkVXRpbHMuS0VZX1IsXHJcbiAgdDogS2V5Ym9hcmRVdGlscy5LRVlfVCxcclxuICB5OiBLZXlib2FyZFV0aWxzLktFWV9ZLFxyXG4gIHU6IEtleWJvYXJkVXRpbHMuS0VZX1UsXHJcbiAgaTogS2V5Ym9hcmRVdGlscy5LRVlfSSxcclxuICBvOiBLZXlib2FyZFV0aWxzLktFWV9PLFxyXG4gIHA6IEtleWJvYXJkVXRpbHMuS0VZX1AsXHJcbiAgYTogS2V5Ym9hcmRVdGlscy5LRVlfQSxcclxuICBzOiBLZXlib2FyZFV0aWxzLktFWV9TLFxyXG4gIGQ6IEtleWJvYXJkVXRpbHMuS0VZX0QsXHJcbiAgZjogS2V5Ym9hcmRVdGlscy5LRVlfRixcclxuICBnOiBLZXlib2FyZFV0aWxzLktFWV9HLFxyXG4gIGg6IEtleWJvYXJkVXRpbHMuS0VZX0gsXHJcbiAgajogS2V5Ym9hcmRVdGlscy5LRVlfSixcclxuICBrOiBLZXlib2FyZFV0aWxzLktFWV9LLFxyXG4gIGw6IEtleWJvYXJkVXRpbHMuS0VZX0wsXHJcbiAgejogS2V5Ym9hcmRVdGlscy5LRVlfWixcclxuICB4OiBLZXlib2FyZFV0aWxzLktFWV9YLFxyXG4gIGM6IEtleWJvYXJkVXRpbHMuS0VZX0MsXHJcbiAgdjogS2V5Ym9hcmRVdGlscy5LRVlfVixcclxuICBiOiBLZXlib2FyZFV0aWxzLktFWV9CLFxyXG4gIG46IEtleWJvYXJkVXRpbHMuS0VZX04sXHJcbiAgbTogS2V5Ym9hcmRVdGlscy5LRVlfTSxcclxuICAwOiBLZXlib2FyZFV0aWxzLktFWV8wLFxyXG4gIDE6IEtleWJvYXJkVXRpbHMuS0VZXzEsXHJcbiAgMjogS2V5Ym9hcmRVdGlscy5LRVlfMixcclxuICAzOiBLZXlib2FyZFV0aWxzLktFWV8zLFxyXG4gIDQ6IEtleWJvYXJkVXRpbHMuS0VZXzQsXHJcbiAgNTogS2V5Ym9hcmRVdGlscy5LRVlfNSxcclxuICA2OiBLZXlib2FyZFV0aWxzLktFWV82LFxyXG4gIDc6IEtleWJvYXJkVXRpbHMuS0VZXzcsXHJcbiAgODogS2V5Ym9hcmRVdGlscy5LRVlfOCxcclxuICA5OiBLZXlib2FyZFV0aWxzLktFWV85LFxyXG4gIFsgS2V5Ym9hcmRVdGlscy5LRVlfTlVNUEFEXzAgXTogS2V5Ym9hcmRVdGlscy5LRVlfTlVNUEFEXzAsXHJcbiAgWyBLZXlib2FyZFV0aWxzLktFWV9OVU1QQURfMSBdOiBLZXlib2FyZFV0aWxzLktFWV9OVU1QQURfMSxcclxuICBbIEtleWJvYXJkVXRpbHMuS0VZX05VTVBBRF8yIF06IEtleWJvYXJkVXRpbHMuS0VZX05VTVBBRF8yLFxyXG4gIFsgS2V5Ym9hcmRVdGlscy5LRVlfTlVNUEFEXzMgXTogS2V5Ym9hcmRVdGlscy5LRVlfTlVNUEFEXzMsXHJcbiAgWyBLZXlib2FyZFV0aWxzLktFWV9OVU1QQURfNCBdOiBLZXlib2FyZFV0aWxzLktFWV9OVU1QQURfNCxcclxuICBbIEtleWJvYXJkVXRpbHMuS0VZX05VTVBBRF81IF06IEtleWJvYXJkVXRpbHMuS0VZX05VTVBBRF81LFxyXG4gIFsgS2V5Ym9hcmRVdGlscy5LRVlfTlVNUEFEXzYgXTogS2V5Ym9hcmRVdGlscy5LRVlfTlVNUEFEXzYsXHJcbiAgWyBLZXlib2FyZFV0aWxzLktFWV9OVU1QQURfNyBdOiBLZXlib2FyZFV0aWxzLktFWV9OVU1QQURfNyxcclxuICBbIEtleWJvYXJkVXRpbHMuS0VZX05VTVBBRF84IF06IEtleWJvYXJkVXRpbHMuS0VZX05VTVBBRF84LFxyXG4gIFsgS2V5Ym9hcmRVdGlscy5LRVlfTlVNUEFEXzkgXTogS2V5Ym9hcmRVdGlscy5LRVlfTlVNUEFEXzksXHJcbiAgWyBLZXlib2FyZFV0aWxzLktFWV9OVU1QQURfREVDSU1BTCBdOiBLZXlib2FyZFV0aWxzLktFWV9OVU1QQURfREVDSU1BTCxcclxuICBbIEtleWJvYXJkVXRpbHMuS0VZX05VTVBBRF9ERUNJTUFMIF06IEtleWJvYXJkVXRpbHMuS0VZX05VTVBBRF9ERUNJTUFMLFxyXG4gIFsgS2V5Ym9hcmRVdGlscy5LRVlfTlVNUEFEX1BMVVMgXTogS2V5Ym9hcmRVdGlscy5LRVlfTlVNUEFEX1BMVVMsXHJcbiAgWyBLZXlib2FyZFV0aWxzLktFWV9OVU1QQURfTUlOVVMgXTogS2V5Ym9hcmRVdGlscy5LRVlfTlVNUEFEX01JTlVTLFxyXG5cclxuICBjdHJsOiBLZXlib2FyZFV0aWxzLktFWV9DT05UUk9MLFxyXG4gIGFsdDogS2V5Ym9hcmRVdGlscy5LRVlfQUxULFxyXG4gIHNoaWZ0OiBLZXlib2FyZFV0aWxzLktFWV9TSElGVCxcclxuICBjdHJsTGVmdDogS2V5Ym9hcmRVdGlscy5LRVlfQ09OVFJPTF9MRUZULFxyXG4gIGN0cmxSaWdodDogS2V5Ym9hcmRVdGlscy5LRVlfQ09OVFJPTF9SSUdIVCxcclxuICBzaGlmdExlZnQ6IEtleWJvYXJkVXRpbHMuS0VZX1NISUZUX0xFRlQsXHJcbiAgc2hpZnRSaWdodDogS2V5Ym9hcmRVdGlscy5LRVlfU0hJRlRfUklHSFQsXHJcbiAgYWx0TGVmdDogS2V5Ym9hcmRVdGlscy5LRVlfQUxUX0xFRlQsXHJcbiAgYWx0UmlnaHQ6IEtleWJvYXJkVXRpbHMuS0VZX0FMVF9SSUdIVCxcclxuXHJcbiAgZW50ZXI6IEtleWJvYXJkVXRpbHMuS0VZX0VOVEVSLFxyXG4gIHRhYjogS2V5Ym9hcmRVdGlscy5LRVlfVEFCLFxyXG4gIGVxdWFsczogS2V5Ym9hcmRVdGlscy5LRVlfRVFVQUxTLFxyXG4gIHBsdXM6IEtleWJvYXJkVXRpbHMuS0VZX1BMVVMsXHJcbiAgbWludXM6IEtleWJvYXJkVXRpbHMuS0VZX01JTlVTLFxyXG4gIHBlcmlvZDogS2V5Ym9hcmRVdGlscy5LRVlfUEVSSU9ELFxyXG4gIGVzY2FwZTogS2V5Ym9hcmRVdGlscy5LRVlfRVNDQVBFLFxyXG4gIGRlbGV0ZTogS2V5Ym9hcmRVdGlscy5LRVlfREVMRVRFLFxyXG4gIGJhY2tzcGFjZTogS2V5Ym9hcmRVdGlscy5LRVlfQkFDS1NQQUNFLFxyXG4gIHBhZ2VfdXA6IEtleWJvYXJkVXRpbHMuS0VZX1BBR0VfVVAsXHJcbiAgcGFnZV9kb3duOiBLZXlib2FyZFV0aWxzLktFWV9QQUdFX0RPV04sXHJcbiAgZW5kOiBLZXlib2FyZFV0aWxzLktFWV9FTkQsXHJcbiAgaG9tZTogS2V5Ym9hcmRVdGlscy5LRVlfSE9NRSxcclxuXHJcbiAgc3BhY2U6IEtleWJvYXJkVXRpbHMuS0VZX1NQQUNFLFxyXG4gIGFycm93TGVmdDogS2V5Ym9hcmRVdGlscy5LRVlfTEVGVF9BUlJPVyxcclxuICBhcnJvd1JpZ2h0OiBLZXlib2FyZFV0aWxzLktFWV9SSUdIVF9BUlJPVyxcclxuICBhcnJvd1VwOiBLZXlib2FyZFV0aWxzLktFWV9VUF9BUlJPVyxcclxuICBhcnJvd0Rvd246IEtleWJvYXJkVXRpbHMuS0VZX0RPV05fQVJST1dcclxufTtcclxuXHJcbnNjZW5lcnkucmVnaXN0ZXIoICdFbmdsaXNoU3RyaW5nVG9Db2RlTWFwJywgRW5nbGlzaFN0cmluZ1RvQ29kZU1hcCApO1xyXG5leHBvcnQgZGVmYXVsdCBFbmdsaXNoU3RyaW5nVG9Db2RlTWFwOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFNBQVNBLGFBQWEsRUFBRUMsT0FBTyxRQUFRLGVBQWU7O0FBRXREO0FBQ0EsTUFBTUMsc0JBQXNCLEdBQUc7RUFDN0JDLENBQUMsRUFBRUgsYUFBYSxDQUFDSSxLQUFLO0VBQ3RCQyxDQUFDLEVBQUVMLGFBQWEsQ0FBQ00sS0FBSztFQUN0QkMsQ0FBQyxFQUFFUCxhQUFhLENBQUNRLEtBQUs7RUFDdEJDLENBQUMsRUFBRVQsYUFBYSxDQUFDVSxLQUFLO0VBQ3RCQyxDQUFDLEVBQUVYLGFBQWEsQ0FBQ1ksS0FBSztFQUN0QkMsQ0FBQyxFQUFFYixhQUFhLENBQUNjLEtBQUs7RUFDdEJDLENBQUMsRUFBRWYsYUFBYSxDQUFDZ0IsS0FBSztFQUN0QkMsQ0FBQyxFQUFFakIsYUFBYSxDQUFDa0IsS0FBSztFQUN0QkMsQ0FBQyxFQUFFbkIsYUFBYSxDQUFDb0IsS0FBSztFQUN0QkMsQ0FBQyxFQUFFckIsYUFBYSxDQUFDc0IsS0FBSztFQUN0QkMsQ0FBQyxFQUFFdkIsYUFBYSxDQUFDd0IsS0FBSztFQUN0QkMsQ0FBQyxFQUFFekIsYUFBYSxDQUFDMEIsS0FBSztFQUN0QkMsQ0FBQyxFQUFFM0IsYUFB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