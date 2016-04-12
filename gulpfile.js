var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');

var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var scsslint = require('gulp-scss-lint');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback')

// Paths config
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
        dest: basePaths.dest + 'images/'
    },
    fonts: {
        src: basePaths.src + 'font/',
        dest: basePaths.dest + 'font/'
    },
    scripts: {
        src: basePaths.src + 'js/',
        dest: basePaths.dest + 'js/'
    },
    styles: {
        src: basePaths.src + 'sass/',
        dest: basePaths.dest + 'css/'
    }
};
var appFiles = {
    html: paths.html.src + '**/*.html',
    styles: paths.styles.src + '**/*.scss',
    fonts: paths.fonts.src + '**/*.*',
    scripts: paths.scripts.src + 'main.js'
};

/*
  Styles Task
*/

gulp.task('html', function() {
    return gulp.src(appFiles.html)
        .pipe(gulp.dest(paths.html.dest));
});

gulp.task('fonts', function(){
    gulp.src(appFiles.fonts)
        .pipe(gulp.dest(paths.fonts.dest));
});

gulp.task('styles', function(){
    return sass(appFiles.styles, { sourcemap: true, precision: 2 })
        .on('error', handleErrors)
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(reload({stream:true}));
});

/*
  Browser Sync
*/
gulp.task('browser-sync', function() {
    browserSync({
        // we need to disable clicks and forms for when we test multiple rooms
        server : { baseDir: paths.html.dest },
        middleware : [ historyApiFallback() ],
        ghostMode: false
    });
});

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {
  var props = {
    entries: [paths.scripts.src + file],
    debug : true,
    cache: {},
    packageCache: {},
    transform:  [babelify.configure({stage : 0 })]
  };

  // watchify() if watch requested, otherwise run browserify() once
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest(paths.scripts.dest))
      // If you also want to uglify it
      // .pipe(buffer())
      // .pipe(uglify())
      // .pipe(rename('app.min.js'))
      // .pipe(gulp.dest('./build'))
      .pipe(reload({stream:true}))
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

gulp.task('scripts', function() {
  return buildScript('main.js', false); // this will run once because we set watch to false
});

// run 'scripts' task first, then watch for future changes
gulp.task('default', ['html','fonts','styles','scripts','browser-sync'], function() {
  gulp.watch(paths.styles.src, ['styles']); // gulp watch for sass changes
  // gulp.watch(paths.html.src, ['html']); // gulp watch for html changes
  return buildScript('main.js', true); // browserify watch for JS changes
});

/*
  Style Linter
*/
gulp.task('scss-lint', function() {
  return gulp.src(appFiles.styles)
    .pipe(scsslint());
});
