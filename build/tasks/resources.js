const gulp = require('gulp');
const mergeStream = require('merge-stream');
const plumber = require('gulp-plumber');

const errorHandler = require('../utils/errorHandler');
const config = require('../config').resources;

module.exports = function () {
  const streams = mergeStream();
  const copy = config || [];

  copy.forEach((files) => {
    const copyStream = gulp.src(files.src)
      .pipe(plumber({ errorHandler }))
      .pipe(gulp.dest(files.dest));
    streams.add(copyStream);
  });

  return streams;
};
