var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    eslint = require('gulp-eslint'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify');

var plumberErrorHandler = {
  errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
  })
};

gulp.task('scripts', ['lint'], function() {
    gulp.src('./scripts/*.js')
       // .pipe(plumber(plumberErrorHandler))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js' }))
        .pipe(gulp.dest('./build/js'))
        .pipe(notify("Hello Gulp!"));
});

gulp.task('lint', function(){
    return gulp.src(['js/*.js'])
        .pipe(plumber(plumberErrorHandler))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
//gulp.task('sass', function(){});

gulp.task('browser-sync', function(){
    browserSync.init ({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(['styles/*.css', 'build/js/*.js', 'index.html']).on('change', browserSync.reload);
});



gulp.task('watch', function() {
   gulp.watch('scripts/*.js', ['scripts']);
});

gulp.task('default', ['watch', 'browser-sync', 'lint']);