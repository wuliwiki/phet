// Copyright 2013-2021, University of Colorado Boulder

/**
 * Creates and references a stylesheet that can be built up while Scenery is loading.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import { scenery } from '../imports.js';
const styleElement = document.createElement('style');
styleElement.type = 'text/css';
document.head.appendChild(styleElement);
const stylesheet = document.styleSheets[document.styleSheets.length - 1];
assert && assert(stylesheet.disabled === false);
const SceneryStyle = {
  stylesheet: stylesheet,
  styleElement: styleElement,
  addRule(ruleString) {
    // using a this reference so it doesn't need to be a closure
    this.stylesheet.insertRule(ruleString, 0);
  }
};
scenery.register('SceneryStyle', SceneryStyle);
export default SceneryStyle;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzY2VuZXJ5Iiwic3R5bGVFbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidHlwZSIsImhlYWQiLCJhcHBlbmRDaGlsZCIsInN0eWxlc2hlZXQiLCJzdHlsZVNoZWV0cyIsImxlbmd0aCIsImFzc2VydCIsImRpc2FibGVkIiwiU2NlbmVyeVN0eWxlIiwiYWRkUnVsZSIsInJ1bGVTdHJpbmciLCJpbnNlcnRSdWxlIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJTY2VuZXJ5U3R5bGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTMtMjAyMSwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYW5kIHJlZmVyZW5jZXMgYSBzdHlsZXNoZWV0IHRoYXQgY2FuIGJlIGJ1aWx0IHVwIHdoaWxlIFNjZW5lcnkgaXMgbG9hZGluZy5cclxuICpcclxuICogQGF1dGhvciBKb25hdGhhbiBPbHNvbiA8am9uYXRoYW4ub2xzb25AY29sb3JhZG8uZWR1PlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IHNjZW5lcnkgfSBmcm9tICcuLi9pbXBvcnRzLmpzJztcclxuXHJcbmNvbnN0IHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdzdHlsZScgKTtcclxuc3R5bGVFbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnO1xyXG5kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKCBzdHlsZUVsZW1lbnQgKTtcclxuXHJcbmNvbnN0IHN0eWxlc2hlZXQgPSBkb2N1bWVudC5zdHlsZVNoZWV0c1sgZG9jdW1lbnQuc3R5bGVTaGVldHMubGVuZ3RoIC0gMSBdO1xyXG5hc3NlcnQgJiYgYXNzZXJ0KCBzdHlsZXNoZWV0LmRpc2FibGVkID09PSBmYWxzZSApO1xyXG5cclxuY29uc3QgU2NlbmVyeVN0eWxlID0ge1xyXG4gIHN0eWxlc2hlZXQ6IHN0eWxlc2hlZXQsXHJcbiAgc3R5bGVFbGVtZW50OiBzdHlsZUVsZW1lbnQsXHJcblxyXG4gIGFkZFJ1bGUoIHJ1bGVTdHJpbmcgKSB7XHJcbiAgICAvLyB1c2luZyBhIHRoaXMgcmVmZXJlbmNlIHNvIGl0IGRvZXNuJ3QgbmVlZCB0byBiZSBhIGNsb3N1cmVcclxuICAgIHRoaXMuc3R5bGVzaGVldC5pbnNlcnRSdWxlKCBydWxlU3RyaW5nLCAwICk7XHJcbiAgfVxyXG59O1xyXG5zY2VuZXJ5LnJlZ2lzdGVyKCAnU2NlbmVyeVN0eWxlJywgU2NlbmVyeVN0eWxlICk7XHJcbmV4cG9ydCBkZWZhdWx0IFNjZW5lcnlTdHlsZTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsT0FBTyxRQUFRLGVBQWU7QUFFdkMsTUFBTUMsWUFBWSxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBRSxPQUFRLENBQUM7QUFDdERGLFlBQVksQ0FBQ0csSUFBSSxHQUFHLFVBQVU7QUFDOUJGLFFBQVEsQ0FBQ0csSUFBSSxDQUFDQyxXQUFXLENBQUVMLFlBQWEsQ0FBQztBQUV6QyxNQUFNTSxVQUFVLEdBQUdMLFFBQVEsQ0FBQ00sV0FBVyxDQUFFTixRQUFRLENBQUNNLFdBQVcsQ0FBQ0MsTUFBTSxHQUFHLENBQUMsQ0FBRTtBQUMxRUMsTUFBTSxJQUFJQSxNQUFNLENBQUVILFVBQVUsQ0FBQ0ksUUFBUSxLQUFLLEtBQU0sQ0FBQztBQUVqRCxNQUFNQyxZQUFZLEdBQUc7RUFDbkJMLFVBQVUsRUFBRUEsVUFBVTtFQUN0Qk4sWUFBWSxFQUFFQSxZQUFZO0VBRTFCWSxPQUFPQSxDQUFFQyxVQUFVLEVBQUc7SUFDcEI7SUFDQSxJQUFJLENBQUNQLFVBQVUsQ0FBQ1EsVUFBVSxDQUFFRCxVQUFVLEVBQUUsQ0FBRSxDQUFDO0VBQzdDO0FBQ0YsQ0FBQztBQUNEZCxPQUFPLENBQUNnQixRQUFRLENBQUUsY0FBYyxFQUFFSixZQUFhLENBQUM7QUFDaEQsZUFBZUEsWUFBWSJ9