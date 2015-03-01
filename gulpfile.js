var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var _ = require('lodash');
var karma = require('karma').server;
var karmaConf = require('./karma.conf.js');

gulp.task('test', function(done) {
  karma.start(_.assign({}, karmaConf, { singleRun: true }), done);
});

gulp.task('tdd', function(done) {
  karma.start(karmaConf, done);
});

gulp.task('jshint', function() {
  return gulp.src('./{controllers,decorators,directives,filters,services}/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('default', ['jshint', 'test']);