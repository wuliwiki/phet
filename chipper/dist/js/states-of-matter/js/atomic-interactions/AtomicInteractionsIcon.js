// Copyright 2015-2022, University of Colorado Boulder

/**
 * Programmatically generated icon for the 'Interaction' screen.
 *
 * @author John Blanco
 */

// modules
import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import merge from '../../../phet-core/js/merge.js';
import { Circle, Color, Node, RadialGradient, Rectangle } from '../../../scenery/js/imports.js';
import SOMConstants from '../common/SOMConstants.js';
import statesOfMatter from '../statesOfMatter.js';

// constants
const PARTICLE_COLOR = new Color(SOMConstants.ADJUSTABLE_ATTRACTION_COLOR);
class AtomicInteractionsIcon extends ScreenIcon {
  /**
   * {Object} [options]
   */
  constructor(options) {
    options = merge({
      size: Screen.MINIMUM_HOME_SCREEN_ICON_SIZE,
      maxIconWidthProportion: 0.9,
      maxIconHeightProportion: 0.9,
      fill: Color.BLACK
    }, options);

    // convenience var
    const size = options.size;

    // background
    const iconRootNode = new Rectangle(0, 0, size.width, size.height, 0, 0, {
      fill: 'black'
    });

    // create the two atoms
    const atomRadius = size.width * 0.2;
    const gradient = new RadialGradient(0, 0, 0, 0, 0, atomRadius).addColorStop(0, PARTICLE_COLOR).addColorStop(1, PARTICLE_COLOR.darkerColor(0.5));
    const atomsNode = new Node();
    iconRootNode.addChild(new Circle(atomRadius, {
      fill: gradient,
      opacity: 0.85,
      centerX: size.width / 2 - atomRadius * 0.7,
      centerY: size.height / 2
    }));
    iconRootNode.addChild(new Circle(atomRadius, {
      fill: gradient,
      opacity: 0.85,
      centerX: size.width / 2 + atomRadius * 0.7,
      centerY: size.height / 2
    }));

    // add the two interacting atoms
    iconRootNode.addChild(atomsNode);
    super(iconRootNode, options);
  }
}
statesOfMatter.register('AtomicInteractionsIcon', AtomicInteractionsIcon);
export default AtomicInteractionsIcon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTY3JlZW4iLCJTY3JlZW5JY29uIiwibWVyZ2UiLCJDaXJjbGUiLCJDb2xvciIsIk5vZGUiLCJSYWRpYWxHcmFkaWVudCIsIlJlY3RhbmdsZSIsIlNPTUNvbnN0YW50cyIsInN0YXRlc09mTWF0dGVyIiwiUEFSVElDTEVfQ09MT1IiLCJBREpVU1RBQkxFX0FUVFJBQ1RJT05fQ09MT1IiLCJBdG9taWNJbnRlcmFjdGlvbnNJY29uIiwiY29uc3RydWN0b3IiLCJvcHRpb25zIiwic2l6ZSIsIk1JTklNVU1fSE9NRV9TQ1JFRU5fSUNPTl9TSVpFIiwibWF4SWNvbldpZHRoUHJvcG9ydGlvbiIsIm1heEljb25IZWlnaHRQcm9wb3J0aW9uIiwiZmlsbCIsIkJMQUNLIiwiaWNvblJvb3ROb2RlIiwid2lkdGgiLCJoZWlnaHQiLCJhdG9tUmFkaXVzIiwiZ3JhZGllbnQiLCJhZGRDb2xvclN0b3AiLCJkYXJrZXJDb2xvciIsImF0b21zTm9kZSIsImFkZENoaWxkIiwib3BhY2l0eSIsImNlbnRlclgiLCJjZW50ZXJZIiwicmVnaXN0ZXIiXSwic291cmNlcyI6WyJBdG9taWNJbnRlcmFjdGlvbnNJY29uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE1LTIwMjIsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclxyXG5cclxuLyoqXHJcbiAqIFByb2dyYW1tYXRpY2FsbHkgZ2VuZXJhdGVkIGljb24gZm9yIHRoZSAnSW50ZXJhY3Rpb24nIHNjcmVlbi5cclxuICpcclxuICogQGF1dGhvciBKb2huIEJsYW5jb1xyXG4gKi9cclxuXHJcbi8vIG1vZHVsZXNcclxuaW1wb3J0IFNjcmVlbiBmcm9tICcuLi8uLi8uLi9qb2lzdC9qcy9TY3JlZW4uanMnO1xyXG5pbXBvcnQgU2NyZWVuSWNvbiBmcm9tICcuLi8uLi8uLi9qb2lzdC9qcy9TY3JlZW5JY29uLmpzJztcclxuaW1wb3J0IG1lcmdlIGZyb20gJy4uLy4uLy4uL3BoZXQtY29yZS9qcy9tZXJnZS5qcyc7XHJcbmltcG9ydCB7IENpcmNsZSwgQ29sb3IsIE5vZGUsIFJhZGlhbEdyYWRpZW50LCBSZWN0YW5nbGUgfSBmcm9tICcuLi8uLi8uLi9zY2VuZXJ5L2pzL2ltcG9ydHMuanMnO1xyXG5pbXBvcnQgU09NQ29uc3RhbnRzIGZyb20gJy4uL2NvbW1vbi9TT01Db25zdGFudHMuanMnO1xyXG5pbXBvcnQgc3RhdGVzT2ZNYXR0ZXIgZnJvbSAnLi4vc3RhdGVzT2ZNYXR0ZXIuanMnO1xyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IFBBUlRJQ0xFX0NPTE9SID0gbmV3IENvbG9yKCBTT01Db25zdGFudHMuQURKVVNUQUJMRV9BVFRSQUNUSU9OX0NPTE9SICk7XHJcblxyXG5jbGFzcyBBdG9taWNJbnRlcmFjdGlvbnNJY29uIGV4dGVuZHMgU2NyZWVuSWNvbiB7XHJcbiAgLyoqXHJcbiAgICoge09iamVjdH0gW29wdGlvbnNdXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoIG9wdGlvbnMgKSB7XHJcblxyXG4gICAgb3B0aW9ucyA9IG1lcmdlKCB7XHJcbiAgICAgIHNpemU6IFNjcmVlbi5NSU5JTVVNX0hPTUVfU0NSRUVOX0lDT05fU0laRSxcclxuICAgICAgbWF4SWNvbldpZHRoUHJvcG9ydGlvbjogMC45LFxyXG4gICAgICBtYXhJY29uSGVpZ2h0UHJvcG9ydGlvbjogMC45LFxyXG4gICAgICBmaWxsOiBDb2xvci5CTEFDS1xyXG4gICAgfSwgb3B0aW9ucyApO1xyXG5cclxuICAgIC8vIGNvbnZlbmllbmNlIHZhclxyXG4gICAgY29uc3Qgc2l6ZSA9IG9wdGlvbnMuc2l6ZTtcclxuXHJcbiAgICAvLyBiYWNrZ3JvdW5kXHJcbiAgICBjb25zdCBpY29uUm9vdE5vZGUgPSBuZXcgUmVjdGFuZ2xlKCAwLCAwLCBzaXplLndpZHRoLCBzaXplLmhlaWdodCwgMCwgMCwge1xyXG4gICAgICBmaWxsOiAnYmxhY2snXHJcbiAgICB9ICk7XHJcblxyXG4gICAgLy8gY3JlYXRlIHRoZSB0d28gYXRvbXNcclxuICAgIGNvbnN0IGF0b21SYWRpdXMgPSBzaXplLndpZHRoICogMC4yO1xyXG4gICAgY29uc3QgZ3JhZGllbnQgPSBuZXcgUmFkaWFsR3JhZGllbnQoIDAsIDAsIDAsIDAsIDAsIGF0b21SYWRpdXMgKVxyXG4gICAgICAuYWRkQ29sb3JTdG9wKCAwLCBQQVJUSUNMRV9DT0xPUiApXHJcbiAgICAgIC5hZGRDb2xvclN0b3AoIDEsIFBBUlRJQ0xFX0NPTE9SLmRhcmtlckNvbG9yKCAwLjUgKSApO1xyXG5cclxuICAgIGNvbnN0IGF0b21zTm9kZSA9IG5ldyBOb2RlKCk7XHJcbiAgICBpY29uUm9vdE5vZGUuYWRkQ2hpbGQoIG5ldyBDaXJjbGUoIGF0b21SYWRpdXMsIHtcclxuICAgICAgZmlsbDogZ3JhZGllbnQsXHJcbiAgICAgIG9wYWNpdHk6IDAuODUsXHJcbiAgICAgIGNlbnRlclg6IHNpemUud2lkdGggLyAyIC0gYXRvbVJhZGl1cyAqIDAuNyxcclxuICAgICAgY2VudGVyWTogc2l6ZS5oZWlnaHQgLyAyXHJcbiAgICB9ICkgKTtcclxuICAgIGljb25Sb290Tm9kZS5hZGRDaGlsZCggbmV3IENpcmNsZSggYXRvbVJhZGl1cywge1xyXG4gICAgICBmaWxsOiBncmFkaWVudCxcclxuICAgICAgb3BhY2l0eTogMC44NSxcclxuICAgICAgY2VudGVyWDogc2l6ZS53aWR0aCAvIDIgKyBhdG9tUmFkaXVzICogMC43LFxyXG4gICAgICBjZW50ZXJZOiBzaXplLmhlaWdodCAvIDJcclxuICAgIH0gKSApO1xyXG5cclxuICAgIC8vIGFkZCB0aGUgdHdvIGludGVyYWN0aW5nIGF0b21zXHJcbiAgICBpY29uUm9vdE5vZGUuYWRkQ2hpbGQoIGF0b21zTm9kZSApO1xyXG5cclxuICAgIHN1cGVyKCBpY29uUm9vdE5vZGUsIG9wdGlvbnMgKTtcclxuICB9XHJcbn1cclxuXHJcbnN0YXRlc09mTWF0dGVyLnJlZ2lzdGVyKCAnQXRvbWljSW50ZXJhY3Rpb25zSWNvbicsIEF0b21pY0ludGVyYWN0aW9uc0ljb24g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