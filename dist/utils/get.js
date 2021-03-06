"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadLocal = void 0;

var _rc = require("./rc");

var _download = _interopRequireDefault(require("./download"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const downloadLocal = async (templateName, projectName) => {
  let config = await (0, _rc.getAll)();
  let api = `${config.registry}/${templateName}`;
  return new Promise((resolve, reject) => {
    (0, _download.default)({
      url: api,
      targetPath: projectName
    }, err => {
      if (err) reject(err);
      resolve();
    });
  });
};

exports.downloadLocal = downloadLocal;