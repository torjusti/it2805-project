const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const sass = require('gulp-sass');

gulp.task('minify', () =>
  gulp.src('assets/img-orig/**')
    .pipe(imagemin([imageminPngquant(), imageminMozjpeg(), imagemin.svgo(), imagemin.gifsicle()])) // default, but with mozjpeg and pngquant
    .pipe(gulp.dest('assets/img'))
);

gulp.task('sass', () =>
  gulp.src('assets/css/sass/base.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(gulp.dest('assets/css/'))
);

gulp.task('watch', function () {
  gulp.watch('assets/css/**/*.scss', ['sass']);
  gulp.watch('assets/img/**', ['minify']);
});
