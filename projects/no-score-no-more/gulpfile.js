/*
 to start with gulp
 npm install --global gulp
 npm install gulp --save-dev
 ** install plugins like this:
 npm install gulp-less --save-dev
 * */

//set dir path as you need
var templatedir = "./";
//var node_mod_dir = './node_modules/'; //for internal development, or set path as you need


var gulp = require('gulp'),// we just install gulp in project dir and try to use other modules from a centralized node modules dir, but if you need you can install in root of your project
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),
    watch = require('gulp-watch'),
    minify = require('gulp-minify'),
    injectPartials = require('gulp-inject-partials');

/* Task to compile less */
gulp.task('compile-less', function () {
    var less_tasks = [];
    var default_less = gulp.src(templatedir + 'src/assets/less/style-default.less')
        .pipe(less())
        .pipe(gulp.dest(templatedir + 'src/assets/css/')).on('end', function () {
            var default_less2 = gulp.src(templatedir + 'src/assets/css/style-default.css')
                .pipe(minifyCss().on('error', function (err) {
                    console.log(err);
                }))
                .pipe(rename({suffix: '.min'}))
                .pipe(gulp.dest(templatedir + 'src/assets/css/'));
            less_tasks.push(default_less2);
        });
    return less_tasks;
});

gulp.task('compress-js', function () {
    gulp.src(templatedir + 'src/assets/js/script.js')
        .pipe(minify({
            ext: {
                // src:'-debug.js',
                min: '.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest(templatedir + 'src/assets/js'));
});

/* Task to watch less changes */
gulp.task('watch-less', ['compile-less'], function () {
    //watch less file
    gulp.watch(templatedir + 'src/assets/less/*.less', ['compile-less']);
    gulp.watch(templatedir + 'src/assets/less/mixins/*.less', ['compile-less']);
    gulp.watch(templatedir + 'src/assets/less/variation/*.less', ['compile-less']);
    //watch js file
    gulp.watch(templatedir + 'src/assets/js/theme.js', ['compress-js']);
    //compile html and output to src folder
    gulp.watch(templatedir + 'generator/*.html', ['compile-html']);
    gulp.watch(templatedir + 'generator/partial/*.html', ['compile-html']);
});

gulp.task('compile-html', function () {
    var variation = [
        "*.html"
    ];
    var less_tasks = [];
    variation.forEach(function (filename) {
        var temp = gulp.src('./generator/' + filename)
            .pipe(injectPartials({
                removeTags: true
            }))
            .pipe(gulp.dest('./src'));
        less_tasks.push(temp);
    });
    return less_tasks;
});


/* Task when running `gulp` from terminal */
gulp.task('default', ['watch-less', 'compress-js', 'compile-html']);
