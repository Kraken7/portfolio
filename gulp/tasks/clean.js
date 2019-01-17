'use strict';

module.exports = function() {
  $.gulp.task('clean', function(cb) {
  	$.del('./archive.zip', cb);
    return $.del($.config.root, cb);
  });
};

