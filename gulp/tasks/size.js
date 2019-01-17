'use strict';

module.exports = function() {
  $.gulp.task('size', function() {
    return $.gulp.src($.config.root + '/**/*.*')
    .pipe($.gp.size({
    	title: 'build:'
    }))
  })
};
