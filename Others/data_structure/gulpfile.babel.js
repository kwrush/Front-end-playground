import gulp from 'gulp';
import babel from 'gulp-babel';
import karma from 'karma';

// gulp.task('compile', () => {
// 	return gulp.src('src/*.js')
// 			   .pipe(babel({ presets: ['es2015'] }))
// 			   .pipe(gulp.dest('build'));
// });

gulp.task('test', (done) => {
	var karmaServer = new karma.Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, function () {
		done();
	}).start();
});

gulp.task('tdd', (done) => {
	var karmaServer = new karma.Server({
		configFile: __dirname + '/karma.conf.js'
	}, function () {
		done();
	}).start();
});

gulp.task('default', ['compile', 'test']);
