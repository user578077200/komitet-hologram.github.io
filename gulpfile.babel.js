const gulp = require('gulp');

const browsersync = require('./build/tasks/browsersync');
const clean = require('./build/tasks/clean');
const images = require('./build/tasks/images');
const resources = require('./build/tasks/resources');
const styles = require('./build/tasks/styles-scss');
const scripts = require('./build/tasks/scripts');
const templates = require('./build/tasks/templates-pug');

gulp.task('styles', styles.build);
gulp.task('styles:watch', styles.watch);

gulp.task('templates', templates.build);
gulp.task('templates:watch', templates.watch);

gulp.task('scripts', scripts.build);
gulp.task('scripts:watch', scripts.watch);

gulp.task('images', images.build);
gulp.task('images:watch', images.watch);

gulp.task('resources', resources);
gulp.task('browsersync', browsersync);
gulp.task('clean', clean);

gulp.task('watchers', gulp.parallel('styles:watch', 'templates:watch', 'images:watch', 'scripts:watch'));
gulp.task('dev', gulp.series('clean', gulp.parallel('styles', 'templates', 'images', 'scripts', 'resources'), 'watchers'));
gulp.task('dev-sync', gulp.series('clean', gulp.parallel('styles', 'templates', 'images', 'scripts', 'resources'), 'browsersync', 'watchers'));
gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'templates', 'images', 'scripts', 'resources')));
