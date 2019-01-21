'use strict';

module.exports = function() {
  $.gulp.task('copy:fonts', function() {
    return $.gulp.src('./source/assets/fonts/**/*.*')
      .pipe($.gulp.dest($.config.root + '/fonts'));
  });
};
