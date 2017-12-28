var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-clean-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var sassdoc = require('sassdoc');

var input = './src/**/*.scss';
var output = './dist/css';
var testOutput = './test';

gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sourcemaps.init())
    .pipe(sass()).on('error', onError)
    .pipe(autoprefixer())
    .pipe(gulp.dest(output))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(testOutput))
    .pipe(minify())
    .pipe(rename("ceres.min.css"))
    .pipe(gulp.dest(output));
});

gulp.task('sassdoc', function () {
  return gulp
    .src(input)
    .pipe(sassdoc())
    .resume();
});

gulp.task('watch', function() {
  return gulp
    .watch(input, ['sass', 'sassdoc']);
});

function onError(err) {
  console.log(err);
  this.emit('end');
}

gulp.task('default', ['sass', 'sassdoc', 'watch']);
