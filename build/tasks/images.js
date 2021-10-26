const changed = require('gulp-changed');
const chokidar = require('chokidar');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');

const logger = require('../utils/watcherLog');
const errorHandler = require('../utils/errorHandler');
const config = require('../config').images;

function build() {
  return gulp.src(config.src)
    .pipe(plumber({ errorHandler }))
    .pipe(changed(config.dest))
    .pipe(gulpif(config.optimize, imagemin([
      imagemin.svgo({
        plugins: [
          { removeUselessDefs: false },
          { cleanupIDs: false },
          { removeViewBox: false },
          { convertPathData: false },
          { mergePaths: false },
          { removeXMLProcInst: false },
        ],
      }),
      imagemin.gifsicle(),
      imagemin.jpegtran({
        progressive: true,
      }),
      imagemin.optipng(),
    ])))
    .pipe(gulp.dest(config.dest));
}

function watch() {
  const watcher = chokidar.watch(
    config.watch,
    {
      ignoreInitial: true,
    });

  ['add', 'change'].forEach((event) => {
    watcher.on(event, (path) => {
      logger(event, path);
      build();
    });
  });
}

module.exports = {
  build,
  watch,
};
