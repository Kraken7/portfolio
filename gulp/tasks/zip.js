'use strict';

module.exports = function() {
  $.gulp.task('zip', function() {
    return $.gulp.src($.config.root + '/**/*.*')
    .pipe($.gp.zip('archive.zip'))
    .pipe($.gp.size({
    	title: 'zip:'
    }))
    .pipe($.gulp.dest('.'))
  })
};
