var pkg = require('./package.json');
var banner = {
  pkg: pkg,
  year: new Date().getFullYear()
};

// General stuff
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var header = require('gulp-header');

// ES6 to commonjs for node dist
var gulp = require('gulp');
var buffer = require('vinyl-buffer');
var to5 = require('gulp-6to5');
var mocha = require('gulp-mocha');

// Browser stuff
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var to5ify = require('6to5ify');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');

gulp.task('dist:commonjs', function () {
  return gulp.src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(to5())
    .pipe(header(pkg.config.banner, banner))
    .pipe(gulp.dest('./dist/commonjs'));
});

gulp.task('dist:browser', function() {
  browserify('./src/arrgh-browser.js', { debug: true })
    .transform(to5ify.configure({
      only: /src/
    }))
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('arrgh.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist/browser'))
    .pipe(rename('arrgh.min.js'))
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/browser'));
});

gulp.task('banner', ['dist:browser'], function() {
  gulp.src('./dist/browser/*.js')
    .pipe(header(pkg.config.banner, banner))
    .pipe(gulp.dest('./dist/browser'));
});

gulp.task('test', ['dist:commonjs'], function () {
  return gulp.src('./test/*.js', {
    read: false
  }).pipe(mocha({
    reporter: 'nyan'
  }));
});

gulp.task('default', ['dist:commonjs', 'dist:browser', 'banner', 'test']);
