/* Arrg.js 0.0.1
 * Copyright © 2015 Gion Kunz
 * Free to use under the WTFPL license.
 * http://www.wtfpl.net/
 */
"use strict";

exports.through = through;
exports.xor = xor;
exports.toArray = toArray;
exports.times = times;
exports.extend = extend;
exports.filterBy = filterBy;
exports.circularIndex = circularIndex;
function through(r) {
  return function (v) {
    return r || v;
  };
}

function xor(a, b) {
  return a ? !b : b;
}

function toArray(list) {
  return Array.prototype.slice.call(list);
}

function times(n) {
  return Array.apply(null, new Array(n));
}

function extend(target) {
  target = target || {};

  var sources = Array.prototype.slice.call(arguments, 1);
  sources.forEach(function (source) {
    for (var prop in source) {
      if (typeof source[prop] === "object" && !(source[prop] instanceof Array)) {
        target[prop] = extend.extend(target[prop], source[prop]);
      } else {
        target[prop] = source[prop];
      }
    }
  });

  return target;
}

function filterBy(key, value) {
  return function (elem) {
    return elem[key] === value;
  };
}

function circularIndex(length, index) {
  return index < 0 ? (length + index % length) % length : index % length;
}
Object.defineProperty(exports, "__esModule", {
  value: true
});