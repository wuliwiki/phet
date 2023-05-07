// Copyright 2022-2023, University of Colorado Boulder

/**
 * FocalLengthModelTypeControl is the control used to choose the focal-length model type, 'direct' or 'indirect'
 * in the Preferences dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import GeometricOpticsStrings from '../../GeometricOpticsStrings.js';
import geometricOptics from '../../geometricOptics.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { Text, VBox } from '../../../../scenery/js/imports.js';
import PreferencesDialog from '../../../../joist/js/preferences/PreferencesDialog.js';
import VerticalAquaRadioButtonGroup from '../../../../sun/js/VerticalAquaRadioButtonGroup.js';
export default class FocalLengthModelTypeControl extends VBox {
  /**
   * @param focalLengthModelTypeProperty - whether to set focal length directly or indirectly
   * @param providedOptions
   */
  constructor(focalLengthModelTypeProperty, providedOptions) {
    const options = optionize()({
      // VBoxOptions
      spacing: 8,
      align: 'left',
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    }, providedOptions);
    super(options);
    const labelText = new Text(GeometricOpticsStrings.focalLengthControlStringProperty, {
      font: PreferencesDialog.CONTENT_FONT,
      tandem: options.tandem.createTandem('labelText')
    });
    const radioButtonGroup = new FocalLengthModelTypeRadioButtonGroup(focalLengthModelTypeProperty, {
      tandem: options.tandem.createTandem('radioButtonGroup')
    });
    this.children = [labelText, radioButtonGroup];
    this.addLinkedElement(focalLengthModelTypeProperty, {
      tandem: options.tandem.createTandem(focalLengthModelTypeProperty.tandem.name)
    });
    this.disposeFocalLengthModelTypeControl = () => {
      labelText.dispose();
      radioButtonGroup.dispose();
    };
  }
  dispose() {
    super.dispose();
    this.disposeFocalLengthModelTypeControl();
  }
}

/**
 * FocalLengthModelTypeRadioButtonGroup is the radio button group associated with this control.
 */

class FocalLengthModelTypeRadioButtonGroup extends VerticalAquaRadioButtonGroup {
  /**
   * @param focalLengthModelTypeProperty - whether to set focal length directly or indirectl
   * @param providedOptions
   */
  constructor(focalLengthModelTypeProperty, providedOptions) {
    const options = optionize()({
      // VerticalAquaRadioButtonGroupOptions
      spacing: 8,
      phetioVisiblePropertyInstrumented: false,
      radioButtonOptions: {
        phetioVisiblePropertyInstrumented: false
      }
    }, providedOptions);
    const items = [createItem('direct', GeometricOpticsStrings.radioButton.directStringProperty, options.tandem, 'directRadioButton'), createItem('indirect', GeometricOpticsStrings.radioButton.indirectStringProperty, options.tandem, 'indirectRadioButton')];
    super(focalLengthModelTypeProperty, items, options);
  }
}

/**
 * Creates an item for the radio button group.
 * @param value - value associated with the radio button
 * @param labelStringProperty - label that appears on the radio button
 * @param groupTandem - used to associate the item's tandem with the radio-button group
 * @param itemTandemName - used to create the item's tandem
 */
function createItem(value, labelStringProperty, groupTandem, itemTandemName) {
  return {
    value: value,
    createNode: tandem => new Text(labelStringProperty, {
      font: PreferencesDialog.CONTENT_FONT,
      maxWidth: 500,
      tandem: tandem.createTandem('labelText')
    }),
    tandemName: itemTandemName
  };
}
geometricOptics.register('FocalLengthModelTypeControl', FocalLengthModelTypeControl);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJHZW9tZXRyaWNPcHRpY3NTdHJpbmdzIiwiZ2VvbWV0cmljT3B0aWNzIiwib3B0aW9uaXplIiwiVGV4dCIsIlZCb3giLCJQcmVmZXJlbmNlc0RpYWxvZyIsIlZlcnRpY2FsQXF1YVJhZGlvQnV0dG9uR3JvdXAiLCJGb2NhbExlbmd0aE1vZGVsVHlwZUNvbnRyb2wiLCJjb25zdHJ1Y3RvciIsImZvY2FsTGVuZ3RoTW9kZWxUeXBlUHJvcGVydHkiLCJwcm92aWRlZE9wdGlvbnMiLCJvcHRpb25zIiwic3BhY2luZyIsImFsaWduIiwidmlzaWJsZVByb3BlcnR5T3B0aW9ucyIsInBoZXRpb0ZlYXR1cmVkIiwibGFiZWxUZXh0IiwiZm9jYWxMZW5ndGhDb250cm9sU3RyaW5nUHJvcGVydHkiLCJmb250IiwiQ09OVEVOVF9GT05UIiwidGFuZGVtIiwiY3JlYXRlVGFuZGVtIiwicmFkaW9CdXR0b25Hcm91cCIsIkZvY2FsTGVuZ3RoTW9kZWxUeXBlUmFkaW9CdXR0b25Hcm91cCIsImNoaWxkcmVuIiwiYWRkTGlua2VkRWxlbWVudCIsIm5hbWUiLCJkaXNwb3NlRm9jYWxMZW5ndGhNb2RlbFR5cGVDb250cm9sIiwiZGlzcG9zZSIsInBoZXRpb1Zpc2libGVQcm9wZXJ0eUluc3RydW1lbnRlZCIsInJhZGlvQnV0dG9uT3B0aW9ucyIsIml0ZW1zIiwiY3JlYXRlSXRlbSIsInJhZGlvQnV0dG9uIiwiZGlyZWN0U3RyaW5nUHJvcGVydHkiLCJpbmRpcmVjdFN0cmluZ1Byb3BlcnR5IiwidmFsdWUiLCJsYWJlbFN0cmluZ1Byb3BlcnR5IiwiZ3JvdXBUYW5kZW0iLCJpdGVtVGFuZGVtTmFtZSIsImNyZWF0ZU5vZGUiLCJtYXhXaWR0aCIsInRhbmRlbU5hbWUiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkZvY2FsTGVuZ3RoTW9kZWxUeXBlQ29udHJvbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAyMi0yMDIzLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBGb2NhbExlbmd0aE1vZGVsVHlwZUNvbnRyb2wgaXMgdGhlIGNvbnRyb2wgdXNlZCB0byBjaG9vc2UgdGhlIGZvY2FsLWxlbmd0aCBtb2RlbCB0eXBlLCAnZGlyZWN0JyBvciAnaW5kaXJlY3QnXHJcbiAqIGluIHRoZSBQcmVmZXJlbmNlcyBkaWFsb2cuXHJcbiAqXHJcbiAqIEBhdXRob3IgQ2hyaXMgTWFsbGV5IChQaXhlbFpvb20sIEluYy4pXHJcbiAqL1xyXG5cclxuaW1wb3J0IEdlb21ldHJpY09wdGljc1N0cmluZ3MgZnJvbSAnLi4vLi4vR2VvbWV0cmljT3B0aWNzU3RyaW5ncy5qcyc7XHJcbmltcG9ydCBnZW9tZXRyaWNPcHRpY3MgZnJvbSAnLi4vLi4vZ2VvbWV0cmljT3B0aWNzLmpzJztcclxuaW1wb3J0IHsgRm9jYWxMZW5ndGhNb2RlbFR5cGUgfSBmcm9tICcuLi9tb2RlbC9Gb2NhbExlbmd0aE1vZGVsVHlwZS5qcyc7XHJcbmltcG9ydCBvcHRpb25pemUsIHsgRW1wdHlTZWxmT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9vcHRpb25pemUuanMnO1xyXG5pbXBvcnQgeyBUZXh0LCBWQm94LCBWQm94T3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnkvanMvaW1wb3J0cy5qcyc7XHJcbmltcG9ydCBQaWNrUmVxdWlyZWQgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL3R5cGVzL1BpY2tSZXF1aXJlZC5qcyc7XHJcbmltcG9ydCBQaWNrT3B0aW9uYWwgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL3R5cGVzL1BpY2tPcHRpb25hbC5qcyc7XHJcbmltcG9ydCBQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL1Byb3BlcnR5LmpzJztcclxuaW1wb3J0IFByZWZlcmVuY2VzRGlhbG9nIGZyb20gJy4uLy4uLy4uLy4uL2pvaXN0L2pzL3ByZWZlcmVuY2VzL1ByZWZlcmVuY2VzRGlhbG9nLmpzJztcclxuaW1wb3J0IHsgQXF1YVJhZGlvQnV0dG9uR3JvdXBJdGVtIH0gZnJvbSAnLi4vLi4vLi4vLi4vc3VuL2pzL0FxdWFSYWRpb0J1dHRvbkdyb3VwLmpzJztcclxuaW1wb3J0IFZlcnRpY2FsQXF1YVJhZGlvQnV0dG9uR3JvdXAsIHsgVmVydGljYWxBcXVhUmFkaW9CdXR0b25Hcm91cE9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi8uLi9zdW4vanMvVmVydGljYWxBcXVhUmFkaW9CdXR0b25Hcm91cC5qcyc7XHJcbmltcG9ydCBUYW5kZW0gZnJvbSAnLi4vLi4vLi4vLi4vdGFuZGVtL2pzL1RhbmRlbS5qcyc7XHJcbmltcG9ydCBUUmVhZE9ubHlQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL1RSZWFkT25seVByb3BlcnR5LmpzJztcclxuXHJcbnR5cGUgU2VsZk9wdGlvbnMgPSBFbXB0eVNlbGZPcHRpb25zO1xyXG5cclxudHlwZSBGb2NhbExlbmd0aE1vZGVsVHlwZU9wdGlvbnMgPSBTZWxmT3B0aW9ucyAmXHJcbiAgUGlja1JlcXVpcmVkPFZCb3hPcHRpb25zLCAndGFuZGVtJz4gJlxyXG4gIFBpY2tPcHRpb25hbDxWQm94T3B0aW9ucywgJ3Zpc2libGUnPjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvY2FsTGVuZ3RoTW9kZWxUeXBlQ29udHJvbCBleHRlbmRzIFZCb3gge1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGRpc3Bvc2VGb2NhbExlbmd0aE1vZGVsVHlwZUNvbnRyb2w6ICgpID0+IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBmb2NhbExlbmd0aE1vZGVsVHlwZVByb3BlcnR5IC0gd2hldGhlciB0byBzZXQgZm9jYWwgbGVuZ3RoIGRpcmVjdGx5IG9yIGluZGlyZWN0bHlcclxuICAgKiBAcGFyYW0gcHJvdmlkZWRPcHRpb25zXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBmb2NhbExlbmd0aE1vZGVsVHlwZVByb3BlcnR5OiBQcm9wZXJ0eTxGb2NhbExlbmd0aE1vZGVsVHlwZT4sIHByb3ZpZGVkT3B0aW9uczogRm9jYWxMZW5ndGhNb2RlbFR5cGVPcHRpb25zICkge1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSBvcHRpb25pemU8Rm9jYWxMZW5ndGhNb2RlbFR5cGVPcHRpb25zLCBTZWxmT3B0aW9ucywgVkJveE9wdGlvbnM+KCkoIHtcclxuXHJcbiAgICAgIC8vIFZCb3hPcHRpb25zXHJcbiAgICAgIHNwYWNpbmc6IDgsXHJcbiAgICAgIGFsaWduOiAnbGVmdCcsXHJcbiAgICAgIHZpc2libGVQcm9wZXJ0eU9wdGlvbnM6IHtcclxuICAgICAgICBwaGV0aW9GZWF0dXJlZDogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9LCBwcm92aWRlZE9wdGlvbnMgKTtcclxuXHJcbiAgICBzdXBlciggb3B0aW9ucyApO1xyXG5cclxuICAgIGNvbnN0IGxhYmVsVGV4dCA9IG5ldyBUZXh0KCBHZW9tZXRyaWNPcHRpY3NTdHJpbmdzLmZvY2FsTGVuZ3RoQ29udHJvbFN0cmluZ1Byb3BlcnR5LCB7XHJcbiAgICAgIGZvbnQ6IFByZWZlcmVuY2VzRGlhbG9nLkNPTlRFTlRfRk9OVCxcclxuICAgICAgdGFuZGVtOiBvcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICdsYWJlbFRleHQnIClcclxuICAgIH0gKTtcclxuXHJcbiAgICBjb25zdCByYWRpb0J1dHRvbkdyb3VwID0gbmV3IEZvY2FsTGVuZ3RoTW9kZWxUeXBlUmFkaW9CdXR0b25Hcm91cCggZm9jYWxMZW5ndGhNb2RlbFR5cGVQcm9wZXJ0eSwge1xyXG4gICAgICB0YW5kZW06IG9wdGlvbnMudGFuZGVtLmNyZWF0ZVRhbmRlbSggJ3JhZGlvQnV0dG9uR3JvdXAnIClcclxuICAgIH0gKTtcclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuID0gWyBsYWJlbFRleHQsIHJhZGlvQnV0dG9uR3JvdXAgXTtcclxuXHJcbiAgICB0aGlzLmFkZExpbmtlZEVsZW1lbnQoIGZvY2FsTGVuZ3RoTW9kZWxUeXBlUHJvcGVydHksIHtcclxuICAgICAgdGFuZGVtOiBvcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oIGZvY2FsTGVuZ3RoTW9kZWxUeXBlUHJvcGVydHkudGFuZGVtLm5hbWUgKVxyXG4gICAgfSApO1xyXG5cclxuICAgIHRoaXMuZGlzcG9zZUZvY2FsTGVuZ3RoTW9kZWxUeXBlQ29udHJvbCA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgbGFiZWxUZXh0LmRpc3Bvc2UoKTtcclxuICAgICAgcmFkaW9CdXR0b25Hcm91cC5kaXNwb3NlKCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG92ZXJyaWRlIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICB0aGlzLmRpc3Bvc2VGb2NhbExlbmd0aE1vZGVsVHlwZUNvbnRyb2woKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGb2NhbExlbmd0aE1vZGVsVHlwZVJhZGlvQnV0dG9uR3JvdXAgaXMgdGhlIHJhZGlvIGJ1dHRvbiBncm91cCBhc3NvY2lhdGVkIHdpdGggdGhpcyBjb250cm9sLlxyXG4gKi9cclxuXHJcbnR5cGUgRm9jYWxMZW5ndGhNb2RlbFR5cGVSYWRpb0J1dHRvbkdyb3VwU2VsZk9wdGlvbnMgPSBFbXB0eVNlbGZPcHRpb25zO1xyXG5cclxudHlwZSBGb2NhbExlbmd0aENvbnRyb2xSYWRpb0J1dHRvbkdyb3VwT3B0aW9ucyA9IFNlbGZPcHRpb25zICYgUGlja1JlcXVpcmVkPFZlcnRpY2FsQXF1YVJhZGlvQnV0dG9uR3JvdXBPcHRpb25zLCAndGFuZGVtJz47XHJcblxyXG5jbGFzcyBGb2NhbExlbmd0aE1vZGVsVHlwZVJhZGlvQnV0dG9uR3JvdXAgZXh0ZW5kcyBWZXJ0aWNhbEFxdWFSYWRpb0J1dHRvbkdyb3VwPEZvY2FsTGVuZ3RoTW9kZWxUeXBlPiB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBmb2NhbExlbmd0aE1vZGVsVHlwZVByb3BlcnR5IC0gd2hldGhlciB0byBzZXQgZm9jYWwgbGVuZ3RoIGRpcmVjdGx5IG9yIGluZGlyZWN0bFxyXG4gICAqIEBwYXJhbSBwcm92aWRlZE9wdGlvbnNcclxuICAgKi9cclxuICBwdWJsaWMgY29uc3RydWN0b3IoIGZvY2FsTGVuZ3RoTW9kZWxUeXBlUHJvcGVydHk6IFByb3BlcnR5PEZvY2FsTGVuZ3RoTW9kZWxUeXBlPixcclxuICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVkT3B0aW9uczogRm9jYWxMZW5ndGhDb250cm9sUmFkaW9CdXR0b25Hcm91cE9wdGlvbnMgKSB7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbml6ZTxGb2NhbExlbmd0aENvbnRyb2xSYWRpb0J1dHRvbkdyb3VwT3B0aW9ucywgRm9jYWxMZW5ndGhNb2RlbFR5cGVSYWRpb0J1dHRvbkdyb3VwU2VsZk9wdGlvbnMsIFZlcnRpY2FsQXF1YVJhZGlvQnV0dG9uR3JvdXBPcHRpb25zPigpKCB7XHJcblxyXG4gICAgICAvLyBWZXJ0aWNhbEFxdWFSYWRpb0J1dHRvbkdyb3VwT3B0aW9uc1xyXG4gICAgICBzcGFjaW5nOiA4LFxyXG4gICAgICBwaGV0aW9WaXNpYmxlUHJvcGVydHlJbnN0cnVtZW50ZWQ6IGZhbHNlLFxyXG4gICAgICByYWRpb0J1dHRvbk9wdGlvbnM6IHtcclxuICAgICAgICBwaGV0aW9WaXNpYmxlUHJvcGVydHlJbnN0cnVtZW50ZWQ6IGZhbHNlXHJcbiAgICAgIH1cclxuICAgIH0sIHByb3ZpZGVkT3B0aW9ucyApO1xyXG5cclxuICAgIGNvbnN0IGl0ZW1zID0gW1xyXG4gICAgICBjcmVhdGVJdGVtKCAnZGlyZWN0JywgR2VvbWV0cmljT3B0aWNzU3RyaW5ncy5yYWRpb0J1dHRvbi5kaXJlY3RTdHJpbmdQcm9wZXJ0eSwgb3B0aW9ucy50YW5kZW0sICdkaXJlY3RSYWRpb0J1dHRvbicgKSxcclxuICAgICAgY3JlYXRlSXRlbSggJ2luZGlyZWN0JywgR2VvbWV0cmljT3B0aWNzU3RyaW5ncy5yYWRpb0J1dHRvbi5pbmRpcmVjdFN0cmluZ1Byb3BlcnR5LCBvcHRpb25zLnRhbmRlbSwgJ2luZGlyZWN0UmFkaW9CdXR0b24nIClcclxuICAgIF07XHJcblxyXG4gICAgc3VwZXIoIGZvY2FsTGVuZ3RoTW9kZWxUeXBlUHJvcGVydHksIGl0ZW1zLCBvcHRpb25zICk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhbiBpdGVtIGZvciB0aGUgcmFkaW8gYnV0dG9uIGdyb3VwLlxyXG4gKiBAcGFyYW0gdmFsdWUgLSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhlIHJhZGlvIGJ1dHRvblxyXG4gKiBAcGFyYW0gbGFiZWxTdHJpbmdQcm9wZXJ0eSAtIGxhYmVsIHRoYXQgYXBwZWFycyBvbiB0aGUgcmFkaW8gYnV0dG9uXHJcbiAqIEBwYXJhbSBncm91cFRhbmRlbSAtIHVzZWQgdG8gYXNzb2NpYXRlIHRoZSBpdGVtJ3MgdGFuZGVtIHdpdGggdGhlIHJhZGlvLWJ1dHRvbiBncm91cFxyXG4gKiBAcGFyYW0gaXRlbVRhbmRlbU5hbWUgLSB1c2VkIHRvIGNyZWF0ZSB0aGUgaXRlbSdzIHRhbmRlbVxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlSXRlbSggdmFsdWU6IEZvY2FsTGVuZ3RoTW9kZWxUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICBsYWJlbFN0cmluZ1Byb3BlcnR5OiBUUmVhZE9ubHlQcm9wZXJ0eTxzdHJpbmc+LFxyXG4gICAgICAgICAgICAgICAgICAgICBncm91cFRhbmRlbTogVGFuZGVtLFxyXG4gICAgICAgICAgICAgICAgICAgICBpdGVtVGFuZGVtTmFtZTogc3RyaW5nICk6IEFxdWFSYWRpb0J1dHRvbkdyb3VwSXRlbTxGb2NhbExlbmd0aE1vZGVsVHlwZT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICBjcmVhdGVOb2RlOiB0YW5kZW0gPT4gbmV3IFRleHQoIGxhYmVsU3RyaW5nUHJvcGVydHksIHtcclxuICAgICAgZm9udDogUHJlZmVyZW5jZXNEaWFsb2cuQ09OVEVOVF9GT05ULFxyXG4gICAgICBtYXhXaWR0aDogNTAwLFxyXG4gICAgICB0YW5kZW06IHRhbmRlbS5jcmVhdGVUYW5kZW0oICdsYWJlbFRleHQnIClcclxuICAgIH0gKSxcclxuICAgIHRhbmRlbU5hbWU6IGl0ZW1UYW5kZW1OYW1lXHJcbiAgfTtcclxufVxyXG5cclxuZ2VvbWV0cmljT3B0aWNzLnJlZ2lzdGVyKCAnRm9jYWxMZW5ndGhNb2RlbFR5cGVDb250cm9sJywgRm9jYWxMZW5ndGhNb2RlbFR5cGVDb250cm9sICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0Esc0JBQXNCLE1BQU0saUNBQWlDO0FBQ3BFLE9BQU9DLGVBQWUsTUFBTSwwQkFBMEI7QUFFdEQsT0FBT0MsU0FBUyxNQUE0Qix1Q0FBdUM7QUFDbkYsU0FBU0MsSUFBSSxFQUFFQyxJQUFJLFFBQXFCLG1DQUFtQztBQUkzRSxPQUFPQyxpQkFBaUIsTUFBTSx1REFBdUQ7QUFFckYsT0FBT0MsNEJBQTRCLE1BQStDLG9EQUFvRDtBQVV0SSxlQUFlLE1BQU1DLDJCQUEyQixTQUFTSCxJQUFJLENBQUM7RUFJNUQ7QUFDRjtBQUNBO0FBQ0E7RUFDU0ksV0FBV0EsQ0FBRUMsNEJBQTRELEVBQUVDLGVBQTRDLEVBQUc7SUFFL0gsTUFBTUMsT0FBTyxHQUFHVCxTQUFTLENBQXdELENBQUMsQ0FBRTtNQUVsRjtNQUNBVSxPQUFPLEVBQUUsQ0FBQztNQUNWQyxLQUFLLEVBQUUsTUFBTTtNQUNiQyxzQkFBc0IsRUFBRTtRQUN0QkMsY0FBYyxFQUFFO01BQ2xCO0lBQ0YsQ0FBQyxFQUFFTCxlQUFnQixDQUFDO0lBRXBCLEtBQUssQ0FBRUMsT0FBUSxDQUFDO0lBRWhCLE1BQU1LLFNBQVMsR0FBRyxJQUFJYixJQUFJLENBQUVILHNCQUFzQixDQUFDaUIsZ0NBQWdDLEVBQUU7TUFDbkZDLElBQUksRUFBRWIsaUJBQWlCLENBQUNjLFlBQVk7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