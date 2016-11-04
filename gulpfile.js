var gulp = require('gulp');
var concat = require('gulp-concat');
var spawn = require('child_process').spawn;

var rimraf = require('rimraf');
var shell = require('gulp-shell')
var runSequence = require('run-sequence');

gulp.task('clean', function(cb) {
  rimraf('./ts_compiled', 
    function() { 
      rimraf('./static/lib', cb) 
      // if this gets complex further, use gulp-rimraf
    });
})

gulp.task('copy-vendor-assets', function() {
  var stylesheets = [
    './node_modules/bootstrap/dist/css/bootstrap.min.css'
  ]

  gulp.src(stylesheets).pipe(concat('vendor.css')).pipe(gulp.dest('./static/lib'))

})

gulp.task('compile', shell.task([
    'tsc'
]));

gulp.task('default', function() {

  var startWatch = function() {
    gulp.watch([
        './app.js',
        'app/**'
      ],function(event) {
          runSequence('copy-vendor-assets','compile','server')
    });
  }

  runSequence('clean', 'copy-vendor-assets', 'compile','server', startWatch)

});

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
var node = null;
gulp.task('server', function() {
  if (node) node.kill()
  node = spawn('node', ['./bin/www'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
})

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
})
