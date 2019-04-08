var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require("browser-sync");

 
gulp.task('server', function(done) {
  return browserSync.init({
    server: {
      baseDir: '.'
    }
  })
  done();
})

gulp.task('watch', gulp.task('server'), function (done) {
	gulp.watch('./css/**/*.scss', gulp.task('sass'));
	gulp.watch('./css/**/*.css', gulp.task('bs-reload'));
	gulp.watch('./*.html', gulp.task('bs-reload'));
  gulp.watch('./script/**/*.js', gulp.task('bs-reload'));
  
  done();
});

gulp.task('sass', function (done) {
	gulp.src('./css/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		// .pipe(sourcemaps.write({includeContent: false}))
		// .pipe(sourcemaps.init({loadMaps: true}))
		.pipe(autoprefixer(['last 3 versions', 'ie >= 8', 'Android >= 4', 'iOS >= 8']))
		// .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css/'));

    done();
});


gulp.task('bs-reload', function(done) {
  browserSync.reload();
  done();
})

gulp.task('default', gulp.task('sass'));