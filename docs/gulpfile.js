const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');

gulp.task('default', () =>
  gulp.src('assets/img-orig/**')
    .pipe(imagemin([imageminPngquant(), imageminMozjpeg(), imagemin.svgo(), imagemin.gifsicle()])) // default, but with mozjpeg and pngquant
    .pipe(gulp.dest('assets/img'))
);
