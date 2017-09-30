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
const runSequence = require('run-sequence');
const rimraf = require('rimraf');

gulp.task('build-clean', function () {

  // return rimraf('./dist/**/*', function () { console.log("Cleaned 'dist'."); });
});

gulp.task('build-html', function () {

  gulp.src('./prod/index.html')
    .pipe(fileInclude())
    .pipe(gulp.dest('./dist'));

  return gulp.src('./prod/views/gallery/index.html')
    .pipe(fileInclude())
    .pipe(gulp.dest('./dist/gallery'));
});

gulp.task('build-styles', function () {

  gulp.src('./prod/styles/index.less')
    .pipe(less())
    .pipe(purifycss(['./dist/index.html', './dist/scripts.min.js']))
    .pipe(cssnano())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./dist'));

  return gulp.src('./prod/styles/gallery/index.less')
    .pipe(less())
    .pipe(cssnano({
      zindex: false,
      reduceIdents: false
    }))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./dist/gallery'));
});

gulp.task('build-scripts', function () {

  gulp.src([
    './prod/scripts/hash-router.js',
    './prod/scripts/main.js'
  ])
    .pipe(concat('scripts.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));

  return gulp.src([
    './prod/scripts/gallery/*.js',
  ])
    .pipe(concat('scripts.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
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

  gulp.watch('./prod/styles/**/*.less', ['build-styles']);
  gulp.watch('./prod/scripts/**/*.js', ['build-scripts']);
  gulp.watch('./prod/views/**/*.html', ['build-html']);

  gulp.watch('./dist/*', browserSync.reload);
});