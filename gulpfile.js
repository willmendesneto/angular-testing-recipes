var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var _ = require('lodash');
var karma = require('karma').server;
var karmaConf = require('./karma.conf.js');
var map = require('map-stream');
var exitCode = 0;
var totalLintErrors = 0;

function lintOnEnd() {
  var errString = totalLintErrors + '';
  if (exitCode) {
    console.log(gutil.colors.magenta(errString), 'errors\n');
    gutil.beep();
  }
}

gulp.task('test', function(done) {
  karma.start(_.assign({}, karmaConf, { singleRun: true }), done);
});

gulp.task('tdd', function(done) {
  karma.start(karmaConf, done);
});

gulp.task('jshint', function() {
  return gulp.src('./{controllers,decorators,directives,filters,services}/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(map(function (file, cb) {
      if (!file.jshint.success) {
        totalLintErrors += file.jshint.results.length;
        exitCode = 1;
      }
      cb(null, file);
    }))
    .on('end', function () {
      lintOnEnd();
      if (exitCode) {
        process.emit('exit');
      }
    });
});

process.on('exit', function () {
  process.nextTick(function () {
    var msg = "gulp '" + gulp.seq + "' failed";
    console.log(gutil.colors.red(msg));
    process.exit(exitCode);
  });
});

gulp.task('default', ['jshint', 'test']);