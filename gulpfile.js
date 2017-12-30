var gulp = require('gulp');
var rename = require('gulp-rename');
var pump = require('pump')

var scssInput = './src/scss/**/*.scss';
var scssOutput = './dist/css';

var jsInput = './src/js/**/*.js';
var jsOutput = './dist/js/';

var testOutput = './test';

/////////////////////
/////////CSS/////////
/////////////////////
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var sassdoc = require('sassdoc');

gulp.task('sass', function (cb) {
   pump([
      gulp.src(scssInput),
      sourcemaps.init(),
      sass().on('error', onError),
      autoprefixer(),
      gulp.dest(scssOutput),
      sourcemaps.write(),
      gulp.dest(testOutput),
      cleanCss(),
      rename("ceres.min.css"),
      gulp.dest(scssOutput),
   ],cb);
});

gulp.task('sassdoc', function () {
   return gulp
   .src(scssInput)
   .pipe(sassdoc())
   .resume();
});

/////////////////////
/////////JS//////////
/////////////////////
var uglify = require('gulp-uglify');
var concatJS = require('gulp-concat');

gulp.task('js', function (cb) {
   pump([
      gulp.src(jsInput),
      concatJS('ceres.js'),
      gulp.dest(jsOutput),
      gulp.dest(testOutput),
      uglify().on('error', onError),
      rename("ceres.min.js"),
      gulp.dest(jsOutput),
   ],cb);
});

gulp.task('watchCSS', function() {
   return gulp
   .watch(scssInput, ['sass', 'sassdoc']);
});

gulp.task('watchJS', function() {
   return gulp
   .watch(jsInput, ['js']);
});

function onError(err) {
   console.log(err);
   this.emit('end');
}

gulp.task('default', ['js', 'sass', 'sassdoc', 'watchCSS', 'watchJS']);
