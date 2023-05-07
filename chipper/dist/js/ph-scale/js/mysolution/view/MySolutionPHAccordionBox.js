// Copyright 2022-2023, University of Colorado Boulder

/**
 * MySolutionPHAccordionBox is the pH accordion box (aka meter) for the 'My Solution' screen.
 * It allows the user to change the pH via a spinner.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PHAccordionBox from '../../common/view/PHAccordionBox.js';
import phScale from '../../phScale.js';
import { PHSpinnerNode } from './PHSpinnerNode.js';
export default class MySolutionPHAccordionBox extends PHAccordionBox {
  /**
   * @param pHProperty - pH of the solution
   * @param probeYOffset - distance from top of meter to tip of probe, in view coordinate frame
   * @param [providedOptions]
   */
  constructor(pHProperty, probeYOffset, providedOptions) {
    const contentNode = new PHSpinnerNode(pHProperty, {
      tandem: providedOptions.tandem.createTandem('spinner')
    });
    super(contentNode, probeYOffset, providedOptions);
    this.addLinkedElement(pHProperty, {
      tandem: providedOptions.tandem.createTandem(pHProperty.tandem.name)
    });
  }
}
phScale.register('MySolutionPHAccordionBox', MySolutionPHAccordionBox);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQSEFjY29yZGlvbkJveCIsInBoU2NhbGUiLCJQSFNwaW5uZXJOb2RlIiwiTXlTb2x1dGlvblBIQWNjb3JkaW9uQm94IiwiY29uc3RydWN0b3IiLCJwSFByb3BlcnR5IiwicHJvYmVZT2Zmc2V0IiwicHJvdmlkZWRPcHRpb25zIiwiY29udGVudE5vZGUiLCJ0YW5kZW0iLCJjcmVhdGVUYW5kZW0iLCJhZGRMaW5rZWRFbGVtZW50IiwibmFtZSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiTXlTb2x1dGlvblBIQWNjb3JkaW9uQm94LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDIyLTIwMjMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIE15U29sdXRpb25QSEFjY29yZGlvbkJveCBpcyB0aGUgcEggYWNjb3JkaW9uIGJveCAoYWthIG1ldGVyKSBmb3IgdGhlICdNeSBTb2x1dGlvbicgc2NyZWVuLlxyXG4gKiBJdCBhbGxvd3MgdGhlIHVzZXIgdG8gY2hhbmdlIHRoZSBwSCB2aWEgYSBzcGlubmVyLlxyXG4gKlxyXG4gKiBAYXV0aG9yIENocmlzIE1hbGxleSAoUGl4ZWxab29tLCBJbmMuKVxyXG4gKi9cclxuXHJcbmltcG9ydCBQSEFjY29yZGlvbkJveCwgeyBQSEFjY29yZGlvbkJveE9wdGlvbnMgfSBmcm9tICcuLi8uLi9jb21tb24vdmlldy9QSEFjY29yZGlvbkJveC5qcyc7XHJcbmltcG9ydCBwaFNjYWxlIGZyb20gJy4uLy4uL3BoU2NhbGUuanMnO1xyXG5pbXBvcnQgeyBFbXB0eVNlbGZPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL29wdGlvbml6ZS5qcyc7XHJcbmltcG9ydCBQaWNrUmVxdWlyZWQgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL3R5cGVzL1BpY2tSZXF1aXJlZC5qcyc7XHJcbmltcG9ydCBQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL1Byb3BlcnR5LmpzJztcclxuaW1wb3J0IHsgUEhTcGlubmVyTm9kZSB9IGZyb20gJy4vUEhTcGlubmVyTm9kZS5qcyc7XHJcblxyXG50eXBlIFNlbGZPcHRpb25zID0gRW1wdHlTZWxmT3B0aW9ucztcclxuXHJcbnR5cGUgTXlTb2x1dGlvblBIQWNjb3JkaW9uQm94T3B0aW9ucyA9IFNlbGZPcHRpb25zICYgUGlja1JlcXVpcmVkPFBIQWNjb3JkaW9uQm94T3B0aW9ucywgJ3RhbmRlbSc+O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlTb2x1dGlvblBIQWNjb3JkaW9uQm94IGV4dGVuZHMgUEhBY2NvcmRpb25Cb3gge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gcEhQcm9wZXJ0eSAtIHBIIG9mIHRoZSBzb2x1dGlvblxyXG4gICAqIEBwYXJhbSBwcm9iZVlPZmZzZXQgLSBkaXN0YW5jZSBmcm9tIHRvcCBvZiBtZXRlciB0byB0aXAgb2YgcHJvYmUsIGluIHZpZXcgY29vcmRpbmF0ZSBmcmFtZVxyXG4gICAqIEBwYXJhbSBbcHJvdmlkZWRPcHRpb25zXVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggcEhQcm9wZXJ0eTogUHJvcGVydHk8bnVtYmVyPiwgcHJvYmVZT2Zmc2V0OiBudW1iZXIsIHByb3ZpZGVkT3B0aW9uczogTXlTb2x1dGlvblBIQWNjb3JkaW9uQm94T3B0aW9ucyApIHtcclxuXHJcbiAgICBjb25zdCBjb250ZW50Tm9kZSA9IG5ldyBQSFNwaW5uZXJOb2RlKCBwSFByb3BlcnR5LCB7XHJcbiAgICAgIHRhbmRlbTogcHJvdmlkZWRPcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICdzcGlubmVyJyApXHJcbiAgICB9ICk7XHJcblxyXG4gICAgc3VwZXIoIGNvbnRlbnROb2RlLCBwcm9iZVlPZmZzZXQsIHByb3ZpZGVkT3B0aW9ucyApO1xyXG5cclxuICAgIHRoaXMuYWRkTGlua2VkRWxlbWVudCggcEhQcm9wZXJ0eSwge1xyXG4gICAgICB0YW5kZW06IHByb3ZpZGVkT3B0aW9ucy50YW5kZW0uY3JlYXRlVGFuZGVtKCBwSFByb3BlcnR5LnRhbmRlbS5uYW1lIClcclxuICAgIH0gKTtcclxuICB9XHJcbn1cclxuXHJcbnBoU2NhbGUucmVnaXN0ZXIoICdNeVNvbHV0aW9uUEhBY2NvcmRpb25Cb3gnLCBNeVNvbHV0aW9uUEhBY2NvcmRpb25Cb3ggKTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxjQUFjLE1BQWlDLHFDQUFxQztBQUMzRixPQUFPQyxPQUFPLE1BQU0sa0JBQWtCO0FBSXRDLFNBQVNDLGFBQWEsUUFBUSxvQkFBb0I7QUFNbEQsZUFBZSxNQUFNQyx3QkFBd0IsU0FBU0gsY0FBYyxDQUFDO0VBRW5FO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7RUFDU0ksV0FBV0EsQ0FBRUMsVUFBNEIsRUFBRUMsWUFBb0IsRUFBRUMsZUFBZ0QsRUFBRztJQUV6SCxNQUFNQyxXQUFXLEdBQUcsSUFBSU4sYUFBYSxDQUFFRyxVQUFVLEVBQUU7TUFDakRJLE1BQU0sRUFBRUYsZUFBZSxDQUFDRSxNQUFNLENBQUNDLFlBQVksQ0FBRSxTQUFVO0lBQ3pELENBQUUsQ0FBQztJQUVILEtBQUssQ0FBRUYsV0FBVyxFQUFFRixZQUFZLEVBQUVDLGVBQWdCLENBQUM7SUFFbkQsSUFBSSxDQUFDSSxnQkFBZ0IsQ0FBRU4sVUFBVSxFQUFFO01BQ2pDSSxNQUFNLEVBQUVGLGVBQWUsQ0FBQ0UsTUFBTSxDQUFDQyxZQUFZLENBQUVMLFVBQVUsQ0FBQ0ksTUFBTSxDQUFDRyxJQUFLO0lBQ3RFLENBQUUsQ0FBQztFQUNMO0FBQ0Y7QUFFQVgsT0FBTyxDQUFDWSxRQUFRLENBQUUsMEJBQTBCLEVBQUVWLHdCQUF5QixDQUFDIn0=