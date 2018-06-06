const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const rename = require('gulp-rename');
const git = require('gulp-git');

const paths = {
  dist: '../tks-dist',
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

  };

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

const clog = msg => console.log(msg); /* eslint-disable-line no-console */

const dirs = url => {

  const fs = require('fs');
  const path = require('path');

  return fs.readdirSync(url)
    .filter(f => fs
      .statSync(path.join(url, f))
      .isDirectory()
    );

};

const getCurrentBranch = () => new Promise(resolve => {

  git.revParse({ args: '--abbrev-ref HEAD' }, (err, branch) => resolve(branch.trim()));

});

gulp.task('build-clean', () => {

  const del = require('del');

  return del(
    [
      `${paths.dist}/**/*`,
      `!${paths.dist}`,
      '!.git'
    ], {
      force: true
    }
  );

});

gulp.task('build-scripts', () => {

  buildScripts(`${paths.prod}/scripts/*.js`, paths.dist);

});

gulp.task('build-html', () => {

  buildHtml(`${paths.prod}/index.html`, paths.dist);

});

gulp.task('build-styles', () =>

  buildStyles(`${paths.prod}/index.less`, paths.dist)

);

gulp.task('build-pages', () => {

  dirs(paths.pages).forEach(dir => {

    const dest = `${paths.dist}/pages/${dir}`;

    buildScripts(`${paths.pages}/${dir}/*.js`, dest);

    buildStyles(`${paths.pages}/${dir}/index.less`, dest);

    buildHtml(`${paths.pages}/${dir}/index.html`, dest);

  });

});

gulp.task('copy-others', () => {

  const preservetime = require('gulp-preservetime');

  gulp.src('./prod/images/processed/**/*')
    .pipe(gulp.dest(`${paths.dist}/images`))
    .pipe(preservetime());

  return gulp.src(['./prod/others/**/*'], { dot: true })
    .pipe(gulp.dest(paths.dist))
    .pipe(preservetime());

});

gulp.task('build', done => {

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

gulp.task('start', () => {

  browserSync.init({
    server: {
      baseDir: paths.dist
    }
  });

});

gulp.task('watch', ['start'], () => {

  // gulp.watch(`${paths.prod}/**/*.less`, ['build-styles']);
  // gulp.watch(`${paths.prod}/**/*.js`, ['build-scripts']);
  // gulp.watch(`${paths.prod}/**/*.html`, ['build-html']);

  gulp.watch(`${paths.dist}/*`, browserSync.reload);

});

gulp.task('deploy', () => {

  getCurrentBranch().then(branch => {

    clog(`current git branch: ${branch}`);

    git.push('origin', branch, err => {

      if (err) {

        throw err;

      }

    });

    git.push('server', branch, err => {

      if (err) {

        throw err;

      }

    });

  });

});
