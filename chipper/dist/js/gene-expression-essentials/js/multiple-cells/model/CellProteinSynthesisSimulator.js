// Copyright 2015-2021, University of Colorado Boulder

/**
 * This class defines a synthetic cell. The central dogma is simulated as a Markov process for a single protein.
 *  Transcription    Translation
 * DNA   ->    RNA       ->    Protein
 * Simulated using the algorithm from Gillespie, 1977
 *
 * @Author George A. Emanuel
 * @Author Aadish Gupta
 */

import dotRandom from '../../../../dot/js/dotRandom.js';
import Range from '../../../../dot/js/Range.js';
import geneExpressionEssentials from '../../geneExpressionEssentials.js';
const DEFAULT_TRANSCRIPTION_FACTOR_COUNT = 2000;
const TRANSCRIPTION_FACTOR_COUNT_RANGE = new Range(DEFAULT_TRANSCRIPTION_FACTOR_COUNT / 10, DEFAULT_TRANSCRIPTION_FACTOR_COUNT * 10);
const DEFAULT_TF_ASSOCIATION_PROBABILITY = 2.5E-6;
const TF_ASSOCIATION_PROBABILITY_RANGE = new Range(DEFAULT_TF_ASSOCIATION_PROBABILITY / 10, DEFAULT_TF_ASSOCIATION_PROBABILITY * 10);
const DEFAULT_POLYMERASE_ASSOCIATION_PROBABILITY = 9.5E-7;
const POLYMERASE_ASSOCIATION_PROBABILITY_RANGE = new Range(0.0, 2 * DEFAULT_POLYMERASE_ASSOCIATION_PROBABILITY);
const DEFAULT_PROTEIN_DEGRADATION_RATE = 0.0004;
const PROTEIN_DEGRADATION_RANGE = new Range(DEFAULT_PROTEIN_DEGRADATION_RATE * 0.7, DEFAULT_PROTEIN_DEGRADATION_RATE * 1.3);
const DEFAULT_MRNA_DEGRADATION_RATE = 0.01;
const MRNA_DEGRADATION_RATE_RANGE = new Range(DEFAULT_MRNA_DEGRADATION_RATE / 1000, DEFAULT_MRNA_DEGRADATION_RATE * 1000);
class CellProteinSynthesisSimulator {
  /**
   * @param {number} ribosomeCount
   */
  constructor(ribosomeCount) {
    this.objectCounts = [20,
    //gene count
    DEFAULT_TRANSCRIPTION_FACTOR_COUNT,
    //free transcription factor count
    5000,
    //polymerase count
    0,
    //gene, transcription factor complex count
    0,
    //gene, TF, polymerase count
    0,
    //mRNA count
    2000,
    //ribosome count
    0,
    //mRNA, ribosome complex count
    0 //protein count
    ];

    this.reactionProbabilities = [DEFAULT_TF_ASSOCIATION_PROBABILITY,
    //gene, TF association
    0.0009,
    //gene-TF degradation
    DEFAULT_POLYMERASE_ASSOCIATION_PROBABILITY,
    //gene-TF-polymerase association
    0.00085,
    //gene-TF-polymerase degradation
    0.003,
    //transcription
    0.001,
    //mRNA-ribosome association
    0.0009,
    //mRNA-ribosome degradation
    0.0009,
    //translation
    DEFAULT_PROTEIN_DEGRADATION_RATE,
    //protein degradation
    DEFAULT_MRNA_DEGRADATION_RATE //mRNA degradation
    ];

    this.objectCounts[6] = ribosomeCount;
  }

  /**
   * Sets the number of transcription factors
   * @param {number} tfCount number of transcription factors
   * @public
   */
  setTranscriptionFactorCount(tfCount) {
    // Parameter checking.
    assert && assert(TRANSCRIPTION_FACTOR_COUNT_RANGE.contains(tfCount));
    this.objectCounts[1] = tfCount;
  }

  /**
   * Sets the number of polymerases
   * @param {number} polymeraseCount number of polymerases
   * @public
   */
  setPolymeraseCount(polymeraseCount) {
    this.objectCounts[2] = polymeraseCount;
  }

  /**
   * Sets the rate that transcription factors associate with genes
   * @param {number} newRate
   * @public
   */
  setGeneTranscriptionFactorAssociationRate(newRate) {
    assert && assert(TF_ASSOCIATION_PROBABILITY_RANGE.contains(newRate));
    this.reactionProbabilities[0] = newRate;
  }

  /**
   * Sets the rate constant for the polymerase to bind to the gene
   * @param {number} newRate the rate for polymerase binding
   * @public
   */
  setPolymeraseAssociationRate(newRate) {
    assert && assert(POLYMERASE_ASSOCIATION_PROBABILITY_RANGE.contains(newRate));
    this.reactionProbabilities[2] = newRate;
  }

  /**
   * Sets the rate constant for RNA/ribosome association
   * @param {number} newRate the rate at which RNA binds to a ribosome
   * @public
   */
  setRNARibosomeAssociationRate(newRate) {
    this.reactionProbabilities[5] = newRate;
  }

  /**
   * @param {number} proteinDegradationRate
   * @public
   */
  setProteinDegradationRate(proteinDegradationRate) {
    assert && assert(PROTEIN_DEGRADATION_RANGE.contains(proteinDegradationRate));
    this.reactionProbabilities[8] = proteinDegradationRate;
  }

  /**
   * @param {number} mrnaDegradationRate
   * @public
   */
  setMrnaDegradationRate(mrnaDegradationRate) {
    assert && assert(MRNA_DEGRADATION_RATE_RANGE.contains(mrnaDegradationRate));
    this.reactionProbabilities[9] = mrnaDegradationRate;
  }

  /**
   * Moves forward one time step of specified length
   *
   * @param {number} dt the length of this step through time
   * @public
   */
  step(dt) {
    let accumulatedTime = 0.0;
    let timeIncrement = -1.0;
    while (accumulatedTime < dt && timeIncrement !== 0.0) {
      timeIncrement = this.simulateOneReaction(dt - accumulatedTime);
      accumulatedTime += timeIncrement;
    }
  }

  /**
   * Simulates one reaction if the wait time before that reaction occurs is less than maxTime
   *
   * @param maxTime the maximum of time to wait for this reaction to occur
   * @returns {number} the amount of time evolved in the system
   * @private
   */
  simulateOneReaction(maxTime) {
    const a = this.calculateA();
    const a0 = this.sum(a);
    const r1 = dotRandom.nextDouble();
    const r2 = dotRandom.nextDouble();
    const tau = 1 / a0 * Math.log(1 / r1);
    if (tau > maxTime) {
      return 0.0;
    }
    let mu = 0;
    let sumSoFar = a[0];
    while (sumSoFar < r2 * a0) {
      mu++;
      sumSoFar += a[mu];
    }
    this.conductReaction(mu);
    return tau;
  }

  /**
   * Calculates sum of the array elements
   * @param {Array.<number>} array
   * @returns {number}
   * @private
   */
  sum(array) {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
      total += array[i];
    }
    return total;
  }

  /**
   * @returns {Array.<number>}
   * @private
   */
  calculateA() {
    const h = [this.objectCounts[0] * this.objectCounts[1], this.objectCounts[3], this.objectCounts[2] * this.objectCounts[3], this.objectCounts[4], this.objectCounts[4], this.objectCounts[5] * this.objectCounts[6], this.objectCounts[7], this.objectCounts[7], this.objectCounts[8], this.objectCounts[5]];
    for (let i = 0; i < h.length; i++) {
      h[i] *= this.reactionProbabilities[i];
    }
    return h;
  }

  /**
   * @param {number} mu
   * @private
   */
  conductReaction(mu) {
    switch (mu) {
      case 0:
        this.objectCounts[0]--;
        this.objectCounts[1]--;
        this.objectCounts[3]++;
        break;
      case 1:
        this.objectCounts[0]++;
        this.objectCounts[1]++;
        this.objectCounts[3]--;
        break;
      case 2:
        this.objectCounts[3]--;
        this.objectCounts[2]--;
        this.objectCounts[4]++;
        break;
      case 3:
        this.objectCounts[3]++;
        this.objectCounts[2]++;
        this.objectCounts[4]--;
        break;
      case 4:
        this.objectCounts[0]++;
        this.objectCounts[1]++;
        this.objectCounts[2]++;
        this.objectCounts[4]--;
        this.objectCounts[5]++;
        break;
      case 5:
        this.objectCounts[5]--;
        this.objectCounts[6]--;
        this.objectCounts[7]++;
        break;
      case 6:
        this.objectCounts[5]++;
        this.objectCounts[6]++;
        this.objectCounts[7]--;
        break;
      case 7:
        this.objectCounts[6]++;
        this.objectCounts[7]--;
        this.objectCounts[8]++;
        break;
      case 8:
        this.objectCounts[8]--;
        break;
      case 9:
        this.objectCounts[5]--;
        break;
      default:
        assert && assert(false, 'Unhandled mu value');
        break;
    }
  }

  /**
   * Get the number of proteins currently in this cell.
   * @returns {number} protein count
   * @public
   */
  getProteinCount() {
    return this.objectCounts[8];
  }
}

// statics
CellProteinSynthesisSimulator.DefaultTranscriptionFactorCount = DEFAULT_TRANSCRIPTION_FACTOR_COUNT;
CellProteinSynthesisSimulator.DefaultProteinDegradationRate = DEFAULT_PROTEIN_DEGRADATION_RATE;
CellProteinSynthesisSimulator.DefaultTFAssociationProbability = DEFAULT_TF_ASSOCIATION_PROBABILITY;
CellProteinSynthesisSimulator.DefaultPolymeraseAssociationProbability = DEFAULT_POLYMERASE_ASSOCIATION_PROBABILITY;
CellProteinSynthesisSimulator.DefaultMRNADegradationRate = DEFAULT_MRNA_DEGRADATION_RATE;
CellProteinSynthesisSimulator.MRNADegradationRateRange = MRNA_DEGRADATION_RATE_RANGE;
CellProteinSynthesisSimulator.PolymeraseAssociationProbabilityRange = POLYMERASE_ASSOCIATION_PROBABILITY_RANGE;
CellProteinSynthesisSimulator.ProteinDegradationRange = PROTEIN_DEGRADATION_RANGE;
CellProteinSynthesisSimulator.TFAssociationProbabilityRange = TF_ASSOCIATION_PROBABILITY_RANGE;
CellProteinSynthesisSimulator.TranscriptionFactorCountRange = TRANSCRIPTION_FACTOR_COUNT_RANGE;
geneExpressionEssentials.register('CellProteinSynthesisSimulator', CellProteinSynthesisSimulator);
export default CellProteinSynthesisSimulator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkb3RSYW5kb20iLCJSYW5nZSIsImdlbmVFeHByZXNzaW9uRXNzZW50aWFscyIsIkRFRkFVTFRfVFJBTlNDUklQVElPTl9GQUNUT1JfQ09VTlQiLCJUUkFOU0NSSVBUSU9OX0ZBQ1RPUl9DT1VOVF9SQU5HRSIsIkRFRkFVTFRfVEZfQVNTT0NJQVRJT05fUFJPQkFCSUxJVFkiLCJURl9BU1NPQ0lBVElPTl9QUk9CQUJJTElUWV9SQU5HRSIsIkRFRkFVTFRfUE9MWU1FUkFTRV9BU1NPQ0lBVElPTl9QUk9CQUJJTElUWSIsIlBPTFlNRVJBU0VfQVNTT0NJQVRJT05fUFJPQkFCSUxJVFlfUkFOR0UiLCJERUZBVUxUX1BST1RFSU5fREVHUkFEQVRJT05fUkFURSIsIlBST1RFSU5fREVHUkFEQVRJT05fUkFOR0UiLCJERUZBVUxUX01STkFfREVHUkFEQVRJT05fUkFURSIsIk1STkFfREVHUkFEQVRJT05fUkFURV9SQU5HRSIsIkNlbGxQcm90ZWluU3ludGhlc2lzU2ltdWxhdG9yIiwiY29uc3RydWN0b3IiLCJyaWJvc29tZUNvdW50Iiwib2JqZWN0Q291bnRzIiwicmVhY3Rpb25Qcm9iYWJpbGl0aWVzIiwic2V0VHJhbnNjcmlwdGlvbkZhY3RvckNvdW50IiwidGZDb3VudCIsImFzc2VydCIsImNvbnRhaW5zIiwic2V0UG9seW1lcmFzZUNvdW50IiwicG9seW1lcmFzZUNvdW50Iiwic2V0R2VuZVRyYW5zY3JpcHRpb25GYWN0b3JBc3NvY2lhdGlvblJhdGUiLCJuZXdSYXRlIiwic2V0UG9seW1lcmFzZUFzc29jaWF0aW9uUmF0ZSIsInNldFJOQVJpYm9zb21lQXNzb2NpYXRpb25SYXRlIiwic2V0UHJvdGVpbkRlZ3JhZGF0aW9uUmF0ZSIsInByb3RlaW5EZWdyYWRhdGlvblJhdGUiLCJzZXRNcm5hRGVncmFkYXRpb25SYXRlIiwibXJuYURlZ3JhZGF0aW9uUmF0ZSIsInN0ZXAiLCJkdCIsImFjY3VtdWxhdGVkVGltZSIsInRpbWVJbmNyZW1lbnQiLCJzaW11bGF0ZU9uZVJlYWN0aW9uIiwibWF4VGltZSIsImEiLCJjYWxjdWxhdGVBIiwiYTAiLCJzdW0iLCJyMSIsIm5leHREb3VibGUiLCJyMiIsInRhdSIsIk1hdGgiLCJsb2ciLCJtdSIsInN1bVNvRmFyIiwiY29uZHVjdFJlYWN0aW9uIiwiYXJyYXkiLCJ0b3RhbCIsImkiLCJsZW5ndGgiLCJoIiwiZ2V0UHJvdGVpbkNvdW50IiwiRGVmYXVsdFRyYW5zY3JpcHRpb25GYWN0b3JDb3VudCIsIkRlZmF1bHRQcm90ZWluRGVncmFkYXRpb25SYXRlIiwiRGVmYXVsdFRGQXNzb2NpYXRpb25Qcm9iYWJpbGl0eSIsIkRlZmF1bHRQb2x5bWVyYXNlQXNzb2NpYXRpb25Qcm9iYWJpbGl0eSIsIkRlZmF1bHRNUk5BRGVncmFkYXRpb25SYXRlIiwiTVJOQURlZ3JhZGF0aW9uUmF0ZVJhbmdlIiwiUG9seW1lcmFzZUFzc29jaWF0aW9uUHJvYmFiaWxpdHlSYW5nZSIsIlByb3RlaW5EZWdyYWRhdGlvblJhbmdlIiwiVEZBc3NvY2lhdGlvblByb2JhYmlsaXR5UmFuZ2UiLCJUcmFuc2NyaXB0aW9uRmFjdG9yQ291bnRSYW5nZSIsInJlZ2lzdGVyIl0sInNvdXJjZXMiOlsiQ2VsbFByb3RlaW5TeW50aGVzaXNTaW11bGF0b3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTUtMjAyMSwgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBkZWZpbmVzIGEgc3ludGhldGljIGNlbGwuIFRoZSBjZW50cmFsIGRvZ21hIGlzIHNpbXVsYXRlZCBhcyBhIE1hcmtvdiBwcm9jZXNzIGZvciBhIHNpbmdsZSBwcm90ZWluLlxyXG4gKiAgVHJhbnNjcmlwdGlvbiAgICBUcmFuc2xhdGlvblxyXG4gKiBETkEgICAtPiAgICBSTkEgICAgICAgLT4gICAgUHJvdGVpblxyXG4gKiBTaW11bGF0ZWQgdXNpbmcgdGhlIGFsZ29yaXRobSBmcm9tIEdpbGxlc3BpZSwgMTk3N1xyXG4gKlxyXG4gKiBAQXV0aG9yIEdlb3JnZSBBLiBFbWFudWVsXHJcbiAqIEBBdXRob3IgQWFkaXNoIEd1cHRhXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRvdFJhbmRvbSBmcm9tICcuLi8uLi8uLi8uLi9kb3QvanMvZG90UmFuZG9tLmpzJztcclxuaW1wb3J0IFJhbmdlIGZyb20gJy4uLy4uLy4uLy4uL2RvdC9qcy9SYW5nZS5qcyc7XHJcbmltcG9ydCBnZW5lRXhwcmVzc2lvbkVzc2VudGlhbHMgZnJvbSAnLi4vLi4vZ2VuZUV4cHJlc3Npb25Fc3NlbnRpYWxzLmpzJztcclxuXHJcbmNvbnN0IERFRkFVTFRfVFJBTlNDUklQVElPTl9GQUNUT1JfQ09VTlQgPSAyMDAwO1xyXG5jb25zdCBUUkFOU0NSSVBUSU9OX0ZBQ1RPUl9DT1VOVF9SQU5HRSA9IG5ldyBSYW5nZSggREVGQVVMVF9UUkFOU0NSSVBUSU9OX0ZBQ1RPUl9DT1VOVCAvIDEwLCBERUZBVUxUX1RSQU5TQ1JJUFRJT05fRkFDVE9SX0NPVU5UICogMTAgKTtcclxuY29uc3QgREVGQVVMVF9URl9BU1NPQ0lBVElPTl9QUk9CQUJJTElUWSA9IDIuNUUtNjtcclxuY29uc3QgVEZfQVNTT0NJQVRJT05fUFJPQkFCSUxJVFlfUkFOR0UgPSBuZXcgUmFuZ2UoIERFRkFVTFRfVEZfQVNTT0NJQVRJT05fUFJPQkFCSUxJVFkgLyAxMCwgREVGQVVMVF9URl9BU1NPQ0lBVElPTl9QUk9CQUJJTElUWSAqIDEwICk7XHJcbmNvbnN0IERFRkFVTFRfUE9MWU1FUkFTRV9BU1NPQ0lBVElPTl9QUk9CQUJJTElUWSA9IDkuNUUtNztcclxuY29uc3QgUE9MWU1FUkFTRV9BU1NPQ0lBVElPTl9QUk9CQUJJTElUWV9SQU5HRSA9IG5ldyBSYW5nZSggMC4wLCAyICogREVGQVVMVF9QT0xZTUVSQVNFX0FTU09DSUFUSU9OX1BST0JBQklMSVRZICk7XHJcbmNvbnN0IERFRkFVTFRfUFJPVEVJTl9ERUdSQURBVElPTl9SQVRFID0gMC4wMDA0O1xyXG5jb25zdCBQUk9URUlOX0RFR1JBREFUSU9OX1JBTkdFID0gbmV3IFJhbmdlKCBERUZBVUxUX1BST1RFSU5fREVHUkFEQVRJT05fUkFURSAqIDAuNywgREVGQVVMVF9QUk9URUlOX0RFR1JBREFUSU9OX1JBVEUgKiAxLjMgKTtcclxuY29uc3QgREVGQVVMVF9NUk5BX0RFR1JBREFUSU9OX1JBVEUgPSAwLjAxO1xyXG5jb25zdCBNUk5BX0RFR1JBREFUSU9OX1JBVEVfUkFOR0UgPSBuZXcgUmFuZ2UoIERFRkFVTFRfTVJOQV9ERUdSQURBVElPTl9SQVRFIC8gMTAwMCwgREVGQVVMVF9NUk5BX0RFR1JBREFUSU9OX1JBVEUgKiAxMDAwICk7XHJcblxyXG5jbGFzcyBDZWxsUHJvdGVpblN5bnRoZXNpc1NpbXVsYXRvciB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSByaWJvc29tZUNvdW50XHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoIHJpYm9zb21lQ291bnQgKSB7XHJcbiAgICB0aGlzLm9iamVjdENvdW50cyA9IFtcclxuICAgICAgMjAsIC8vZ2VuZSBjb3VudFxyXG4gICAgICBERUZBVUxUX1RSQU5TQ1JJUFRJT05fRkFDVE9SX0NPVU5ULCAvL2ZyZWUgdHJhbnNjcmlwdGlvbiBmYWN0b3IgY291bnRcclxuICAgICAgNTAwMCwgLy9wb2x5bWVyYXNlIGNvdW50XHJcbiAgICAgIDAsIC8vZ2VuZSwgdHJhbnNjcmlwdGlvbiBmYWN0b3IgY29tcGxleCBjb3VudFxyXG4gICAgICAwLCAvL2dlbmUsIFRGLCBwb2x5bWVyYXNlIGNvdW50XHJcbiAgICAgIDAsIC8vbVJOQSBjb3VudFxyXG4gICAgICAyMDAwLCAvL3JpYm9zb21lIGNvdW50XHJcbiAgICAgIDAsIC8vbVJOQSwgcmlib3NvbWUgY29tcGxleCBjb3VudFxyXG4gICAgICAwIC8vcHJvdGVpbiBjb3VudFxyXG4gICAgXTtcclxuXHJcbiAgICB0aGlzLnJlYWN0aW9uUHJvYmFiaWxpdGllcyA9IFtcclxuICAgICAgREVGQVVMVF9URl9BU1NPQ0lBVElPTl9QUk9CQUJJTElUWSwgLy9nZW5lLCBURiBhc3NvY2lhdGlvblxyXG4gICAgICAwLjAwMDksIC8vZ2VuZS1URiBkZWdyYWRhdGlvblxyXG4gICAgICBERUZBVUxUX1BPTFlNRVJBU0VfQVNTT0NJQVRJT05fUFJPQkFCSUxJVFksIC8vZ2VuZS1URi1wb2x5bWVyYXNlIGFzc29jaWF0aW9uXHJcbiAgICAgIDAuMDAwODUsIC8vZ2VuZS1URi1wb2x5bWVyYXNlIGRlZ3JhZGF0aW9uXHJcbiAgICAgIDAuMDAzLCAvL3RyYW5zY3JpcHRpb25cclxuICAgICAgMC4wMDEsIC8vbVJOQS1yaWJvc29tZSBhc3NvY2lhdGlvblxyXG4gICAgICAwLjAwMDksIC8vbVJOQS1yaWJvc29tZSBkZWdyYWRhdGlvblxyXG4gICAgICAwLjAwMDksIC8vdHJhbnNsYXRpb25cclxuICAgICAgREVGQVVMVF9QUk9URUlOX0RFR1JBREFUSU9OX1JBVEUsIC8vcHJvdGVpbiBkZWdyYWRhdGlvblxyXG4gICAgICBERUZBVUxUX01STkFfREVHUkFEQVRJT05fUkFURSAvL21STkEgZGVncmFkYXRpb25cclxuICAgIF07XHJcblxyXG4gICAgdGhpcy5vYmplY3RDb3VudHNbIDYgXSA9IHJpYm9zb21lQ291bnQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBudW1iZXIgb2YgdHJhbnNjcmlwdGlvbiBmYWN0b3JzXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRmQ291bnQgbnVtYmVyIG9mIHRyYW5zY3JpcHRpb24gZmFjdG9yc1xyXG4gICAqIEBwdWJsaWNcclxuICAgKi9cclxuICBzZXRUcmFuc2NyaXB0aW9uRmFjdG9yQ291bnQoIHRmQ291bnQgKSB7XHJcbiAgICAvLyBQYXJhbWV0ZXIgY2hlY2tpbmcuXHJcbiAgICBhc3NlcnQgJiYgYXNzZXJ0KCBUUkFOU0NSSVBUSU9OX0ZBQ1RPUl9DT1VOVF9SQU5HRS5jb250YWlucyggdGZDb3VudCApICk7XHJcbiAgICB0aGlzLm9iamVjdENvdW50c1sgMSBdID0gdGZDb3VudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIG51bWJlciBvZiBwb2x5bWVyYXNlc1xyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwb2x5bWVyYXNlQ291bnQgbnVtYmVyIG9mIHBvbHltZXJhc2VzXHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIHNldFBvbHltZXJhc2VDb3VudCggcG9seW1lcmFzZUNvdW50ICkge1xyXG4gICAgdGhpcy5vYmplY3RDb3VudHNbIDIgXSA9IHBvbHltZXJhc2VDb3VudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHJhdGUgdGhhdCB0cmFuc2NyaXB0aW9uIGZhY3RvcnMgYXNzb2NpYXRlIHdpdGggZ2VuZXNcclxuICAgKiBAcGFyYW0ge251bWJlcn0gbmV3UmF0ZVxyXG4gICAqIEBwdWJsaWNcclxuICAgKi9cclxuICBzZXRHZW5lVHJhbnNjcmlwdGlvbkZhY3RvckFzc29jaWF0aW9uUmF0ZSggbmV3UmF0ZSApIHtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIFRGX0FTU09DSUFUSU9OX1BST0JBQklMSVRZX1JBTkdFLmNvbnRhaW5zKCBuZXdSYXRlICkgKTtcclxuICAgIHRoaXMucmVhY3Rpb25Qcm9iYWJpbGl0aWVzWyAwIF0gPSBuZXdSYXRlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgcmF0ZSBjb25zdGFudCBmb3IgdGhlIHBvbHltZXJhc2UgdG8gYmluZCB0byB0aGUgZ2VuZVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBuZXdSYXRlIHRoZSByYXRlIGZvciBwb2x5bWVyYXNlIGJpbmRpbmdcclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgc2V0UG9seW1lcmFzZUFzc29jaWF0aW9uUmF0ZSggbmV3UmF0ZSApIHtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIFBPTFlNRVJBU0VfQVNTT0NJQVRJT05fUFJPQkFCSUxJVFlfUkFOR0UuY29udGFpbnMoIG5ld1JhdGUgKSApO1xyXG4gICAgdGhpcy5yZWFjdGlvblByb2JhYmlsaXRpZXNbIDIgXSA9IG5ld1JhdGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSByYXRlIGNvbnN0YW50IGZvciBSTkEvcmlib3NvbWUgYXNzb2NpYXRpb25cclxuICAgKiBAcGFyYW0ge251bWJlcn0gbmV3UmF0ZSB0aGUgcmF0ZSBhdCB3aGljaCBSTkEgYmluZHMgdG8gYSByaWJvc29tZVxyXG4gICAqIEBwdWJsaWNcclxuICAgKi9cclxuICBzZXRSTkFSaWJvc29tZUFzc29jaWF0aW9uUmF0ZSggbmV3UmF0ZSApIHtcclxuICAgIHRoaXMucmVhY3Rpb25Qcm9iYWJpbGl0aWVzWyA1IF0gPSBuZXdSYXRlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHByb3RlaW5EZWdyYWRhdGlvblJhdGVcclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgc2V0UHJvdGVpbkRlZ3JhZGF0aW9uUmF0ZSggcHJvdGVpbkRlZ3JhZGF0aW9uUmF0ZSApIHtcclxuICAgIGFzc2VydCAmJiBhc3NlcnQoIFBST1RFSU5fREVHUkFEQVRJT05fUkFOR0UuY29udGFpbnMoIHByb3RlaW5EZWdyYWRhdGlvblJhdGUgKSApO1xyXG4gICAgdGhpcy5yZWFjdGlvblByb2JhYmlsaXRpZXNbIDggXSA9IHByb3RlaW5EZWdyYWRhdGlvblJhdGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge251bWJlcn0gbXJuYURlZ3JhZGF0aW9uUmF0ZVxyXG4gICAqIEBwdWJsaWNcclxuICAgKi9cclxuICBzZXRNcm5hRGVncmFkYXRpb25SYXRlKCBtcm5hRGVncmFkYXRpb25SYXRlICkge1xyXG4gICAgYXNzZXJ0ICYmIGFzc2VydCggTVJOQV9ERUdSQURBVElPTl9SQVRFX1JBTkdFLmNvbnRhaW5zKCBtcm5hRGVncmFkYXRpb25SYXRlICkgKTtcclxuICAgIHRoaXMucmVhY3Rpb25Qcm9iYWJpbGl0aWVzWyA5IF0gPSBtcm5hRGVncmFkYXRpb25SYXRlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTW92ZXMgZm9yd2FyZCBvbmUgdGltZSBzdGVwIG9mIHNwZWNpZmllZCBsZW5ndGhcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkdCB0aGUgbGVuZ3RoIG9mIHRoaXMgc3RlcCB0aHJvdWdoIHRpbWVcclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgc3RlcCggZHQgKSB7XHJcbiAgICBsZXQgYWNjdW11bGF0ZWRUaW1lID0gMC4wO1xyXG4gICAgbGV0IHRpbWVJbmNyZW1lbnQgPSAtMS4wO1xyXG4gICAgd2hpbGUgKCBhY2N1bXVsYXRlZFRpbWUgPCBkdCAmJiB0aW1lSW5jcmVtZW50ICE9PSAwLjAgKSB7XHJcbiAgICAgIHRpbWVJbmNyZW1lbnQgPSB0aGlzLnNpbXVsYXRlT25lUmVhY3Rpb24oIGR0IC0gYWNjdW11bGF0ZWRUaW1lICk7XHJcbiAgICAgIGFjY3VtdWxhdGVkVGltZSArPSB0aW1lSW5jcmVtZW50O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2ltdWxhdGVzIG9uZSByZWFjdGlvbiBpZiB0aGUgd2FpdCB0aW1lIGJlZm9yZSB0aGF0IHJlYWN0aW9uIG9jY3VycyBpcyBsZXNzIHRoYW4gbWF4VGltZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIG1heFRpbWUgdGhlIG1heGltdW0gb2YgdGltZSB0byB3YWl0IGZvciB0aGlzIHJlYWN0aW9uIHRvIG9jY3VyXHJcbiAgICogQHJldHVybnMge251bWJlcn0gdGhlIGFtb3VudCBvZiB0aW1lIGV2b2x2ZWQgaW4gdGhlIHN5c3RlbVxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgc2ltdWxhdGVPbmVSZWFjdGlvbiggbWF4VGltZSApIHtcclxuICAgIGNvbnN0IGEgPSB0aGlzLmNhbGN1bGF0ZUEoKTtcclxuICAgIGNvbnN0IGEwID0gdGhpcy5zdW0oIGEgKTtcclxuXHJcbiAgICBjb25zdCByMSA9IGRvdFJhbmRvbS5uZXh0RG91YmxlKCk7XHJcbiAgICBjb25zdCByMiA9IGRvdFJhbmRvbS5uZXh0RG91YmxlKCk7XHJcbiAgICBjb25zdCB0YXUgPSAoIDEgLyBhMCApICogTWF0aC5sb2coIDEgLyByMSApO1xyXG4gICAgaWYgKCB0YXUgPiBtYXhUaW1lICkge1xyXG4gICAgICByZXR1cm4gMC4wO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBtdSA9IDA7XHJcbiAgICBsZXQgc3VtU29GYXIgPSBhWyAwIF07XHJcbiAgICB3aGlsZSAoIHN1bVNvRmFyIDwgcjIgKiBhMCApIHtcclxuICAgICAgbXUrKztcclxuICAgICAgc3VtU29GYXIgKz0gYVsgbXUgXTtcclxuICAgIH1cclxuICAgIHRoaXMuY29uZHVjdFJlYWN0aW9uKCBtdSApO1xyXG4gICAgcmV0dXJuIHRhdTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGN1bGF0ZXMgc3VtIG9mIHRoZSBhcnJheSBlbGVtZW50c1xyXG4gICAqIEBwYXJhbSB7QXJyYXkuPG51bWJlcj59IGFycmF5XHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHN1bSggYXJyYXkgKSB7XHJcbiAgICBsZXQgdG90YWwgPSAwO1xyXG4gICAgZm9yICggbGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgIHRvdGFsICs9IGFycmF5WyBpIF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG90YWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcmV0dXJucyB7QXJyYXkuPG51bWJlcj59XHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBjYWxjdWxhdGVBKCkge1xyXG4gICAgY29uc3QgaCA9IFtcclxuICAgICAgdGhpcy5vYmplY3RDb3VudHNbIDAgXSAqIHRoaXMub2JqZWN0Q291bnRzWyAxIF0sXHJcbiAgICAgIHRoaXMub2JqZWN0Q291bnRzWyAzIF0sXHJcbiAgICAgIHRoaXMub2JqZWN0Q291bnRzWyAyIF0gKiB0aGlzLm9iamVjdENvdW50c1sgMyBdLFxyXG4gICAgICB0aGlzLm9iamVjdENvdW50c1sgNCBdLFxyXG4gICAgICB0aGlzLm9iamVjdENvdW50c1sgNCBdLFxyXG4gICAgICB0aGlzLm9iamVjdENvdW50c1sgNSBdICogdGhpcy5vYmplY3RDb3VudHNbIDYgXSxcclxuICAgICAgdGhpcy5vYmplY3RDb3VudHNbIDcgXSxcclxuICAgICAgdGhpcy5vYmplY3RDb3VudHNbIDcgXSxcclxuICAgICAgdGhpcy5vYmplY3RDb3VudHNbIDggXSxcclxuICAgICAgdGhpcy5vYmplY3RDb3VudHNbIDUgXVxyXG4gICAgXTtcclxuXHJcbiAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBoLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICBoWyBpIF0gKj0gdGhpcy5yZWFjdGlvblByb2JhYmlsaXRpZXNbIGkgXTtcclxuICAgIH1cclxuICAgIHJldHVybiBoO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IG11XHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBjb25kdWN0UmVhY3Rpb24oIG11ICkge1xyXG4gICAgc3dpdGNoKCBtdSApIHtcclxuICAgICAgY2FzZSAwOlxyXG4gICAgICAgIHRoaXMub2JqZWN0Q291bnRzWyAwIF0tLTtcclxuICAgICAgICB0aGlzLm9iamVjdENvdW50c1sgMSBdLS07XHJcbiAgICAgICAgdGhpcy5vYmplY3RDb3VudHNbIDMgXSsrO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDE6XHJcbiAgICAgICAgdGhpcy5vYmplY3RDb3VudHNbIDAgXSsrO1xyXG4gICAgICAgIHRoaXMub2JqZWN0Q291bnRzWyAxIF0rKztcclxuICAgICAgICB0aGlzLm9iamVjdENvdW50c1sgMyBdLS07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMjpcclxuICAgICAgICB0aGlzLm9iamVjdENvdW50c1sgMyBdLS07XHJcbiAgICAgICAgdGhpcy5vYmplY3RDb3VudHNbIDIgXS0tO1xyXG4gICAgICAgIHRoaXMub2JqZWN0Q291bnRzWyA0IF0rKztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAzOlxyXG4gICAgICAgIHRoaXMub2JqZWN0Q291bnRzWyAzIF0rKztcclxuICAgICAgICB0aGlzLm9iamVjdENvdW50c1sgMiBdKys7XHJcbiAgICAgICAgdGhpcy5vYmplY3RDb3VudHNbIDQgXS0tO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDQ6XHJcbiAgICAgICAgdGhpcy5vYmplY3RDb3VudHNbIDAgXSsrO1xyXG4gICAgICAgIHRoaXMub2JqZWN0Q291bnRzWyAxIF0rKztcclxuICAgICAgICB0aGlzLm9iamVjdENvdW50c1sgMiBdKys7XHJcbiAgICAgICAgdGhpcy5vYmplY3RDb3VudHNbIDQgXS0tO1xyXG4gICAgICAgIHRoaXMub2JqZWN0Q291bnRzWyA1IF0rKztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSA1OlxyXG4gICAgICAgIHRoaXMub2JqZWN0Q291bnRzWyA1IF0tLTtcclxuICAgICAgICB0aGlzLm9iamVjdENvdW50c1sgNiBdLS07XHJcbiAgICAgICAgdGhpcy5vYmplY3RDb3VudHNbIDcgXSsrO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDY6XHJcbiAgICAgICAgdGhpcy5vYmplY3RDb3VudHNbIDUgXSsrO1xyXG4gICAgICAgIHRoaXMub2JqZWN0Q291bnRzWyA2IF0rKztcclxuICAgICAgICB0aGlzLm9iamVjdENvdW50c1sgNyBdLS07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgNzpcclxuICAgICAgICB0aGlzLm9iamVjdENvdW50c1sgNiBdKys7XHJcbiAgICAgICAgdGhpcy5vYmplY3RDb3VudHNbIDcgXS0tO1xyXG4gICAgICAgIHRoaXMub2JqZWN0Q291bnRzWyA4IF0rKztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSA4OlxyXG4gICAgICAgIHRoaXMub2JqZWN0Q291bnRzWyA4IF0tLTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSA5OlxyXG4gICAgICAgIHRoaXMub2JqZWN0Q291bnRzWyA1IF0tLTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBhc3NlcnQgJiYgYXNzZXJ0KCBmYWxzZSwgJ1VuaGFuZGxlZCBtdSB2YWx1ZScgKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgbnVtYmVyIG9mIHByb3RlaW5zIGN1cnJlbnRseSBpbiB0aGlzIGNlbGwuXHJcbiAgICogQHJldHVybnMge251bWJlcn0gcHJvdGVpbiBjb3VudFxyXG4gICAqIEBwdWJsaWNcclxuICAgKi9cclxuICBnZXRQcm90ZWluQ291bnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5vYmplY3RDb3VudHNbIDggXTtcclxuICB9XHJcblxyXG59XHJcblxyXG5cclxuLy8gc3RhdGljc1xyXG5DZWxsUHJvdGVpblN5bnRoZXNpc1NpbXVsYXRvci5EZWZhdWx0VHJhbnNjcmlwdGlvbkZhY3RvckNvdW50ID0gREVGQVVMVF9UUkFOU0NSSVBUSU9OX0ZBQ1RPUl9DT1VOVDtcclxuQ2VsbFByb3RlaW5TeW50aGVzaXNTaW11bGF0b3IuRGVmYXVsdFByb3RlaW5EZWdyYWRhdGlvblJhdGUgPSBERUZBVUxUX1BST1RFSU5fREVHUkFEQVRJT05fUkFURTtcclxuQ2VsbFByb3RlaW5TeW50aGVzaXNTaW11bGF0b3IuRGVmYXVsdFRGQXNzb2NpYXRpb25Qcm9iYWJpbGl0eSA9IERFRkFVTFRfVEZfQVNTT0NJQVRJT05fUFJPQkFCSUxJVFk7XHJcbkNlbGxQcm90ZWluU3ludGhlc2lzU2ltdWxhdG9yLkRlZmF1bHRQb2x5bWVyYXNlQXNzb2NpYXRpb25Qcm9iYWJpbGl0eSA9IERFRkFVTFRfUE9MWU1FUkFTRV9BU1NPQ0lBVElPTl9QUk9CQUJJTElUWTtcclxuQ2VsbFByb3RlaW5TeW50aGVzaXNTaW11bGF0b3IuRGVmYXVsdE1STkFEZWdyYWRhdGlvblJhdGUgPSBERUZBVUxUX01STkFfREVHUkFEQVRJT05fUkFURTtcclxuQ2VsbFByb3RlaW5TeW50aGVzaXNTaW11bGF0b3IuTVJOQURlZ3JhZGF0aW9uUmF0ZVJhbmdlID0gTVJOQV9ERUdSQURBVElPTl9SQVRFX1JBTkdFO1xyXG5DZWxsUHJvdGVpblN5bnRoZXNpc1NpbXVsYXRvci5Qb2x5bWVyYXNlQXNzb2NpYXRpb25Qcm9iYWJpbGl0eVJhbmdlID0gUE9MWU1FUkFTRV9BU1NPQ0lBVElPTl9QUk9CQUJJTElUWV9SQU5HRTtcclxuQ2VsbFByb3RlaW5TeW50aGVzaXNTaW11bGF0b3IuUHJvdGVpbkRlZ3JhZGF0aW9uUmFuZ2UgPSBQUk9URUlOX0RFR1JBREFUSU9OX1JBTkdFO1xyXG5DZWxsUHJvdGVpblN5bnRoZXNpc1NpbXVsYXRvci5URkFzc29jaWF0aW9uUHJvYmFiaWxpdHlSYW5nZSA9IFRGX0FTU09DSUFUSU9OX1BST0JBQklMSVRZX1JBTkdFO1xyXG5DZWxsUHJvdGVpblN5bnRoZXNpc1NpbXVsYXRvci5UcmFuc2NyaXB0aW9uRmFjdG9yQ291bnRSYW5nZSA9IFRSQU5TQ1JJUFRJT05fRkFDVE9SX0NPVU5UX1JBTkdFO1xyXG5cclxuZ2VuZUV4cHJlc3Npb25Fc3NlbnRpYWxzLnJlZ2lzdGVyKCAnQ2VsbFByb3RlaW5TeW50aGVzaXNTaW11bGF0b3InLCBDZWxsUHJvdGVpblN5bnRoZXNpc1NpbXVsYXRvciApO1xyXG5leHBvcnQgZGVmYXVsdCBDZWxsUHJvdGVpblN5bnRoZXNpc1NpbXVsYXRvcjsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxTQUFTLE1BQU0saUNBQWlDO0FBQ3ZELE9BQU9DLEtBQUssTUFBTSw2QkFBNkI7QUFDL0MsT0FB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Q0FBRSxFQUFFO1FBQ3hCLElBQUksQ0FBQ0EsWUFBWSxDQUFFLENBQUMsQ0FBRSxFQUFFO1FBQ3hCLElBQUksQ0FBQ0EsWUFBWSxDQUFFLENBQUMsQ0FBRSxFQUFFO1FBQ3hCO01BQ0YsS0FBSyxDQUFDO1FBQ0osSUFBSSxDQUFDQSxZQUFZLENBQUUsQ0FBQyxDQUFFLEVBQUU7UUFDeEIsSUFBSSxDQUFDQSxZQUFZLENBQUUsQ0FBQyxDQUFFLEVBQUU7UUFDeEIsSUFBSSxDQUFDQSxZQUFZLENBQUUsQ0FBQyxDQUFFLEVBQUU7UUFDeEI7TUFDRixLQUFLLENBQUM7UUFDSixJQUFJLENBQUNBLFlBQVksQ0FBRSxDQUFDLENBQUUsRUFBRTtRQUN4QixJQUFJLENBQUNBLFlBQVksQ0FBRSxDQUFDLENBQUUsRUFBRTtRQUN4QixJQUFJLENBQUNBLFlBQVksQ0FBRSxDQUFDLENBQUUsRUFBRTtRQUN4QixJQUFJLENBQUNBLFlBQVksQ0FBRSxDQUFDLENBQUUsRUFBRTtRQUN4QixJQUFJLENBQUNBLFlBQVksQ0FBRSxDQUFDLENBQUUsRUFBRTtRQUN4QjtNQUNGLEtBQUssQ0FBQztRQUNKLElBQUksQ0FBQ0EsWUFBWSxDQUFFLENBQUMsQ0FBRSxFQUFFO1FBQ3hCLElBQUksQ0FBQ0EsWUFBWSxDQUFFLENBQUMsQ0FBRSxFQUFFO1FBQ3hCLElBQUksQ0FBQ0EsWUFBWSxDQUFFLENBQUMsQ0FBRSxFQUFFO1FBQ3hCO01BQ0YsS0FBSyxDQUFDO1FBQ0osSUFBSSxDQUFDQSxZQUFZLENBQUUsQ0FBQyxDQUFFLEVBQUU7UUFDeEIsSUFBSSxDQUFDQSxZQUFZLENBQUUsQ0FBQyxDQUFFLEVBQUU7UUFDeEIsSUFBSSxDQUFDQSxZQUFZLENBQUUsQ0FBQyxDQUFFLEVBQUU7UUFDeEI7TUFDRixLQUFLLENBQUM7UUFDSixJQUFJLENBQUNBLFlBQVksQ0FBRSxDQUFDLENBQUUsRUFBRTtRQUN4QixJQUFJLENBQUNBLFlBQVksQ0FBRSxDQUFDLENBQUUsRUFBRTtRQUN4QixJQUFJLENBQUNBLFlBQVksQ0FBRSxDQUFDLENBQUUsRUFBRTtRQUN4QjtNQUNGLEtBQUssQ0FBQztRQUNKLElBQUksQ0FBQ0EsWUFBWSxDQUFFLENBQUMsQ0FBRSxFQUFFO1FBQ3hCO01BQ0YsS0FBSyxDQUFDO1FBQ0osSUFBSSxDQUFDQSxZQUFZLENBQUUsQ0FBQyxDQUFFLEVBQUU7UUFDeEI7TUFDRjtRQUNFSSxNQUFNLElBQUlBLE1BQU0sQ0FBRSxLQUFLLEVBQUUsb0JBQXFCLENBQUM7UUFDL0M7SUFDSjtFQUNGOztFQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7RUFDRW9DLGVBQWVBLENBQUEsRUFBRztJQUNoQixPQUFPLElBQUksQ0FBQ3hDLFlBQVksQ0FBRSxDQUFDLENBQUU7RUFDL0I7QUFFRjs7QUFHQTtBQUNBSCw2QkFBNkIsQ0FBQzRDLCtCQUErQixHQUFHdEQsa0NBQWtDO0FBQ2xHVSw2QkFBNkIsQ0FBQzZDLDZCQUE2QixHQUFHakQsZ0NBQWdDO0FBQzlGSSw2QkFBNkIsQ0FBQzhDLCtCQUErQixHQUFHdEQsa0NBQWtDO0FBQ2xHUSw2QkFBNkIsQ0FBQytDLHVDQUF1QyxHQUFHckQsMENBQTBDO0FBQ2xITSw2QkFBNkIsQ0FBQ2dELDBCQUEwQixHQUFHbEQsNkJBQTZCO0FBQ3hGRSw2QkFBNkIsQ0FBQ2lELHdCQUF3QixHQUFHbEQsMkJBQTJCO0FBQ3BGQyw2QkFBNkIsQ0FBQ2tELHFDQUFxQyxHQUFHdkQsd0NBQXdDO0FBQzlHSyw2QkFBNkIsQ0FBQ21ELHVCQUF1QixHQUFHdEQseUJBQXlCO0FBQ2pGRyw2QkFBNkIsQ0FBQ29ELDZCQUE2QixHQUFHM0QsZ0NBQWdDO0FBQzlGTyw2QkFBNkIsQ0FBQ3FELDZCQUE2QixHQUFHOUQsZ0NBQWdDO0FBRTlGRix3QkFBd0IsQ0FBQ2lFLFFBQVEsQ0FBRSwrQkFBK0IsRUFBRXRELDZCQUE4QixDQUFDO0FBQ25HLGVBQWVBLDZCQUE2QiJ9