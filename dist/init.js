"use strict";

var _get = require("./utils/get");

var _ora = _interopRequireDefault(require("ora"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _fs = _interopRequireDefault(require("fs"));

var _chalk = _interopRequireDefault(require("chalk"));

var _logSymbols = _interopRequireDefault(require("log-symbols"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let init = async (templateName, projectName) => {
  if (!_fs.default.existsSync(projectName)) {
    _inquirer.default.prompt([{
      name: 'description',
      message: 'Please enter the project description'
    }, {
      name: 'author',
      message: 'Please enter the author name'
    }]).then(async answer => {
      let loading = (0, _ora.default)({
        text: 'downloading template ...',
        color: 'green'
      });
      loading.start();
      (0, _get.downloadLocal)(templateName, projectName).then(() => {
        loading.succeed();
        const fileName = `${projectName}/package.json`;

        if (_fs.default.existsSync(fileName)) {
          const data = _fs.default.readFileSync(fileName).toString();

          let json = JSON.parse(data);
          json.name = projectName;
          json.author = answer.author;
          json.description = answer.description; //修改项目文件夹中 package.json 文件

          _fs.default.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');

          console.log(_logSymbols.default.success, _chalk.default.green('Project initialization finished!'));
        }
      }).catch(err => {
        // ora().fail('Sorry, download template failed.')
        loading.fail('Sorry, download template failed.');
      });
    });
  } else {
    //项目已经存在
    console.log(_logSymbols.default.error, _chalk.default.red('The project already exists'));
  }
};

module.exports = init;