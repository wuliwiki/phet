// Copyright 2017-2022, University of Colorado Boulder

/**
 * Accordion box that allows the student to save and restore snapshots, specific configurations of a scene.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TrashButton from '../../../../scenery-phet/js/buttons/TrashButton.js';
import { HBox, HSeparator, Path, Text, VBox } from '../../../../scenery/js/imports.js';
import replySolidShape from '../../../../sherpa/js/fontawesome-5/replySolidShape.js';
import AccordionBox from '../../../../sun/js/AccordionBox.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import equalityExplorer from '../../equalityExplorer.js';
import EqualityExplorerStrings from '../../EqualityExplorerStrings.js';
import EqualityExplorerColors from '../EqualityExplorerColors.js';
import EqualityExplorerConstants from '../EqualityExplorerConstants.js';
import SnapshotControl from './SnapshotControl.js';
import VariableValuesVisibleCheckbox from './VariableValuesVisibleCheckbox.js';
import { combineOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
export default class SnapshotsAccordionBox extends AccordionBox {
  /**
   * @param scene - the scene that we'll be taking snapshots of
   * @param [providedOptions]
   */
  constructor(scene, providedOptions) {
    const options = optionize4()({}, EqualityExplorerConstants.ACCORDION_BOX_OPTIONS, {
      // SelfOptions
      fixedWidth: 100,
      variableValuesVisibleProperty: null,
      snapshotControlOptions: {
        controlHeight: 50,
        orientation: 'horizontal',
        commaSeparated: true,
        variableValuesOpacity: 1
      },
      // AccordionBoxOptions
      contentXMargin: 10,
      contentYMargin: 10,
      contentYSpacing: 3
    }, providedOptions);
    assert && assert(!(options.variableValuesVisibleProperty && !scene.variables), 'scene has no variables to show in snapshots');
    options.maxWidth = options.fixedWidth;
    const contentWidth = options.fixedWidth - 2 * options.contentXMargin;

    // title
    options.titleNode = new Text(EqualityExplorerStrings.snapshotsStringProperty, {
      font: EqualityExplorerConstants.ACCORDION_BOX_TITLE_FONT,
      maxWidth: 0.85 * contentWidth,
      tandem: options.tandem.createTandem('titleText')
    });

    // Create a row for each snapshot
    const snapshotControls = [];
    for (let i = 0; i < scene.snapshotsCollection.snapshotProperties.length; i++) {
      const snapshotControl = new SnapshotControl(scene, scene.snapshotsCollection.snapshotProperties[i], scene.snapshotsCollection.selectedSnapshotProperty, combineOptions({}, options.snapshotControlOptions, {
        variableValuesVisibleProperty: options.variableValuesVisibleProperty,
        controlWidth: contentWidth,
        tandem: options.tandem.createTandem('snapshotControls').createTandem(`snapshotControl${i}`)
      }));
      snapshotControls.push(snapshotControl);
    }
    const snapshotControlsVBox = new VBox({
      spacing: 15,
      children: snapshotControls
    });

    // true when a snapshot is selected
    const hasSelectedSnapshotProperty = new DerivedProperty([scene.snapshotsCollection.selectedSnapshotProperty], selectedSnapshot => selectedSnapshot !== null);

    // Button to restore the selected snapshot
    const restoreIcon = new Path(replySolidShape, {
      scale: 0.04,
      fill: 'black'
    });
    const restoreButton = new RectangularPushButton({
      content: restoreIcon,
      baseColor: EqualityExplorerColors.SNAPSHOT_SELECTED_STROKE,
      // button color matches selection stroke
      xMargin: 8,
      yMargin: 4,
      touchAreaXDilation: 10,
      touchAreaYDilation: 10,
      listener: () => scene.snapshotsCollection.restoreSelectedSnapshot(),
      enabledProperty: hasSelectedSnapshotProperty,
      tandem: options.tandem.createTandem('restoreButton')
    });

    // Button to delete (trash) the selected snapshot
    const trashButton = new TrashButton({
      iconOptions: {
        scale: 0.034
      },
      baseColor: 'white',
      xMargin: 12,
      yMargin: 5,
      touchAreaXDilation: 5,
      touchAreaYDilation: 5,
      listener: () => scene.snapshotsCollection.deleteSelectedSnapshot(),
      enabledProperty: hasSelectedSnapshotProperty,
      tandem: options.tandem.createTandem('trashButton')
    });
    const hBoxChildren = [restoreButton, trashButton];

    // Checkbox for making variable values visible.
    if (options.variableValuesVisibleProperty) {
      const variables = scene.variables;
      assert && assert(variables);
      hBoxChildren.push(new VariableValuesVisibleCheckbox(options.variableValuesVisibleProperty, variables, {
        touchAreaXDilation: 5,
        touchAreaYDilation: 5,
        tandem: options.tandem.createTandem('variableValuesVisibleCheckbox')
      }));
    }
    const hBox = new HBox({
      spacing: 40,
      children: hBoxChildren,
      maxWidth: contentWidth
    });
    const content = new VBox({
      spacing: 10,
      children: [snapshotControlsVBox, new HSeparator({
        stroke: 'rgb( 200, 200, 200 )'
      }), hBox]
    });
    super(content, options);

    // Click outside this accordion box to clear the selected snapshot.
    const clickToDeselectListener = {
      down: event => {
        if (!this.parentToGlobalBounds(this.visibleBounds).containsPoint(event.pointer.point)) {
          scene.snapshotsCollection.selectedSnapshotProperty.value = null;
        }
      },
      tandem: options.tandem.createTandem('clickToDeselectListener')
    };

    // Register input listener with the Display only when we have a selected snapshot.
    // This technique was borrowed from circuit-construction-kit-common.CircuitElementNode.
    // unlink not required.
    scene.snapshotsCollection.selectedSnapshotProperty.link((selectedSnapshot, oldSelectedSnapshot) => {
      if (oldSelectedSnapshot) {
        phet.joist.display.removeInputListener(clickToDeselectListener);
      }
      if (selectedSnapshot) {
        phet.joist.display.addInputListener(clickToDeselectListener);
      }
    });
  }
  dispose() {
    assert && assert(false, 'dispose is not supported, exists for the lifetime of the sim');
    super.dispose();
  }
}
equalityExplorer.register('SnapshotsAccordionBox', SnapshotsAccordionBox);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJUcmFzaEJ1dHRvbiIsIkhCb3giLCJIU2VwYXJhdG9yIiwiUGF0aCIsIlRleHQiLCJWQm94IiwicmVwbHlTb2xpZFNoYXBlIiwiQWNjb3JkaW9uQm94IiwiUmVjdGFuZ3VsYXJQdXNoQnV0dG9uIiwiZXF1YWxpdHlFeHBsb3JlciIsIkVxdWFsaXR5RXhwbG9yZXJTdHJpbmdzIiwiRXF1YWxpdHlFeHBsb3JlckNvbG9ycyIsIkVxdWFsaXR5RXhwbG9yZXJDb25zdGFudHMiLCJTbmFwc2hvdENvbnRyb2wiLCJWYXJpYWJsZVZhbHVlc1Zpc2libGVDaGVja2JveCIsImNvbWJpbmVPcHRpb25zIiwib3B0aW9uaXplNCIsIkRlcml2ZWRQcm9wZXJ0eSIsIlNuYXBzaG90c0FjY29yZGlvbkJveCIsImNvbnN0cnVjdG9yIiwic2NlbmUiLCJwcm92aWRlZE9wdGlvbnMiLCJvcHRpb25zIiwiQUNDT1JESU9OX0JPWF9PUFRJT05TIiwiZml4ZWRXaWR0aCIsInZhcmlhYmxlVmFsdWVzVmlzaWJsZVByb3BlcnR5Iiwic25hcHNob3RDb250cm9sT3B0aW9ucyIsImNvbnRyb2xIZWlnaHQiLCJvcmllbnRhdGlvbiIsImNvbW1hU2VwYXJhdGVkIiwidmFyaWFibGVWYWx1ZXNPcGFjaXR5IiwiY29udGVudFhNYXJnaW4iLCJjb250ZW50WU1hcmdpbiIsImNvbnRlbnRZU3BhY2luZyIsImFzc2VydCIsInZhcmlhYmxlcyIsIm1heFdpZHRoIiwiY29udGVudFdpZHRoIiwidGl0bGVOb2RlIiwic25hcHNob3RzU3RyaW5nUHJvcGVydHkiLCJmb250IiwiQUNDT1JESU9OX0JPWF9USVRMRV9GT05UIiwidGFuZGVtIiwiY3JlYXRlVGFuZGVtIiwic25hcHNob3RDb250cm9scyIsImkiLCJzbmFwc2hvdHNDb2xsZWN0aW9uIiwic25hcHNob3RQcm9wZXJ0aWVzIiwibGVuZ3RoIiwic25hcHNob3RDb250cm9sIiwic2VsZWN0ZWRTbmFwc2hvdFByb3BlcnR5IiwiY29udHJvbFdpZHRoIiwicHVzaCIsInNuYXBzaG90Q29udHJvbHNWQm94Iiwic3BhY2luZyIsImNoaWxkcmVuIiwiaGFzU2VsZWN0ZWRTbmFwc2hvdFByb3BlcnR5Iiwic2VsZWN0ZWRTbmFwc2hvdCIsInJlc3RvcmVJY29uIiwic2NhbGUiLCJmaWxsIiwicmVzdG9yZUJ1dHRvbiIsImNvbnRlbnQiLCJiYXNlQ29sb3IiLCJTTkFQU0hPVF9TRUxFQ1RFRF9TVFJPS0UiLCJ4TWFyZ2luIiwieU1hcmdpbiIsInRvdWNoQXJlYVhEaWxhdGlvbiIsInRvdWNoQXJlYVlEaWxhdGlvbiIsImxpc3RlbmVyIiwicmVzdG9yZVNlbGVjdGVkU25hcHNob3QiLCJlbmFibGVkUHJvcGVydHkiLCJ0cmFzaEJ1dHRvbiIsImljb25PcHRpb25zIiwiZGVsZXRlU2VsZWN0ZWRTbmFwc2hvdCIsImhCb3hDaGlsZHJlbiIsImhCb3giLCJzdHJva2UiLCJjbGlja1RvRGVzZWxlY3RMaXN0ZW5lciIsImRvd24iLCJldmVudCIsInBhcmVudFRvR2xvYmFsQm91bmRzIiwidmlzaWJsZUJvdW5kcyIsImNvbnRhaW5zUG9pbnQiLCJwb2ludGVyIiwicG9pbnQiLCJ2YWx1ZSIsImxpbmsiLCJvbGRTZWxlY3RlZFNuYXBzaG90IiwicGhldCIsImpvaXN0IiwiZGlzcGxheSIsInJlbW92ZUlucHV0TGlzdGVuZXIiLCJhZGRJbnB1dExpc3RlbmVyIiwiZGlzcG9zZSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiU25hcHNob3RzQWNjb3JkaW9uQm94LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE3LTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIEFjY29yZGlvbiBib3ggdGhhdCBhbGxvd3MgdGhlIHN0dWRlbnQgdG8gc2F2ZSBhbmQgcmVzdG9yZSBzbmFwc2hvdHMsIHNwZWNpZmljIGNvbmZpZ3VyYXRpb25zIG9mIGEgc2NlbmUuXHJcbiAqXHJcbiAqIEBhdXRob3IgQ2hyaXMgTWFsbGV5IChQaXhlbFpvb20sIEluYy4pXHJcbiAqL1xyXG5cclxuaW1wb3J0IFRyYXNoQnV0dG9uIGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnktcGhldC9qcy9idXR0b25zL1RyYXNoQnV0dG9uLmpzJztcclxuaW1wb3J0IHsgSEJveCwgSFNlcGFyYXRvciwgTm9kZSwgTm9kZVRyYW5zbGF0aW9uT3B0aW9ucywgUGF0aCwgUHJlc3NMaXN0ZW5lckV2ZW50LCBUZXh0LCBWQm94IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IHJlcGx5U29saWRTaGFwZSBmcm9tICcuLi8uLi8uLi8uLi9zaGVycGEvanMvZm9udGF3ZXNvbWUtNS9yZXBseVNvbGlkU2hhcGUuanMnO1xyXG5pbXBvcnQgQWNjb3JkaW9uQm94LCB7IEFjY29yZGlvbkJveE9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi8uLi9zdW4vanMvQWNjb3JkaW9uQm94LmpzJztcclxuaW1wb3J0IFJlY3Rhbmd1bGFyUHVzaEJ1dHRvbiBmcm9tICcuLi8uLi8uLi8uLi9zdW4vanMvYnV0dG9ucy9SZWN0YW5ndWxhclB1c2hCdXR0b24uanMnO1xyXG5pbXBvcnQgZXF1YWxpdHlFeHBsb3JlciBmcm9tICcuLi8uLi9lcXVhbGl0eUV4cGxvcmVyLmpzJztcclxuaW1wb3J0IEVxdWFsaXR5RXhwbG9yZXJTdHJpbmdzIGZyb20gJy4uLy4uL0VxdWFsaXR5RXhwbG9yZXJTdHJpbmdzLmpzJztcclxuaW1wb3J0IEVxdWFsaXR5RXhwbG9yZXJDb2xvcnMgZnJvbSAnLi4vRXF1YWxpdHlFeHBsb3JlckNvbG9ycy5qcyc7XHJcbmltcG9ydCBFcXVhbGl0eUV4cGxvcmVyQ29uc3RhbnRzIGZyb20gJy4uL0VxdWFsaXR5RXhwbG9yZXJDb25zdGFudHMuanMnO1xyXG5pbXBvcnQgU25hcHNob3RDb250cm9sLCB7IFNuYXBzaG90Q29udHJvbE9wdGlvbnMgfSBmcm9tICcuL1NuYXBzaG90Q29udHJvbC5qcyc7XHJcbmltcG9ydCBWYXJpYWJsZVZhbHVlc1Zpc2libGVDaGVja2JveCBmcm9tICcuL1ZhcmlhYmxlVmFsdWVzVmlzaWJsZUNoZWNrYm94LmpzJztcclxuaW1wb3J0IFNuYXBzaG90IGZyb20gJy4uL21vZGVsL1NuYXBzaG90LmpzJztcclxuaW1wb3J0IEVxdWFsaXR5RXhwbG9yZXJTY2VuZSBmcm9tICcuLi9tb2RlbC9FcXVhbGl0eUV4cGxvcmVyU2NlbmUuanMnO1xyXG5pbXBvcnQgUHJvcGVydHkgZnJvbSAnLi4vLi4vLi4vLi4vYXhvbi9qcy9Qcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCB7IGNvbWJpbmVPcHRpb25zLCBvcHRpb25pemU0IH0gZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL29wdGlvbml6ZS5qcyc7XHJcbmltcG9ydCBTdHJpY3RPbWl0IGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy90eXBlcy9TdHJpY3RPbWl0LmpzJztcclxuaW1wb3J0IERlcml2ZWRQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL0Rlcml2ZWRQcm9wZXJ0eS5qcyc7XHJcbmltcG9ydCBQaWNrUmVxdWlyZWQgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL3R5cGVzL1BpY2tSZXF1aXJlZC5qcyc7XHJcblxyXG50eXBlIFNlbGZPcHRpb25zID0ge1xyXG5cclxuICAvLyB0aGlzIGFjY29yZGlvbiBib3ggaXMgZGVzaWduZWQgdG8gYmUgYSBmaXhlZCB3aWR0aCwgcmVnYXJkbGVzcyBvZiBpdHMgY29udGVudFxyXG4gIGZpeGVkV2lkdGg/OiBudW1iZXI7XHJcblxyXG4gIC8vIHdoZXRoZXIgdmFyaWFibGUgdmFsdWVzIGFyZSB2aXNpYmxlIGluIHNuYXBzaG90cywgbnVsbCBpZiB0aGUgZmVhdHVyZSBpcyBub3Qgc3VwcG9ydGVkXHJcbiAgdmFyaWFibGVWYWx1ZXNWaXNpYmxlUHJvcGVydHk/OiBQcm9wZXJ0eTxib29sZWFuPiB8IG51bGw7XHJcblxyXG4gIC8vIG9wdGlvbnMgcGFzc2VkIHRvIFNuYXBzaG90Q29udHJvbFxyXG4gIHNuYXBzaG90Q29udHJvbE9wdGlvbnM/OiBTdHJpY3RPbWl0PFNuYXBzaG90Q29udHJvbE9wdGlvbnMsICd0YW5kZW0nPjtcclxufTtcclxuXHJcbnR5cGUgU25hcHNob3RzQWNjb3JkaW9uQm94T3B0aW9ucyA9IFNlbGZPcHRpb25zICYgTm9kZVRyYW5zbGF0aW9uT3B0aW9ucyAmXHJcbiAgUGlja1JlcXVpcmVkPEFjY29yZGlvbkJveE9wdGlvbnMsICdleHBhbmRlZFByb3BlcnR5JyB8ICd0YW5kZW0nPjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNuYXBzaG90c0FjY29yZGlvbkJveCBleHRlbmRzIEFjY29yZGlvbkJveCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBzY2VuZSAtIHRoZSBzY2VuZSB0aGF0IHdlJ2xsIGJlIHRha2luZyBzbmFwc2hvdHMgb2ZcclxuICAgKiBAcGFyYW0gW3Byb3ZpZGVkT3B0aW9uc11cclxuICAgKi9cclxuICBwdWJsaWMgY29uc3RydWN0b3IoIHNjZW5lOiBFcXVhbGl0eUV4cGxvcmVyU2NlbmUsIHByb3ZpZGVkT3B0aW9uczogU25hcHNob3RzQWNjb3JkaW9uQm94T3B0aW9ucyApIHtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0gb3B0aW9uaXplNDxTbmFwc2hvdHNBY2NvcmRpb25Cb3hPcHRpb25zLCBTZWxmT3B0aW9ucywgQWNjb3JkaW9uQm94T3B0aW9ucz4oKSgge30sXHJcbiAgICAgIEVxdWFsaXR5RXhwbG9yZXJDb25zdGFudHMuQUNDT1JESU9OX0JPWF9PUFRJT05TLCB7XHJcblxyXG4gICAgICAgIC8vIFNlbGZPcHRpb25zXHJcbiAgICAgICAgZml4ZWRXaWR0aDogMTAwLFxyXG4gICAgICAgIHZhcmlhYmxlVmFsdWVzVmlzaWJsZVByb3BlcnR5OiBudWxsLFxyXG4gICAgICAgIHNuYXBzaG90Q29udHJvbE9wdGlvbnM6IHtcclxuICAgICAgICAgIGNvbnRyb2xIZWlnaHQ6IDUwLFxyXG4gICAgICAgICAgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyxcclxuICAgICAgICAgIGNvbW1hU2VwYXJhdGVkOiB0cnVlLFxyXG4gICAgICAgICAgdmFyaWFibGVWYWx1ZXNPcGFjaXR5OiAxXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gQWNjb3JkaW9uQm94T3B0aW9uc1xyXG4gICAgICAgIGNvbnRlbnRYTWFyZ2luOiAxMCxcclxuICAgICAgICBjb250ZW50WU1hcmdpbjogMTAsXHJcbiAgICAgICAgY29udGVudFlTcGFjaW5nOiAzXHJcbiAgICAgIH0sIHByb3ZpZGVkT3B0aW9ucyApO1xyXG5cclxuICAgIGFzc2VydCAmJiBhc3NlcnQoICEoIG9wdGlvbnMudmFyaWFibGVWYWx1ZXNWaXNpYmxlUHJvcGVydHkgJiYgIXNjZW5lLnZhcmlhYmxlcyApLFxyXG4gICAgICAnc2NlbmUgaGFzIG5vIHZhcmlhYmxlcyB0byBzaG93IGluIHNuYXBzaG90cycgKTtcclxuXHJcbiAgICBvcHRpb25zLm1heFdpZHRoID0gb3B0aW9ucy5maXhlZFdpZHRoO1xyXG5cclxuICAgIGNvbnN0IGNvbnRlbnRXaWR0aCA9IG9wdGlvbnMuZml4ZWRXaWR0aCAtICggMiAqIG9wdGlvbnMuY29udGVudFhNYXJnaW4gKTtcclxuXHJcbiAgICAvLyB0aXRsZVxyXG4gICAgb3B0aW9ucy50aXRsZU5vZGUgPSBuZXcgVGV4dCggRXF1YWxpdHlFeHBsb3JlclN0cmluZ3Muc25hcHNob3RzU3RyaW5nUHJvcGVydHksIHtcclxuICAgICAgZm9udDogRXF1YWxpdHlFeHBsb3JlckNvbnN0YW50cy5BQ0NPUkRJT05fQk9YX1RJVExFX0ZPTlQsXHJcbiAgICAgIG1heFdpZHRoOiAwLjg1ICogY29udGVudFdpZHRoLFxyXG4gICAgICB0YW5kZW06IG9wdGlvbnMudGFuZGVtLmNyZWF0ZVRhbmRlbSggJ3RpdGxlVGV4dCcgKVxyXG4gICAgfSApO1xyXG5cclxuICAgIC8vIENyZWF0ZSBhIHJvdyBmb3IgZWFjaCBzbmFwc2hvdFxyXG4gICAgY29uc3Qgc25hcHNob3RDb250cm9scyA9IFtdO1xyXG4gICAgZm9yICggbGV0IGkgPSAwOyBpIDwgc2NlbmUuc25hcHNob3RzQ29sbGVjdGlvbi5zbmFwc2hvdFByb3BlcnRpZXMubGVuZ3RoOyBpKysgKSB7XHJcblxyXG4gICAgICBjb25zdCBzbmFwc2hvdENvbnRyb2wgPSBuZXcgU25hcHNob3RDb250cm9sKCBzY2VuZSwgc2NlbmUuc25hcHNob3RzQ29sbGVjdGlvbi5zbmFwc2hvdFByb3BlcnRpZXNbIGkgXSxcclxuICAgICAgICBzY2VuZS5zbmFwc2hvdHNDb2xsZWN0aW9uLnNlbGVjdGVkU25hcHNob3RQcm9wZXJ0eSwgY29tYmluZU9wdGlvbnM8U25hcHNob3RDb250cm9sT3B0aW9ucz4oXHJcbiAgICAgICAgICB7fSwgb3B0aW9ucy5zbmFwc2hvdENvbnRyb2xPcHRpb25zLCB7XHJcbiAgICAgICAgICB2YXJpYWJsZVZhbHVlc1Zpc2libGVQcm9wZXJ0eTogb3B0aW9ucy52YXJpYWJsZVZhbHVlc1Zpc2libGVQcm9wZXJ0eSxcclxuICAgICAgICAgIGNvbnRyb2xXaWR0aDogY29udGVudFdpZHRoLFxyXG4gICAgICAgICAgdGFuZGVtOiBvcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICdzbmFwc2hvdENvbnRyb2xzJyApLmNyZWF0ZVRhbmRlbSggYHNuYXBzaG90Q29udHJvbCR7aX1gIClcclxuICAgICAgICB9ICkgKTtcclxuXHJcbiAgICAgIHNuYXBzaG90Q29udHJvbHMucHVzaCggc25hcHNob3RDb250cm9sICk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc25hcHNob3RDb250cm9sc1ZCb3ggPSBuZXcgVkJveCgge1xyXG4gICAgICBzcGFjaW5nOiAxNSxcclxuICAgICAgY2hpbGRyZW46IHNuYXBzaG90Q29udHJvbHNcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyB0cnVlIHdoZW4gYSBzbmFwc2hvdCBpcyBzZWxlY3RlZFxyXG4gICAgY29uc3QgaGFzU2VsZWN0ZWRTbmFwc2hvdFByb3BlcnR5ID0gbmV3IERlcml2ZWRQcm9wZXJ0eShcclxuICAgICAgWyBzY2VuZS5zbmFwc2hvdHNDb2xsZWN0aW9uLnNlbGVjdGVkU25hcHNob3RQcm9wZXJ0eSBdLFxyXG4gICAgICBzZWxlY3RlZFNuYXBzaG90ID0+ICggc2VsZWN0ZWRTbmFwc2hvdCAhPT0gbnVsbCApICk7XHJcblxyXG4gICAgLy8gQnV0dG9uIHRvIHJlc3RvcmUgdGhlIHNlbGVjdGVkIHNuYXBzaG90XHJcbiAgICBjb25zdCByZXN0b3JlSWNvbiA9IG5ldyBQYXRoKCByZXBseVNvbGlkU2hhcGUsIHtcclxuICAgICAgc2NhbGU6IDAuMDQsXHJcbiAgICAgIGZpbGw6ICdibGFjaydcclxuICAgIH0gKTtcclxuICAgIGNvbnN0IHJlc3RvcmVCdXR0b24gPSBuZXcgUmVjdGFuZ3VsYXJQdXNoQnV0dG9uKCB7XHJcbiAgICAgIGNvbnRlbnQ6IHJlc3RvcmVJY29uLFxyXG4gICAgICBiYXNlQ29sb3I6IEVxdWFsaXR5RXhwbG9yZXJDb2xvcnMuU05BUFNIT1RfU0VMRUNURURfU1RST0tFLCAvLyBidXR0b24gY29sb3IgbWF0Y2hlcyBzZWxlY3Rpb24gc3Ryb2tlXHJcbiAgICAgIHhNYXJnaW46IDgsXHJcbiAgICAgIHlNYXJnaW46IDQsXHJcbiAgICAgIHRvdWNoQXJlYVhEaWxhdGlvbjogMTAsXHJcbiAgICAgIHRvdWNoQXJlYVlEaWxhdGlvbjogMTAsXHJcbiAgICAgIGxpc3RlbmVyOiAoKSA9PiBzY2VuZS5zbmFwc2hvdHNDb2xsZWN0aW9uLnJlc3RvcmVTZWxlY3RlZFNuYXBzaG90KCksXHJcbiAgICAgIGVuYWJsZWRQcm9wZXJ0eTogaGFzU2VsZWN0ZWRTbmFwc2hvdFByb3BlcnR5LFxyXG4gICAgICB0YW5kZW06IG9wdGlvbnMudGFuZGVtLmNyZWF0ZVRhbmRlbSggJ3Jlc3RvcmVCdXR0b24nIClcclxuICAgIH0gKTtcclxuXHJcbiAgICAvLyBCdXR0b24gdG8gZGVsZXRlICh0cmFzaCkgdGhlIHNlbGVjdGVkIHNuYXBzaG90XHJcbiAgICBjb25zdCB0cmFzaEJ1dHRvbiA9IG5ldyBUcmFzaEJ1dHRvbigge1xyXG4gICAgICBpY29uT3B0aW9uczogeyBzY2FsZTogMC4wMzQgfSxcclxuICAgICAgYmFzZUNvbG9yOiAnd2hpdGUnLFxyXG4gICAgICB4TWFyZ2luOiAxMixcclxuICAgICAgeU1hcmdpbjogNSxcclxuICAgICAgdG91Y2hBcmVhWERpbGF0aW9uOiA1LFxyXG4gICAgICB0b3VjaEFyZWFZRGlsYXRpb246IDUsXHJcbiAgICAgIGxpc3RlbmVyOiAoKSA9PiBzY2VuZS5zbmFwc2hvdHNDb2xsZWN0aW9uLmRlbGV0ZVNlbGVjdGVkU25hcHNob3QoKSxcclxuICAgICAgZW5hYmxlZFByb3BlcnR5OiBoYXNTZWxlY3RlZFNuYXBzaG90UHJvcGVydHksXHJcbiAgICAgIHRhbmRlbTogb3B0aW9ucy50YW5kZW0uY3JlYXRlVGFuZGVtKCAndHJhc2hCdXR0b24nIClcclxuICAgIH0gKTtcclxuXHJcbiAgICBjb25zdCBoQm94Q2hpbGRyZW46IE5vZGVbXSA9IFsgcmVzdG9yZUJ1dHRvbiwgdHJhc2hCdXR0b24gXTtcclxuXHJcbiAgICAvLyBDaGVja2JveCBmb3IgbWFraW5nIHZhcmlhYmxlIHZhbHVlcyB2aXNpYmxlLlxyXG4gICAgaWYgKCBvcHRpb25zLnZhcmlhYmxlVmFsdWVzVmlzaWJsZVByb3BlcnR5ICkge1xyXG4gICAgICBjb25zdCB2YXJpYWJsZXMgPSBzY2VuZS52YXJpYWJsZXMhO1xyXG4gICAgICBhc3NlcnQgJiYgYXNzZXJ0KCB2YXJpYWJsZXMgKTtcclxuICAgICAgaEJveENoaWxkcmVuLnB1c2goIG5ldyBWYXJpYWJsZVZhbHVlc1Zpc2libGVDaGVja2JveCggb3B0aW9ucy52YXJpYWJsZVZhbHVlc1Zpc2libGVQcm9wZXJ0eSwgdmFyaWFibGVzLCB7XHJcbiAgICAgICAgdG91Y2hBcmVhWERpbGF0aW9uOiA1LFxyXG4gICAgICAgIHRvdWNoQXJlYVlEaWxhdGlvbjogNSxcclxuICAgICAgICB0YW5kZW06IG9wdGlvbnMudGFuZGVtLmNyZWF0ZVRhbmRlbSggJ3ZhcmlhYmxlVmFsdWVzVmlzaWJsZUNoZWNrYm94JyApXHJcbiAgICAgIH0gKSApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGhCb3ggPSBuZXcgSEJveCgge1xyXG4gICAgICBzcGFjaW5nOiA0MCxcclxuICAgICAgY2hpbGRyZW46IGhCb3hDaGlsZHJlbixcclxuICAgICAgbWF4V2lkdGg6IGNvbnRlbnRXaWR0aFxyXG4gICAgfSApO1xyXG5cclxuICAgIGNvbnN0IGNvbnRlbnQgPSBuZXcgVkJveCgge1xyXG4gICAgICBzcGFjaW5nOiAxMCxcclxuICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICBzbmFwc2hvdENvbnRyb2xzVkJveCxcclxuICAgICAgICBuZXcgSFNlcGFyYXRvciggeyBzdHJva2U6ICdyZ2IoIDIwMCwgMjAwLCAyMDAgKScgfSApLFxyXG4gICAgICAgIGhCb3hcclxuICAgICAgXVxyXG4gICAgfSApO1xyXG5cclxuICAgIHN1cGVyKCBjb250ZW50LCBvcHRpb25zICk7XHJcblxyXG4gICAgLy8gQ2xpY2sgb3V0c2lkZSB0aGlzIGFjY29yZGlvbiBib3ggdG8gY2xlYXIgdGhlIHNlbGVjdGVkIHNuYXBzaG90LlxyXG4gICAgY29uc3QgY2xpY2tUb0Rlc2VsZWN0TGlzdGVuZXIgPSB7XHJcbiAgICAgIGRvd246ICggZXZlbnQ6IFByZXNzTGlzdGVuZXJFdmVudCApID0+IHtcclxuICAgICAgICBpZiAoICF0aGlzLnBhcmVudFRvR2xvYmFsQm91bmRzKCB0aGlzLnZpc2libGVCb3VuZHMgKS5jb250YWluc1BvaW50KCBldmVudC5wb2ludGVyLnBvaW50ICkgKSB7XHJcbiAgICAgICAgICBzY2VuZS5zbmFwc2hvdHNDb2xsZWN0aW9uLnNlbGVjdGVkU25hcHNob3RQcm9wZXJ0eS52YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB0YW5kZW06IG9wdGlvbnMudGFuZGVtLmNyZWF0ZVRhbmRlbSggJ2NsaWNrVG9EZXNlbGVjdExpc3RlbmVyJyApXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFJlZ2lzdGVyIGlucHV0IGxpc3RlbmVyIHdpdGggdGhlIERpc3BsYXkgb25seSB3aGVuIHdlIGhhdmUgYSBzZWxlY3RlZCBzbmFwc2hvdC5cclxuICAgIC8vIFRoaXMgdGVjaG5pcXVlIHdhcyBib3Jyb3dlZCBmcm9tIGNpcmN1aXQtY29uc3RydWN0aW9uLWtpdC1jb21tb24uQ2lyY3VpdEVsZW1lbnROb2RlLlxyXG4gICAgLy8gdW5saW5rIG5vdCByZXF1aXJlZC5cclxuICAgIHNjZW5lLnNuYXBzaG90c0NvbGxlY3Rpb24uc2VsZWN0ZWRTbmFwc2hvdFByb3BlcnR5LmxpbmsoXHJcbiAgICAgICggc2VsZWN0ZWRTbmFwc2hvdDogU25hcHNob3QgfCBudWxsLCBvbGRTZWxlY3RlZFNuYXBzaG90OiBTbmFwc2hvdCB8IG51bGwgKSA9PiB7XHJcbiAgICAgICAgaWYgKCBvbGRTZWxlY3RlZFNuYXBzaG90ICkge1xyXG4gICAgICAgICAgcGhldC5qb2lzdC5kaXNwbGF5LnJlbW92ZUlucHV0TGlzdGVuZXIoIGNsaWNrVG9EZXNlbGVjdExpc3RlbmVyICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggc2VsZWN0ZWRTbmFwc2hvdCApIHtcclxuICAgICAgICAgIHBoZXQuam9pc3QuZGlzcGxheS5hZGRJbnB1dExpc3RlbmVyKCBjbGlja1RvRGVzZWxlY3RMaXN0ZW5lciApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG92ZXJyaWRlIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCBmYWxzZSwgJ2Rpc3Bvc2UgaXMgbm90IHN1cHBvcnRlZCwgZXhpc3RzIGZvciB0aGUgbGlmZXRpbWUgb2YgdGhlIHNpbScgKTtcclxuICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICB9XHJcbn1cclxuXHJcbmVxdWFsaXR5RXhwbG9yZXIucmVnaXN0ZXIoICdTbmFwc2hvdHNBY2NvcmRpb25Cb3gnLCBTbmFwc2hvdHNBY2NvcmRpb25Cb3ggKTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsV0FBVyxNQUFNLG9EQUFvRDtBQUM1RSxTQUFTQyxJQUFJLEVBQUVDLFVBQVUsRUFBZ0NDLElBQUksRUFBc0JDLElBQUksRUFBRUMsSUFBSSxRQUFRLG1DQUFtQztBQUN4SSxPQUFPQyxlQUFlLE1BQU0sd0RBQXdEO0FBQ3BGLE9BQU9DLFlBQVksTUFBK0Isb0NBQW9DO0FBQ3RGLE9BQU9DLHFCQUFxQixNQUFNLHFEQUFxRDtBQUN2RixPQUFPQyxnQkFBZ0IsTUFBTSwyQkFBMkI7QUFDeEQsT0FBT0MsdUJBQXVCLE1BQU0sa0NBQWtDO0FBQ3RFLE9BQU9DLHNCQUFzQixNQUFNLDhCQUE4QjtBQUNqRSxPQUFPQyx5QkFBeUIsTUFBTSxpQ0FBaUM7QUFDdkUsT0FBT0MsZUFBZSxNQUFrQyxzQkFBc0I7QUFDOUUsT0FBT0MsNkJBQTZCLE1BQU0sb0NBQW9DO0FBSTlFLFNBQVNDLGNBQWMsRUFBRUMsVUFBVSxRQUFRLHVDQUF1QztBQUVsRixPQUFPQyxlQUFlLE1BQU0sd0NBQXdDO0FBa0JwRSxlQUFlLE1BQU1DLHFCQUFxQixTQUFTWCxZQUFZLENBQUM7RUFFOUQ7QUFDRjtBQUNBO0FBQ0E7RUFDU1ksV0FBV0EsQ0FBRUMsS0FBNEIsRUFBRUMsZUFBNkMsRUFBRztJQUVoRyxNQUFNQyxPQUFPLEdBQUdOLFVBQVUsQ0FBaUUsQ0FBQyxDQUFFLENBQUMsQ0FBQyxFQUM5RkoseUJBQXlCLENBQUNXLHFCQUFxQixFQUFFO01BRS9DO01BQ0FDLFVBQVUsRUFBRSxHQUFHO01BQ2ZDLDZCQUE2QixFQUFFLElBQUk7TUFDbkNDLHNCQUFzQixFQUFFO1FBQ3RCQyxhQUFhLEVBQUUsRUFBRTtRQUNqQkMsV0FBVyxFQUFFLFlBQVk7UUFDekJDLGNBQWMsRUFBRSxJQUFJO1FBQ3BCQyxx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