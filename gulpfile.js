var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('serve',['bootstrap'], function() {

    browserSync.init({
        server: {
            baseDir: "./web"
        }
    });

    gulp.watch("web/css/*.css",['css']);
    gulp.watch("web/js/*.js").on('change', browserSync.reload);
    gulp.watch("web/*.html").on('change', browserSync.reload);
});

gulp.task('css', function() {
    return gulp.src("web/css/style.css")
        .pipe(browserSync.stream());
});

gulp.task('bootstrap', function() {
    
    gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/ie10-viewport-bug-workaround/dist/*.min.css'
    ])
    .pipe( gulp.dest('./web/css') );

    gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/tether/dist/js/tether.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/ie10-viewport-bug-workaround/dist/*.min.js'
    ])
    .pipe( gulp.dest('./web/js') );

});

gulp.task('default', ['serve']);