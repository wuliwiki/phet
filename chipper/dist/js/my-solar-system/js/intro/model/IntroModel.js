// Copyright 2020-2023, University of Colorado Boulder

/**
 * Main model for Intro Screen in My Solar System.
 * In charge of keeping track of the position and states of the bodies,
 * their center of mass, and the time.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import mySolarSystem from '../../mySolarSystem.js';
import optionize from '../../../../phet-core/js/optionize.js';
import NumericalEngine from '../../common/model/NumericalEngine.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import MySolarSystemModel from '../../common/model/MySolarSystemModel.js';
export default class IntroModel extends MySolarSystemModel {
  constructor(providedOptions) {
    const options = optionize()({
      engineFactory: bodies => new NumericalEngine(bodies),
      isLab: false
    }, providedOptions);
    super(options);
  }
  reset() {
    super.reset();
    this.loadBodyStates([{
      active: true,
      mass: 250,
      position: new Vector2(0, 0),
      velocity: new Vector2(0, -11.1)
    }, {
      active: true,
      mass: 25,
      position: new Vector2(200, 0),
      velocity: new Vector2(0, 111)
    }]);
  }
}
mySolarSystem.register('IntroModel', IntroModel);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJteVNvbGFyU3lzdGVtIiwib3B0aW9uaXplIiwiTnVtZXJpY2FsRW5naW5lIiwiVmVjdG9yMiIsIk15U29sYXJTeXN0ZW1Nb2RlbCIsIkludHJvTW9kZWwiLCJjb25zdHJ1Y3RvciIsInByb3ZpZGVkT3B0aW9ucyIsIm9wdGlvbnMiLCJlbmdpbmVGYWN0b3J5IiwiYm9kaWVzIiwiaXNMYWIiLCJyZXNldCIsImxvYWRCb2R5U3RhdGVzIiwiYWN0aXZlIiwibWFzcyIsInBvc2l0aW9uIiwidmVsb2NpdHkiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkludHJvTW9kZWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogTWFpbiBtb2RlbCBmb3IgSW50cm8gU2NyZWVuIGluIE15IFNvbGFyIFN5c3RlbS5cclxuICogSW4gY2hhcmdlIG9mIGtlZXBpbmcgdHJhY2sgb2YgdGhlIHBvc2l0aW9uIGFuZCBzdGF0ZXMgb2YgdGhlIGJvZGllcyxcclxuICogdGhlaXIgY2VudGVyIG9mIG1hc3MsIGFuZCB0aGUgdGltZS5cclxuICpcclxuICogQGF1dGhvciBBZ3VzdMOtbiBWYWxsZWpvIChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCBteVNvbGFyU3lzdGVtIGZyb20gJy4uLy4uL215U29sYXJTeXN0ZW0uanMnO1xyXG5pbXBvcnQgU3RyaWN0T21pdCBmcm9tICcuLi8uLi8uLi8uLi9waGV0LWNvcmUvanMvdHlwZXMvU3RyaWN0T21pdC5qcyc7XHJcbmltcG9ydCBvcHRpb25pemUsIHsgRW1wdHlTZWxmT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9vcHRpb25pemUuanMnO1xyXG5pbXBvcnQgTnVtZXJpY2FsRW5naW5lIGZyb20gJy4uLy4uL2NvbW1vbi9tb2RlbC9OdW1lcmljYWxFbmdpbmUuanMnO1xyXG5pbXBvcnQgVmVjdG9yMiBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvVmVjdG9yMi5qcyc7XHJcbmltcG9ydCBNeVNvbGFyU3lzdGVtTW9kZWwsIHsgTXlTb2xhclN5c3RlbU1vZGVsT3B0aW9ucyB9IGZyb20gJy4uLy4uL2NvbW1vbi9tb2RlbC9NeVNvbGFyU3lzdGVtTW9kZWwuanMnO1xyXG5cclxudHlwZSBTdXBlclR5cGVPcHRpb25zID0gTXlTb2xhclN5c3RlbU1vZGVsT3B0aW9ucztcclxuXHJcbmV4cG9ydCB0eXBlIEludHJvTW9kZWxPcHRpb25zID0gU3RyaWN0T21pdDxTdXBlclR5cGVPcHRpb25zLCAnZW5naW5lRmFjdG9yeScgfCAnaXNMYWInPjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludHJvTW9kZWwgZXh0ZW5kcyBNeVNvbGFyU3lzdGVtTW9kZWwge1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggcHJvdmlkZWRPcHRpb25zOiBJbnRyb01vZGVsT3B0aW9ucyApIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSBvcHRpb25pemU8SW50cm9Nb2RlbE9wdGlvbnMsIEVtcHR5U2VsZk9wdGlvbnMsIFN1cGVyVHlwZU9wdGlvbnM+KCkoIHtcclxuICAgICAgZW5naW5lRmFjdG9yeTogYm9kaWVzID0+IG5ldyBOdW1lcmljYWxFbmdpbmUoIGJvZGllcyApLFxyXG4gICAgICBpc0xhYjogZmFsc2VcclxuICAgIH0sIHByb3ZpZGVkT3B0aW9ucyApO1xyXG4gICAgc3VwZXIoIG9wdGlvbnMgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvdmVycmlkZSByZXNldCgpOiB2b2lkIHtcclxuICAgIHN1cGVyLnJlc2V0KCk7XHJcbiAgICB0aGlzLmxvYWRCb2R5U3RhdGVzKCBbXHJcbiAgICAgIHsgYWN0aXZlOiB0cnVlLCBtYXNzOiAyNTAsIHBvc2l0aW9uOiBuZXcgVmVjdG9yMiggMCwgMCApLCB2ZWxvY2l0eTogbmV3IFZlY3RvcjIoIDAsIC0xMS4xICkgfSxcclxuICAgICAgeyBhY3RpdmU6IHRydWUsIG1hc3M6IDI1LCBwb3NpdGlvbjogbmV3IFZlY3RvcjIoIDIwMCwgMCApLCB2ZWxvY2l0eTogbmV3IFZlY3RvcjIoIDAsIDExMSApIH1cclxuICAgIF0gKTtcclxuICB9XHJcbn1cclxuXHJcbm15U29sYXJTeXN0ZW0ucmVnaXN0ZXIoICdJbnRyb01vZGVsJywgSW50cm9Nb2RlbCApO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLGFBQWEsTUFBTSx3QkFBd0I7QUFFbEQsT0FBT0MsU0FBUyxNQUE0Qix1Q0FBdUM7QUFDbkYsT0FBT0MsZUFBZSxNQUFNLHVDQUF1QztBQUNuRSxPQUFPQyxPQUFPLE1BQU0sK0JBQStCO0FBQ25ELE9BQU9DLGtCQUFrQixNQUFxQywwQ0FBMEM7QUFNeEcsZUFBZSxNQUFNQyxVQUFVLFNBQVNELGtCQUFrQixDQUFDO0VBQ2xERSxXQUFXQSxDQUFFQyxlQUFrQyxFQUFHO0lBQ3ZELE1BQU1DLE9BQU8sR0FBR1AsU0FBUyxDQUF3RCxDQUFDLENBQUU7TUFDbEZRLGFBQWEsRUFBRUMsTUFBTSxJQUFJLElBQUlSLGVBQWUsQ0FBRVEsTUFBTyxDQUFDO01BQ3REQyxLQUFLLEVBQUU7SUFDVCxDQUFDLEVBQUVKLGVBQWdCLENBQUM7SUFDcEIsS0FBSyxDQUFFQyxPQUFRLENBQUM7RUFDbEI7RUFFZ0JJLEtBQUtBLENBQUEsRUFBUztJQUM1QixLQUFLLENBQUNBLEtBQUssQ0FBQyxDQUFDO0lBQ2IsSUFBSSxDQUFDQyxjQUFjLENBQUUsQ0FDbkI7TUFBRUMsTUFBTSxFQUFFLElBQUk7TUFBRUMsSUFBSSxFQUFFLEdBQUc7TUFBRUMsUUFBUSxFQUFFLElBQUliLE9BQU8sQ0FBRSxDQUFDLEVBQUUsQ0FBRSxDQUFDO01BQUVjLFFBQVEsRUFBRSxJQUFJZCxPQUFPLENBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSztJQUFFLENBQUMsRUFDN0Y7TUFBRVcsTUFBTSxFQUFFLElBQUk7TUFBRUMsSUFBSSxFQUFFLEVBQUU7TUFBRUMsUUFBUSxFQUFFLElBQUliLE9BQU8sQ0FBRSxHQUFHLEVBQUUsQ0FBRSxDQUFDO01BQUVjLFFBQVEsRUFBRSxJQUFJZCxPQUFPLENBQUUsQ0FBQyxFQUFFLEdBQUk7SUFBRSxDQUFDLENBQzVGLENBQUM7RUFDTDtBQUNGO0FBRUFILGFBQWEsQ0FBQ2tCLFFBQVEsQ0FBRSxZQUFZLEVBQUViLFVBQVcsQ0FBQyJ9