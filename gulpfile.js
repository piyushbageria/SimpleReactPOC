var gulp = require('gulp');

var src = 'src/';
var dist = 'dist/';

gulp.task('default', ['build','serve','watch']);

gulp.task('build', ['clean'], function(){
    return gulp.start('html', 'components', 'resources');
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