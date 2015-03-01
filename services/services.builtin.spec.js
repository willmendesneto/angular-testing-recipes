describe('Controller: TimerService', function () {
  'use strict';

  var TimerService,
    $interval,
    defaultLog = {
      timer: 0,
      min: 0,
      max: 86399
    };

  beforeEach(module('myApp'));

  beforeEach(inject(function (_TimerService_, _$interval_) {
    $interval = _$interval_;
    TimerService = _TimerService_;
  }));

  it('should set the default log object', function () {
    expect(TimerService.log).toEqual(defaultLog);
  });

  describe('plus method', function(){
    it('should be add 300 seconds to timer', function () {
      TimerService.plus();
      expect(TimerService.log.timer).toEqual(300);
    });

    it('should be add 300 seconds to timer considering the max value permitted', function () {
      TimerService.log.timer = 86300;
      TimerService.plus();
      expect(TimerService.log.timer).toEqual(defaultLog.max);
    });
  });

  describe('repeatPlus method', function(){
    it('should be add 1500 seconds to timer after 1 seconds', function () {
      TimerService.repeatPlus();
      $interval.flush(800);
      TimerService.repeatCancel();
      expect(TimerService.log.timer).toEqual(1500);
    });
  });

});