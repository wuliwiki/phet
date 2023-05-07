// Copyright 2015-2020, University of Colorado Boulder

/**
 * Model class for the base pair in the DNA molecule. In the real world, a "base pair" is a pair of nitrogenous bases
 * that connects to the DNA backbone on one side and in the center of the DNA strand on the other. For the purposes of
 * this simulation, a base pair only needs to represent a structural element of the DNA, and the individual bases are
 * not actually encapsulated here (nor anywhere in this simulation).
 *
 * In this class the width of an individual base pair is a constant, but the height can vary. This is used to create the
 * illusion of a twisted strand of DNA - the shorter base pairs are the ones that are more angled, and the longer ones
 * are the ones that are seen directly from the side.
 *
 * @author John Blanco
 * @author Mohamed Safi
 * @author Aadish Gupta
 */

import geneExpressionEssentials from '../../geneExpressionEssentials.js';

// constants
const BASE_PAIR_WIDTH = 13; // In picometers.  Not sure if this is close to real life, chosen to look decent in view.

class BasePair {
  /**
   * @param {number} centerPositionX
   * @param {number} topYPosition
   * @param {number} bottomYPosition
   */
  constructor(centerPositionX, topYPosition, bottomYPosition) {
    // @public - values that indicate where the base pair is positioned
    this.x = centerPositionX - BASE_PAIR_WIDTH / 2;
    this.topYPosition = topYPosition;
    this.bottomYPosition = bottomYPosition;
    this.width = BASE_PAIR_WIDTH;
  }

  /**
   * @returns {number}
   * @public
   */
  getCenterPositionX() {
    return this.x + BASE_PAIR_WIDTH / 2;
  }
}
geneExpressionEssentials.register('BasePair', BasePair);
export default BasePair;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJnZW5lRXhwcmVzc2lvbkVzc2VudGlhbHMiLCJCQVNFX1BBSVJfV0lEVEgiLCJCYXNlUGFpciIsImNvbnN0cnVjdG9yIiwiY2VudGVyUG9zaXRpb25YIiwidG9wWVBvc2l0aW9uIiwiYm90dG9tWVBvc2l0aW9uIiwieCIsIndpZHRoIiwiZ2V0Q2VudGVyUG9zaXRpb25YIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJCYXNlUGFpci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxNS0yMDIwLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcclxuXHJcbi8qKlxyXG4gKiBNb2RlbCBjbGFzcyBmb3IgdGhlIGJhc2UgcGFpciBpbiB0aGUgRE5BIG1vbGVjdWxlLiBJbiB0aGUgcmVhbCB3b3JsZCwgYSBcImJhc2UgcGFpclwiIGlzIGEgcGFpciBvZiBuaXRyb2dlbm91cyBiYXNlc1xyXG4gKiB0aGF0IGNvbm5lY3RzIHRvIHRoZSBETkEgYmFja2JvbmUgb24gb25lIHNpZGUgYW5kIGluIHRoZSBjZW50ZXIgb2YgdGhlIEROQSBzdHJhbmQgb24gdGhlIG90aGVyLiBGb3IgdGhlIHB1cnBvc2VzIG9mXHJcbiAqIHRoaXMgc2ltdWxhdGlvbiwgYSBiYXNlIHBhaXIgb25seSBuZWVkcyB0byByZXByZXNlbnQgYSBzdHJ1Y3R1cmFsIGVsZW1lbnQgb2YgdGhlIEROQSwgYW5kIHRoZSBpbmRpdmlkdWFsIGJhc2VzIGFyZVxyXG4gKiBub3QgYWN0dWFsbHkgZW5jYXBzdWxhdGVkIGhlcmUgKG5vciBhbnl3aGVyZSBpbiB0aGlzIHNpbXVsYXRpb24pLlxyXG4gKlxyXG4gKiBJbiB0aGlzIGNsYXNzIHRoZSB3aWR0aCBvZiBhbiBpbmRpdmlkdWFsIGJhc2UgcGFpciBpcyBhIGNvbnN0YW50LCBidXQgdGhlIGhlaWdodCBjYW4gdmFyeS4gVGhpcyBpcyB1c2VkIHRvIGNyZWF0ZSB0aGVcclxuICogaWxsdXNpb24gb2YgYSB0d2lzdGVkIHN0cmFuZCBvZiBETkEgLSB0aGUgc2hvcnRlciBiYXNlIHBhaXJzIGFyZSB0aGUgb25lcyB0aGF0IGFyZSBtb3JlIGFuZ2xlZCwgYW5kIHRoZSBsb25nZXIgb25lc1xyXG4gKiBhcmUgdGhlIG9uZXMgdGhhdCBhcmUgc2VlbiBkaXJlY3RseSBmcm9tIHRoZSBzaWRlLlxyXG4gKlxyXG4gKiBAYXV0aG9yIEpvaG4gQmxhbmNvXHJcbiAqIEBhdXRob3IgTW9oYW1lZCBTYWZpXHJcbiAqIEBhdXRob3IgQWFkaXNoIEd1cHRhXHJcbiAqL1xyXG5cclxuaW1wb3J0IGdlbmVFeHByZXNzaW9uRXNzZW50aWFscyBmcm9tICcuLi8uLi9nZW5lRXhwcmVzc2lvbkVzc2VudGlhbHMuanMnO1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IEJBU0VfUEFJUl9XSURUSCA9IDEzOyAvLyBJbiBwaWNvbWV0ZXJzLiAgTm90IHN1cmUgaWYgdGhpcyBpcyBjbG9zZSB0byByZWFsIGxpZmUsIGNob3NlbiB0byBsb29rIGRlY2VudCBpbiB2aWV3LlxyXG5cclxuY2xhc3MgQmFzZVBhaXIge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge251bWJlcn0gY2VudGVyUG9zaXRpb25YXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRvcFlQb3NpdGlvblxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBib3R0b21ZUG9zaXRpb25cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciggY2VudGVyUG9zaXRpb25YLCB0b3BZUG9zaXRpb24sIGJvdHRvbVlQb3NpdGlvbiApIHtcclxuXHJcbiAgICAvLyBAcHVibGljIC0gdmFsdWVzIHRoYXQgaW5kaWNhdGUgd2hlcmUgdGhlIGJhc2UgcGFpciBpcyBwb3NpdGlvbmVkXHJcbiAgICB0aGlzLnggPSBjZW50ZXJQb3NpdGlvblggLSBCQVNFX1BBSVJfV0lEVEggLyAyO1xyXG4gICAgdGhpcy50b3BZUG9zaXRpb24gPSB0b3BZUG9zaXRpb247XHJcbiAgICB0aGlzLmJvdHRvbVlQb3NpdGlvbiA9IGJvdHRvbVlQb3NpdGlvbjtcclxuICAgIHRoaXMud2lkdGggPSBCQVNFX1BBSVJfV0lEVEg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqIEBwdWJsaWNcclxuICAgKi9cclxuICBnZXRDZW50ZXJQb3NpdGlvblgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy54ICsgQkFTRV9QQUlSX1dJRFRIIC8gMjtcclxuICB9XHJcbn1cclxuXHJcbmdlbmVFeHByZXNzaW9uRXNzZW50aWFscy5yZWdpc3RlciggJ0Jhc2VQYWlyJywgQmFzZVBhaXIgKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhc2VQYWlyO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0Esd0JBQXdCLE1BQU0sbUNBQW1DOztBQUV4RTtBQUNBLE1BQU1DLGVBQWUsR0FBRyxFQUFFLENBQUMsQ0FBQzs7QUFFNUIsTUFBTUMsUUFBUSxDQUFDO0VBRWI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtFQUNFQyxXQUFXQSxDQUFFQyxlQUFlLEVBQUVDLFlBQVksRUFBRUMsZUFBZSxFQUFHO0lBRTVEO0lBQ0EsSUFBSSxDQUFDQyxDQUFDLEdBQUdILGVBQWUsR0FBR0gsZUFBZSxHQUFHLENBQUM7SUFDOUMsSUFBSSxDQUFDSSxZQUFZLEdBQUdBLFlBQVk7SUFDaEMsSUFBSSxDQUFDQyxlQUFlLEdBQUdBLGVBQWU7SUFDdEMsSUFBSSxDQUFDRSxLQUFLLEdBQUdQLGVBQWU7RUFDOUI7O0VBRUE7QUFDRjtBQUNBO0FBQ0E7RUFDRVEsa0JBQWtCQSxDQUFBLEVBQUc7SUFDbkIsT0FBTyxJQUFJLENBQUNGLENBQUMsR0FBR04sZUFBZSxHQUFHLENBQUM7RUFDckM7QUFDRjtBQUVBRCx3QkFBd0IsQ0FBQ1UsUUFBUSxDQUFFLFVBQVUsRUFBRVIsUUFBUyxDQUFDO0FBRXpELGVBQWVBLFFBQVEifQ==