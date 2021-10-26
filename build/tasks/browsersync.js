const browserSync = require('browser-sync');

const config = require('../config').browsersync;

module.exports = function (cb) {
  return browserSync.create().init(config, cb);
};


