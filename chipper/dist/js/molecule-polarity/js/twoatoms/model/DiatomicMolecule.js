// Copyright 2014-2022, University of Colorado Boulder

/**
 * DiatomicMolecule is the model of a make-believe diatomic (2 atoms) molecule.
 * Variables are named based on the English labels applied to the atoms.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import Atom from '../../common/model/Atom.js';
import Bond from '../../common/model/Bond.js';
import Molecule from '../../common/model/Molecule.js';
import MPColors from '../../common/MPColors.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
export default class DiatomicMolecule extends Molecule {
  // the atom labeled 'A'
  // the atom labeled 'B'

  constructor(providedOptions) {
    const options = providedOptions;
    const atomA = new Atom(MoleculePolarityStrings.atomAStringProperty, {
      color: MPColors.ATOM_A,
      tandem: options.tandem.createTandem('atomA')
    });
    const atomB = new Atom(MoleculePolarityStrings.atomBStringProperty, {
      color: MPColors.ATOM_B,
      electronegativity: MPConstants.ELECTRONEGATIVITY_RANGE.min + MPConstants.ELECTRONEGATIVITY_RANGE.getLength() / 2,
      tandem: options.tandem.createTandem('atomB')
    });

    // the bond connecting atoms A and B
    const bond = new Bond(atomA, atomB, {
      tandem: options.tandem.createTandem('bond'),
      phetioDocumentation: 'the bonds between atoms A and B'
    });
    const updateAtomPositions = (position, angle) => {
      const radius = MPConstants.BOND_LENGTH / 2;

      // atom A
      const xA = radius * Math.cos(angle + Math.PI) + position.x;
      const yA = radius * Math.sin(angle + Math.PI) + position.y;
      atomA.positionProperty.value = new Vector2(xA, yA);

      // atom B
      const xB = radius * Math.cos(angle) + position.x;
      const yB = radius * Math.sin(angle) + position.y;
      atomB.positionProperty.value = new Vector2(xB, yB);
    };
    const getDeltaEN = () => {
      return atomB.electronegativityProperty.value - atomA.electronegativityProperty.value;
    };
    const updatePartialCharges = () => {
      const deltaEN = getDeltaEN();

      // in our simplified model, partial charge and deltaEN are equivalent. not so in the real world.
      atomA.partialChargeProperty.value = deltaEN;
      atomB.partialChargeProperty.value = -deltaEN;
    };
    super([atomA, atomB], [bond], updateAtomPositions, updatePartialCharges, options);
    this.atomA = atomA;
    this.atomB = atomB;
    this.bond = bond;
    this.getDeltaEN = getDeltaEN;
  }
  dispose() {
    assert && assert(false, 'dispose is not supported, exists for the lifetime of the sim');
    super.dispose();
  }
}
moleculePolarity.register('DiatomicMolecule', DiatomicMolecule);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWZWN0b3IyIiwiQXRvbSIsIkJvbmQiLCJNb2xlY3VsZSIsIk1QQ29sb3JzIiwiTVBDb25zdGFudHMiLCJtb2xlY3VsZVBvbGFyaXR5IiwiTW9sZWN1bGVQb2xhcml0eVN0cmluZ3MiLCJEaWF0b21pY01vbGVjdWxlIiwiY29uc3RydWN0b3IiLCJwcm92aWRlZE9wdGlvbnMiLCJvcHRpb25zIiwiYXRvbUEiLCJhdG9tQVN0cmluZ1Byb3BlcnR5IiwiY29sb3IiLCJBVE9NX0EiLCJ0YW5kZW0iLCJjcmVhdGVUYW5kZW0iLCJhdG9tQiIsImF0b21CU3RyaW5nUHJvcGVydHkiLCJBVE9NX0IiLCJlbGVjdHJvbmVnYXRpdml0eSIsIkVMRUNUUk9ORUdBVElWSVRZX1JBTkdFIiwibWluIiwiZ2V0TGVuZ3RoIiwiYm9uZCIsInBoZXRpb0RvY3VtZW50YXRpb24iLCJ1cGRhdGVBdG9tUG9zaXRpb25zIiwicG9zaXRpb24iLCJhbmdsZSIsInJhZGl1cyIsIkJPTkRfTEVOR1RIIiwieEEiLCJNYXRoIiwiY29zIiwiUEkiLCJ4IiwieUEiLCJzaW4iLCJ5IiwicG9zaXRpb25Qcm9wZXJ0eSIsInZhbHVlIiwieEIiLCJ5QiIsImdldERlbHRhRU4iLCJlbGVjdHJvbmVnYXRpdml0eVByb3BlcnR5IiwidXBkYXRlUGFydGlhbENoYXJnZXMiLCJkZWx0YUVOIiwicGFydGlhbENoYXJnZVByb3BlcnR5IiwiZGlzcG9zZSIsImFzc2VydCIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiRGlhdG9taWNNb2xlY3VsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNC0yMDIyLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBEaWF0b21pY01vbGVjdWxlIGlzIHRoZSBtb2RlbCBvZiBhIG1ha2UtYmVsaWV2ZSBkaWF0b21pYyAoMiBhdG9tcykgbW9sZWN1bGUuXHJcbiAqIFZhcmlhYmxlcyBhcmUgbmFtZWQgYmFzZWQgb24gdGhlIEVuZ2xpc2ggbGFiZWxzIGFwcGxpZWQgdG8gdGhlIGF0b21zLlxyXG4gKlxyXG4gKiBAYXV0aG9yIENocmlzIE1hbGxleSAoUGl4ZWxab29tLCBJbmMuKVxyXG4gKi9cclxuXHJcbmltcG9ydCBWZWN0b3IyIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9WZWN0b3IyLmpzJztcclxuaW1wb3J0IHsgRW1wdHlTZWxmT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9vcHRpb25pemUuanMnO1xyXG5pbXBvcnQgQXRvbSBmcm9tICcuLi8uLi9jb21tb24vbW9kZWwvQXRvbS5qcyc7XHJcbmltcG9ydCBCb25kIGZyb20gJy4uLy4uL2NvbW1vbi9tb2RlbC9Cb25kLmpzJztcclxuaW1wb3J0IE1vbGVjdWxlLCB7IE1vbGVjdWxlT3B0aW9ucyB9IGZyb20gJy4uLy4uL2NvbW1vbi9tb2RlbC9Nb2xlY3VsZS5qcyc7XHJcbmltcG9ydCBNUENvbG9ycyBmcm9tICcuLi8uLi9jb21tb24vTVBDb2xvcnMuanMnO1xyXG5pbXBvcnQgTVBDb25zdGFudHMgZnJvbSAnLi4vLi4vY29tbW9uL01QQ29uc3RhbnRzLmpzJztcclxuaW1wb3J0IG1vbGVjdWxlUG9sYXJpdHkgZnJvbSAnLi4vLi4vbW9sZWN1bGVQb2xhcml0eS5qcyc7XHJcbmltcG9ydCBNb2xlY3VsZVBvbGFyaXR5U3RyaW5ncyBmcm9tICcuLi8uLi9Nb2xlY3VsZVBvbGFyaXR5U3RyaW5ncy5qcyc7XHJcblxyXG50eXBlIFNlbGZPcHRpb25zID0gRW1wdHlTZWxmT3B0aW9ucztcclxuXHJcbnR5cGUgRGlhdG9taWNNb2xlY3VsZU9wdGlvbnMgPSBTZWxmT3B0aW9ucyAmIE1vbGVjdWxlT3B0aW9ucztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpYXRvbWljTW9sZWN1bGUgZXh0ZW5kcyBNb2xlY3VsZSB7XHJcblxyXG4gIHB1YmxpYyByZWFkb25seSBhdG9tQTogQXRvbTsgLy8gdGhlIGF0b20gbGFiZWxlZCAnQSdcclxuICBwdWJsaWMgcmVhZG9ubHkgYXRvbUI6IEF0b207IC8vIHRoZSBhdG9tIGxhYmVsZWQgJ0InXHJcbiAgcHVibGljIHJlYWRvbmx5IGJvbmQ6IEJvbmQ7XHJcbiAgcHVibGljIHJlYWRvbmx5IGdldERlbHRhRU46ICgpID0+IG51bWJlcjtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBwcm92aWRlZE9wdGlvbnM6IERpYXRvbWljTW9sZWN1bGVPcHRpb25zICkge1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSBwcm92aWRlZE9wdGlvbnM7XHJcblxyXG4gICAgY29uc3QgYXRvbUEgPSBuZXcgQXRvbSggTW9sZWN1bGVQb2xhcml0eVN0cmluZ3MuYXRvbUFTdHJpbmdQcm9wZXJ0eSwge1xyXG4gICAgICBjb2xvcjogTVBDb2xvcnMuQVRPTV9BLFxyXG4gICAgICB0YW5kZW06IG9wdGlvbnMudGFuZGVtLmNyZWF0ZVRhbmRlbSggJ2F0b21BJyApXHJcbiAgICB9ICk7XHJcblxyXG4gICAgY29uc3QgYXRvbUIgPSBuZXcgQXRvbSggTW9sZWN1bGVQb2xhcml0eVN0cmluZ3MuYXRvbUJTdHJpbmdQcm9wZXJ0eSwge1xyXG4gICAgICBjb2xvcjogTVBDb2xvcnMuQVRPTV9CLFxyXG4gICAgICBlbGVjdHJvbmVnYXRpdml0eTogTVBDb25zdGFudHMuRUxFQ1RST05FR0FUSVZJVFlfUkFOR0UubWluICsgKCBNUENvbnN0YW50cy5FTEVDVFJPTkVHQVRJVklUWV9SQU5HRS5nZXRMZW5ndGgoKSAvIDIgKSxcclxuICAgICAgdGFuZGVtOiBvcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICdhdG9tQicgKVxyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIHRoZSBib25kIGNvbm5lY3RpbmcgYXRvbXMgQSBhbmQgQlxyXG4gICAgY29uc3QgYm9uZCA9IG5ldyBCb25kKCBhdG9tQSwgYXRvbUIsIHtcclxuICAgICAgdGFuZGVtOiBvcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICdib25kJyApLFxyXG4gICAgICBwaGV0aW9Eb2N1bWVudGF0aW9uOiAndGhlIGJvbmRzIGJldHdlZW4gYXRvbXMgQSBhbmQgQidcclxuICAgIH0gKTtcclxuXHJcbiAgICBjb25zdCB1cGRhdGVBdG9tUG9zaXRpb25zID0gKCBwb3NpdGlvbjogVmVjdG9yMiwgYW5nbGU6IG51bWJlciApID0+IHtcclxuXHJcbiAgICAgIGNvbnN0IHJhZGl1cyA9IE1QQ29uc3RhbnRzLkJPTkRfTEVOR1RIIC8gMjtcclxuXHJcbiAgICAgIC8vIGF0b20gQVxyXG4gICAgICBjb25zdCB4QSA9ICggcmFkaXVzICogTWF0aC5jb3MoIGFuZ2xlICsgTWF0aC5QSSApICkgKyBwb3NpdGlvbi54O1xyXG4gICAgICBjb25zdCB5QSA9ICggcmFkaXVzICogTWF0aC5zaW4oIGFuZ2xlICsgTWF0aC5QSSApICkgKyBwb3NpdGlvbi55O1xyXG4gICAgICBhdG9tQS5wb3NpdGlvblByb3BlcnR5LnZhbHVlID0gbmV3IFZlY3RvcjIoIHhBLCB5QSApO1xyXG5cclxuICAgICAgLy8gYXRvbSBCXHJcbiAgICAgIGNvbnN0IHhCID0gKCByYWRpdXMgKiBNYXRoLmNvcyggYW5nbGUgKSApICsgcG9zaXRpb24ueDtcclxuICAgICAgY29uc3QgeUIgPSAoIHJhZGl1cyAqIE1hdGguc2luKCBhbmdsZSApICkgKyBwb3NpdGlvbi55O1xyXG4gICAgICBhdG9tQi5wb3NpdGlvblByb3BlcnR5LnZhbHVlID0gbmV3IFZlY3RvcjIoIHhCLCB5QiApO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBnZXREZWx0YUVOID0gKCkgPT4ge1xyXG4gICAgICByZXR1cm4gYXRvbUIuZWxlY3Ryb25lZ2F0aXZpdHlQcm9wZXJ0eS52YWx1ZSAtIGF0b21BLmVsZWN0cm9uZWdhdGl2aXR5UHJvcGVydHkudmFsdWU7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHVwZGF0ZVBhcnRpYWxDaGFyZ2VzID0gKCkgPT4ge1xyXG5cclxuICAgICAgY29uc3QgZGVsdGFFTiA9IGdldERlbHRhRU4oKTtcclxuXHJcbiAgICAgIC8vIGluIG91ciBzaW1wbGlmaWVkIG1vZGVsLCBwYXJ0aWFsIGNoYXJnZSBhbmQgZGVsdGFFTiBhcmUgZXF1aXZhbGVudC4gbm90IHNvIGluIHRoZSByZWFsIHdvcmxkLlxyXG4gICAgICBhdG9tQS5wYXJ0aWFsQ2hhcmdlUHJvcGVydHkudmFsdWUgPSBkZWx0YUVOO1xyXG4gICAgICBhdG9tQi5wYXJ0aWFsQ2hhcmdlUHJvcGVydHkudmFsdWUgPSAtZGVsdGFFTjtcclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIoIFsgYXRvbUEsIGF0b21CIF0sIFsgYm9uZCBdLCB1cGRhdGVBdG9tUG9zaXRpb25zLCB1cGRhdGVQYXJ0aWFsQ2hhcmdlcywgb3B0aW9ucyApO1xyXG5cclxuICAgIHRoaXMuYXRvbUEgPSBhdG9tQTtcclxuICAgIHRoaXMuYXRvbUIgPSBhdG9tQjtcclxuICAgIHRoaXMuYm9uZCA9IGJvbmQ7XHJcbiAgICB0aGlzLmdldERlbHRhRU4gPSBnZXREZWx0YUVOO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG92ZXJyaWRlIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCBmYWxzZSwgJ2Rpc3Bvc2UgaXMgbm90IHN1cHBvcnRlZCwgZXhpc3RzIGZvciB0aGUgbGlmZXRpbWUgb2YgdGhlIHNpbScgKTtcclxuICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICB9XHJcbn1cclxuXHJcbm1vbGVjdWxlUG9sYXJpdHkucmVnaXN0ZXIoICdEaWF0b21pY01vbGVjdWxlJywgRGlhdG9taWNNb2xlY3VsZSApOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLE9BQU8sTUFBTSwrQkFBK0I7QUFFbkQsT0FBT0MsSUFBSSxNQUFNLDRCQUE0QjtBQUM3QyxPQUFPQyxJQUFJLE1BQU0sNEJBQTRCO0FBQzdDLE9BQU9DLFFBQVEsTUFBMkIsZ0NBQWdDO0FBQzFFLE9BQU9DLFFBQVEs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