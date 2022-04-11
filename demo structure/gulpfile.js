// Dependencies
var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var gzip = require('gulp-gzip');
//var sass = require('gulp-sass');
var notify = require('gulp-notify');
var cssbeautify = require('gulp-cssbeautify');
var mmq = require('gulp-merge-media-queries');
var minify = require('gulp-minify-css');
var sass = require('gulp-sass')(require('sass'));
// Extension Configurations
var jgzconfig = {
    extension: 'jgz'
};

var csgzconfig = {
    extension: 'csgz'
};

// File Paths
var paths = {
    destination: './html/assets/',
    js: [
        './html/assets/source/js/*.js'
    ],
    scss: [
        './html/assets/source/scss/app.scss',
    ],
    printScss: [
        './html/assets/source/scss/print.scss'
    ],
    editorScss: [
        './html/assets/source/scss/editor.scss'
    ],
    watchScss: [
        './html/assets/source/scss/*.scss'
    ]
};

function compileJS(cb) {
    gulp.src(paths.js)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./html/assets/js'))
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('./html/assets/js'))
        .pipe(gzip(jgzconfig))
        .pipe(concat('scripts.jgz'))
        .pipe(gulp.dest('./html/assets/js'))
        .pipe(notify({
            message: "JS processed"
        }));
    cb();
}

function compileSCSS(cb) {
    gulp.src(paths.scss)
        .pipe(sass({
            outputStyle: 'compressed',
            sourceComments: false
        }).on('error', sass.logError))
        .pipe(concat('screen.css'))
        // condense our media queries down
        .pipe(mmq())
        .pipe(cssbeautify())
        .pipe(gulp.dest('./html/assets/css'))
        .pipe(concat('screen'))
        .pipe(minify())
        .pipe(concat('screen.min.css'))
        .pipe(gulp.dest('./html/assets/css'))
        .pipe(gzip(csgzconfig))
        .pipe(gulp.dest('./html/assets/css'))
        //.pipe(gulp.dest('./html/assets/css'))
        .pipe(notify({
            message: "SCSS processed"
        }));

    cb();
}

// Compile Editor SCSS
function printScss(cb) {
    gulp.src(paths.printScss)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('print.css'))
        .pipe(cssbeautify())
        .pipe(gulp.dest('./html/assets/css'))
        .pipe(concat('print'))
        .pipe(minify())
        .pipe(concat('print.min.css'))
        .pipe(gulp.dest('./html/assets/css'))
        .pipe(gzip(csgzconfig))
        .pipe(gulp.dest('./html/assets/css'))
        .pipe(notify({
            message: "Print SCSS processed"
        }));

    cb();
}


// Compile Editor SCSS
function editorScss(cb) {
    gulp.src(paths.editorScss)
    gulp.src(paths.editorScss)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('editor-style.css'))
        .pipe(cssbeautify())
        .pipe(gulp.dest('./html/assets/css'))
        .pipe(concat('editor-style'))
        .pipe(minify())
        .pipe(concat('editor-style.min.css'))
        .pipe(gulp.dest('./html/assets/css'))
        .pipe(gzip(csgzconfig))
        .pipe(gulp.dest('./html/assets/css'))
        .pipe(notify({
            message: "Editor SCSS processed"
        }));

    cb();
}

// Watchers
gulp.watch(paths.js, compileJS);
gulp.watch(paths.watchScss, compileSCSS);
//gulp.watch(paths.watchScss, printScss);
//gulp.watch(paths.watchScss, editorScss);
//exports.default = gulp.parallel(compileJS, compileSCSS, printScss, editorScss);
exports.default = gulp.parallel(compileJS, compileSCSS);