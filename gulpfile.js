const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const rename = require('gulp-rename');

const paths = {
  prod: './prod/views',
  gallery: './prod/views/gallery/gallery-ext'
};

gulp.task('browserSync', function () {

  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
});

gulp.task('build', function (done) {

  const runSequence = require('run-sequence');

  runSequence(
    'build-clean',
    'build-scripts',
    'build-html',
    'build-styles',
    'copy-others',
    done
  );
});

gulp.task('build-clean', function () {

  const del = require('del');

  return del(['./dist/**/*']);
});

gulp.task('build-scripts', function () {

  buildScripts(

    gulp.src([
      './prod/libs/*.js',
      paths.prod + '/main/*.js'
    ]),

    './dist'
  );

  return buildScripts(

    gulp.src([
      paths.gallery + '/**/*.js',
    ]),

    './dist/gallery'
  );
});

gulp.task('build-html', function () {

  const fileInclude = require('gulp-file-include');

  gulp.src(paths.prod + '/main/main.html')
    .pipe(fileInclude())
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./dist'));

  return gulp.src(paths.gallery + '/index.html')
    .pipe(fileInclude())
    .pipe(gulp.dest('./dist/gallery'));
});

gulp.task('build-styles', function () {

  const cssnano = require('gulp-cssnano');
  const less = require('gulp-less');
  const purifycss = require('gulp-purifycss');

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

gulp.task('copy-others', function () {

  gulp.src('./prod/images/**/*')
    .pipe(gulp.dest('./dist/images'));

  return gulp.src('./prod/others/**/*')
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['browserSync'], function () {

  gulp.watch(paths.prod + '/**/*.less', ['build-styles']);
  gulp.watch(paths.prod + '/**/*.js', ['build-scripts']);
  gulp.watch(paths.prod + '/**/*.html', ['build-html']);

  gulp.watch('./dist/*', browserSync.reload);
});

function buildScripts(data, dest) {

  const babel = require('gulp-babel');
  const concat = require('gulp-concat');
  const uglify = require('gulp-uglify');

  data.pipe(concat('scripts.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dest));
} 