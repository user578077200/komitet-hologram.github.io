const chokidar = require('chokidar');
const filter = require('gulp-filter');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const prettify = require('gulp-jsbeautifier');
const pug = require('gulp-pug');

const logger = require('../utils/watcherLog');
const errorHandler = require('../utils/errorHandler');
const config = require('../config').templates;

let isWatching = false;

function build() {
  return gulp.src(config.src)
    .pipe(plumber({ errorHandler }))
    .pipe(filter((file) =>{
      return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }))
    .pipe(pug({ data: config.data }))
    .pipe(gulpif(config.prettify, prettify({
      config: './build/config/jsbeautify.json',
    })))
    .pipe(gulp.dest(config.dest))
    .on('end', () => {
      gutil.log(gutil.colors.green('Templates compiled'));
    });
}

function watch() {
  isWatching = true;
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
