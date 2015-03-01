var gulp = require('gulp');
var jshint = require('gulp-jshint');

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
  gulp.src(['controllers/*.js', 'directives/*.js', 'decorators/*.js', 'filters/*.js', 'services/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});
