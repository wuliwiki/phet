// Copyright 2018-2022, University of Colorado Boulder

/**
 * @author AUTHOR
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import wilder from '../wilder.js';
import WilderModel from './model/WilderModel.js';
import WilderScreenView from './view/WilderScreenView.js';
class WilderScreen extends Screen {
  constructor(providedOptions) {
    const options = {
      backgroundColorProperty: new Property('white'),
      tandem: providedOptions.tandem
    };
    super(() => new WilderModel({
      tandem: providedOptions.tandem.createTandem('model')
    }), model => new WilderScreenView(model, {
      tandem: providedOptions.tandem.createTandem('view')
    }), options);
  }
}
wilder.register('WilderScreen', WilderScreen);
export default WilderScreen;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQcm9wZXJ0eSIsIlNjcmVlbiIsIndpbGRlciIsIldpbGRlck1vZGVsIiwiV2lsZGVyU2NyZWVuVmlldyIsIldpbGRlclNjcmVlbiIsImNvbnN0cnVjdG9yIiwicHJvdmlkZWRPcHRpb25zIiwib3B0aW9ucyIsImJhY2tncm91bmRDb2xvclByb3BlcnR5IiwidGFuZGVtIiwiY3JlYXRlVGFuZGVtIiwibW9kZWwiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIldpbGRlclNjcmVlbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIEFVVEhPUlxyXG4gKi9cclxuXHJcbmltcG9ydCBQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi9heG9uL2pzL1Byb3BlcnR5LmpzJztcclxuaW1wb3J0IFNjcmVlbiBmcm9tICcuLi8uLi8uLi9qb2lzdC9qcy9TY3JlZW4uanMnO1xyXG5pbXBvcnQgVGFuZGVtIGZyb20gJy4uLy4uLy4uL3RhbmRlbS9qcy9UYW5kZW0uanMnO1xyXG5pbXBvcnQgd2lsZGVyIGZyb20gJy4uL3dpbGRlci5qcyc7XHJcbmltcG9ydCBXaWxkZXJNb2RlbCBmcm9tICcuL21vZGVsL1dpbGRlck1vZGVsLmpzJztcclxuaW1wb3J0IFdpbGRlclNjcmVlblZpZXcgZnJvbSAnLi92aWV3L1dpbGRlclNjcmVlblZpZXcuanMnO1xyXG5cclxudHlwZSBXaWxkZXJTY3JlZW5PcHRpb25zID0ge1xyXG4gIHRhbmRlbTogVGFuZGVtO1xyXG59O1xyXG5cclxuY2xhc3MgV2lsZGVyU2NyZWVuIGV4dGVuZHMgU2NyZWVuPFdpbGRlck1vZGVsLCBXaWxkZXJTY3JlZW5WaWV3PiB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBwcm92aWRlZE9wdGlvbnM6IFdpbGRlclNjcmVlbk9wdGlvbnMgKSB7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgYmFja2dyb3VuZENvbG9yUHJvcGVydHk6IG5ldyBQcm9wZXJ0eSggJ3doaXRlJyApLFxyXG4gICAgICB0YW5kZW06IHByb3ZpZGVkT3B0aW9ucy50YW5kZW1cclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIoICgpID0+IG5ldyBXaWxkZXJNb2RlbCgge1xyXG4gICAgICAgIHRhbmRlbTogcHJvdmlkZWRPcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICdtb2RlbCcgKVxyXG4gICAgICB9ICksXHJcbiAgICAgIG1vZGVsID0+IG5ldyBXaWxkZXJTY3JlZW5WaWV3KCBtb2RlbCwge1xyXG4gICAgICAgIHRhbmRlbTogcHJvdmlkZWRPcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICd2aWV3JyApXHJcbiAgICAgIH0gKSxcclxuICAgICAgb3B0aW9uc1xyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbndpbGRlci5yZWdpc3RlciggJ1dpbGRlclNjcmVlbicsIFdpbGRlclNjcmVlbiApO1xyXG5leHBvcnQgZGVmYXVsdCBXaWxkZXJTY3JlZW47Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsUUFBUSxNQUFNLDhCQUE4QjtBQUNuRCxPQUFPQyxNQUFNLE1BQU0sNkJBQTZCO0FBRWhELE9BQU9DLE1BQU0sTUFBTSxjQUFjO0FBQ2pDLE9BQU9DLFdBQVcsTUFBTSx3QkFBd0I7QUFDaEQsT0FBT0MsZ0JBQWdCLE1BQU0sNEJBQTRCO0FBTXpELE1BQU1DLFlBQVksU0FBU0osTUFBTSxDQUFnQztFQUN4REssV0FBV0EsQ0FBRUMsZUFBb0MsRUFBRztJQUV6RCxNQUFNQyxPQUFPLEdBQUc7TUFDZEMsdUJBQXVCLEVBQUUsSUFBSVQsUUFBUSxDQUFFLE9BQVEsQ0FBQztNQUNoRFUsTUFBTSxFQUFFSCxlQUFlLENBQUNHO0lBQzFCLENBQUM7SUFFRCxLQUFLLENBQUUsTUFBTSxJQUFJUCxXQUFXLENBQUU7TUFDMUJPLE1BQU0sRUFBRUgsZUFBZSxDQUFDRyxNQUFNLENBQUNDLFlBQVksQ0FBRSxPQUFRO0lBQ3ZELENBQUUsQ0FBQyxFQUNIQyxLQUFLLElBQUksSUFBSVIsZ0JBQWdCLENBQUVRLEtBQUssRUFBRTtNQUNwQ0YsTUFBTSxFQUFFSCxlQUFlLENBQUNHLE1BQU0sQ0FBQ0MsWUFBWSxDQUFFLE1BQU87SUFDdEQsQ0FBRSxDQUFDLEVBQ0hILE9BQ0YsQ0FBQztFQUNIO0FBQ0Y7QUFFQU4sTUFBTSxDQUFDVyxRQUFRLENBQUUsY0FBYyxFQUFFUixZQUFhLENBQUM7QUFDL0MsZUFBZUEsWUFBWSJ9