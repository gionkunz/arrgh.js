'use strict';

var expect = require('chai').expect;
var ArrghUtil = require('../dist/commonjs/arrgh-util');

//TODO: Add more tests!

describe('Arrgh Util', function(){
  describe('through', function(){
    it('should return value that was passed to function', function() {
      expect(ArrghUtil.through(1000)()).to.equal(1000);
    });
  });
});
