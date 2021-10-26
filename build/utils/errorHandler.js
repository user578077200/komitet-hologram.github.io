const gutil = require('gulp-util');

function errorHandler(error) {
  gutil.log([
    gutil.colors.bold.red(`Error in ${error.plugin}`),
    '',
    error.message,
    '',
  ].join('\n'));
  this.emit('end');
}

module.exports = errorHandler;
