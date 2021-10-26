const chokidar = require('chokidar');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const rigger = require('gulp-rigger');

const logger = require('../utils/watcherLog');
const errorHandler = require('../utils/errorHandler');
const config = require('../config').scripts;

function build() {
  return gulp.src(config.src)
    .pipe(plumber({ errorHandler }))
    .pipe(rigger({ tolerant: true }))
    .pipe(gulpif(config.compress, uglify()))
    .pipe(gulp.dest(config.dest))
    .on('end', () => {
      gutil.log(gutil.colors.green('Scripts bundled'));
    });
}

function watch() {
  const watcher = chokidar.watch(
    config.watch,
    {
      ignoreInitial: true,
    });

  watcher.on('all', (event, path) => {
    logger(event, path);
    build();
  });
}

module.exports = {
  build,
  watch,
};

