
var gulp            = require('gulp');
var gulpFilter      = require('gulp-filter')
var concat          = require('gulp-concat');
var sass            = require('gulp-sass');
var jade            = require('gulp-jade');
var ts              = require('gulp-typescript');
var mainBowerFiles  = require('gulp-main-bower-files');
var uglify          = require('gulp-uglify');

var sourcemaps      = require('gulp-sourcemaps');
var rename          = require('gulp-rename');
var debug           = require('gulp-debug');
var connect         = require('gulp-connect');

var appFolder  = 'app';
var distFolder = 'dist';

var path = {
    scripts : {
        src  : appFolder + '/typescripts/**/*.ts',
        out  : 'main.js',
        dest : distFolder + '/js/',
        vendor: 'vendor.js'
    },
    styles  : {
        src  : appFolder + '/styles/**/*.scss',
        dest : distFolder + '/css/',
    },
    views   : {
        src  : appFolder + '/views/**/*.jade',
        dest : distFolder + '/'
    },
};

gulp.task( 'webserver', function() {
    connect.server({
        root: distFolder,
        livereload: true,
        directoryListing: true
    });
});
 
gulp.task( 'main-bower-files', function() {
    return gulp.src( './bower.json' )
        .pipe( mainBowerFiles() )
        .pipe( concat( path.scripts.vendor ))
        .pipe( uglify() )
        .pipe( gulp.dest( path.scripts.dest) );
});

//TO-DO:
//watch all typescript files and reload on save
gulp.task( 'scripts', function () {
    return gulp.src( path.scripts.src )
        .pipe( sourcemaps.init() )
        .pipe( ts( {
			          out: path.scripts.out,
                   target: "ES6",
			noImplicitAny: true,
		}))
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( path.scripts.dest ))
        .pipe( connect.reload() );
});

gulp.task( 'styles', function () {
    return gulp.src( path.styles.src )
        .pipe( sourcemaps.init() )
        .pipe( sass().on( 'error', sass.logError) )
        .pipe( sass( { outputStyle: 'compressed' } ))
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( path.styles.dest ))
        .pipe( connect.reload() );
});

gulp.task( 'views', function() {
    return gulp.src(path.views.src)
        .pipe( jade( { pretty: false } ))
        .pipe( gulp.dest( path.views.dest ))
        .pipe( connect.reload() );
});

gulp.task('watch', function () {

    gulp.watch( path.views.src, [ 'views' ] );
    gulp.watch( path.styles.src, [ 'styles' ] );
    gulp.watch( path.scripts.src, [ 'scripts' ] );
});

gulp.task( 'default', [
        'main-bower-files', 
        'scripts', 
        'styles', 
        'views', 
        'webserver', 
        'watch'
    ] );
