var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var _ = require('lodash');
var Server = require('karma').Server;
var karmaConf = require('./karma.conf.js');
var map = require('map-stream');
var exitCode = 0;
var totalLintErrors = 0;
var coveralls = require('gulp-coveralls');

function lintOnEnd() {
  var errString = totalLintErrors + '';
  if (exitCode) {
    console.log(gutil.colors.magenta(errString), 'errors\n');
    gutil.beep();
  }
}

gulp.task('test', function(done) {
  var server = new Server(_.assign({}, karmaConf, { singleRun: true }), done);
  server.start();
});

gulp.task('tdd', function(done) {
  var server = new Server(karmaConf, done);
  server.start();
});

gulp.task('jshint', function() {
  return gulp.src('./{controllers,decorators,directives,filters,services,routes}/*.js')
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

gulp.task('test-coverage', ['test'], function() {
  gulp.src('./coverage/report-lcov/lcov.info')
    .pipe(coveralls());
});

process.on('exit', function () {
  process.nextTick(function () {
    var msg = "gulp '" + gulp.seq + "' failed";
    console.log(gutil.colors.red(msg));
    process.exit(exitCode);
  });
});

gulp.task('default', ['jshint', 'test-coverage']);
