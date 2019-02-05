'use strict';

module.exports = function() {
  $.gulp.task('tinypng', function() {
  	return $.gulp.src($.config.root + '/img/**/*.{png,jpg}', { since: $.gulp.lastRun('copy:img') })
  		.pipe($.gp.tinypng('qrr-9BOGSeyr540SlwSMedbdzQFks4qW'))
		.pipe($.gulp.dest($.config.root + '/img'));
  });
};