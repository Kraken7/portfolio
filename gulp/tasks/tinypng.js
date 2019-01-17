'use strict';

module.exports = function() {
  $.gulp.task('tinypng', function() {
  	return $.gulp.src($.config.root + '/assets/img/**/*.{png,jpg}', { since: $.gulp.lastRun('copy') })
  		.pipe($.gp.tinypng('qrr-9BOGSeyr540SlwSMedbdzQFks4qW'))
		.pipe($.gulp.dest($.config.root + '/assets/img'));
  });
};
