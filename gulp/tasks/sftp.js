'use strict';

module.exports = function() {
  $.gulp.task('sftp', function() {

    var conn = $.ftp.create({
		host:     $.configFTP.host,
		user:     $.configFTP.user,
		password: $.configFTP.password,
		parallel: 10,
		log:      $.gp.util.log
	});

	return $.gulp.src('build/**/**', {base: 'build/', buffer: false})
		.pipe(conn.newer($.configFTP.path))
		.pipe(conn.dest($.configFTP.path));

  })
};
