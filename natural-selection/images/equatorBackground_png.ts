/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;