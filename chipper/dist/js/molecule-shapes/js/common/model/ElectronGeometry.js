// Copyright 2013-2023, University of Colorado Boulder

/**
 * Contains the "optimal" molecule structures (pair group directions stored as unit vectors),
 * in an order such that higher-repulsion pair groups (lone pairs)
 * will tend to occupy the 1st slots, and bonds will occupy the later slots.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Vector3 from '../../../../dot/js/Vector3.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import EnumerationDeprecated from '../../../../phet-core/js/EnumerationDeprecated.js';
import moleculeShapes from '../../moleculeShapes.js';
import MoleculeShapesStrings from '../../MoleculeShapesStrings.js';

// Constant for the tetrahedral shape
const TETRA_CONST = Math.PI * -19.471220333 / 180;
class ElectronGeometryValue {
  /*
   * @param {TReadOnlyProperty<string>} stringProperty
   * @param {Array.<Vector3>} unitVectors - Ordered list of orientations taken by an ideal configuration
   */
  constructor(stringProperty, unitVectors) {
    // @public {TReadOnlyProperty<string>}
    this.stringProperty = stringProperty;

    // @public {Array.<Vector3>}
    this.unitVectors = unitVectors;
  }
}

// Global place for the empty electron geometry string. It's not a translated string anymore, see https://github.com/phetsims/rosetta/issues/388
export const emptyElectronGeometryStringProperty = new StringProperty('', {
  // TODO: instrumented because of TinyForwardingProperty's assertion that we can't switch to uninstrumented Properties
  // See https://github.com/phetsims/rosetta/issues/388
  tandem: Tandem.GLOBAL_MODEL.createTandem('emptyElectronGeometryStringProperty'),
  phetioState: false,
  phetioFeatured: false,
  phetioDocumentation: 'Should only be the empty string',
  phetioReadOnly: true
});
const ElectronGeometry = EnumerationDeprecated.byMap({
  EMPTY: new ElectronGeometryValue(emptyElectronGeometryStringProperty, []),
  DIATOMIC: new ElectronGeometryValue(MoleculeShapesStrings.geometry.diatomicStringProperty, [new Vector3(1, 0, 0)]),
  LINEAR: new ElectronGeometryValue(MoleculeShapesStrings.geometry.linearStringProperty, [new Vector3(1, 0, 0), new Vector3(-1, 0, 0)]),
  TRIGONAL_PLANAR: new ElectronGeometryValue(MoleculeShapesStrings.geometry.trigonalPlanarStringProperty, [new Vector3(1, 0, 0), new Vector3(Math.cos(Math.PI * 2 / 3), Math.sin(Math.PI * 2 / 3), 0), new Vector3(Math.cos(Math.PI * 4 / 3), Math.sin(Math.PI * 4 / 3), 0)]),
  TETRAHEDRAL: new ElectronGeometryValue(MoleculeShapesStrings.geometry.tetrahedralStringProperty, [new Vector3(0, 0, 1), new Vector3(Math.cos(0) * Math.cos(TETRA_CONST), Math.sin(0) * Math.cos(TETRA_CONST), Math.sin(TETRA_CONST)), new Vector3(Math.cos(Math.PI * 2 / 3) * Math.cos(TETRA_CONST), Math.sin(Math.PI * 2 / 3) * Math.cos(TETRA_CONST), Math.sin(TETRA_CONST)), new Vector3(Math.cos(Math.PI * 4 / 3) * Math.cos(TETRA_CONST), Math.sin(Math.PI * 4 / 3) * Math.cos(TETRA_CONST), Math.sin(TETRA_CONST))]),
  TRIGONAL_BIPYRAMIDAL: new ElectronGeometryValue(MoleculeShapesStrings.geometry.trigonalBipyramidalStringProperty, [
  // equitorial (fills up with lone pairs first)
  new Vector3(0, 1, 0), new Vector3(0, Math.cos(Math.PI * 2 / 3), Math.sin(Math.PI * 2 / 3)), new Vector3(0, Math.cos(Math.PI * 4 / 3), Math.sin(Math.PI * 4 / 3)),
  // axial
  new Vector3(1, 0, 0), new Vector3(-1, 0, 0)]),
  OCTAHEDRAL: new ElectronGeometryValue(MoleculeShapesStrings.geometry.octahedralStringProperty, [
  // opposites first
  new Vector3(0, 0, 1), new Vector3(0, 0, -1), new Vector3(0, 1, 0), new Vector3(0, -1, 0), new Vector3(1, 0, 0), new Vector3(-1, 0, 0)])
}, {
  beforeFreeze: ElectronGeometry => {
    // @public {Object}
    ElectronGeometry.byNumberOfGroupsMap = {
      0: ElectronGeometry.EMPTY,
      1: ElectronGeometry.DIATOMIC,
      2: ElectronGeometry.LINEAR,
      3: ElectronGeometry.TRIGONAL_PLANAR,
      4: ElectronGeometry.TETRAHEDRAL,
      5: ElectronGeometry.TRIGONAL_BIPYRAMIDAL,
      6: ElectronGeometry.OCTAHEDRAL
    };

    /*
     * Lookup for the configuration, based on the number of pair groups it contains.
     * @public
     *
     * @param {number} numberOfGroups - The steric number, or how many radial groups (atoms and lone pairs) are connected
     * @returns {ElectronGeometry}
     */
    ElectronGeometry.getConfiguration = numberOfGroups => {
      return ElectronGeometry.byNumberOfGroupsMap[numberOfGroups];
    };
  }
});
moleculeShapes.register('ElectronGeometry', ElectronGeometry);
export default ElectronGeometry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWZWN0b3IzIiwiVGFuZGVtIiwiU3RyaW5nUHJvcGVydHkiLCJFbnVtZXJhdGlvbkRlcHJlY2F0ZWQiLCJtb2xlY3VsZVNoYXBlcyIsIk1vbGVjdWxlU2hhcGVzU3RyaW5ncyIsIlRFVFJBX0NPTlNUIiwiTWF0aCIsIlBJIiwiRWxlY3Ryb25HZW9tZXRyeVZhbHVlIiwiY29uc3RydWN0b3IiLCJzdHJpbmdQcm9wZXJ0eSIsInVuaXRWZWN0b3JzIiwiZW1wdHlFbGVjdHJvbkdlb21ldHJ5U3RyaW5nUHJvcGVydHkiLCJ0YW5kZW0iLCJHTE9CQUxfTU9ERUwiLCJjcmVhdGVUYW5kZW0iLCJwaGV0aW9TdGF0ZSIsInBoZXRpb0ZlYXR1cmVkIiwicGhldGlvRG9jdW1lbnRhdGlvbiIsInBoZXRpb1JlYWRPbmx5IiwiRWxlY3Ryb25HZW9tZXRyeSIsImJ5TWFwIiwiRU1QVFkiLCJESUFUT01JQyIsImdlb21ldHJ5IiwiZGlhdG9taWNTdHJpbmdQcm9wZXJ0eSIsIkxJTkVBUiIsImxpbmVhclN0cmluZ1Byb3BlcnR5IiwiVFJJR09OQUxfUExBTkFSIiwidHJpZ29uYWxQbGFuYXJTdHJpbmdQcm9wZXJ0eSIsImNvcyIsInNpbiIsIlRFVFJBSEVEUkFMIiwidGV0cmFoZWRyYWxTdHJpbmdQcm9wZXJ0eSIsIlRSSUdPTkFMX0JJUFlSQU1JREFMIiwidHJpZ29uYWxCaXB5cmFtaWRhbFN0cmluZ1Byb3BlcnR5IiwiT0NUQUhFRFJBTCIsIm9jdGFoZWRyYWxTdHJpbmdQcm9wZXJ0eSIsImJlZm9yZUZyZWV6ZSIsImJ5TnVtYmVyT2ZHcm91cHNNYXAiLCJnZXRDb25maWd1cmF0aW9uIiwibnVtYmVyT2ZHcm91cHMiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkVsZWN0cm9uR2VvbWV0cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTMtMjAyMywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogQ29udGFpbnMgdGhlIFwib3B0aW1hbFwiIG1vbGVjdWxlIHN0cnVjdHVyZXMgKHBhaXIgZ3JvdXAgZGlyZWN0aW9ucyBzdG9yZWQgYXMgdW5pdCB2ZWN0b3JzKSxcclxuICogaW4gYW4gb3JkZXIgc3VjaCB0aGF0IGhpZ2hlci1yZXB1bHNpb24gcGFpciBncm91cHMgKGxvbmUgcGFpcnMpXHJcbiAqIHdpbGwgdGVuZCB0byBvY2N1cHkgdGhlIDFzdCBzbG90cywgYW5kIGJvbmRzIHdpbGwgb2NjdXB5IHRoZSBsYXRlciBzbG90cy5cclxuICpcclxuICogQGF1dGhvciBKb25hdGhhbiBPbHNvbiA8am9uYXRoYW4ub2xzb25AY29sb3JhZG8uZWR1PlxyXG4gKi9cclxuXHJcbmltcG9ydCBWZWN0b3IzIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9WZWN0b3IzLmpzJztcclxuaW1wb3J0IFRhbmRlbSBmcm9tICcuLi8uLi8uLi8uLi90YW5kZW0vanMvVGFuZGVtLmpzJztcclxuaW1wb3J0IFN0cmluZ1Byb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvU3RyaW5nUHJvcGVydHkuanMnO1xyXG5pbXBvcnQgRW51bWVyYXRpb25EZXByZWNhdGVkIGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9FbnVtZXJhdGlvbkRlcHJlY2F0ZWQuanMnO1xyXG5pbXBvcnQgbW9sZWN1bGVTaGFwZXMgZnJvbSAnLi4vLi4vbW9sZWN1bGVTaGFwZXMuanMnO1xyXG5pbXBvcnQgTW9sZWN1bGVTaGFwZXNTdHJpbmdzIGZyb20gJy4uLy4uL01vbGVjdWxlU2hhcGVzU3RyaW5ncy5qcyc7XHJcblxyXG4vLyBDb25zdGFudCBmb3IgdGhlIHRldHJhaGVkcmFsIHNoYXBlXHJcbmNvbnN0IFRFVFJBX0NPTlNUID0gTWF0aC5QSSAqIC0xOS40NzEyMjAzMzMgLyAxODA7XHJcblxyXG5jbGFzcyBFbGVjdHJvbkdlb21ldHJ5VmFsdWUge1xyXG4gIC8qXHJcbiAgICogQHBhcmFtIHtUUmVhZE9ubHlQcm9wZXJ0eTxzdHJpbmc+fSBzdHJpbmdQcm9wZXJ0eVxyXG4gICAqIEBwYXJhbSB7QXJyYXkuPFZlY3RvcjM+fSB1bml0VmVjdG9ycyAtIE9yZGVyZWQgbGlzdCBvZiBvcmllbnRhdGlvbnMgdGFrZW4gYnkgYW4gaWRlYWwgY29uZmlndXJhdGlvblxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCBzdHJpbmdQcm9wZXJ0eSwgdW5pdFZlY3RvcnMgKSB7XHJcbiAgICAvLyBAcHVibGljIHtUUmVhZE9ubHlQcm9wZXJ0eTxzdHJpbmc+fVxyXG4gICAgdGhpcy5zdHJpbmdQcm9wZXJ0eSA9IHN0cmluZ1Byb3BlcnR5O1xyXG5cclxuICAgIC8vIEBwdWJsaWMge0FycmF5LjxWZWN0b3IzPn1cclxuICAgIHRoaXMudW5pdFZlY3RvcnMgPSB1bml0VmVjdG9ycztcclxuICB9XHJcbn1cclxuXHJcbi8vIEdsb2JhbCBwbGFjZSBmb3IgdGhlIGVtcHR5IGVsZWN0cm9uIGdlb21ldHJ5IHN0cmluZy4gSXQncyBub3QgYSB0cmFuc2xhdGVkIHN0cmluZyBhbnltb3JlLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3BoZXRzaW1zL3Jvc2V0dGEvaXNzdWVzLzM4OFxyXG5leHBvcnQgY29uc3QgZW1wdHlFbGVjdHJvbkdlb21ldHJ5U3RyaW5nUHJvcGVydHkgPSBuZXcgU3RyaW5nUHJvcGVydHkoICcnLCB7XHJcbiAgLy8gVE9ETzogaW5zdHJ1bWVudGVkIGJlY2F1c2Ugb2YgVGlueUZvcndhcmRpbmdQcm9wZXJ0eSdzIGFzc2VydGlvbiB0aGF0IHdlIGNhbid0IHN3aXRjaCB0byB1bmluc3RydW1lbnRlZCBQcm9wZXJ0aWVzXHJcbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9waGV0c2ltcy9yb3NldHRhL2lzc3Vlcy8zODhcclxuICB0YW5kZW06IFRhbmRlbS5HTE9CQUxfTU9ERUwuY3JlYXRlVGFuZGVtKCAnZW1wdHlFbGVjdHJvbkdlb21ldHJ5U3RyaW5nUHJvcGVydHknICksXHJcbiAgcGhldGlvU3RhdGU6IGZhbHNlLFxyXG4gIHBoZXRpb0ZlYXR1cmVkOiBmYWxzZSxcclxuICBwaGV0aW9Eb2N1bWVudGF0aW9uOiAnU2hvdWxkIG9ubHkgYmUgdGhlIGVtcHR5IHN0cmluZycsXHJcbiAgcGhldGlvUmVhZE9ubHk6IHRydWVcclxufSApO1xyXG5cclxuY29uc3QgRWxlY3Ryb25HZW9tZXRyeSA9IEVudW1lcmF0aW9uRGVwcmVjYXRlZC5ieU1hcCgge1xyXG4gIEVNUFRZOiBuZXcgRWxlY3Ryb25HZW9tZXRyeVZhbHVlKCBlbXB0eUVsZWN0cm9uR2VvbWV0cnlTdHJpbmdQcm9wZXJ0eSwgW10gKSxcclxuICBESUFUT01JQzogbmV3IEVsZWN0cm9uR2VvbWV0cnlWYWx1ZShcclxuICAgIE1vbGVjdWxlU2hhcGVzU3RyaW5ncy5nZW9tZXRyeS5kaWF0b21pY1N0cmluZ1Byb3BlcnR5LFxyXG4gICAgW1xyXG4gICAgICBuZXcgVmVjdG9yMyggMSwgMCwgMCApXHJcbiAgICBdXHJcbiAgKSxcclxuICBMSU5FQVI6IG5ldyBFbGVjdHJvbkdlb21ldHJ5VmFsdWUoXHJcbiAgICBNb2xlY3VsZVNoYXBlc1N0cmluZ3MuZ2VvbWV0cnkubGluZWFyU3RyaW5nUHJvcGVydHksXHJcbiAgICBbXHJcbiAgICAgIG5ldyBWZWN0b3IzKCAxLCAwLCAwICksXHJcbiAgICAgIG5ldyBWZWN0b3IzKCAtMSwgMCwgMCApXHJcbiAgICBdXHJcbiAgKSxcclxuICBUUklHT05BTF9QTEFOQVI6IG5ldyBFbGVjdHJvbkdlb21ldHJ5VmFsdWUoXHJcbiAgICBNb2xlY3VsZVNoYXBlc1N0cmluZ3MuZ2VvbWV0cnkudHJpZ29uYWxQbGFuYXJTdHJpbmdQcm9wZXJ0eSxcclxuICAgIFtcclxuICAgICAgbmV3IFZlY3RvcjMoIDEsIDAsIDAgKSxcclxuICAgICAgbmV3IFZlY3RvcjMoIE1hdGguY29zKCBNYXRoLlBJICogMiAvIDMgKSwgTWF0aC5zaW4oIE1hdGguUEkgKiAyIC8gMyApLCAwICksXHJcbiAgICAgIG5ldyBWZWN0b3IzKCBNYXRoLmNvcyggTWF0aC5QSSAqIDQgLyAzICksIE1hdGguc2luKCBNYXRoLlBJICogNCAvIDMgKSwgMCApXHJcbiAgICBdXHJcbiAgKSxcclxuICBURVRSQUhFRFJBTDogbmV3IEVsZWN0cm9uR2VvbWV0cnlWYWx1ZShcclxuICAgIE1vbGVjdWxlU2hhcGVzU3RyaW5ncy5nZW9tZXRyeS50ZXRyYWhlZHJhbFN0cmluZ1Byb3BlcnR5LFxyXG4gICAgW1xyXG4gICAgICBuZXcgVmVjdG9yMyggMCwgMCwgMSApLFxyXG4gICAgICBuZXcgVmVjdG9yMyggTWF0aC5jb3MoIDAgKSAqIE1hdGguY29zKCBURVRSQV9DT05TVCApLCBNYXRoLnNpbiggMCApICogTWF0aC5jb3MoIFRFVFJBX0NPTlNUICksIE1hdGguc2luKCBURVRSQV9DT05TVCApICksXHJcbiAgICAgIG5ldyBWZWN0b3IzKCBNYXRoLmNvcyggTWF0aC5QSSAqIDIgLyAzICkgKiBNYXRoLmNvcyggVEVUUkFfQ09OU1QgKSwgTWF0aC5zaW4oIE1hdGguUEkgKiAyIC8gMyApICogTWF0aC5jb3MoIFRFVFJBX0NPTlNUICksIE1hdGguc2luKCBURVRSQV9DT05TVCApICksXHJcbiAgICAgIG5ldyBWZWN0b3IzKCBNYXRoLmNvcyggTWF0aC5QSSAqIDQgLyAzICkgKiBNYXRoLmNvcyggVEVUUkFfQ09OU1QgKSwgTWF0aC5zaW4oIE1hdGguUEkgKiA0IC8gMyApICogTWF0aC5jb3MoIFRFVFJBX0NPTlNUICksIE1hdGguc2luKCBURVRSQV9DT05TVCApIClcclxuICAgIF1cclxuICApLFxyXG4gIFRSSUdPTkFMX0JJUFlSQU1JREFMOiBuZXcgRWxlY3Ryb25HZW9tZXRyeVZhbHVlKFxyXG4gICAgTW9sZWN1bGVTaGFwZXNTdHJpbmdzLmdlb21ldHJ5LnRyaWdvbmFsQmlweXJhbWlkYWxTdHJpbmdQcm9wZXJ0eSxcclxuICAgIFtcclxuICAgICAgLy8gZXF1aXRvcmlhbCAoZmlsbHMgdXAgd2l0aCBsb25lIHBhaXJzIGZpcnN0KVxyXG4gICAgICBuZXcgVmVjdG9yMyggMCwgMSwgMCApLFxyXG4gICAgICBuZXcgVmVjdG9yMyggMCwgTWF0aC5jb3MoIE1hdGguUEkgKiAyIC8gMyApLCBNYXRoLnNpbiggTWF0aC5QSSAqIDIgLyAzICkgKSxcclxuICAgICAgbmV3IFZlY3RvcjMoIDAsIE1hdGguY29zKCBNYXRoLlBJICogNCAvIDMgKSwgTWF0aC5zaW4oIE1hdGguUEkgKiA0IC8gMyApICksXHJcblxyXG4gICAgICAvLyBheGlhbFxyXG4gICAgICBuZXcgVmVjdG9yMyggMSwgMCwgMCApLFxyXG4gICAgICBuZXcgVmVjdG9yMyggLTEsIDAsIDAgKVxyXG4gICAgXVxyXG4gICksXHJcbiAgT0NUQUhFRFJBTDogbmV3IEVsZWN0cm9uR2VvbWV0cnlWYWx1ZShcclxuICAgIE1vbGVjdWxlU2hhcGVzU3RyaW5ncy5nZW9tZXRyeS5vY3RhaGVkcmFsU3RyaW5nUHJvcGVydHksXHJcbiAgICBbXHJcbiAgICAgIC8vIG9wcG9zaXRlcyBmaXJzdFxyXG4gICAgICBuZXcgVmVjdG9yMyggMCwgMCwgMSApLFxyXG4gICAgICBuZXcgVmVjdG9yMyggMCwgMCwgLTEgKSxcclxuICAgICAgbmV3IFZlY3RvcjMoIDAsIDEsIDAgKSxcclxuICAgICAgbmV3IFZlY3RvcjMoIDAsIC0xLCAwICksXHJcbiAgICAgIG5ldyBWZWN0b3IzKCAxLCAwLCAwICksXHJcbiAgICAgIG5ldyBWZWN0b3IzKCAtMSwgMCwgMCApXHJcbiAgICBdXHJcbiAgKVxyXG59LCB7XHJcbiAgYmVmb3JlRnJlZXplOiBFbGVjdHJvbkdlb21ldHJ5ID0+IHtcclxuICAgIC8vIEBwdWJsaWMge09iamVjdH1cclxuICAgIEVsZWN0cm9uR2VvbWV0cnkuYnlOdW1iZXJPZkdyb3Vwc01hcCA9IHtcclxuICAgICAgMDogRWxlY3Ryb25HZW9tZXRyeS5FTVBUWSxcclxuICAgICAgMTogRWxlY3Ryb25HZW9tZXRyeS5ESUFUT01JQyxcclxuICAgICAgMjogRWxlY3Ryb25HZW9tZXRyeS5MSU5FQVIsXHJcbiAgICAgIDM6IEVsZWN0cm9uR2VvbWV0cnkuVFJJR09OQUxfUExBTkFSLFxyXG4gICAgICA0OiBFbGVjdHJvbkdlb21ldHJ5LlRFVFJBSEVEUkFMLFxyXG4gICAgICA1OiBFbGVjdHJvbkdlb21ldHJ5LlRSSUdPTkFMX0JJUFlSQU1JREFMLFxyXG4gICAgICA2OiBFbGVjdHJvbkdlb21ldHJ5Lk9DVEFIRURSQUxcclxuICAgIH07XHJcblxyXG4gICAgLypcclxuICAgICAqIExvb2t1cCBmb3IgdGhlIGNvbmZpZ3VyYXRpb24sIGJhc2VkIG9uIHRoZSBudW1iZXIgb2YgcGFpciBncm91cHMgaXQgY29udGFpbnMuXHJcbiAgICAgKiBAcHVibGljXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlck9mR3JvdXBzIC0gVGhlIHN0ZXJpYyBudW1iZXIsIG9yIGhvdyBtYW55IHJhZGlhbCBncm91cHMgKGF0b21zIGFuZCBsb25lIHBhaXJzKSBhcmUgY29ubmVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7RWxlY3Ryb25HZW9tZXRyeX1cclxuICAgICAqL1xyXG4gICAgRWxlY3Ryb25HZW9tZXRyeS5nZXRDb25maWd1cmF0aW9uID0gbnVtYmVyT2ZHcm91cHMgPT4ge1xyXG4gICAgICByZXR1cm4gRWxlY3Ryb25HZW9tZXRyeS5ieU51bWJlck9mR3JvdXBzTWFwWyBudW1iZXJPZkdyb3VwcyBdO1xyXG4gICAgfTtcclxuICB9XHJcbn0gKTtcclxuXHJcbm1vbGVjdWxlU2hhcGVzLnJlZ2lzdGVyKCAnRWxlY3Ryb25HZW9tZXRyeScsIEVsZWN0cm9uR2VvbWV0cnkgKTtcclxuZXhwb3J0IGRlZmF1bHQgRWxlY3Ryb25HZW9tZXRyeTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLE9BQU8sTUFBTSwrQkFBK0I7QUFDbkQsT0FBT0MsTUFBTSxNQUFNLGlDQUFpQztBQUNwRCxPQUFPQyxjQUFjLE1BQU0sdUNBQXVDO0FBQ2xFLE9BQU9DLHFCQUFxQixNQUFNLG1E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