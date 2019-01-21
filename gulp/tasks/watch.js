'use strict';

module.exports = function() {
  $.gulp.task('watch', function() {
    $.gulp.watch('./source/js/**/*.js', $.gulp.series('js:process'));
    $.gulp.watch('./source/styles/**/*.scss', $.gulp.series('sass'));
    $.gulp.watch('./source/views/**/*.pug', $.gulp.series('pug'));
    $.gulp.watch('./source/assets/img/**/*.*', $.gulp.series('copy:img'));
    $.gulp.watch('./source/assets/fonts/**/*.*', $.gulp.series('copy:fonts'));
      $.gulp.watch('./source/assets/userfiles/**/*.*', $.gulp.series('copy:files'));
  });
};
