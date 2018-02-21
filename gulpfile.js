const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const rename = require('gulp-rename');

const paths = {
  pages: './prod/pages',
  prod: './prod'
};

const buildHtml = (src, dest) => {

  if (!src) {

    return;

  }

  const fileInclude = require('gulp-file-include');

  gulp.src(src)
    .pipe(fileInclude())
    .pipe(rename('index.html'))
    .pipe(gulp.dest(dest));

};

const buildScripts = (src, dest) => {

  const glob = require('glob');
  const files = glob.sync(src);

  if (!files.length) {

    return;

  }

  const browserify = require('browserify');
  const uglify = require('gulp-uglify');
  const source = require('vinyl-source-stream');
  const buffer = require('vinyl-buffer');

  browserify(files)
    .transform('babelify')
    .bundle()
    .pipe(source('scripts.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(dest));

};

const buildStyles = (src, dest) => {

  if (!src) {

    return;

  }

  const cssnano = require('gulp-cssnano');
  const less = require('gulp-less');

  gulp.src(src)
    .pipe(less())
    .pipe(cssnano({
      reduceIdents: false,
      zindex: false
    }))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(dest));

};

const dirs = url => {

  const fs = require('fs');
  const path = require('path');

  return fs.readdirSync(url)
    .filter(f => fs
      .statSync(path.join(url, f))
      .isDirectory()
    );

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

  buildScripts(`${paths.prod}/scripts/*.js`, './dist');

});

gulp.task('build-html', function () {

  buildHtml(`${paths.prod}/index.html`, './dist');

});

gulp.task('build-styles', function () {

  buildStyles(`${paths.prod}/index.less`, './dist');

});

gulp.task('build-pages', () => {

  dirs(paths.pages).forEach(dir => {

    const dest = `dist/pages/${dir}`;

    buildScripts(`${paths.pages}/${dir}/*.js`, dest);

    buildStyles(`${paths.pages}/${dir}/index.less`, dest);

    buildHtml(`${paths.pages}/${dir}/index.html`, dest);

  });

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
    'build-pages',
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
