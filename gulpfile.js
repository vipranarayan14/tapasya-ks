const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const del = require('del');
const fileInclude = require('gulp-file-include');
const gulp = require('gulp');
const less = require('gulp-less');
const purifycss = require('gulp-purifycss');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const uglify = require('gulp-uglify');

let paths = {
  prod: './prod/views',
  gallery: './prod/views/gallery/gallery-ext'
};

gulp.task('build-clean', function () {

  return del(['./dist/**/*']);
});

gulp.task('build-html', function () {

  gulp.src(paths.prod + '/main/main.html')
    .pipe(fileInclude())
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./dist'));

  return gulp.src(paths.gallery + '/index.html')
    .pipe(fileInclude())
    .pipe(gulp.dest('./dist/gallery'));
});

gulp.task('build-scripts', function () {

  gulp.src([
    './prod/libs/*.js',
    paths.prod + '/main/*.js'
  ])
    .pipe(concat('scripts.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));

  return gulp.src([
    paths.gallery + '/**/*.js',
  ])
    .pipe(concat('scripts.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/gallery'));
});

gulp.task('build-styles', function () {

  gulp.src(paths.prod + '/main/main.less')
    .pipe(less())
    .pipe(purifycss(['./dist/index.html', './dist/scripts.min.js']))
    .pipe(cssnano())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./dist'));

  return gulp.src(paths.gallery + '/index.less')
    .pipe(less())
    .pipe(cssnano({
      zindex: false,
      reduceIdents: false
    }))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./dist/gallery'));
});

gulp.task('browserSync', function () {

  browserSync.init({

    server: {

      baseDir: 'dist'
    }
  })
});

gulp.task('copy-others', function () {

  gulp.src('./prod/images/**/*')
    .pipe(gulp.dest('./dist/images'));

  return gulp.src('./prod/others/**/*')
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', function (done) {

  runSequence('build-clean', 'build-scripts', 'build-html', 'build-styles', 'copy-others', done);
});

gulp.task('watch', ['browserSync'], function () {

  gulp.watch(paths.prod + '/**/*.less', ['build-styles']);
  gulp.watch(paths.prod + '/**/*.js', ['build-scripts']);
  gulp.watch(paths.prod + '/**/*.html', ['build-html']);

  gulp.watch('./dist/*', browserSync.reload);
});