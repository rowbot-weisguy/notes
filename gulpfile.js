var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('styles', function() {
    gulp.src('app/source/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/styles'))
        .pipe(reload({ stream:true }));
});

gulp.task('watch', function() {
    gulp.watch('app/source/sass/**/*.scss', ['styles']);
});

gulp.task('serve', ['styles'], function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });

    gulp.watch('app/source/sass/**/*.scss', ['styles']);
});