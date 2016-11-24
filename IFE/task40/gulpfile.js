var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('js', function () {
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest('build/'));
});

gulp.task('build-js', function () {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/'));
});

gulp.task('sass', function () {
    return gulp.src('src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css/'));
});

gulp.task('build-css', function () {
    return gulp.src(['lib/css/normalize.css', 'src/css/main.css'])
        .pipe(concat('calendar.css'))
        .pipe(gulp.dest('.build/'));
});

gulp.task('build', ['build-js', 'sass', 'build-css'], function () {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/'));
});



// gulp.task('sass', function () {
//     return gulp.src('src/scss/calendar.scss')
//                .pipe(sass())
//                .pipe(gulp.dest('build/css/'));
// });
