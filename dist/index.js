"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

let apply = (action, ...args) => {
  //babel-env
  require(`./${action}`)(...args);
};

var _default = apply;
exports.default = _default;