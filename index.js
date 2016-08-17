/**
 * This the the main API engine
 */

// Deps
const koa = require('koa');
const path = require('path');
// Koa Deps
const cors = require('koa-cors');
const compress = require('koa-compress');
const logger = require('koa-logger');
const responseTime = require('koa-response-time');
// Other Deps
const load = require('./lib/load');

// Environment
const env = process.env.NODE_ENV || 'development';

// Expose `api()`;

module.exports = api;

/**
 * Initialize the api with the given `opts`
 *
 * @param {Object} opts
 * @return {Application}
 * @api public
 */
function api() {
  const app = koa();

  if ('development' === env) {
    app.use(logger());
  }

  // CORS
  app.use(cors({ methods: ['GET', 'POST'] }));

  // x-response-time
  app.use(responseTime());

  // compression
  app.use(compress());

  // routing
  const routes = load(path.join(__dirname, '/api'));

  // boot
  app.use(routes.routes());
  app.use(routes.allowedMethods());

  return app;
}
