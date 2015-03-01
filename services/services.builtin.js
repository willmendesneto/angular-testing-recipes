(function() {
  'use strict';

  angular.module('myApp')
    .service('TimerService', TimerService);

  function TimerService($interval) {

    var intervalId;
    var plusTimer = 300;

    this.log = {
      timer: 0,
      min: 0,
      max: 86399
    };

    this.plus = function(){
      this.log.timer = parseInt(this.log.timer, 10) + plusTimer;
      if(this.log.timer > this.log.max){
          this.log.timer = this.log.max;
      }
    };

    this.repeatPlus = function(){
      this.plus();
      this.repeatCancel(intervalId);
      var self = this;
      intervalId = $interval(function(){
          self.plus();
      }, 200);
    };

    this.repeatCancel = function(){
      $interval.cancel(intervalId);
    };
  }

  TimerService.$inject = ['$interval'];

}());