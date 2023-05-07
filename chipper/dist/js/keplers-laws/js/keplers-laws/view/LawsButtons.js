// Copyright 2023, University of Colorado Boulder

/**
 * Provides a specific class for handling the buttons that
 * coordinate the specific Kepler's Law being seen in the screen.
 *
 * @author Agustín Vallejo
 */

import { combineOptions } from '../../../../phet-core/js/optionize.js';
import { Image } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import LawMode from '../model/LawMode.js';
import iconFirstLaw_png from '../../../images/iconFirstLaw_png.js';
import iconSecondLaw_png from '../../../images/iconSecondLaw_png.js';
import iconThirdLaw_png from '../../../images/iconThirdLaw_png.js';
import keplersLaws from '../../keplersLaws.js';
const IMAGE_OPTIONS = {
  scale: 0.5
};
export default class LawsButtons extends RectangularRadioButtonGroup {
  constructor(model, providedOptions) {
    const options = combineOptions({
      orientation: 'horizontal',
      radioButtonOptions: {
        baseColor: '#555',
        buttonAppearanceStrategyOptions: {
          selectedStroke: '#60a9dd',
          selectedLineWidth: 4
        }
      },
      touchAreaXDilation: 5,
      touchAreaYDilation: 10
    }, providedOptions);

    // Intentionally left without KeplersLawsStrings because this buttons will have icons
    super(model.selectedLawProperty, [{
      value: LawMode.FIRST_LAW,
      createNode: () => new Image(iconFirstLaw_png, IMAGE_OPTIONS),
      tandemName: 'firstLawButton'
    }, {
      value: LawMode.SECOND_LAW,
      createNode: () => new Image(iconSecondLaw_png, IMAGE_OPTIONS),
      tandemName: 'secondLawButton'
    }, {
      value: LawMode.THIRD_LAW,
      createNode: () => new Image(iconThirdLaw_png, IMAGE_OPTIONS),
      tandemName: 'thirdLawButton'
    }], options);
  }
}
keplersLaws.register('LawsButtons', LawsButtons);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb21iaW5lT3B0aW9ucyIsIkltYWdlIiwiUmVjdGFuZ3VsYXJSYWRpb0J1dHRvbkdyb3VwIiwiTGF3TW9kZSIsImljb25GaXJzdExhd19wbmciLCJpY29uU2Vjb25kTGF3X3BuZyIsImljb25UaGlyZExhd19wbmciLCJrZXBsZXJzTGF3cyIsIklNQUdFX09QVElPTlMiLCJzY2FsZSIsIkxhd3NCdXR0b25zIiwiY29uc3RydWN0b3IiLCJtb2RlbCIsInByb3ZpZGVkT3B0aW9ucyIsIm9wdGlvbnMiLCJvcmllbnRhdGlvbiIsInJhZGlvQnV0dG9uT3B0aW9ucyIsImJhc2VDb2xvciIsImJ1dHRvbkFwcGVhcmFuY2VTdHJhdGVneU9wdGlvbnMiLCJzZWxlY3RlZFN0cm9rZSIsInNlbGVjdGVkTGluZVdpZHRoIiwidG91Y2hBcmVhWERpbGF0aW9uIiwidG91Y2hBcmVhWURpbGF0aW9uIiwic2VsZWN0ZWRMYXdQcm9wZXJ0eSIsInZhbHVlIiwiRklSU1RfTEFXIiwiY3JlYXRlTm9kZSIsInRhbmRlbU5hbWUiLCJTRUNPTkRfTEFXIiwiVEhJUkRfTEFXIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJMYXdzQnV0dG9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogUHJvdmlkZXMgYSBzcGVjaWZpYyBjbGFzcyBmb3IgaGFuZGxpbmcgdGhlIGJ1dHRvbnMgdGhhdFxyXG4gKiBjb29yZGluYXRlIHRoZSBzcGVjaWZpYyBLZXBsZXIncyBMYXcgYmVpbmcgc2VlbiBpbiB0aGUgc2NyZWVuLlxyXG4gKlxyXG4gKiBAYXV0aG9yIEFndXN0w61uIFZhbGxlam9cclxuICovXHJcblxyXG5pbXBvcnQgeyBjb21iaW5lT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9vcHRpb25pemUuanMnO1xyXG5pbXBvcnQgeyBJbWFnZSwgSW1hZ2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IFJlY3Rhbmd1bGFyUmFkaW9CdXR0b25Hcm91cCwgeyBSZWN0YW5ndWxhclJhZGlvQnV0dG9uR3JvdXBPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vc3VuL2pzL2J1dHRvbnMvUmVjdGFuZ3VsYXJSYWRpb0J1dHRvbkdyb3VwLmpzJztcclxuaW1wb3J0IEtlcGxlcnNMYXdzTW9kZWwgZnJvbSAnLi4vbW9kZWwvS2VwbGVyc0xhd3NNb2RlbC5qcyc7XHJcbmltcG9ydCBMYXdNb2RlIGZyb20gJy4uL21vZGVsL0xhd01vZGUuanMnO1xyXG5pbXBvcnQgaWNvbkZpcnN0TGF3X3BuZyBmcm9tICcuLi8uLi8uLi9pbWFnZXMvaWNvbkZpcnN0TGF3X3BuZy5qcyc7XHJcbmltcG9ydCBpY29uU2Vjb25kTGF3X3BuZyBmcm9tICcuLi8uLi8uLi9pbWFnZXMvaWNvblNlY29uZExhd19wbmcuanMnO1xyXG5pbXBvcnQgaWNvblRoaXJkTGF3X3BuZyBmcm9tICcuLi8uLi8uLi9pbWFnZXMvaWNvblRoaXJkTGF3X3BuZy5qcyc7XHJcbmltcG9ydCBrZXBsZXJzTGF3cyBmcm9tICcuLi8uLi9rZXBsZXJzTGF3cy5qcyc7XHJcblxyXG5jb25zdCBJTUFHRV9PUFRJT05TOiBJbWFnZU9wdGlvbnMgPSB7XHJcbiAgc2NhbGU6IDAuNVxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgTGF3c0J1dHRvbnNPcHRpb25zID0gUmVjdGFuZ3VsYXJSYWRpb0J1dHRvbkdyb3VwT3B0aW9ucztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExhd3NCdXR0b25zIGV4dGVuZHMgUmVjdGFuZ3VsYXJSYWRpb0J1dHRvbkdyb3VwPExhd01vZGU+IHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IoIG1vZGVsOiBLZXBsZXJzTGF3c01vZGVsLCBwcm92aWRlZE9wdGlvbnM/OiBMYXdzQnV0dG9uc09wdGlvbnMgKSB7XHJcbiAgICBjb25zdCBvcHRpb25zID0gY29tYmluZU9wdGlvbnM8TGF3c0J1dHRvbnNPcHRpb25zPigge1xyXG4gICAgICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxyXG4gICAgICByYWRpb0J1dHRvbk9wdGlvbnM6IHtcclxuICAgICAgICBiYXNlQ29sb3I6ICcjNTU1JyxcclxuICAgICAgICBidXR0b25BcHBlYXJhbmNlU3RyYXRlZ3lPcHRpb25zOiB7XHJcbiAgICAgICAgICBzZWxlY3RlZFN0cm9rZTogJyM2MGE5ZGQnLFxyXG4gICAgICAgICAgc2VsZWN0ZWRMaW5lV2lkdGg6IDRcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHRvdWNoQXJlYVhEaWxhdGlvbjogNSxcclxuICAgICAgdG91Y2hBcmVhWURpbGF0aW9uOiAxMFxyXG4gICAgfSwgcHJvdmlkZWRPcHRpb25zICk7XHJcblxyXG5cclxuICAgIC8vIEludGVudGlvbmFsbHkgbGVmdCB3aXRob3V0IEtlcGxlcnNMYXdzU3RyaW5ncyBiZWNhdXNlIHRoaXMgYnV0dG9ucyB3aWxsIGhhdmUgaWNvbnNcclxuICAgIHN1cGVyKCBtb2RlbC5zZWxlY3RlZExhd1Byb3BlcnR5LCBbXHJcbiAgICAgIHtcclxuICAgICAgICB2YWx1ZTogTGF3TW9kZS5GSVJTVF9MQVcsXHJcbiAgICAgICAgY3JlYXRlTm9kZTogKCkgPT4gbmV3IEltYWdlKCBpY29uRmlyc3RMYXdfcG5nLCBJTUFHRV9PUFRJT05TICksXHJcbiAgICAgICAgdGFuZGVtTmFtZTogJ2ZpcnN0TGF3QnV0dG9uJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdmFsdWU6IExhd01vZGUuU0VDT05EX0xBVyxcclxuICAgICAgICBjcmVhdGVOb2RlOiAoKSA9PiBuZXcgSW1hZ2UoIGljb25TZWNvbmRMYXdfcG5nLCBJTUFHRV9PUFRJT05TICksXHJcbiAgICAgICAgdGFuZGVtTmFtZTogJ3NlY29uZExhd0J1dHRvbidcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHZhbHVlOiBMYXdNb2RlLlRISVJEX0xBVyxcclxuICAgICAgICBjcmVhdGVOb2RlOiAoKSA9PiBuZXcgSW1hZ2UoIGljb25UaGlyZExhd19wbmcsIElNQUdFX09QVElPTlMgKSxcclxuICAgICAgICB0YW5kZW1OYW1lOiAndGhpcmRMYXdCdXR0b24nXHJcbiAgICAgIH1cclxuICAgIF0sIG9wdGlvbnMgKTtcclxuICB9XHJcbn1cclxuXHJcbmtlcGxlcnNMYXdzLnJlZ2lzdGVyKCAnTGF3c0J1dHRvbnMnLCBMYXdzQnV0dG9ucyApO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxjQUFjLFFBQVEsdUNBQXVDO0FBQ3RFLFNBQVNDLEtBQUssUUFBc0IsbUNBQW1DO0FBQ3ZFLE9BQU9DLDJCQUEyQixNQUE4QywyREFBMkQ7QUFFM0ksT0FBT0MsT0FBTyxNQUFNLHFCQUFxQjtBQUN6QyxPQUFPQyxnQkFBZ0IsTUFBTSxxQ0FBcUM7QUFDbEUsT0FBT0MsaUJBQWlCLE1BQU0sc0NBQXNDO0FBQ3BFLE9BQU9DLGdCQUFnQixNQUFNLHFDQUFxQztBQUNsRSxPQUFPQyxXQUFXLE1BQU0sc0JBQXNCO0FBRTlDLE1BQU1DLGFBQTJCLEdBQUc7RUFDbENDLEtBQUssRUFBRTtBQUNULENBQUM7QUFJRCxlQUFlLE1BQU1DLFdBQVcsU0FBU1IsMkJBQTJCLENBQVU7RUFDckVTLFdBQVdBLENBQUVDLEtBQXVCLEVBQUVDLGVBQW9DLEVBQUc7SUFDbEYsTUFBTUMsT0FBTyxHQUFHZCxjQUFjLENBQXNCO01BQ2xEZSxXQUFXLEVBQUUsWUFBWTtNQUN6QkMsa0JBQWtCLEVBQUU7UUFDbEJDLFNBQVMsRUFBRSxNQUFNO1FBQ2pCQywrQkFBK0IsRUFBRTtVQUMvQkMsY0FBYyxFQUFFLFNBQVM7VUFDekJDLGlCQUFpQixFQUFFO1FBQ3JCO01BQ0YsQ0FBQztNQUNEQyxrQkFBa0IsRUFBRSxDQUFDO01BQ3JCQyxrQkFBa0IsRUFBRTtJQUN0QixDQUFDLEVBQUVULGVBQWdCLENBQUM7O0lBR3BCO0lBQ0EsS0FBSyxDQUFFRCxLQUFLLENBQUNXLG1CQUFtQixFQUFFLENBQ2hDO01BQ0VDLEtBQUssRUFBRXJCLE9BQU8sQ0FBQ3NCLFNBQVM7TUFDeEJDLFVBQVUsRUFBRUEsQ0FBQSxLQUFNLElBQUl6QixLQUFLLENBQUVHLGdCQUFnQixFQUFFSSxhQUFjLENBQUM7TUFDOURtQixVQUFVLEVBQUU7SUFDZCxDQUFDLEVBQ0Q7TUFDRUgsS0FBSyxFQUFFckIsT0FBTyxDQUFDeUIsVUFBVTtNQUN6QkYsVUFBVSxFQUFFQSxDQUFBLEtBQU0sSUFBSXpCLEtBQUssQ0FBRUksaUJBQWlCLEVBQUVHLGFBQWMsQ0FBQztNQUMvRG1CLFVBQVUsRUFBRTtJQUNkLENBQUMsRUFDRDtNQUNFSCxLQUFLLEVBQUVyQixPQUFPLENBQUMwQixTQUFTO01BQ3hCSCxVQUFVLEVBQUVBLENBQUEsS0FBTSxJQUFJekIsS0FBSyxDQUFFSyxnQkFBZ0IsRUFBRUUsYUFBYyxDQUFDO01BQzlEbUIsVUFBVSxFQUFFO0lBQ2QsQ0FBQyxDQUNGLEVBQUViLE9BQVEsQ0FBQztFQUNkO0FBQ0Y7QUFFQVAsV0FBVyxDQUFDdUIsUUFBUSxDQUFFLGFBQWEsRUFBRXBCLFdBQVksQ0FBQyJ9