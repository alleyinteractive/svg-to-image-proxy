/**
 * This the the main API engine
 */

// Deps
const responseTime = require('koa-response-time');
const compress = require('koa-compress');
const logger = require('koa-logger');
const cors = require('koa-cors');
const koa = require('koa');

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

  // boot
  // load(app, __dirname + '/api');

  return app;
}
