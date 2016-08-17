/**
 * "/png" - Handles receiving an svg and returning a png
 */
const debug = require('debug')('api/png');

/**
 * Accept the post of the svg
 */
exports.convertToPng = function* convertToPng() {
  debug(`convertToPng: ${JSON.stringify(this)}`);
  const body = yield () => ({ success: true });

  this.compress = false;
  this.type = 'application/json';
  this.body = body;
};
