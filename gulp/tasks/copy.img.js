'use strict';

module.exports = function() {
  $.gulp.task('copy:img', function() {
    return $.gulp.src('./source/assets/img/**/*.*')
      .pipe($.gulp.dest($.config.root + '/img'));
  });
};
