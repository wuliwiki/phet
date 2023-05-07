// Copyright 2022-2023, University of Colorado Boulder

/**
 * BLLSim is the subclass of Sim used by both beers-law-lab and concentration sims.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sim from '../../../../joist/js/Sim.js';
import optionize from '../../../../phet-core/js/optionize.js';
import beersLawLab from '../../beersLawLab.js';
import BLLConstants from '../BLLConstants.js';
import BLLPreferencesNode from './BLLPreferencesNode.js';
import BLLPreferences from '../model/BLLPreferences.js';
import PreferencesModel from '../../../../joist/js/preferences/PreferencesModel.js';
export default class BLLSim extends Sim {
  constructor(simNameProperty, screens, providedOptions) {
    const options = optionize()({
      // SimOptions
      credits: BLLConstants.CREDITS,
      preferencesModel: new PreferencesModel({
        simulationOptions: {
          customPreferences: [{
            createContent: tandem => new BLLPreferencesNode({
              tandem: tandem.createTandem('simPreferences')
            }),
            modelLinkables: [{
              property: BLLPreferences.showSoluteAmountProperty
            }, {
              property: BLLPreferences.showSolutionVolumeProperty
            }]
          }]
        }
      }),
      phetioDesigned: true
    }, providedOptions);
    super(simNameProperty, screens, options);
  }
}
beersLawLab.register('BLLSim', BLLSim);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTaW0iLCJvcHRpb25pemUiLCJiZWVyc0xhd0xhYiIsIkJMTENvbnN0YW50cyIsIkJMTFByZWZlcmVuY2VzTm9kZSIsIkJMTFByZWZlcmVuY2VzIiwiUHJlZmVyZW5jZXNNb2RlbCIsIkJMTFNpbSIsImNvbnN0cnVjdG9yIiwic2ltTmFtZVByb3BlcnR5Iiwic2NyZWVucyIsInByb3ZpZGVkT3B0aW9ucyIsIm9wdGlvbnMiLCJjcmVkaXRzIiwiQ1JFRElUUyIsInByZWZlcmVuY2VzTW9kZWwiLCJzaW11bGF0aW9uT3B0aW9ucyIsImN1c3RvbVByZWZlcmVuY2VzIiwiY3JlYXRlQ29udGVudCIsInRhbmRlbSIsImNyZWF0ZVRhbmRlbSIsIm1vZGVsTGlua2FibGVzIiwicHJvcGVydHkiLCJzaG93U29sdXRlQW1vdW50UHJvcGVydHkiLCJzaG93U29sdXRpb25Wb2x1bWVQcm9wZXJ0eSIsInBoZXRpb0Rlc2lnbmVkIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJCTExTaW0udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjItMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogQkxMU2ltIGlzIHRoZSBzdWJjbGFzcyBvZiBTaW0gdXNlZCBieSBib3RoIGJlZXJzLWxhdy1sYWIgYW5kIGNvbmNlbnRyYXRpb24gc2ltcy5cclxuICpcclxuICogQGF1dGhvciBDaHJpcyBNYWxsZXkgKFBpeGVsWm9vbSwgSW5jLilcclxuICovXHJcblxyXG5pbXBvcnQgVFJlYWRPbmx5UHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9UUmVhZE9ubHlQcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBTaW0sIHsgU2ltT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL2pvaXN0L2pzL1NpbS5qcyc7XHJcbmltcG9ydCB7IEFueVNjcmVlbiB9IGZyb20gJy4uLy4uLy4uLy4uL2pvaXN0L2pzL1NjcmVlbi5qcyc7XHJcbmltcG9ydCBvcHRpb25pemUsIHsgRW1wdHlTZWxmT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9vcHRpb25pemUuanMnO1xyXG5pbXBvcnQgUGlja09wdGlvbmFsIGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy90eXBlcy9QaWNrT3B0aW9uYWwuanMnO1xyXG5pbXBvcnQgYmVlcnNMYXdMYWIgZnJvbSAnLi4vLi4vYmVlcnNMYXdMYWIuanMnO1xyXG5pbXBvcnQgQkxMQ29uc3RhbnRzIGZyb20gJy4uL0JMTENvbnN0YW50cy5qcyc7XHJcbmltcG9ydCBCTExQcmVmZXJlbmNlc05vZGUgZnJvbSAnLi9CTExQcmVmZXJlbmNlc05vZGUuanMnO1xyXG5pbXBvcnQgQkxMUHJlZmVyZW5jZXMgZnJvbSAnLi4vbW9kZWwvQkxMUHJlZmVyZW5jZXMuanMnO1xyXG5pbXBvcnQgUHJlZmVyZW5jZXNNb2RlbCBmcm9tICcuLi8uLi8uLi8uLi9qb2lzdC9qcy9wcmVmZXJlbmNlcy9QcmVmZXJlbmNlc01vZGVsLmpzJztcclxuXHJcbnR5cGUgU2VsZk9wdGlvbnMgPSBFbXB0eVNlbGZPcHRpb25zO1xyXG5cclxudHlwZSBCTExTaW1PcHRpb25zID0gU2VsZk9wdGlvbnMgJiBQaWNrT3B0aW9uYWw8U2ltT3B0aW9ucywgJ3BoZXRpb0Rlc2lnbmVkJz47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCTExTaW0gZXh0ZW5kcyBTaW0ge1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoIHNpbU5hbWVQcm9wZXJ0eTogVFJlYWRPbmx5UHJvcGVydHk8c3RyaW5nPiwgc2NyZWVuczogQW55U2NyZWVuW10sIHByb3ZpZGVkT3B0aW9ucz86IEJMTFNpbU9wdGlvbnMgKSB7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbml6ZTxCTExTaW1PcHRpb25zLCBTZWxmT3B0aW9ucywgU2ltT3B0aW9ucz4oKSgge1xyXG5cclxuICAgICAgLy8gU2ltT3B0aW9uc1xyXG4gICAgICBjcmVkaXRzOiBCTExDb25zdGFudHMuQ1JFRElUUyxcclxuICAgICAgcHJlZmVyZW5jZXNNb2RlbDogbmV3IFByZWZlcmVuY2VzTW9kZWwoIHtcclxuICAgICAgICBzaW11bGF0aW9uT3B0aW9uczoge1xyXG4gICAgICAgICAgY3VzdG9tUHJlZmVyZW5jZXM6IFsge1xyXG4gICAgICAgICAgICBjcmVhdGVDb250ZW50OiB0YW5kZW0gPT4gbmV3IEJMTFByZWZlcmVuY2VzTm9kZSgge1xyXG4gICAgICAgICAgICAgIHRhbmRlbTogdGFuZGVtLmNyZWF0ZVRhbmRlbSggJ3NpbVByZWZlcmVuY2VzJyApXHJcbiAgICAgICAgICAgIH0gKSxcclxuICAgICAgICAgICAgbW9kZWxMaW5rYWJsZXM6IFtcclxuICAgICAgICAgICAgICB7IHByb3BlcnR5OiBCTExQcmVmZXJlbmNlcy5zaG93U29sdXRlQW1vdW50UHJvcGVydHkgfSxcclxuICAgICAgICAgICAgICB7IHByb3BlcnR5OiBCTExQcmVmZXJlbmNlcy5zaG93U29sdXRpb25Wb2x1bWVQcm9wZXJ0eSB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0gXVxyXG4gICAgICAgIH1cclxuICAgICAgfSApLFxyXG4gICAgICBwaGV0aW9EZXNpZ25lZDogdHJ1ZVxyXG4gICAgfSwgcHJvdmlkZWRPcHRpb25zICk7XHJcblxyXG4gICAgc3VwZXIoIHNpbU5hbWVQcm9wZXJ0eSwgc2NyZWVucywgb3B0aW9ucyApO1xyXG4gIH1cclxufVxyXG5cclxuYmVlcnNMYXdMYWIucmVnaXN0ZXIoICdCTExTaW0nLCBCTExTaW0gKTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0EsT0FBT0EsR0FBRyxNQUFzQiw2QkFBNkI7QUFFN0QsT0FBT0MsU0FBUyxNQUE0Qix1Q0FBdUM7QUFFbkYsT0FBT0MsV0FBVyxNQUFNLHNCQUFzQjtBQUM5QyxPQUFPQyxZQUFZLE1BQU0sb0JBQW9CO0FBQzdDLE9BQU9DLGtCQUFrQixNQUFNLHlCQUF5QjtBQUN4RCxPQUFPQyxjQUFjLE1BQU0sNEJBQTRCO0FBQ3ZELE9BQU9DLGdCQUFnQixNQUFNLHNEQUFzRDtBQU1uRixlQUFlLE1BQU1DLE1BQU0sU0FBU1AsR0FBRyxDQUFDO0VBRS9CUSxXQUFXQSxDQUFFQyxlQUEwQyxFQUFFQyxPQUFvQixFQUFFQyxlQUErQixFQUFHO0lBRXRILE1BQU1DLE9BQU8sR0FBR1gsU0FBUyxDQUF5QyxDQUFDLENBQUU7TUFFbkU7TUFDQVksT0FBTyxFQUFFVixZQUFZLENBQUNXLE9BQU87TUFDN0JDLGdCQUFnQixFQUFFLElBQUlULGdCQUFnQixDQUFFO1FBQ3RDVSxpQkFBaUIsRUFBRTtVQUNqQkMsaUJBQWlCLEVBQUUsQ0FBRTtZQUNuQkMsYUFBYSxFQUFFQyxNQUFNLElBQUksSUFBSWYsa0JBQWtCLENBQUU7Y0FDL0NlLE1BQU0sRUFBRUEsTUFBTSxDQUFDQyxZQUFZLENBQUUsZ0JBQWlCO1lBQ2hELENBQUUsQ0FBQztZQUNIQyxjQUFjLEVBQUUsQ0FDZDtjQUFFQyxRQUFRLEVBQUVqQixjQUFjLENBQUNrQjtZQUF5QixDQUFDLEVBQ3JEO2NBQUVELFFBQVEsRUFBRWpCLGNBQWMsQ0FBQ21CO1lBQTJCLENBQUM7VUFFM0QsQ0FBQztRQUNIO01BQ0YsQ0FBRSxDQUFDO01BQ0hDLGNBQWMsRUFBRTtJQUNsQixDQUFDLEVBQUVkLGVBQWdCLENBQUM7SUFFcEIsS0FBSyxDQUFFRixlQUFlLEVBQUVDLE9BQU8sRUFBRUUsT0FBUSxDQUFDO0VBQzVDO0FBQ0Y7QUFFQVYsV0FBVyxDQUFDd0IsUUFBUSxDQUFFLFFBQVEsRUFBRW5CLE1BQU8sQ0FBQyJ9