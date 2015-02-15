'use strict';

export function through(r) {
  return function (v) {
    return r || v;
  };
}

export function xor(a, b) {
  return a ? !b : b;
}

export function toArray(list) {
  return Array.prototype.slice.call(list);
}

export function times(n) {
  return Array.apply(null, new Array(n));
}

export function extend(target) {
  target = target || {};

  var sources = Array.prototype.slice.call(arguments, 1);
  sources.forEach(function (source) {
    for (var prop in source) {
      if (typeof source[prop] === 'object' && !(source[prop] instanceof Array)) {
        target[prop] = extend.extend(target[prop], source[prop]);
      } else {
        target[prop] = source[prop];
      }
    }
  });

  return target;
}

export function filterBy(key, value) {
  return function (elem) {
    return elem[key] === value;
  };
}

export function circularIndex(length, index) {
  return index < 0 ? (length + index % length) % length : index % length;
}
