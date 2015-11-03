var gulp = require('gulp');
var path = require('path');
var plugins = require('gulp-load-plugins')();
var webpack = require('webpack-stream');

//var port = plugins.util.env.port || 3000;
var src = 'src/';
var dist = 'dist/';

gulp.task('default', ['build','serve','watch']);

gulp.task('build',['clean'], function(){
    return gulp.start('html', 'components', 'resources');
});

gulp.task('clean', function(cb){
    return delete([dist], cb);
});

gulp.task('serve', function(){
    plugins.connect.server({
        root:dist,
        port:3000,
        livereload:{
            port:35729
        }
    });
});

gulp.task('html', function(){
    return gulp.src(src + 'index.html')
        .pipe(gulp.dest(dist))
        .pipe(plugins.size({ title : 'html' }))
        .pipe(plugins.connect.reload());
});

gulp.task('components', function() {
    return gulp.src(src + 'components/**/*')
        .pipe(gulp.dest(dist + 'components'))
        .pipe(plugins.size({ title : 'js' }))
        .pipe(plugins.connect.reload());
});

gulp.task('resources', function(cb) {
    return gulp.src(src + 'resources/**/*')
        .pipe(plugins.size({ title : 'resources' }))
        .pipe(gulp.dest(dist + 'resources'));
});

gulp.task('watch', function(){
    gulp.watch(src + 'index.html', ['html']);
    gulp.watch(src + 'resources/**/*', ['resources']);
    gulp.watch(src + 'actions/**/*', ['actions']);
    gulp.watch(src + 'components/**/*', ['components']);
    gulp.watch(src + 'dispatchers/**/*', ['dispatchers']);
    gulp.watch(src + 'stores/**/*', ['stores']);
    gulp.watch(src + 'views/**/*', ['views']);
});
