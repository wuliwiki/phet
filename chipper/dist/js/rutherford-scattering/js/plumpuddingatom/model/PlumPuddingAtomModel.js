// Copyright 2016-2021, University of Colorado Boulder

/**
 * Model for the 'Plum Pudding Atom' screen.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Property from '../../../../axon/js/Property.js';
import RSBaseModel from '../../common/model/RSBaseModel.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import PlumPuddingAtomSpace from './PlumPuddingAtomSpace.js';
class PlumPuddingAtomModel extends RSBaseModel {
  constructor() {
    // a property to track user interaction - only one element will change this in this screen,
    // so a DerivedProperty is not necessary as in RutherfordAtomModel
    const userInteractionProperty = new Property(false);
    super(userInteractionProperty);

    // @public (read-only) - space containing the atom
    this.plumPuddingSpace = new PlumPuddingAtomSpace(this.protonCountProperty, this.bounds);

    // @public (read-only)
    this.atomSpaces = [this.plumPuddingSpace];
  }
}
rutherfordScattering.register('PlumPuddingAtomModel', PlumPuddingAtomModel);
export default PlumPuddingAtomModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQcm9wZXJ0eSIsIlJTQmFzZU1vZGVsIiwicnV0aGVyZm9yZFNjYXR0ZXJpbmciLCJQbHVtUHVkZGluZ0F0b21TcGFjZSIsIlBsdW1QdWRkaW5nQXRvbU1vZGVsIiwiY29uc3RydWN0b3IiLCJ1c2VySW50ZXJhY3Rpb25Qcm9wZXJ0eSIsInBsdW1QdWRkaW5nU3BhY2UiLCJwcm90b25Db3VudFByb3BlcnR5IiwiYm91bmRzIiwiYXRvbVNwYWNlcyIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiUGx1bVB1ZGRpbmdBdG9tTW9kZWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTYtMjAyMSwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogTW9kZWwgZm9yIHRoZSAnUGx1bSBQdWRkaW5nIEF0b20nIHNjcmVlbi5cclxuICpcclxuICogQGF1dGhvciBEYXZlIFNjaG1pdHogKFNjaG1pdHp3YXJlKVxyXG4gKi9cclxuXHJcbmltcG9ydCBQcm9wZXJ0eSBmcm9tICcuLi8uLi8uLi8uLi9heG9uL2pzL1Byb3BlcnR5LmpzJztcclxuaW1wb3J0IFJTQmFzZU1vZGVsIGZyb20gJy4uLy4uL2NvbW1vbi9tb2RlbC9SU0Jhc2VNb2RlbC5qcyc7XHJcbmltcG9ydCBydXRoZXJmb3JkU2NhdHRlcmluZyBmcm9tICcuLi8uLi9ydXRoZXJmb3JkU2NhdHRlcmluZy5qcyc7XHJcbmltcG9ydCBQbHVtUHVkZGluZ0F0b21TcGFjZSBmcm9tICcuL1BsdW1QdWRkaW5nQXRvbVNwYWNlLmpzJztcclxuXHJcbmNsYXNzIFBsdW1QdWRkaW5nQXRvbU1vZGVsIGV4dGVuZHMgUlNCYXNlTW9kZWwge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIC8vIGEgcHJvcGVydHkgdG8gdHJhY2sgdXNlciBpbnRlcmFjdGlvbiAtIG9ubHkgb25lIGVsZW1lbnQgd2lsbCBjaGFuZ2UgdGhpcyBpbiB0aGlzIHNjcmVlbixcclxuICAgIC8vIHNvIGEgRGVyaXZlZFByb3BlcnR5IGlzIG5vdCBuZWNlc3NhcnkgYXMgaW4gUnV0aGVyZm9yZEF0b21Nb2RlbFxyXG4gICAgY29uc3QgdXNlckludGVyYWN0aW9uUHJvcGVydHkgPSBuZXcgUHJvcGVydHkoIGZhbHNlICk7XHJcblxyXG4gICAgc3VwZXIoIHVzZXJJbnRlcmFjdGlvblByb3BlcnR5ICk7XHJcblxyXG4gICAgLy8gQHB1YmxpYyAocmVhZC1vbmx5KSAtIHNwYWNlIGNvbnRhaW5pbmcgdGhlIGF0b21cclxuICAgIHRoaXMucGx1bVB1ZGRpbmdTcGFjZSA9IG5ldyBQbHVtUHVkZGluZ0F0b21TcGFjZSggdGhpcy5wcm90b25Db3VudFByb3BlcnR5LCB0aGlzLmJvdW5kcyApO1xyXG5cclxuICAgIC8vIEBwdWJsaWMgKHJlYWQtb25seSlcclxuICAgIHRoaXMuYXRvbVNwYWNlcyA9IFsgdGhpcy5wbHVtUHVkZGluZ1NwYWNlIF07XHJcblxyXG4gIH1cclxufVxyXG5cclxucnV0aGVyZm9yZFNjYXR0ZXJpbmcucmVnaXN0ZXIoICdQbHVtUHVkZGluZ0F0b21Nb2RlbCcsIFBsdW1QdWRkaW5nQXRvbU1vZGVsICk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbHVtUHVkZGluZ0F0b21Nb2RlbDsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsUUFBUSxNQUFNLGlDQUFpQztBQUN0RCxPQUFPQyxXQUFXLE1BQU0sbUNBQW1DO0FBQzNELE9BQU9DLG9CQUFvQixNQUFNLCtCQUErQjtBQUNoRSxPQUFPQyxvQkFBb0IsTUFBTSwyQkFBMkI7QUFFNUQsTUFBTUMsb0JBQW9CLFNBQVNILFdBQVcsQ0FBQztFQUM3Q0ksV0FBV0EsQ0FBQSxFQUFHO0lBRVo7SUFDQTtJQUNBLE1BQU1DLHVCQUF1QixHQUFHLElBQUlOLFFBQVEsQ0FBRSxLQUFNLENBQUM7SUFFckQsS0FBSyxDQUFFTSx1QkFBd0IsQ0FBQzs7SUFFaEM7SUFDQSxJQUFJLENBQUNDLGdCQUFnQixHQUFHLElBQUlKLG9CQUFvQixDQUFFLElBQUksQ0FBQ0ssbUJBQW1CLEVBQUUsSUFBSSxDQUFDQyxNQUFPLENBQUM7O0lBRXpGO0lBQ0EsSUFBSSxDQUFDQyxVQUFVLEdBQUcsQ0FBRSxJQUFJLENBQUNILGdCQUFnQixDQUFFO0VBRTdDO0FBQ0Y7QUFFQUwsb0JBQW9CLENBQUNTLFFBQVEsQ0FBRSxzQkFBc0IsRUFBRVAsb0JBQXFCLENBQUM7QUFFN0UsZUFBZUEsb0JBQW9CIn0=