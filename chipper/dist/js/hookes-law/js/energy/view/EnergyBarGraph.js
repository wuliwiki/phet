// Copyright 2015-2023, University of Colorado Boulder

/**
 * Bar graph representation of Energy.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import { Line, Node, Rectangle, Text } from '../../../../scenery/js/imports.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';

// constants
const BAR_WIDTH = 20;
export default class EnergyBarGraph extends Node {
  constructor(spring, valueVisibleProperty, providedOptions) {
    const options = optionize()({}, providedOptions);
    const xAxisNode = new Line(0, 0, 1.65 * BAR_WIDTH, 0, {
      stroke: 'black',
      lineWidth: 0.25
    });
    const yAxisNode = new ArrowNode(0, 0, 0, -HookesLawConstants.ENERGY_Y_AXIS_LENGTH, {
      headHeight: 10,
      headWidth: 10,
      tailWidth: 1,
      fill: 'black',
      stroke: null
    });
    const yAxisText = new Text(HookesLawStrings.potentialEnergyStringProperty, {
      rotation: -Math.PI / 2,
      font: HookesLawConstants.BAR_GRAPH_AXIS_FONT,
      right: yAxisNode.left - 1,
      centerY: yAxisNode.centerY,
      maxWidth: 0.85 * yAxisNode.height,
      // constrain for i18n
      tandem: options.tandem.createTandem('yAxisText')
    });
    const barNode = new Rectangle(0, 0, BAR_WIDTH, 1, {
      fill: HookesLawColors.ENERGY,
      centerX: xAxisNode.centerX
    });
    const valueText = new Text('', {
      visibleProperty: valueVisibleProperty,
      maxWidth: 100,
      // i18n
      fill: HookesLawColors.ENERGY,
      font: HookesLawConstants.BAR_GRAPH_VALUE_FONT,
      tandem: options.tandem.createTandem('valueText')
    });
    options.children = [barNode, valueText, xAxisNode, yAxisNode, yAxisText];
    spring.potentialEnergyProperty.link(energy => {
      // resize the bar
      barNode.visible = energy > 0; // because we can't create a zero height rectangle
      const height = Math.max(1, energy * HookesLawConstants.UNIT_ENERGY_Y); // bar must have non-zero size
      barNode.setRect(0, -height, BAR_WIDTH, height); // bar grows up

      // change the value
      valueText.string = StringUtils.format(HookesLawStrings.pattern['0value']['1units'], Utils.toFixed(energy, HookesLawConstants.ENERGY_DECIMAL_PLACES), HookesLawStrings.joules);
      valueText.left = barNode.right + 5;
      if (!barNode.visible || barNode.height < valueText.height / 2) {
        valueText.bottom = xAxisNode.bottom;
      } else {
        valueText.centerY = barNode.top;
      }
    });
    super(options);
  }
}
hookesLaw.register('EnergyBarGraph', EnergyBarGraph);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVdGlscyIsIm9wdGlvbml6ZSIsIlN0cmluZ1V0aWxzIiwiQXJyb3dOb2RlIiwiTGluZSIsIk5vZGUiLCJSZWN0YW5nbGUiLCJUZXh0IiwiSG9va2VzTGF3Q29sb3JzIiwiSG9va2VzTGF3Q29uc3RhbnRzIiwiaG9va2VzTGF3IiwiSG9va2VzTGF3U3RyaW5ncyIsIkJBUl9XSURUSCIsIkVuZXJneUJhckdyYXBoIiwiY29uc3RydWN0b3IiLCJzcHJpbmciLCJ2YWx1ZVZpc2libGVQcm9wZXJ0eSIsInByb3ZpZGVkT3B0aW9ucyIsIm9wdGlvbnMiLCJ4QXhpc05vZGUiLCJzdHJva2UiLCJsaW5lV2lkdGgiLCJ5QXhpc05vZGUiLCJFTkVSR1lfWV9BWElTX0xFTkdUSCIsImhlYWRIZWlnaHQiLCJoZWFkV2lkdGgiLCJ0YWlsV2lkdGgiLCJmaWxsIiwieUF4aXNUZXh0IiwicG90ZW50aWFsRW5lcmd5U3RyaW5nUHJvcGVydHkiLCJyb3RhdGlvbiIsIk1hdGgiLCJQSSIsImZvbnQiLCJCQVJfR1JBUEhfQVhJU19GT05UIiwicmlnaHQiLCJsZWZ0IiwiY2VudGVyWSIsIm1heFdpZHRoIiwiaGVpZ2h0IiwidGFuZGVtIiwiY3JlYXRlVGFuZGVtIiwiYmFyTm9kZSIsIkVORVJHWSIsImNlbnRlclgiLCJ2YWx1ZVRleHQiLCJ2aXNpYmxlUHJvcGVydHkiLCJCQVJfR1JBUEhfVkFMVUVfRk9OVCIsImNoaWxkcmVuIiwicG90ZW50aWFsRW5lcmd5UHJvcGVydHkiLCJsaW5rIiwiZW5lcmd5IiwidmlzaWJsZSIsIm1heCIsIlVOSVRfRU5FUkdZX1kiLCJzZXRSZWN0Iiwic3RyaW5nIiwiZm9ybWF0IiwicGF0dGVybiIsInRvRml4ZWQiLCJFTkVSR1lfREVDSU1BTF9QTEFDRVMiLCJqb3VsZXMiLCJib3R0b20iLCJ0b3AiLCJyZWdpc3RlciJdLCJzb3VyY2VzIjpbIkVuZXJneUJhckdyYXBoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE1LTIwMjMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIEJhciBncmFwaCByZXByZXNlbnRhdGlvbiBvZiBFbmVyZ3kuXHJcbiAqXHJcbiAqIEBhdXRob3IgQ2hyaXMgTWFsbGV5IChQaXhlbFpvb20sIEluYy4pXHJcbiAqL1xyXG5cclxuaW1wb3J0IFRSZWFkT25seVByb3BlcnR5IGZyb20gJy4uLy4uLy4uLy4uL2F4b24vanMvVFJlYWRPbmx5UHJvcGVydHkuanMnO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vLi4vLi4vLi4vZG90L2pzL1V0aWxzLmpzJztcclxuaW1wb3J0IG9wdGlvbml6ZSwgeyBFbXB0eVNlbGZPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL29wdGlvbml6ZS5qcyc7XHJcbmltcG9ydCBQaWNrUmVxdWlyZWQgZnJvbSAnLi4vLi4vLi4vLi4vcGhldC1jb3JlL2pzL3R5cGVzL1BpY2tSZXF1aXJlZC5qcyc7XHJcbmltcG9ydCBTdHJpbmdVdGlscyBmcm9tICcuLi8uLi8uLi8uLi9waGV0Y29tbW9uL2pzL3V0aWwvU3RyaW5nVXRpbHMuanMnO1xyXG5pbXBvcnQgQXJyb3dOb2RlIGZyb20gJy4uLy4uLy4uLy4uL3NjZW5lcnktcGhldC9qcy9BcnJvd05vZGUuanMnO1xyXG5pbXBvcnQgeyBMaW5lLCBOb2RlLCBOb2RlT3B0aW9ucywgTm9kZVRyYW5zbGF0aW9uT3B0aW9ucywgUmVjdGFuZ2xlLCBUZXh0IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2NlbmVyeS9qcy9pbXBvcnRzLmpzJztcclxuaW1wb3J0IEhvb2tlc0xhd0NvbG9ycyBmcm9tICcuLi8uLi9jb21tb24vSG9va2VzTGF3Q29sb3JzLmpzJztcclxuaW1wb3J0IEhvb2tlc0xhd0NvbnN0YW50cyBmcm9tICcuLi8uLi9jb21tb24vSG9va2VzTGF3Q29uc3RhbnRzLmpzJztcclxuaW1wb3J0IFNwcmluZyBmcm9tICcuLi8uLi9jb21tb24vbW9kZWwvU3ByaW5nLmpzJztcclxuaW1wb3J0IGhvb2tlc0xhdyBmcm9tICcuLi8uLi9ob29rZXNMYXcuanMnO1xyXG5pbXBvcnQgSG9va2VzTGF3U3RyaW5ncyBmcm9tICcuLi8uLi9Ib29rZXNMYXdTdHJpbmdzLmpzJztcclxuXHJcbi8vIGNvbnN0YW50c1xyXG5jb25zdCBCQVJfV0lEVEggPSAyMDtcclxuXHJcbnR5cGUgU2VsZk9wdGlvbnMgPSBFbXB0eVNlbGZPcHRpb25zO1xyXG5cclxudHlwZSBFbmVyZ3lCYXJHcmFwaE9wdGlvbnMgPSBTZWxmT3B0aW9ucyAmIE5vZGVUcmFuc2xhdGlvbk9wdGlvbnMgJiBQaWNrUmVxdWlyZWQ8Tm9kZU9wdGlvbnMsICd0YW5kZW0nPjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZXJneUJhckdyYXBoIGV4dGVuZHMgTm9kZSB7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvciggc3ByaW5nOiBTcHJpbmcsIHZhbHVlVmlzaWJsZVByb3BlcnR5OiBUUmVhZE9ubHlQcm9wZXJ0eTxib29sZWFuPiwgcHJvdmlkZWRPcHRpb25zOiBFbmVyZ3lCYXJHcmFwaE9wdGlvbnMgKSB7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbml6ZTxFbmVyZ3lCYXJHcmFwaE9wdGlvbnMsIFNlbGZPcHRpb25zLCBOb2RlT3B0aW9ucz4oKSgge30sIHByb3ZpZGVkT3B0aW9ucyApO1xyXG5cclxuICAgIGNvbnN0IHhBeGlzTm9kZSA9IG5ldyBMaW5lKCAwLCAwLCAxLjY1ICogQkFSX1dJRFRILCAwLCB7XHJcbiAgICAgIHN0cm9rZTogJ2JsYWNrJyxcclxuICAgICAgbGluZVdpZHRoOiAwLjI1XHJcbiAgICB9ICk7XHJcblxyXG4gICAgY29uc3QgeUF4aXNOb2RlID0gbmV3IEFycm93Tm9kZSggMCwgMCwgMCwgLUhvb2tlc0xhd0NvbnN0YW50cy5FTkVSR1lfWV9BWElTX0xFTkdUSCwge1xyXG4gICAgICBoZWFkSGVpZ2h0OiAxMCxcclxuICAgICAgaGVhZFdpZHRoOiAxMCxcclxuICAgICAgdGFpbFdpZHRoOiAxLFxyXG4gICAgICBmaWxsOiAnYmxhY2snLFxyXG4gICAgICBzdHJva2U6IG51bGxcclxuICAgIH0gKTtcclxuXHJcbiAgICBjb25zdCB5QXhpc1RleHQgPSBuZXcgVGV4dCggSG9va2VzTGF3U3RyaW5ncy5wb3RlbnRpYWxFbmVyZ3lTdHJpbmdQcm9wZXJ0eSwge1xyXG4gICAgICByb3RhdGlvbjogLU1hdGguUEkgLyAyLFxyXG4gICAgICBmb250OiBIb29rZXNMYXdDb25zdGFudHMuQkFSX0dSQVBIX0FYSVNfRk9OVCxcclxuICAgICAgcmlnaHQ6IHlBeGlzTm9kZS5sZWZ0IC0gMSxcclxuICAgICAgY2VudGVyWTogeUF4aXNOb2RlLmNlbnRlclksXHJcbiAgICAgIG1heFdpZHRoOiAwLjg1ICogeUF4aXNOb2RlLmhlaWdodCwgLy8gY29uc3RyYWluIGZvciBpMThuXHJcbiAgICAgIHRhbmRlbTogb3B0aW9ucy50YW5kZW0uY3JlYXRlVGFuZGVtKCAneUF4aXNUZXh0JyApXHJcbiAgICB9ICk7XHJcblxyXG4gICAgY29uc3QgYmFyTm9kZSA9IG5ldyBSZWN0YW5nbGUoIDAsIDAsIEJBUl9XSURUSCwgMSwge1xyXG4gICAgICBmaWxsOiBIb29rZXNMYXdDb2xvcnMuRU5FUkdZLFxyXG4gICAgICBjZW50ZXJYOiB4QXhpc05vZGUuY2VudGVyWFxyXG4gICAgfSApO1xyXG5cclxuICAgIGNvbnN0IHZhbHVlVGV4dCA9IG5ldyBUZXh0KCAnJywge1xyXG4gICAgICB2aXNpYmxlUHJvcGVydHk6IHZhbHVlVmlzaWJsZVByb3BlcnR5LFxyXG4gICAgICBtYXhXaWR0aDogMTAwLCAvLyBpMThuXHJcbiAgICAgIGZpbGw6IEhvb2tlc0xhd0NvbG9ycy5FTkVSR1ksXHJcbiAgICAgIGZvbnQ6IEhvb2tlc0xhd0NvbnN0YW50cy5CQVJfR1JBUEhfVkFMVUVfRk9OVCxcclxuICAgICAgdGFuZGVtOiBvcHRpb25zLnRhbmRlbS5jcmVhdGVUYW5kZW0oICd2YWx1ZVRleHQnIClcclxuICAgIH0gKTtcclxuXHJcbiAgICBvcHRpb25zLmNoaWxkcmVuID0gWyBiYXJOb2RlLCB2YWx1ZVRleHQsIHhBeGlzTm9kZSwgeUF4aXNOb2RlLCB5QXhpc1RleHQgXTtcclxuXHJcbiAgICBzcHJpbmcucG90ZW50aWFsRW5lcmd5UHJvcGVydHkubGluayggZW5lcmd5ID0+IHtcclxuXHJcbiAgICAgIC8vIHJlc2l6ZSB0aGUgYmFyXHJcbiAgICAgIGJhck5vZGUudmlzaWJsZSA9ICggZW5lcmd5ID4gMCApOyAvLyBiZWNhdXNlIHdlIGNhbid0IGNyZWF0ZSBhIHplcm8gaGVpZ2h0IHJlY3RhbmdsZVxyXG4gICAgICBjb25zdCBoZWlnaHQgPSBNYXRoLm1heCggMSwgZW5lcmd5ICogSG9va2VzTGF3Q29uc3RhbnRzLlVOSVRfRU5FUkdZX1kgKTsgLy8gYmFyIG11c3QgaGF2ZSBub24temVybyBzaXplXHJcbiAgICAgIGJhck5vZGUuc2V0UmVjdCggMCwgLWhlaWdodCwgQkFSX1dJRFRILCBoZWlnaHQgKTsgLy8gYmFyIGdyb3dzIHVwXHJcblxyXG4gICAgICAvLyBjaGFuZ2UgdGhlIHZhbHVlXHJcbiAgICAgIHZhbHVlVGV4dC5zdHJpbmcgPSBTdHJpbmdVdGlscy5mb3JtYXQoIEhvb2tlc0xhd1N0cmluZ3MucGF0dGVyblsgJzB2YWx1ZScgXVsgJzF1bml0cycgXSxcclxuICAgICAgICBVdGlscy50b0ZpeGVkKCBlbmVyZ3ksIEhvb2tlc0xhd0NvbnN0YW50cy5FTkVSR1lfREVDSU1BTF9QTEFDRVMgKSwgSG9va2VzTGF3U3RyaW5ncy5qb3VsZXMgKTtcclxuICAgICAgdmFsdWVUZXh0LmxlZnQgPSBiYXJOb2RlLnJpZ2h0ICsgNTtcclxuICAgICAgaWYgKCAhYmFyTm9kZS52aXNpYmxlIHx8IGJhck5vZGUuaGVpZ2h0IDwgdmFsdWVUZXh0LmhlaWdodCAvIDIgKSB7XHJcbiAgICAgICAgdmFsdWVUZXh0LmJvdHRvbSA9IHhBeGlzTm9kZS5ib3R0b207XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdmFsdWVUZXh0LmNlbnRlclkgPSBiYXJOb2RlLnRvcDtcclxuICAgICAgfVxyXG4gICAgfSApO1xyXG5cclxuICAgIHN1cGVyKCBvcHRpb25zICk7XHJcbiAgfVxyXG59XHJcblxyXG5ob29rZXNMYXcucmVnaXN0ZXIoICdFbmVyZ3lCYXJHcmFwaCcsIEVuZXJneUJhckdyYXBoICk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBLE9BQU9BLEtBQUssTUFBTSw2QkFBNkI7QUFDL0MsT0FBT0MsU0FBUyxNQUE0Qix1Q0FBdUM7QUFFbkYsT0FBT0MsV0FBVyxNQUFNLCtDQUErQztBQUN2RSxPQUFPQyxTQUFTLE1BQU0sMENBQTBDO0FBQ2hFLFNBQVNDLElBQUksRUFBRUMsSUFBSSxFQUF1Q0MsU0FBUyxFQUFFQyxJQUFJLFFBQVEsbUNBQW1DO0FBQ3BILE9BQU9DLGVBQWUsTUFBTSxpQ0FBaUM7QUFDN0QsT0FBT0Msa0JBQWtCLE1BQU0sb0NBQW9DO0FBRW5FLE9BQU9DLFNBQVMsTUFBTSxvQkFBb0I7QUFDMUMsT0FBT0MsZ0JBQWdCLE1BQU0sMkJBQTJCOztBQUV4RDtBQUNBLE1BQU1DLFNBQVMsR0FBRyxFQUFFO0FBTXBCLGVBQWUsTUFBTUMsY0FBYyxTQUFTUixJQUFJLENBQUM7RUFFeENTLFdBQVdBLENBQUVDLE1BQWMsRUFBRUMsb0JBQWdELEVBQUVDLGVBQXNDLEVBQUc7SUFFN0gsTUFBTUMsT0FBTyxHQUFHakIsU0FBUyxDQUFrRCxDQUFDLENBQUUsQ0FBQyxDQUFDLEVBQUVnQixlQUFnQixDQUFDO0lBRW5HLE1BQU1FLFNBQVMsR0FBRyxJQUFJZixJQUFJLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEdBQUdRLFNBQVMsRUFBRSxDQUFDLEVBQUU7TUFDckRRLE1BQU0sRUFBRSxPQUFPO01BQ2ZDLFNBQVMsRUFBRTtJQUNiLENBQUUsQ0FBQztJQUVILE1BQU1DLFNBQVMsR0FBRyxJQUFJbkIsU0FBUyxDQUFFLENBQUMsRUFB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