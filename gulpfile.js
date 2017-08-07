const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const fileInclude = require('gulp-file-include');
const less = require('gulp-less');
const purifycss = require('gulp-purifycss');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

gulp.task('includeHTMLs', function () {
  gulp.src('./prod/index.html')
    .pipe(fileInclude())
    .pipe(gulp.dest('./dist'))
});

gulp.task('compileLESSs', function () {
  gulp.src('./prod/styles/index.less')
    .pipe(less())
    .pipe(purifycss(['./dist/index.html', './dist/scripts.min.js']))
    .pipe(cssnano())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('uglifyJSs', function () {
  gulp.src('./prod/scripts/*.js')
    .pipe(concat('scripts.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
});

gulp.task('watch', ['browserSync'], function () {
  gulp.watch('./prod/styles/*.less', ['compileLESSs']);
  gulp.watch('./prod/scripts/*.js', ['uglifyJSs']);
  gulp.watch('./prod/views/*.html', ['includeHTMLs']);

  gulp.watch('./dist/*', browserSync.reload);
});