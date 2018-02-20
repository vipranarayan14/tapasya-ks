const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const rename = require('gulp-rename');

const paths = {
  prod: './prod'
};

const buildScripts = (url, dest) => {

  const browserify = require('browserify');
  const uglify = require('gulp-uglify');
  const source = require('vinyl-source-stream');
  const buffer = require('vinyl-buffer');

  browserify(url)
    .transform('babelify')
    .bundle()
    .pipe(source('scripts.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(dest));

};

const buildStyles = (data, dest) => {

  const cssnano = require('gulp-cssnano');
  const less = require('gulp-less');

  data.pipe(less())
    .pipe(cssnano({
      reduceIdents: false,
      zindex: false
    }))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(dest));

};

gulp.task('build-clean', function () {

  const del = require('del');

  return del(
    ['./dist/**/*'], {
      dot: true
    }
  );

});

gulp.task('build-scripts', function () {

  const glob = require('glob');
  const files = glob.sync('./prod/scripts/*.js');

  buildScripts(
    files,
    './dist'
  );

});

gulp.task('build-html', function () {

  const fileInclude = require('gulp-file-include');

  gulp.src(`${paths.prod}/index.html`)
    .pipe(fileInclude())
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./dist'));

});

gulp.task('build-styles', function () {

  buildStyles(
    gulp.src(`${paths.prod}/index.less`),
    './dist'
  );

});

gulp.task('copy-others', function () {

  gulp.src('./prod/images/**/*')
    .pipe(gulp.dest('./dist/images'));

  return gulp.src(
    ['./prod/others/**/*'], {
      dot: true
    }
  ).pipe(gulp.dest('./dist'));

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

gulp.task('start', function () {

  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });

});

gulp.task('watch', ['start'], function () {

  gulp.watch(`${paths.prod}/**/*.less`, ['build-styles']);
  gulp.watch(`${paths.prod}/**/*.js`, ['build-scripts']);
  gulp.watch(`${paths.prod}/**/*.html`, ['build-html']);

  gulp.watch('./dist/*', browserSync.reload);

});
