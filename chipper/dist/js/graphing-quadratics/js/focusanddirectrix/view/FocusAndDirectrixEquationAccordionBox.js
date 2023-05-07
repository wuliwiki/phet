// Copyright 2018-2023, University of Colorado Boulder

/**
 * Equation accordion box in the 'Focus & Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import GQEquationAccordionBox from '../../common/view/GQEquationAccordionBox.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import FocusAndDirectrixEquationNode from './FocusAndDirectrixEquationNode.js';
import FocusAndDirectrixInteractiveEquationNode from './FocusAndDirectrixInteractiveEquationNode.js';
export default class FocusAndDirectrixEquationAccordionBox extends GQEquationAccordionBox {
  constructor(model, providedOptions) {
    const options = optionize()({
      // GQEquationAccordionBoxOptions
      titleNode: new FocusAndDirectrixEquationNode(providedOptions.tandem.createTandem('titleText')),
      phetioDocumentation: 'accordion box that contains the interactive equation'
    }, providedOptions);
    const interactiveEquationNode = new FocusAndDirectrixInteractiveEquationNode(model.pProperty, model.hProperty, model.kProperty, options.tandem.createTandem('interactiveEquationNode'));
    super(model, interactiveEquationNode, options);
  }
}
graphingQuadratics.register('FocusAndDirectrixEquationAccordionBox', FocusAndDirectrixEquationAccordionBox);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcHRpb25pemUiLCJHUUVxdWF0aW9uQWNjb3JkaW9uQm94IiwiZ3JhcGhpbmdRdWFkcmF0aWNzIiwiRm9jdXNBbmREaXJlY3RyaXhFcXVhdGlvbk5vZGUiLCJGb2N1c0FuZERpcmVjdHJpeEludGVyYWN0aXZlRXF1YXRpb25Ob2RlIiwiRm9jdXNBbmREaXJlY3RyaXhFcXVhdGlvbkFjY29yZGlvbkJveCIsImNvbnN0cnVjdG9yIiwibW9kZWwiLCJwcm92aWRlZE9wdGlvbnMiLCJvcHRpb25zIiwidGl0bGVOb2RlIiwidGFuZGVtIiwiY3JlYXRlVGFuZGVtIiwicGhldGlvRG9jdW1lbnRhdGlvbiIsImludGVyYWN0aXZlRXF1YXRpb25Ob2RlIiwicFByb3BlcnR5IiwiaFByb3BlcnR5Iiwia1Byb3BlcnR5IiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJGb2N1c0FuZERpcmVjdHJpeEVxdWF0aW9uQWNjb3JkaW9uQm94LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIEVxdWF0aW9uIGFjY29yZGlvbiBib3ggaW4gdGhlICdGb2N1cyAmIERpcmVjdHJpeCcgc2NyZWVuLlxyXG4gKlxyXG4gKiBAYXV0aG9yIENocmlzIE1hbGxleSAoUGl4ZWxab29tLCBJbmMuKVxyXG4gKi9cclxuXHJcbmltcG9ydCBvcHRpb25pemUsIHsgRW1wdHlTZWxmT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy9vcHRpb25pemUuanMnO1xyXG5pbXBvcnQgUGlja1JlcXVpcmVkIGZyb20gJy4uLy4uLy4uLy4uL3BoZXQtY29yZS9qcy90eXBlcy9QaWNrUmVxdWlyZWQuanMnO1xyXG5pbXBvcnQgR1FFcXVhdGlvbkFjY29yZGlvbkJveCwgeyBHUUVxdWF0aW9uQWNjb3JkaW9uQm94T3B0aW9ucyB9IGZyb20gJy4uLy4uL2NvbW1vbi92aWV3L0dRRXF1YXRpb25BY2NvcmRpb25Cb3guanMnO1xyXG5pbXBvcnQgZ3JhcGhpbmdRdWFkcmF0aWNzIGZyb20gJy4uLy4uL2dyYXBoaW5nUXVhZHJhdGljcy5qcyc7XHJcbmltcG9ydCBGb2N1c0FuZERpcmVjdHJpeEVxdWF0aW9uTm9kZSBmcm9tICcuL0ZvY3VzQW5kRGlyZWN0cml4RXF1YXRpb25Ob2RlLmpzJztcclxuaW1wb3J0IEZvY3VzQW5kRGlyZWN0cml4SW50ZXJhY3RpdmVFcXVhdGlvbk5vZGUgZnJvbSAnLi9Gb2N1c0FuZERpcmVjdHJpeEludGVyYWN0aXZlRXF1YXRpb25Ob2RlLmpzJztcclxuaW1wb3J0IEZvY3VzQW5kRGlyZWN0cml4TW9kZWwgZnJvbSAnLi4vbW9kZWwvRm9jdXNBbmREaXJlY3RyaXhNb2RlbC5qcyc7XHJcblxyXG50eXBlIFNlbGZPcHRpb25zID0gRW1wdHlTZWxmT3B0aW9ucztcclxuXHJcbnR5cGUgRm9jdXNBbmREaXJlY3RyaXhFcXVhdGlvbkFjY29yZGlvbkJveE9wdGlvbnMgPSBTZWxmT3B0aW9ucyAmXHJcbiAgUGlja1JlcXVpcmVkPEdRRXF1YXRpb25BY2NvcmRpb25Cb3hPcHRpb25zLCAndGFuZGVtJyB8ICdleHBhbmRlZFByb3BlcnR5Jz47XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb2N1c0FuZERpcmVjdHJpeEVxdWF0aW9uQWNjb3JkaW9uQm94IGV4dGVuZHMgR1FFcXVhdGlvbkFjY29yZGlvbkJveCB7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggbW9kZWw6IEZvY3VzQW5kRGlyZWN0cml4TW9kZWwsIHByb3ZpZGVkT3B0aW9uczogRm9jdXNBbmREaXJlY3RyaXhFcXVhdGlvbkFjY29yZGlvbkJveE9wdGlvbnMgKSB7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbml6ZTxGb2N1c0FuZERpcmVjdHJpeEVxdWF0aW9uQWNjb3JkaW9uQm94T3B0aW9ucywgU2VsZk9wdGlvbnMsIEdRRXF1YXRpb25BY2NvcmRpb25Cb3hPcHRpb25zPigpKCB7XHJcblxyXG4gICAgICAvLyBHUUVxdWF0aW9uQWNjb3JkaW9uQm94T3B0aW9uc1xyXG4gICAgICB0aXRsZU5vZGU6IG5ldyBGb2N1c0FuZERpcmVjdHJpeEVxdWF0aW9uTm9kZSggcHJvdmlkZWRPcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICd0aXRsZVRleHQnICkgKSxcclxuICAgICAgcGhldGlvRG9jdW1lbnRhdGlvbjogJ2FjY29yZGlvbiBib3ggdGhhdCBjb250YWlucyB0aGUgaW50ZXJhY3RpdmUgZXF1YXRpb24nXHJcbiAgICB9LCBwcm92aWRlZE9wdGlvbnMgKTtcclxuXHJcbiAgICBjb25zdCBpbnRlcmFjdGl2ZUVxdWF0aW9uTm9kZSA9IG5ldyBGb2N1c0FuZERpcmVjdHJpeEludGVyYWN0aXZlRXF1YXRpb25Ob2RlKFxyXG4gICAgICBtb2RlbC5wUHJvcGVydHksIG1vZGVsLmhQcm9wZXJ0eSwgbW9kZWwua1Byb3BlcnR5LCBvcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICdpbnRlcmFjdGl2ZUVxdWF0aW9uTm9kZScgKSApO1xyXG5cclxuICAgIHN1cGVyKCBtb2RlbCwgaW50ZXJhY3RpdmVFcXVhdGlvbk5vZGUsIG9wdGlvbnMgKTtcclxuICB9XHJcbn1cclxuXHJcbmdyYXBoaW5nUXVhZHJhdGljcy5yZWdpc3RlciggJ0ZvY3VzQW5kRGlyZWN0cml4RXF1YXRpb25BY2NvcmRpb25Cb3gnLCBGb2N1c0FuZERpcmVjdHJpeEVxdWF0aW9uQWNjb3JkaW9uQm94ICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLFNBQVMsTUFBNEIsdUNBQXVDO0FBRW5GLE9BQU9DLHNCQUFzQixNQUF5Qyw2Q0FBNkM7QUFDbkgsT0FBT0Msa0JBQWtCLE1BQU0sNkJBQTZCO0FBQzVELE9BQU9DLDZCQUE2QixNQUFNLG9DQUFvQztBQUM5RSxPQUFPQyx3Q0FBd0MsTUFBTSwrQ0FBK0M7QUFRcEcsZUFBZSxNQUFNQyxxQ0FBcUMsU0FBU0osc0JBQXNCLENBQUM7RUFFakZLLFdBQVdBLENBQUVDLEtBQTZCLEVBQUVDLGVBQTZELEVBQUc7SUFFakgsTUFBTUMsT0FBTyxHQUFHVCxTQUFTLENBQTJGLENBQUMsQ0FBRTtNQUVySDtNQUNBVSxTQUFTLEVBQUUsSUFBSVAsNkJBQTZCLENBQUVLLGVBQWUsQ0FBQ0csTUFBTSxDQUFDQyxZQUFZLENBQUUsV0FBWSxDQUFFLENBQUM7TUFDbEdDLG1CQUFtQixFQUFFO0lBQ3ZCLENBQUMsRUFBRUwsZUFBZ0IsQ0FBQztJQUVwQixNQUFNTSx1QkFBdUIsR0FBRyxJQUFJVix3Q0FBd0MsQ0FDMUVHLEtBQUssQ0FBQ1EsU0FBUyxFQUFFUixLQUFLLENBQUNTLFNBQVMsRUFBRVQsS0FBSyxDQUFDVSxTQUFTLEVBQUVSLE9BQU8sQ0FBQ0UsTUFBTSxDQUFDQyxZQUFZLENBQUUseUJBQTBCLENBQUUsQ0FBQztJQUUvRyxLQUFLLENBQUVMLEtBQUssRUFBRU8sdUJBQXVCLEVBQUVMLE9BQVEsQ0FBQztFQUNsRDtBQUNGO0FBRUFQLGtCQUFrQixDQUFDZ0IsUUFBUSxDQUFFLHVDQUF1QyxFQUFFYixxQ0FBc0MsQ0FBQyJ9