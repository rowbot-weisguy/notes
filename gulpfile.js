// Lots borrowed from http://www.mikestreety.co.uk/blog/an-advanced-gulpjs-file
// Path configs first

var basePaths = {
    src: './app/assets/',
    dest: './public/assets/'
};
var paths = {
    html: {
        src: './app/',
        dest: './public/',
    },
    images: {
        src: basePaths.src + 'images/',
        dest: basePaths.dest + 'images/min/'
    },
    icons: {
        src: basePaths.src + 'font/',
        dest: basePaths.dest + 'font/'
    },
    scripts: {
        src: basePaths.src + 'js/',
        dest: basePaths.dest + 'js/min/'
    },
    styles: {
        src: basePaths.src + 'sass/',
        dest: basePaths.dest + 'css/min/'
    }
};

var appFiles = {
    html: paths.html.src + '**/*.html',
    styles: paths.styles.src + '**/*.scss',
    icons: paths.icons.src + '**/*.*',
    scripts: [paths.scripts.src + 'scripts.js']
};

var vendorFiles = {
    styles: '',
    scripts: ''
};

// Gulp stuff begin

var gulp = require('gulp');

var es = require('event-stream');
var gutil = require('gulp-util');
var scsslint = require('gulp-scss-lint');
var browserSync = require('browser-sync').create();

var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

// Allows gulp --dev to be run for a more verbose output
var isProduction = true;
var sassStyle = 'compressed';
var sourceMap = false;

if(gutil.env.dev === true) {
    sassStyle = 'expanded';
    sourceMap = true;
    isProduction = false;
}

var changeEvent = function(evt) {
    gutil.log('File', gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + basePaths.src + ')/'), '')), 'was', gutil.colors.magenta(evt.type));
};

gulp.task('html', function() {
    return gulp.src(appFiles.html)
        .pipe(gulp.dest(paths.html.dest));
});

gulp.task('css', function(){
    var sassFiles = gulp.src(appFiles.styles)
    .pipe(plugins.rubySass({
        style: sassStyle, sourcemap: sourceMap, precision: 2
    }))
    .on('error', function(err){
        new gutil.PluginError('CSS', err, {showStack: true});
    });

    return es.concat(gulp.src(vendorFiles.styles), sassFiles)
        .pipe(plugins.concat('style.min.css'))
        .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(isProduction ? plugins.combineMediaQueries({
            log: true
        }) : gutil.noop())
        .pipe(isProduction ? plugins.cssmin() : gutil.noop())
        .pipe(plugins.size())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
});

gulp.task('icons', function() {
    return gulp.src(appFiles.icons)
        .pipe(gulp.dest(paths.icons.dest));
});

gulp.task('scripts', function(){
    gulp.src(vendorFiles.scripts.concat(appFiles.scripts))
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(isProduction ? plugins.uglify() : gutil.noop())
        .pipe(plugins.size())
        .pipe(gulp.dest(paths.scripts.dest));

});

gulp.task('watch', ['css', 'scripts'], function(){
    gulp.watch(appFiles.styles, ['css']).on('change', function(evt) {
        changeEvent(evt);
    });
    gulp.watch(paths.scripts.src + '*.js', ['scripts']).on('change', function(evt) {
        changeEvent(evt);
    });
});


gulp.task('scss-lint', function() {
  return gulp.src(appFiles.styles)
    .pipe(scsslint());
});

// Static Server + watching scss/html files
gulp.task('serve', ['css'], function() {

    browserSync.init({
        server: "./public"
    });

    gulp.watch(appFiles.styles, ['css']).on('change', function(evt) {
        changeEvent(evt);
    });
    gulp.watch(appFiles.html, ['html']).on('change', function(evt) {
        changeEvent(evt);
    });
    gulp.watch(appFiles.scripts, ['scripts']).on('change', function(evt) {
        changeEvent(evt);
    });
    gulp.watch(appFiles.html).on('change', browserSync.reload);
    gulp.watch(appFiles.scripts).on('change', browserSync.reload);
});

gulp.task('build', ['html', 'css', 'icons', 'scripts']);
gulp.task('default', ['build', 'serve']);