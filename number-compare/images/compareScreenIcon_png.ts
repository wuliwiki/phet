/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;