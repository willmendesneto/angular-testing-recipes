var gulp = require('gulp');
var _ = require('lodash');

var karma = require('karma').server;
var karmaConf = require('./karma.conf.js');

gulp.task('test', function(done) {
  karma.start(_.assign({}, karmaConf, { singleRun: true }), done);
});

gulp.task('tdd', function(done) {
  karma.start(karmaConf, done);
});
