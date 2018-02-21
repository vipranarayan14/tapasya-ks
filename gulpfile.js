const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const rename = require('gulp-rename');

const paths = {
  pages: './prod/pages',
  prod: './prod'
};

const buildScripts = (files, dest) => {

  const browserify = require('browserify');
  const uglify = require('gulp-uglify');
  const source = require('vinyl-source-stream');
  const buffer = require('vinyl-buffer');

  if (!files.length) {

    return;

  }

  browserify(files)
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

  if (!data) {

    return;

  }

  data.pipe(less())
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

  const glob = require('glob');
  const files = glob.sync(`${paths.prod}/scripts/*.js`);

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

gulp.task('build-pages', () => {

  const glob = require('glob');
  const fileInclude = require('gulp-file-include');

  dirs(paths.pages).forEach(dir => {

    const scriptFiles = glob.sync(`${paths.pages}/${dir}/*.js`);
    const indexFile = glob.sync(`${paths.pages}/${dir}/index.html`);
    const styleFile = glob.sync(`${paths.pages}/${dir}/index.less`);

    buildScripts(
      scriptFiles,
      `dist/pages/${dir}`
    );

    buildStyles(
      gulp.src(styleFile),
      `dist/pages/${dir}`
    );

    if (indexFile) {

      gulp.src(indexFile)
        .pipe(fileInclude())
        .pipe(rename('index.html'))
        .pipe(gulp.dest(`dist/pages/${dir}`));

    }

  });

});

gulp.task('build', function (done) {

  const runSequence = require('run-sequence');

  runSequence(
    'build-clean',
    'build-scripts',
    'build-html',
    'build-styles',
    'copy-others',
    'build-pages',
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
