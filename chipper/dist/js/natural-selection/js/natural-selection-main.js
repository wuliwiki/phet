// Copyright 2019-2022, University of Colorado Boulder

/**
 * Main entry point for the simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import { Utils } from '../../scenery/js/imports.js';
import Tandem from '../../tandem/js/Tandem.js';
import IntroScreen from './intro/IntroScreen.js';
import LabScreen from './lab/LabScreen.js';
import NaturalSelectionStrings from './NaturalSelectionStrings.js';
simLauncher.launch(() => {
  const screens = [new IntroScreen(Tandem.ROOT.createTandem('introScreen')), new LabScreen(Tandem.ROOT.createTandem('labScreen'))];
  const sim = new Sim(NaturalSelectionStrings['natural-selection'].titleStringProperty, screens, {
    // OrganismSprites uses WebGL, with a fallback of Canvas.
    // See https://github.com/phetsims/natural-selection/issues/128
    webgl: true,
    credits: {
      leadDesign: 'Amanda McGarry, Noah Podolefsky',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.), Jonathan Olson',
      team: 'Wendy Adams, Megan Hoffman, Oliver Nix, Ariel Paul, Kathy Perkins, Carl Wieman',
      qualityAssurance: 'Logan Bray, Steele Dalton, Brooklyn Lash, Emily Miller, Liam Mulhall, Devon Quispe, Nancy Salpepi, Kathryn Woessner',
      graphicArts: 'Megan Lai'
    },
    // phet-io options
    phetioDesigned: true
  });

  // Log whether we're using WebGL, which is the preferred rendering option for OrganismSprites
  phet.log && phet.log(`using WebGL = ${phet.chipper.queryParameters.webgl && Utils.isWebGLSupported}`);

  // Log the name of the active screen, to make the console logging easier to grok.
  // unlink is not necessary.
  if (phet.log) {
    sim.selectedScreenProperty.link(screen => phet.log && phet.log(`>>>>>> ${screen.nameProperty.value} screen is active`));
  }
  sim.start();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTaW0iLCJzaW1MYXVuY2hlciIsIlV0aWxzIiwiVGFuZGVtIiwiSW50cm9TY3JlZW4iLCJMYWJTY3JlZW4iLCJOYXR1cmFsU2VsZWN0aW9uU3RyaW5ncyIsImxhdW5jaCIsInNjcmVlbnMiLCJST09UIiwiY3JlYXRlVGFuZGVtIiwic2ltIiwidGl0bGVTdHJpbmdQcm9wZXJ0eSIsIndlYmdsIiwiY3JlZGl0cyIsImxlYWREZXNpZ24iLCJzb2Z0d2FyZURldmVsb3BtZW50IiwidGVhbSIsInF1YWxpdHlBc3N1cmFuY2UiLCJncmFwaGljQXJ0cyIsInBoZXRpb0Rlc2lnbmVkIiwicGhldCIsImxvZyIsImNoaXBwZXIiLCJxdWVyeVBhcmFtZXRlcnMiLCJpc1dlYkdMU3VwcG9ydGVkIiwic2VsZWN0ZWRTY3JlZW5Qcm9wZXJ0eSIsImxpbmsiLCJzY3JlZW4iLCJuYW1lUHJvcGVydHkiLCJ2YWx1ZSIsInN0YXJ0Il0sInNvdXJjZXMiOlsibmF0dXJhbC1zZWxlY3Rpb24tbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBNYWluIGVudHJ5IHBvaW50IGZvciB0aGUgc2ltdWxhdGlvbi5cclxuICpcclxuICogQGF1dGhvciBDaHJpcyBNYWxsZXkgKFBpeGVsWm9vbSwgSW5jLilcclxuICovXHJcblxyXG5pbXBvcnQgU2ltIGZyb20gJy4uLy4uL2pvaXN0L2pzL1NpbS5qcyc7XHJcbmltcG9ydCBzaW1MYXVuY2hlciBmcm9tICcuLi8uLi9qb2lzdC9qcy9zaW1MYXVuY2hlci5qcyc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IFRhbmRlbSBmcm9tICcuLi8uLi90YW5kZW0vanMvVGFuZGVtLmpzJztcclxuaW1wb3J0IEludHJvU2NyZWVuIGZyb20gJy4vaW50cm8vSW50cm9TY3JlZW4uanMnO1xyXG5pbXBvcnQgTGFiU2NyZWVuIGZyb20gJy4vbGFiL0xhYlNjcmVlbi5qcyc7XHJcbmltcG9ydCBOYXR1cmFsU2VsZWN0aW9uU3RyaW5ncyBmcm9tICcuL05hdHVyYWxTZWxlY3Rpb25TdHJpbmdzLmpzJztcclxuXHJcbnNpbUxhdW5jaGVyLmxhdW5jaCggKCkgPT4ge1xyXG5cclxuICBjb25zdCBzY3JlZW5zID0gW1xyXG4gICAgbmV3IEludHJvU2NyZWVuKCBUYW5kZW0uUk9PVC5jcmVhdGVUYW5kZW0oICdpbnRyb1NjcmVlbicgKSApLFxyXG4gICAgbmV3IExhYlNjcmVlbiggVGFuZGVtLlJPT1QuY3JlYXRlVGFuZGVtKCAnbGFiU2NyZWVuJyApIClcclxuICBdO1xyXG5cclxuICBjb25zdCBzaW0gPSBuZXcgU2ltKCBOYXR1cmFsU2VsZWN0aW9uU3RyaW5nc1sgJ25hdHVyYWwtc2VsZWN0aW9uJyBdLnRpdGxlU3RyaW5nUHJvcGVydHksIHNjcmVlbnMsIHtcclxuXHJcbiAgICAvLyBPcmdhbmlzbVNwcml0ZXMgdXNlcyBXZWJHTCwgd2l0aCBhIGZhbGxiYWNrIG9mIENhbnZhcy5cclxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vcGhldHNpbXMvbmF0dXJhbC1zZWxlY3Rpb24vaXNzdWVzLzEyOFxyXG4gICAgd2ViZ2w6IHRydWUsXHJcblxyXG4gICAgY3JlZGl0czoge1xyXG4gICAgICBsZWFkRGVzaWduOiAnQW1hbmRhIE1jR2FycnksIE5vYWggUG9kb2xlZnNreScsXHJcbiAgICAgIHNvZnR3YXJlRGV2ZWxvcG1lbnQ6ICdDaHJpcyBNYWxsZXkgKFBpeGVsWm9vbSwgSW5jLiksIEpvbmF0aGFuIE9sc29uJyxcclxuICAgICAgdGVhbTogJ1dlbmR5IEFkYW1zLCBNZWdhbiBIb2ZmbWFuLCBPbGl2ZXIgTml4LCBBcmllbCBQYXVsLCBLYXRoeSBQZXJraW5zLCBDYXJsIFdpZW1hbicsXHJcbiAgICAgIHF1YWxpdHlBc3N1cmFuY2U6ICdMb2dhbiBCcmF5LCBTdGVlbGUgRGFsdG9uLCBCcm9va2x5biBMYXNoLCBFbWlseSBNaWxsZXIsIExpYW0gTXVsaGFsbCwgRGV2b24gUXVpc3BlLCBOYW5jeSBTYWxwZXBpLCBLYXRocnluIFdvZXNzbmVyJyxcclxuICAgICAgZ3JhcGhpY0FydHM6ICdNZWdhbiBMYWknXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHBoZXQtaW8gb3B0aW9uc1xyXG4gICAgcGhldGlvRGVzaWduZWQ6IHRydWVcclxuICB9ICk7XHJcblxyXG4gIC8vIExvZyB3aGV0aGVyIHdlJ3JlIHVzaW5nIFdlYkdMLCB3aGljaCBpcyB0aGUgcHJlZmVycmVkIHJlbmRlcmluZyBvcHRpb24gZm9yIE9yZ2FuaXNtU3ByaXRlc1xyXG4gIHBoZXQubG9nICYmIHBoZXQubG9nKCBgdXNpbmcgV2ViR0wgPSAke3BoZXQuY2hpcHBlci5xdWVyeVBhcmFtZXRlcnMud2ViZ2wgJiYgVXRpbHMuaXNXZWJHTFN1cHBvcnRlZH1gICk7XHJcblxyXG4gIC8vIExvZyB0aGUgbmFtZSBvZiB0aGUgYWN0aXZlIHNjcmVlbiwgdG8gbWFrZSB0aGUgY29uc29sZSBsb2dnaW5nIGVhc2llciB0byBncm9rLlxyXG4gIC8vIHVubGluayBpcyBub3QgbmVjZXNzYXJ5LlxyXG4gIGlmICggcGhldC5sb2cgKSB7XHJcbiAgICBzaW0uc2VsZWN0ZWRTY3JlZW5Qcm9wZXJ0eS5saW5rKCBzY3JlZW4gPT5cclxuICAgICAgcGhldC5sb2cgJiYgcGhldC5sb2coIGA+Pj4+Pj4gJHtzY3JlZW4ubmFtZVByb3BlcnR5LnZhbHVlfSBzY3JlZW4gaXMgYWN0aXZlYCApXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgc2ltLnN0YXJ0KCk7XHJcbn0gKTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsR0FBRyxNQUFNLHVCQUF1QjtBQUN2QyxPQUFPQyxXQUFXLE1BQU0sK0JBQStCO0FBQ3ZELFNBQVNDLEtBQUssUUFBUSw2QkFBNkI7QUFDbkQsT0FBT0MsTUFBTSxNQUFNLDJCQUEyQjtBQUM5QyxPQUFPQyxXQUFXLE1BQU0sd0JBQXdCO0FBQ2hELE9BQU9DLFNBQVMsTUFBTSxvQkFBb0I7QUFDMUMsT0FBT0MsdUJBQXVCLE1BQU0sOEJBQThCO0FBRWxFTCxXQUFXLENBQUNNLE1BQU0sQ0FBRSxNQUFNO0VBRXhCLE1BQU1DLE9BQU8sR0FBRyxDQUNkLElBQUlKLFdBQVcsQ0FBRUQsTUFBTSxDQUFDTSxJQUFJLENBQUNDLFlBQVksQ0FBRSxhQUFjLENBQUUsQ0FBQyxFQUM1RCxJQUFJTCxTQUFTLENBQUVGLE1BQU0sQ0FBQ00sSUFBSSxDQUFDQyxZQUFZLENBQUUsV0FBWSxDQUFFLENBQUMsQ0FDekQ7RUFFRCxNQUFNQyxHQUFHLEdBQUcsSUFBSVgsR0FBRyxDQUFFTSx1QkFBdUIsQ0FBRSxtQkFBbUIsQ0FBRSxDQUFDTSxtQkFBbUIsRUFBRUosT0FBTyxFQUFFO0lBRWhHO0lBQ0E7SUFDQUssS0FBSyxFQUFFLElBQUk7SUFFWEMsT0FBTyxFQUFFO01BQ1BDLFVBQVUsRUFBRSxpQ0FBaUM7TUFDN0NDLG1CQUFtQixFQUFFLGdEQUFnRDtNQUNyRUMsSUFBSSxFQUFFLGdGQUFnRjtNQUN0RkMsZ0JBQWdCLEVBQUUscUhBQXFIO01BQ3ZJQyxXQUFXLEVBQUU7SUFDZixDQUFDO0lBRUQ7SUFDQUMsY0FBYyxFQUFFO0VBQ2xCLENBQUUsQ0FBQzs7RUFFSDtFQUNBQyxJQUFJLENBQUNDLEdBQUcsSUFBSUQsSUFBSSxDQUFDQyxHQUFHLENBQUcsaUJBQWdCRCxJQUFJLENBQUNFLE9BQU8sQ0FBQ0MsZUFBZSxDQUFDWCxLQUFLLElBQUlYLEtBQUssQ0FBQ3VCLGdCQUFpQixFQUFFLENBQUM7O0VBRXZHO0VBQ0E7RUFDQSxJQUFLSixJQUFJLENBQUNDLEdBQUcsRUFBRztJQUNkWCxHQUFHLENBQUNlLHNCQUFzQixDQUFDQyxJQUFJLENBQUVDLE1BQU0sSUFDckNQLElBQUksQ0FBQ0MsR0FBRyxJQUFJRCxJQUFJLENBQUNDLEdBQUcsQ0FBRyxVQUFTTSxNQUFNLENBQUNDLFlBQVksQ0FBQ0MsS0FBTSxtQkFBbUIsQ0FDL0UsQ0FBQztFQUNIO0VBRUFuQixHQUFHLENBQUNvQixLQUFLLENBQUMsQ0FBQztBQUNiLENBQUUsQ0FBQyJ9