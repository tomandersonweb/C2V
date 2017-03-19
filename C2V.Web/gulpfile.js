/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('browserify', function () {
    gulp.src(['wwwroot/app.js'])
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('wwwroot/dist/js'));
});

var jsSource = 'wwwroot/app/**/*.js',
    jsSourceExclude = '!wwwroot/app/**/*.spec.js',
    jsDestination = 'wwwroot/dist/js';

gulp.task('bundle-app', function () {
    return gulp.src([jsSource, jsSourceExclude])
        .pipe(concat('app-bundle.js'))
        .pipe(gulp.dest(jsDestination))
        .pipe(rename('app-bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDestination));
});

gulp.task('default', ['browserify', 'bundle-app']);