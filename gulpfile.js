'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./styling/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./styling/css'));
});

gulp.task('default', ['sass']);

gulp.task('sass:watch', function () {
  gulp.watch('./styling/sass/**/*.scss', ['sass']);
});

