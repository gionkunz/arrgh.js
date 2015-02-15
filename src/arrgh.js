'use strict';

import * as ArrghUtil from './arrgh-util';

export default function Arrgh(args, countOrNames) {
  args = ArrghUtil.toArray(args);

  if (typeof countOrNames === 'number') {
    countOrNames = ArrghUtil.times(countOrNames).map(function (e, index) {
      return index;
    });
  }

  var arrgs = countOrNames.map(function (name, index) {
    return {
      index: index,
      name: name
    };
  });

  var assignFactory = function (ctx) {
    return function (indexOrKey, cb) {
      var filterKey = typeof indexOrKey === 'number' ? 'index' : 'name';
      var arrg = arrgs.filter(ArrghUtil.filterBy(filterKey, indexOrKey))[0];

      if (!arrg) {
        throw new Error('Arrgument with ' + filterKey + ' ' + indexOrKey + ' not found in arrgument list ' + JSON.stringify(arrgs));
      }

      arrg.value = cb(ctx.arg, ctx);

      return api;
    };
  };

  var throwFactory = function () {
    return function (error) {
      throw new Error(error);
    };
  };

  var thenFactory = function (ctx) {
    return function (cb) {
      cb(ctx);
    };
  };

  var isTypeFactory = function (ctx, negate) {
    return function (type) {
      var shouldTrigger = ArrghUtil.xor(negate, typeof ctx.arg === type);

      return {
        assign: shouldTrigger ? assignFactory(ctx) : ArrghUtil.through(api),
        throw: shouldTrigger ? throwFactory(ctx) : ArrghUtil.through(api),
        then: shouldTrigger ? thenFactory(ctx) : ArrghUtil.through(api)
      };
    };
  };

  var checkFactory = function (ctx) {
    return function (cb) {
      var checkResult = cb(ctx.arg, ctx);

      return {
        assign: checkResult ? assignFactory(ctx) : ArrghUtil.through(api),
        throw: checkResult ? throwFactory(ctx) : ArrghUtil.through(api),
        then: checkResult ? thenFactory(ctx) : ArrghUtil.through(api)
      };
    };
  };

  var api = {
    arg: function (index) {
      index = ArrghUtil.circularIndex(args.length, index);

      var ctx = {
        arg: args[index],
        index: index
      };

      return {
        is: isTypeFactory(ctx),
        isNot: isTypeFactory(ctx, true),
        check: checkFactory(ctx)
      };
    },
    varArg: function (startIndex, endIndex) {
      startIndex = ArrghUtil.circularIndex(args.length, startIndex);
      endIndex = endIndex || args.length;

      var ctx = {
        startIndex: startIndex,
        endIndex: endIndex,
        arg: args.slice().splice(startIndex, endIndex)
      };

      return {
        assign: assignFactory(ctx),
        then: thenFactory(ctx)
      };
    },
    get: function () {
      return arrgs.reduce(function (result, arrg) {
        result[arrg.name] = arrg.value || args[arrg.index];
        return result;
      }, {});
    }
  };

  return api;
}
