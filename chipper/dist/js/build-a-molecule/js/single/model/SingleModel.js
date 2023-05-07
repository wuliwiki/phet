// Copyright 2020-2021, University of Colorado Boulder

/**
 * Main model for Single Screen.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Element from '../../../../nitroglycerin/js/Element.js';
import buildAMolecule from '../../buildAMolecule.js';
import BAMBucket from '../../common/model/BAMBucket.js';
import BAMModel from '../../common/model/BAMModel.js';
import CollectionBox from '../../common/model/CollectionBox.js';
import CollectionLayout from '../../common/model/CollectionLayout.js';
import Kit from '../../common/model/Kit.js';
import KitCollection from '../../common/model/KitCollection.js';
import MoleculeList from '../../common/model/MoleculeList.js';
class SingleModel extends BAMModel {
  constructor() {
    const collectionLayout = new CollectionLayout(true);
    const kitCollection = new KitCollection({
      enableCues: true
    });
    super(kitCollection, collectionLayout, {
      isMultipleCollection: false
    });
    kitCollection.addKit(new Kit(collectionLayout, [new BAMBucket(new Dimension2(400, 200), this.stepEmitter, Element.H, 2), new BAMBucket(new Dimension2(350, 200), this.stepEmitter, Element.O, 1)]), {
      triggerCue: true
    });
    kitCollection.addKit(new Kit(collectionLayout, [new BAMBucket(new Dimension2(400, 200), this.stepEmitter, Element.H, 2), new BAMBucket(new Dimension2(450, 200), this.stepEmitter, Element.O, 2)]), {
      triggerCue: true
    });
    kitCollection.addKit(new Kit(collectionLayout, [new BAMBucket(new Dimension2(350, 200), this.stepEmitter, Element.C, 1), new BAMBucket(new Dimension2(450, 200), this.stepEmitter, Element.O, 2), new BAMBucket(new Dimension2(500, 200), this.stepEmitter, Element.N, 2)]), {
      triggerCue: true
    });

    // Add the collection boxes.
    kitCollection.addCollectionBox(new CollectionBox(MoleculeList.H2O, 1));
    kitCollection.addCollectionBox(new CollectionBox(MoleculeList.O2, 1));
    kitCollection.addCollectionBox(new CollectionBox(MoleculeList.H2, 1));
    kitCollection.addCollectionBox(new CollectionBox(MoleculeList.CO2, 1));
    kitCollection.addCollectionBox(new CollectionBox(MoleculeList.N2, 1));
  }
}
buildAMolecule.register('SingleModel', SingleModel);
export default SingleModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEaW1lbnNpb24yIiwiRWxlbWVudCIsImJ1aWxkQU1vbGVjdWxlIiwiQkFNQnVja2V0IiwiQkFNTW9kZWwiLCJDb2xsZWN0aW9uQm94IiwiQ29sbGVjdGlvbkxheW91dCIsIktpdCIsIktpdENvbGxlY3Rpb24iLCJNb2xlY3VsZUxpc3QiLCJTaW5nbGVNb2RlbCIsImNvbnN0cnVjdG9yIiwiY29sbGVjdGlvbkxheW91dCIsImtpdENvbGxlY3Rpb24iLCJlbmFibGVDdWVzIiwiaXNNdWx0aXBsZUNvbGxlY3Rpb24iLCJhZGRLaXQiLCJzdGVwRW1pdHRlciIsIkgiLCJPIiwidHJpZ2dlckN1ZSIsIkMiLCJOIiwiYWRkQ29sbGVjdGlvbkJveCIsIkgyTyIsIk8yIiwiSDIiLCJDTzIiLCJOMiIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiU2luZ2xlTW9kZWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogTWFpbiBtb2RlbCBmb3IgU2luZ2xlIFNjcmVlbi5cclxuICpcclxuICogQGF1dGhvciBEZW56ZWxsIEJhcm5ldHQgKFBoRVQgSW50ZXJhY3RpdmUgU2ltdWxhdGlvbnMpXHJcbiAqL1xyXG5cclxuaW1wb3J0IERpbWVuc2lvbjIgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL0RpbWVuc2lvbjIuanMnO1xyXG5pbXBvcnQgRWxlbWVudCBmcm9tICcuLi8uLi8uLi8uLi9uaXRyb2dseWNlcmluL2pzL0VsZW1lbnQuanMnO1xyXG5pbXBvcnQgYnVpbGRBTW9sZWN1bGUgZnJvbSAnLi4vLi4vYnVpbGRBTW9sZWN1bGUuanMnO1xyXG5pbXBvcnQgQkFNQnVja2V0IGZyb20gJy4uLy4uL2NvbW1vbi9tb2RlbC9CQU1CdWNrZXQuanMnO1xyXG5pbXBvcnQgQkFNTW9kZWwgZnJvbSAnLi4vLi4vY29tbW9uL21vZGVsL0JBTU1vZGVsLmpzJztcclxuaW1wb3J0IENvbGxlY3Rpb25Cb3ggZnJvbSAnLi4vLi4vY29tbW9uL21vZGVsL0NvbGxlY3Rpb25Cb3guanMnO1xyXG5pbXBvcnQgQ29sbGVjdGlvbkxheW91dCBmcm9tICcuLi8uLi9jb21tb24vbW9kZWwvQ29sbGVjdGlvbkxheW91dC5qcyc7XHJcbmltcG9ydCBLaXQgZnJvbSAnLi4vLi4vY29tbW9uL21vZGVsL0tpdC5qcyc7XHJcbmltcG9ydCBLaXRDb2xsZWN0aW9uIGZyb20gJy4uLy4uL2NvbW1vbi9tb2RlbC9LaXRDb2xsZWN0aW9uLmpzJztcclxuaW1wb3J0IE1vbGVjdWxlTGlzdCBmcm9tICcuLi8uLi9jb21tb24vbW9kZWwvTW9sZWN1bGVMaXN0LmpzJztcclxuXHJcbmNsYXNzIFNpbmdsZU1vZGVsIGV4dGVuZHMgQkFNTW9kZWwge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgY29uc3QgY29sbGVjdGlvbkxheW91dCA9IG5ldyBDb2xsZWN0aW9uTGF5b3V0KCB0cnVlICk7XHJcbiAgICBjb25zdCBraXRDb2xsZWN0aW9uID0gbmV3IEtpdENvbGxlY3Rpb24oIHsgZW5hYmxlQ3VlczogdHJ1ZSB9ICk7XHJcbiAgICBzdXBlcigga2l0Q29sbGVjdGlvbiwgY29sbGVjdGlvbkxheW91dCwgeyBpc011bHRpcGxlQ29sbGVjdGlvbjogZmFsc2UgfSApO1xyXG5cclxuICAgIGtpdENvbGxlY3Rpb24uYWRkS2l0KCBuZXcgS2l0KCBjb2xsZWN0aW9uTGF5b3V0LCBbXHJcbiAgICAgIG5ldyBCQU1CdWNrZXQoIG5ldyBEaW1lbnNpb24yKCA0MDAsIDIwMCApLCB0aGlzLnN0ZXBFbWl0dGVyLCBFbGVtZW50LkgsIDIgKSxcclxuICAgICAgbmV3IEJBTUJ1Y2tldCggbmV3IERpbWVuc2lvbjIoIDM1MCwgMjAwICksIHRoaXMuc3RlcEVtaXR0ZXIsIEVsZW1lbnQuTywgMSApXHJcbiAgICBdICksIHsgdHJpZ2dlckN1ZTogdHJ1ZSB9ICk7XHJcbiAgICBraXRDb2xsZWN0aW9uLmFkZEtpdCggbmV3IEtpdCggY29sbGVjdGlvbkxheW91dCwgW1xyXG4gICAgICBuZXcgQkFNQnVja2V0KCBuZXcgRGltZW5zaW9uMiggNDAwLCAyMDAgKSwgdGhpcy5zdGVwRW1pdHRlciwgRWxlbWVudC5ILCAyICksXHJcbiAgICAgIG5ldyBCQU1CdWNrZXQoIG5ldyBEaW1lbnNpb24yKCA0NTAsIDIwMCApLCB0aGlzLnN0ZXBFbWl0dGVyLCBFbGVtZW50Lk8sIDIgKVxyXG4gICAgXSApLCB7IHRyaWdnZXJDdWU6IHRydWUgfSApO1xyXG4gICAga2l0Q29sbGVjdGlvbi5hZGRLaXQoIG5ldyBLaXQoIGNvbGxlY3Rpb25MYXlvdXQsIFtcclxuICAgICAgbmV3IEJBTUJ1Y2tldCggbmV3IERpbWVuc2lvbjIoIDM1MCwgMjAwICksIHRoaXMuc3RlcEVtaXR0ZXIsIEVsZW1lbnQuQywgMSApLFxyXG4gICAgICBuZXcgQkFNQnVja2V0KCBuZXcgRGltZW5zaW9uMiggNDUwLCAyMDAgKSwgdGhpcy5zdGVwRW1pdHRlciwgRWxlbWVudC5PLCAyICksXHJcbiAgICAgIG5ldyBCQU1CdWNrZXQoIG5ldyBEaW1lbnNpb24yKCA1MDAsIDIwMCApLCB0aGlzLnN0ZXBFbWl0dGVyLCBFbGVtZW50Lk4sIDIgKVxyXG4gICAgXSApLCB7IHRyaWdnZXJDdWU6IHRydWUgfSApO1xyXG5cclxuICAgIC8vIEFkZCB0aGUgY29sbGVjdGlvbiBib3hlcy5cclxuICAgIGtpdENvbGxlY3Rpb24uYWRkQ29sbGVjdGlvbkJveCggbmV3IENvbGxlY3Rpb25Cb3goIE1vbGVjdWxlTGlzdC5IMk8sIDEgKSApO1xyXG4gICAga2l0Q29sbGVjdGlvbi5hZGRDb2xsZWN0aW9uQm94KCBuZXcgQ29sbGVjdGlvbkJveCggTW9sZWN1bGVMaXN0Lk8yLCAxICkgKTtcclxuICAgIGtpdENvbGxlY3Rpb24uYWRkQ29sbGVjdGlvbkJveCggbmV3IENvbGxlY3Rpb25Cb3goIE1vbGVjdWxlTGlzdC5IMiwgMSApICk7XHJcbiAgICBraXRDb2xsZWN0aW9uLmFkZENvbGxlY3Rpb25Cb3goIG5ldyBDb2xsZWN0aW9uQm94KCBNb2xlY3VsZUxpc3QuQ08yLCAxICkgKTtcclxuICAgIGtpdENvbGxlY3Rpb24uYWRkQ29sbGVjdGlvbkJveCggbmV3IENvbGxlY3Rpb25Cb3goIE1vbGVjdWxlTGlzdC5OMiwgMSApICk7XHJcbiAgfVxyXG59XHJcblxyXG5idWlsZEFNb2xlY3VsZS5yZWdpc3RlciggJ1NpbmdsZU1vZGVsJywgU2luZ2xlTW9kZWwgKTtcclxuZXhwb3J0IGRlZmF1bHQgU2luZ2xlTW9kZWw7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLFVBQVUsTUFBTSxrQ0FBa0M7QUFDekQsT0FBT0MsT0FBTyxNQUFNLHlDQUF5QztBQUM3RCxPQUFPQyxjQUFjLE1BQU0seUJBQXlCO0FBQ3BELE9BQU9DLFNBQVMsTUFBTSxpQ0FBaUM7QUFDdkQsT0FBT0MsUUFBUSxNQUFNLGdDQUFnQztBQUNyRCxPQUFPQyxhQUFhLE1BQU0scUNBQXFDO0FBQy9ELE9BQU9DLGdCQUFnQixNQUFNLHdDQUF3QztBQUNyRSxPQUFPQyxHQUFHLE1BQU0sMkJBQTJCO0FBQzNDLE9BQU9DLGFBQWEsTUFBTSxxQ0FBcUM7QUFDL0QsT0FBT0MsWUFBWSxNQUFNLG9DQUFvQztBQUU3RCxNQUFNQyxXQUFXLFNBQVNOLFFBQVEsQ0FBQztFQUNqQ08sV0FBV0EsQ0FBQSxFQUFHO0lBQ1osTUFBTUMsZ0JBQWdCLEdBQUcsSUFBSU4sZ0JBQWdCLENBQUUsSUFBSyxDQUFDO0lBQ3JELE1BQU1PLGFBQWEsR0FBRyxJQUFJTCxhQUFhLENBQUU7TUFBRU0sVUFBVSxFQUFFO0lBQUssQ0FBRSxDQUFDO0lBQy9ELEtBQUssQ0FBRUQsYUFBYSxFQUFFRCxnQkFBZ0IsRUFBRTtNQUFFRyxvQkFBb0IsRUFBRTtJQUFNLENBQUUsQ0FBQztJQUV6RUYsYUFBYSxDQUFDRyxNQUFNLENBQUUsSUFBSVQsR0FBRyxDQUFFSyxnQkFBZ0IsRUFBRSxDQUMvQyxJQUFJVCxT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