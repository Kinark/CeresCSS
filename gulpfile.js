var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-clean-css');
var rename = require('gulp-rename');

var input = './src/**/*.scss';
var output = './dist/css';

gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sass())
    .on('error', onError)
    .pipe(autoprefixer())
    .pipe(gulp.dest(output))
    .pipe(minify())
    .pipe(rename("ceres.min.css"))
    .pipe(gulp.dest(output));
});

gulp.task('watch', function() {
  return gulp
    .watch(input, ['sass']);
});

function onError(err) {
  console.log(err);
  this.emit('end');
}

gulp.task('default', ['sass', 'watch']);
