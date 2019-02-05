'use strict';

module.exports = function() {
    $.gulp.task('clean-zip', function(cb) {
        return $.del('./archive.zip', cb);
    });
};

