'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var ArrghUtil = require('../dist/commonjs/arrgh-util');
var Arrgh = require('../dist/commonjs/arrgh');

var spyDebug = function(spy) {
  return spy.printf('Called %c with %C');
};

//TODO: Add more tests!

describe('Arrgh', function(){
  describe('arg', function() {
    it('should process un-named arguments with indexed arg calls using circular index correctly', function() {
      var test = function() {
        var arrghuments = Arrgh(arguments, 4)
          .arg(0).is('number').assign(0, ArrghUtil.through())
          .arg(-1).is('number').assign(3, ArrghUtil.through())
          .arg(2).is('number').assign(2, ArrghUtil.through())
          .arg(5).is('number').assign(1, ArrghUtil.through())
          .get();

        expect(arrghuments).to.deep.equal({
          '0': 1,
          '1': 2,
          '2': 3,
          '3': 4
        });
      };

      test(1, 2, 3, 4);
    });
  });

  describe('type check shorthand', function(){
    it('should detect numbers correctly', function() {
      var spy = sinon.spy();

      var test = function() {
        Arrgh(arguments, 1).arg(0).is('number').then(spy);
      };

      test('1');
      test(2);
      test(new Date());
      test(3);
      test(NaN);

      expect(spy.callCount).to.equal(3);
      expect(spy.withArgs({ arg: 2, index: 0 }).calledOnce, spyDebug(spy)).to.be.ok;
      expect(spy.withArgs({ arg: 3, index: 0 }).calledOnce, spyDebug(spy)).to.be.ok;
      expect(spy.withArgs({ arg: NaN, index: 0 }).calledOnce, spyDebug(spy)).to.be.ok;
    });
  });
});
