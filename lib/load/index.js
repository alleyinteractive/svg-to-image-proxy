/**
 * This file contains misc. loading library code
 */

// Deps
const debug = require('debug')('lib/load');
const path = require('path');
const fs = require('fs');

// Router
const router = require('koa-router')();

const join = path.resolve;
const readdir = fs.readdirSync;

/**
 * Load resources in `root` directory.
 *
 * @param {String} root
 * @api private
 */

module.exports = function load(root) {
  readdir(root).forEach((file) => {
    const dir = join(root, file);
    const stats = fs.lstatSync(dir);
    if (stats.isDirectory()) {
      const conf = require(join(dir, './config.json')); // eslint-disable-line global-require
      conf.name = file;
      conf.directory = dir;

      if (conf.routes) {
        route(conf);
      }
    }
  });

  return router;
};

/**
 * Define routes in `conf`.
 */

function route(conf) {
  debug('routes: %s', conf.name);

  const mod = require(conf.directory); // eslint-disable-line global-require

  Object.keys(conf.routes).forEach((key) => {
    const prop = conf.routes[key];
    const method = key.split(' ')[0];
    const currPath = key.split(' ')[1];
    debug('%s %s -> .%s', method, currPath, prop);

    const fn = mod[prop];
    if (!fn) {
      throw new Error(`${conf.name}: exports.${prop} is not defined`);
    }
    router[method.toLowerCase()](currPath, fn);
  });
}
