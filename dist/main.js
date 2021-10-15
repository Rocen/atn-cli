"use strict";

var _commander = require("commander");

var _constants = require("./utils/constants");

var _index = _interopRequireDefault(require("./index"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const program = new _commander.Command();
let actionMap = {
  init: {
    alias: 'in',
    description: 'generate a new project from a template',
    usages: ['atn init templateName projectName']
  },
  config: {
    alias: 'cfg',
    description: 'config .atnrc',
    usages: ['atn config set <k> <v>', 'atn config get <k>', 'atn config remove <k>']
  } //other commands

};
Object.keys(actionMap).forEach(action => {
  program.command(action).description(actionMap[action].description).alias(actionMap[action].alias).action(() => {
    switch (action) {
      case 'config':
        (0, _index.default)(action, ...process.argv.slice(3));
        break;

      case 'init':
        (0, _index.default)(action, ...process.argv.slice(3));
        break;

      default:
        break;
    }
  });
});

function help() {
  console.log('\r\nUsage');
  Object.keys(actionMap).forEach(action => {
    actionMap[action].usages.forEach(usage => {
      console.log(' - ' + usage);
    });
  });
  console.log('\r');
}

program.usage('<command> [options]');
program.on('-h', help);
program.on('--help', help);
program.version(_constants.VERSION, '-V --version').parse(process.argv);

if (!process.argv.slice(2).length) {
  process.outputHelp(make_green);
}

function make_green(txt) {
  return _chalk.default.gereen(txt);
}