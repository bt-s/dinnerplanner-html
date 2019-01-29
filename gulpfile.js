'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./styling/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe(csso())
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', function() {
  return gulp.src('./js/**/*.js')
    .pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(rename(function (path) {
      path.extname = ".js.min";
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['sass', 'js']);

gulp.task('sass:watch', function () {
  gulp.watch('./styling/sass/**/*.scss', ['sass']);
});

