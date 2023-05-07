// Copyright 2020-2021, University of Colorado Boulder

/**
 * Main model for Playground Screen. This screen doesn't include a collection area.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Element from '../../../../nitroglycerin/js/Element.js';
import buildAMolecule from '../../buildAMolecule.js';
import BAMBucket from '../../common/model/BAMBucket.js';
import BAMModel from '../../common/model/BAMModel.js';
import CollectionLayout from '../../common/model/CollectionLayout.js';
import Kit from '../../common/model/Kit.js';
import KitCollection from '../../common/model/KitCollection.js';

// constants
const BUCKET_DIMENSIONS = new Dimension2(670, 200);
class PlaygroundModel extends BAMModel {
  constructor() {
    const collectionLayout = new CollectionLayout(false);
    const kitCollection = new KitCollection();
    super(kitCollection, collectionLayout, {
      isMultipleCollection: false
    });

    // NOTE: if kits are modified here, examine MAX_NUM_HEAVY_ATOMS in MoleculeSDFCombinedParser, as it may need to be changed

    // general kit
    kitCollection.addKit(new Kit(collectionLayout, [BAMBucket.createAutoSized(this.stepEmitter, Element.H, 13), BAMBucket.createAutoSized(this.stepEmitter, Element.O, 3), BAMBucket.createAutoSized(this.stepEmitter, Element.C, 3), BAMBucket.createAutoSized(this.stepEmitter, Element.N, 3), BAMBucket.createAutoSized(this.stepEmitter, Element.Cl, 2)]));

    // organics kit
    kitCollection.addKit(new Kit(collectionLayout, [new BAMBucket(BUCKET_DIMENSIONS, this.stepEmitter, Element.H, 21), BAMBucket.createAutoSized(this.stepEmitter, Element.O, 4), BAMBucket.createAutoSized(this.stepEmitter, Element.C, 4), BAMBucket.createAutoSized(this.stepEmitter, Element.N, 4)]));

    // chlorine / fluorine
    kitCollection.addKit(new Kit(collectionLayout, [new BAMBucket(BUCKET_DIMENSIONS, this.stepEmitter, Element.H, 21), BAMBucket.createAutoSized(this.stepEmitter, Element.C, 4), BAMBucket.createAutoSized(this.stepEmitter, Element.Cl, 4), BAMBucket.createAutoSized(this.stepEmitter, Element.F, 4)]));

    // boron / silicon
    kitCollection.addKit(new Kit(collectionLayout, [new BAMBucket(BUCKET_DIMENSIONS, this.stepEmitter, Element.H, 21), BAMBucket.createAutoSized(this.stepEmitter, Element.C, 3), BAMBucket.createAutoSized(this.stepEmitter, Element.B, 2), BAMBucket.createAutoSized(this.stepEmitter, Element.Si, 2)]));

    // sulphur / oxygen
    kitCollection.addKit(new Kit(collectionLayout, [new BAMBucket(BUCKET_DIMENSIONS, this.stepEmitter, Element.H, 21), BAMBucket.createAutoSized(this.stepEmitter, Element.B, 1), BAMBucket.createAutoSized(this.stepEmitter, Element.S, 2), BAMBucket.createAutoSized(this.stepEmitter, Element.Si, 1), BAMBucket.createAutoSized(this.stepEmitter, Element.P, 1)]));

    // phosphorus
    kitCollection.addKit(new Kit(collectionLayout, [new BAMBucket(BUCKET_DIMENSIONS, this.stepEmitter, Element.H, 21), BAMBucket.createAutoSized(this.stepEmitter, Element.C, 4), BAMBucket.createAutoSized(this.stepEmitter, Element.O, 2), BAMBucket.createAutoSized(this.stepEmitter, Element.P, 2)]));

    // bromine
    kitCollection.addKit(new Kit(collectionLayout, [new BAMBucket(BUCKET_DIMENSIONS, this.stepEmitter, Element.H, 21), BAMBucket.createAutoSized(this.stepEmitter, Element.Br, 2), BAMBucket.createAutoSized(this.stepEmitter, Element.N, 3), BAMBucket.createAutoSized(this.stepEmitter, Element.C, 3)]));
  }
}
buildAMolecule.register('PlaygroundModel', PlaygroundModel);
export default PlaygroundModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEaW1lbnNpb24yIiwiRWxlbWVudCIsImJ1aWxkQU1vbGVjdWxlIiwiQkFNQnVja2V0IiwiQkFNTW9kZWwiLCJDb2xsZWN0aW9uTGF5b3V0IiwiS2l0IiwiS2l0Q29sbGVjdGlvbiIsIkJVQ0tFVF9ESU1FTlNJT05TIiwiUGxheWdyb3VuZE1vZGVsIiwiY29uc3RydWN0b3IiLCJjb2xsZWN0aW9uTGF5b3V0Iiwia2l0Q29sbGVjdGlvbiIsImlzTXVsdGlwbGVDb2xsZWN0aW9uIiwiYWRkS2l0IiwiY3JlYXRlQXV0b1NpemVkIiwic3RlcEVtaXR0ZXIiLCJIIiwiTyIsIkMiLCJOIiwiQ2wiLCJGIiwiQiIsIlNpIiwiUyIsIlAiLCJCciIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiUGxheWdyb3VuZE1vZGVsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIE1haW4gbW9kZWwgZm9yIFBsYXlncm91bmQgU2NyZWVuLiBUaGlzIHNjcmVlbiBkb2Vzbid0IGluY2x1ZGUgYSBjb2xsZWN0aW9uIGFyZWEuXHJcbiAqXHJcbiAqIEBhdXRob3IgRGVuemVsbCBCYXJuZXR0IChQaEVUIEludGVyYWN0aXZlIFNpbXVsYXRpb25zKVxyXG4gKi9cclxuXHJcbmltcG9ydCBEaW1lbnNpb24yIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9EaW1lbnNpb24yLmpzJztcclxuaW1wb3J0IEVsZW1lbnQgZnJvbSAnLi4vLi4vLi4vLi4vbml0cm9nbHljZXJpbi9qcy9FbGVtZW50LmpzJztcclxuaW1wb3J0IGJ1aWxkQU1vbGVjdWxlIGZyb20gJy4uLy4uL2J1aWxkQU1vbGVjdWxlLmpzJztcclxuaW1wb3J0IEJBTUJ1Y2tldCBmcm9tICcuLi8uLi9jb21tb24vbW9kZWwvQkFNQnVja2V0LmpzJztcclxuaW1wb3J0IEJBTU1vZGVsIGZyb20gJy4uLy4uL2NvbW1vbi9tb2RlbC9CQU1Nb2RlbC5qcyc7XHJcbmltcG9ydCBDb2xsZWN0aW9uTGF5b3V0IGZyb20gJy4uLy4uL2NvbW1vbi9tb2RlbC9Db2xsZWN0aW9uTGF5b3V0LmpzJztcclxuaW1wb3J0IEtpdCBmcm9tICcuLi8uLi9jb21tb24vbW9kZWwvS2l0LmpzJztcclxuaW1wb3J0IEtpdENvbGxlY3Rpb24gZnJvbSAnLi4vLi4vY29tbW9uL21vZGVsL0tpdENvbGxlY3Rpb24uanMnO1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IEJVQ0tFVF9ESU1FTlNJT05TID0gbmV3IERpbWVuc2lvbjIoIDY3MCwgMjAwICk7XHJcblxyXG5jbGFzcyBQbGF5Z3JvdW5kTW9kZWwgZXh0ZW5kcyBCQU1Nb2RlbCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBjb25zdCBjb2xsZWN0aW9uTGF5b3V0ID0gbmV3IENvbGxlY3Rpb25MYXlvdXQoIGZhbHNlICk7XHJcbiAgICBjb25zdCBraXRDb2xsZWN0aW9uID0gbmV3IEtpdENvbGxlY3Rpb24oKTtcclxuICAgIHN1cGVyKCBraXRDb2xsZWN0aW9uLCBjb2xsZWN0aW9uTGF5b3V0LCB7IGlzTXVsdGlwbGVDb2xsZWN0aW9uOiBmYWxzZSB9ICk7XHJcblxyXG4gICAgLy8gTk9URTogaWYga2l0cyBhcmUgbW9kaWZpZWQgaGVyZSwgZXhhbWluZSBNQVhfTlVNX0hFQVZZX0FUT01TIGluIE1vbGVjdWxlU0RGQ29tYmluZWRQYXJzZXIsIGFzIGl0IG1heSBuZWVkIHRvIGJlIGNoYW5nZWRcclxuXHJcbiAgICAvLyBnZW5lcmFsIGtpdFxyXG4gICAga2l0Q29sbGVjdGlvbi5hZGRLaXQoIG5ldyBLaXQoIGNvbGxlY3Rpb25MYXlvdXQsIFtcclxuICAgICAgQkFNQnVja2V0LmNyZWF0ZUF1dG9TaXplZCggdGhpcy5zdGVwRW1pdHRlciwgRWxlbWVudC5ILCAxMyApLFxyXG4gICAgICBCQU1CdWNrZXQuY3JlYXRlQXV0b1NpemVkKCB0aGlzLnN0ZXBFbWl0dGVyLCBFbGVtZW50Lk8sIDMgKSxcclxuICAgICAgQkFNQnVja2V0LmNyZWF0ZUF1dG9TaXplZCggdGhpcy5zdGVwRW1pdHRlciwgRWxlbWVudC5DLCAzICksXHJcbiAgICAgIEJBTUJ1Y2tldC5jcmVhdGVBdXRvU2l6ZWQoIHRoaXMuc3RlcEVtaXR0ZXIsIEVsZW1lbnQuTiwgMyApLFxyXG4gICAgICBCQU1CdWNrZXQuY3JlYXRlQXV0b1NpemVkKCB0aGlzLnN0ZXBFbWl0dGVyLCBFbGVtZW50LkNsLCAyIClcclxuICAgIF0gKSApO1xyXG5cclxuICAgIC8vIG9yZ2FuaWNzIGtpdFxyXG4gICAga2l0Q29sbGVjdGlvbi5hZGRLaXQoIG5ldyBLaXQoIGNvbGxlY3Rpb25MYXlvdXQsIFtcclxuICAgICAgbmV3IEJBTUJ1Y2tldCggQlVDS0VUX0RJTUVOU0lPTlMsIHRoaXMuc3RlcEVtaXR0ZXIsIEVsZW1lbnQuSCwgMjEgKSxcclxuICAgICAgQkFNQnVja2V0LmNyZWF0ZUF1dG9TaXplZCggdGhpcy5zdGVwRW1pdHRlciwgRWxlbWVudC5PLCA0ICksXHJcbiAgICAgIEJBTUJ1Y2tldC5jcmVhdGVBdXRvU2l6ZWQoIHRoaXMuc3RlcEVtaXR0ZXIsIEVsZW1lbnQuQywgNCApLFxyXG4gICAgICBCQU1CdWNrZXQuY3JlYXRlQXV0b1NpemVkKCB0aGlzLnN0ZXBFbWl0dGVyLCBFbGVtZW50Lk4sIDQgKVxyXG4gICAgXSApICk7XHJcblxyXG4gICAgLy8gY2hsb3JpbmUgLyBmbHVvcmluZVxyXG4gICAga2l0Q29sbGVjdGlvbi5hZGRLaXQoIG5ldyBLaXQoIGNvbGxlY3Rpb25MYXlvdXQsIFtcclxuICAgICAgbmV3IEJBTUJ1Y2tldCggQlVDS0VUX0RJTUVOU0lPTlMsIHRoaXMuc3RlcEVtaXR0ZXIsIEVsZW1lbnQuSCwgMjEgKSxcclxuICAgICAgQkFNQnVja2V0LmNyZWF0ZUF1dG9TaXplZCggdGhpcy5zdGVwRW1pdHRlciwgRWxlbWVudC5DLCA0ICksXHJcbiAgICAgIEJBTUJ1Y2tldC5jcmVhdGVBdXRvU2l6ZWQoIHRoaXMuc3RlcEVtaXR0ZXIsIEVsZW1lbnQuQ2wsIDQgKSxcclxuICAgICAgQkFNQnVja2V0LmNyZWF0ZUF1dG9TaXplZCggdGhpcy5zdGVwRW1pdHRlciwgRWxlbWVudC5GLCA0IClcclxuICAgIF0gKSApO1xyXG5cclxuICAgIC8vIGJvcm9uIC8gc2lsaWNvblxyXG4gICAga2l0Q29sbGVjdGlvbi5hZGRLaXQoIG5ldyBLaXQoIGNvbGxlY3Rpb25MYXlvdXQsIFtcclxuICAgICAgbmV3IEJBTUJ1Y2tldCggQlVDS0VUX0RJTUVOU0lPTlMsIHRoaXMuc3RlcEVtaXR0ZXIsIEVsZW1lbnQuSCwgMjEgKSxcclxuICAgICAgQkFNQnVja2V0LmNyZWF0ZUF1dG9TaXplZCggdGhpcy5zdGVwRW1pdHRlciwgRWxlbWVudC5DLCAzICksXHJcbiAgICAgIEJBTUJ1Y2tldC5jcmVhdGVBdXRvU2l6ZWQoIHRoaXMuc3RlcEVtaXR0ZXIsIEVsZW1lbnQuQiwgMiApLFxyXG4gICAgICBCQU1CdWNrZXQuY3JlYXRlQXV0b1NpemVkKCB0aGlzLnN0ZXBFbWl0dGVyLCBFbGVtZW50LlNpLCAyIClcclxuICAgIF0gKSApO1xyXG5cclxuICAgIC8vIHN1bHBodXIgLyBveHlnZW5cclxuICAgIGtpdENvbGxlY3Rpb24uYWRkS2l0KCBuZXcgS2l0KCBjb2xsZWN0aW9uTGF5b3V0LCBbXHJcbiAgICAgIG5ldyBCQU1CdWNrZXQoIEJVQ0tFVF9ESU1FTlNJT05TLCB0aGlzLnN0ZXBFbWl0dGVyLCBFbGVtZW50LkgsIDIxICksXHJcbiAgICAgIEJBTUJ1Y2tldC5jcmVhdGVBdXRvU2l6ZWQoIHRoaXMuc3RlcEVtaXR0ZXIsIEVsZW1lbnQuQiwgMSApLFxyXG4gICAgICBCQU1CdWNrZXQuY3JlYXRlQXV0b1NpemVkKCB0aGlzLnN0ZXBFbWl0dGVyLCBFbGVtZW50LlMsIDIgKSxcclxuICAgICAgQkFNQnVja2V0LmNyZWF0ZUF1dG9TaXplZCggdGhpcy5zdGVwRW1pdHRlciwgRWxlbWVudC5TaSwgMSApLFxyXG4gICAgICBCQU1CdWNrZXQuY3JlYXRlQXV0b1NpemVkKCB0aGlzLnN0ZXBFbWl0dGVyLCBFbGVtZW50LlAsIDEgKVxyXG4gICAgXSApICk7XHJcblxyXG4gICAgLy8gcGhvc3Bob3J1c1xyXG4gICAga2l0Q29sbGVjdGlvbi5hZGRLaXQoIG5ldyBLaXQoIGNvbGxlY3Rpb25MYXlvdXQsIFtcclxuICAgICAgbmV3IEJBTUJ1Y2tldCggQlVDS0VUX0RJTUVOU0lPTlMsIHRoaXMuc3RlcEVtaXR0ZXIsIEVsZW1lbnQuSCwgMjEgKSxcclxuICAgICAgQkFNQnVja2V0LmNyZWF0ZUF1dG9TaXplZCggdGhpcy5zdGVwRW1pdHRlciwgRWxlbWVudC5DLCA0ICksXHJcbiAgICAgIEJBTUJ1Y2tldC5jcmVhdGVBdXRvU2l6ZWQoIHRoaXMuc3RlcEVtaXR0ZXIsIEVsZW1lbnQuTywgMiApLFxyXG4gICAgICBCQU1CdWNrZXQuY3JlYXRlQXV0b1NpemVkKCB0aGlzLnN0ZXBFbWl0dGVyLCBFbGVtZW50LlAsIDIgKVxyXG4gICAgXSApICk7XHJcblxyXG4gICAgLy8gYnJvbWluZVxyXG4gICAga2l0Q29sbGVjdGlvbi5hZGRLaXQoIG5ldyBLaXQoIGNvbGxlY3Rpb25MYXlvdXQsIFtcclxuICAgICAgbmV3IEJBTUJ1Y2tldCggQlVDS0VUX0RJTUVOU0lPTlMsIHRoaXMuc3RlcEVtaXR0ZXIsIEVsZW1lbnQuSCwgMjEgKSxcclxuICAgICAgQkFNQnVja2V0LmNyZWF0ZUF1dG9TaXplZCggdGhpcy5zdGVwRW1pdHRlciwgRWxlbWVudC5CciwgMiApLFxyXG4gICAgICBCQU1CdWNrZXQuY3JlYXRlQXV0b1NpemVkKCB0aGlzLnN0ZXBFbWl0dGVyLCBFbGVtZW50Lk4sIDMgKSxcclxuICAgICAgQkFNQnVja2V0LmNyZWF0ZUF1dG9TaXplZCggdGhpcy5zdGVwRW1pdHRlciwgRWxlbWVudC5DLCAzIClcclxuICAgIF0gKSApO1xyXG4gIH1cclxufVxyXG5cclxuYnVpbGRBTW9sZWN1bGUucmVnaXN0ZXIoICdQbGF5Z3JvdW5kTW9kZWwnLCBQbGF5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