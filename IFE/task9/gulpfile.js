var gulp = require('gulp');
var sass = require('gulp-sass');

var input = 'sass/main.scss';
var output = './css';

gulp.task('styles', function () {
    gulp.src(input)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(output));
});
