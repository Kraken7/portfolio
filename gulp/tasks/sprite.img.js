'use strict';

module.exports = function() {
  $.gulp.task('sprite:img', function() {
    var spriteData = $.gulp.src('./source/sprite/*.{png,jpg}')
      .pipe($.gp.spritesmith({
          imgName: 'sprite.png',
          cssName: 'sprite.scss',
          cssFormat: 'scss',
          algorithm: 'binary-tree',
          cssVarMap: function(sprite) {
            sprite.name = 's-' + sprite.name
          }
      }));
      spriteData.img.pipe($.gulp.dest($.config.root + '/assets/img'));
      spriteData.css.pipe($.gulp.dest($.config.root + '/assets/img'));
  })
};
