const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const livereload = require('gulp-livereload');

gulp.task('minify', () =>
  gulp.src('assets/img-orig/**')
    .pipe(imagemin([imageminPngquant(), imageminMozjpeg({ quality: 50 }), imagemin.svgo(), imagemin.gifsicle()])) // default, but with mozjpeg and pngquant
    .pipe(gulp.dest('assets/img'))
);

gulp.task('sass', () =>
  gulp.src('assets/css/sass/base.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(gulp.dest('assets/css/'))
    .pipe(livereload())
);

gulp.task('pug', () =>
  gulp.src('pug/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('.'))
    .pipe(livereload())
);

gulp.task('watch', function (){
  livereload.listen();
  livereload.reload();
  gulp.watch('assets/css/**/*.scss', ['sass']);
  gulp.watch('assets/img/**', ['minify']);
  gulp.watch('pug/**/*.pug', ['pug']);
});
