const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const livereload = require('gulp-livereload');

gulp.task('minify', () =>
  gulp.src('assets/img-orig/**')
    .pipe(imagemin([imageminPngquant(), imageminMozjpeg({ quality: 50 }), imagemin.svgo(), imagemin.gifsicle()])) // default, but with mozjpeg and pngquant
    .pipe(gulp.dest('assets/img'))
);

gulp.task('watch', function (){
  livereload.listen();
  livereload.reload();
  gulp.watch('assets/img/**', ['minify']);
});
