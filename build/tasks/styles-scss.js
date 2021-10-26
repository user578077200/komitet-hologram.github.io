const assets = require('postcss-assets');
const autoprefixer = require('autoprefixer');
const chokidar = require('chokidar');
const cssnano = require('cssnano');
const easyImport = require('postcss-easy-import');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const mqpacker = require('css-mqpacker');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const logger = require('../utils/watcherLog');
const errorHandler = require('../utils/errorHandler');
const config = require('../config').styles;

function build() {
  const postcssProcessors = [
    easyImport(),
    assets({
      loadPaths: config.assetsPath,
      cache: true,
      cachebuster: true,
    }),
	autoprefixer(),
  ];

  if (config.compress) {
    postcssProcessors.push(
      cssnano({
        autoprefixer: false,
        discardComments: {
          removeAll: true,
        },
        colormin: false,
        convertValues: false,
        zindex: false,
        discardDuplicates: true,
      }),
      mqpacker());
  }

  return gulp.src(config.src)
    .pipe(plumber({ errorHandler }))
    .pipe(sassGlob())
    .pipe(gulpif(config.sourcemaps, sourcemaps.init()))
    .pipe(sass({
      outputStyle: 'compact',
      sourceMap: false,
      errLogToConsole: true,
    }))
    .pipe(postcss(postcssProcessors))
    .pipe(gulpif(config.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(config.dest))
    .on('end', () => {
      gutil.log(gutil.colors.green('Styles compiled'));
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
