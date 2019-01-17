'use strict';

global.$ = {
  package: require('./package.json'),
  config: require('./gulp/config'),
  configFTP: require('./config.ftp.js'),
  path: {
    task: require('./gulp/paths/tasks.js'),
    jsFoundation: require('./gulp/paths/js.foundation.js'),
    cssFoundation: require('./gulp/paths/css.foundation.js'),
    app: require('./gulp/paths/app.js')
  },
  gulp: require('gulp'),
  del: require('del'),
  ftp: require('vinyl-ftp'),
  browserSync: require('browser-sync').create(),
  gp: require('gulp-load-plugins')()
};

$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('build', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'sass',
    //'less',
    //'sprite:img',
    'pug',
    'js:foundation',
    'js:process',
    'copy',
    'css:foundation',
    'sprite:svg'
  )
));

$.gulp.task('load', $.gulp.parallel(
    'watch',
    'serve'
));

$.gulp.task('default', $.gulp.series(
  'build',
  'load'
));

$.gulp.task('prod', $.gulp.series(
  'build',
  //'tinypng',
  //'zip',
  'sftp',
  'size'
));