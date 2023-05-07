// Copyright 2019-2021, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */

import buildAMolecule from '../buildAMolecule.js';
const BAMQueryParameters = QueryStringMachine.getAll({
  // Triggers a successfully completed collection. The user just needs to fill a single box to go to next collection.
  easyMode: {
    type: 'flag',
    private: false
  },
  // Triggers console logs for information related to created molecules, collected molecules, and split molecules
  logData: {
    type: 'flag'
  }
});
buildAMolecule.register('BAMQueryParameters', BAMQueryParameters);
export default BAMQueryParameters;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJidWlsZEFNb2xlY3VsZSIsIkJBTVF1ZXJ5UGFyYW1ldGVycyIsIlF1ZXJ5U3RyaW5nTWFjaGluZSIsImdldEFsbCIsImVhc3lNb2RlIiwidHlwZSIsInByaXZhdGUiLCJsb2dEYXRhIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJCQU1RdWVyeVBhcmFtZXRlcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMSwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogUXVlcnkgcGFyYW1ldGVycyBzdXBwb3J0ZWQgYnkgdGhpcyBzaW11bGF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yIERlbnplbGwgQmFybmV0dCAoUGhFVCBJbnRlcmFjdGl2ZSBTaW11bGF0aW9ucylcclxuICovXHJcblxyXG5pbXBvcnQgYnVpbGRBTW9sZWN1bGUgZnJvbSAnLi4vYnVpbGRBTW9sZWN1bGUuanMnO1xyXG5cclxuY29uc3QgQkFNUXVlcnlQYXJhbWV0ZXJzID0gUXVlcnlTdHJpbmdNYWNoaW5lLmdldEFsbCgge1xyXG5cclxuICAvLyBUcmlnZ2VycyBhIHN1Y2Nlc3NmdWxseSBjb21wbGV0ZWQgY29sbGVjdGlvbi4gVGhlIHVzZXIganVzdCBuZWVkcyB0byBmaWxsIGEgc2luZ2xlIGJveCB0byBnbyB0byBuZXh0IGNvbGxlY3Rpb24uXHJcbiAgZWFzeU1vZGU6IHsgdHlwZTogJ2ZsYWcnLCBwcml2YXRlOiBmYWxzZSB9LFxyXG5cclxuICAvLyBUcmlnZ2VycyBjb25zb2xlIGxvZ3MgZm9yIGluZm9ybWF0aW9uIHJlbGF0ZWQgdG8gY3JlYXRlZCBtb2xlY3VsZXMsIGNvbGxlY3RlZCBtb2xlY3VsZXMsIGFuZCBzcGxpdCBtb2xlY3VsZXNcclxuICBsb2dEYXRhOiB7IHR5cGU6ICdmbGFnJyB9XHJcbn0gKTtcclxuXHJcbmJ1aWxkQU1vbGVjdWxlLnJlZ2lzdGVyKCAnQkFNUXVlcnlQYXJhbWV0ZXJzJywgQkFNUXVlcnlQYXJhbWV0ZXJzICk7XHJcbmV4cG9ydCBkZWZhdWx0IEJBTVF1ZXJ5UGFyYW1ldGVyczsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsY0FBYyxNQUFNLHNCQUFzQjtBQUVqRCxNQUFNQyxrQkFBa0IsR0FBR0Msa0JBQWtCLENBQUNDLE1BQU0sQ0FBRTtFQUVwRDtFQUNBQyxRQUFRLEVBQUU7SUFBRUMsSUFBSSxFQUFFLE1BQU07SUFBRUMsT0FBTyxFQUFFO0VBQU0sQ0FBQztFQUUxQztFQUNBQyxPQUFPLEVBQUU7SUFBRUYsSUFBSSxFQUFFO0VBQU87QUFDMUIsQ0FBRSxDQUFDO0FBRUhMLGNBQWMsQ0FBQ1EsUUFBUSxDQUFFLG9CQUFvQixFQUFFUCxrQkFBbUIsQ0FBQztBQUNuRSxlQUFlQSxrQkFBa0IifQ==