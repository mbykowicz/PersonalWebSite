var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

//variables
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

var sass_options = "{outputStyle: 'compressed'}";

var input = "/dev/source/sass/source/app.sass";
var output = "/dev/source/sass/compiled/";

//build
gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output))
    .pipe(browserSync.stream());
});

//watch
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./dev"
    });

    gulp.watch(input, ['sass']);
    gulp.watch("dev/*.html").on('change', browserSync.reload);
});

//default task
gulp.task('default', ['serve']);
