const del = require('del');

const config = require('../config').clean;

module.exports = function (cb) {
  del(config, { dot: true }).then(() => cb(null));
};


