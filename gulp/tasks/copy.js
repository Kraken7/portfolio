'use strict';

module.exports = function() {
  $.gulp.task('copy', function() {
    return $.gulp.src('./source/assets/**/*.*')
      .pipe($.gulp.dest($.config.root + '/assets'));
  });
};
