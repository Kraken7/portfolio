'use strict';

module.exports = function() {
  $.gulp.task('copy:files', function() {
    return $.gulp.src('./source/assets/userfiles/**/*.*')
      .pipe($.gulp.dest($.config.root + '/userfiles'));
  });
};
