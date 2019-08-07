'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _get = require('./utils/get');

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('child_process'),
    exec = _require.exec;

var title = function title() {
  /* 
    _________________________ __________ ____  __.         _________ .____    .___ 
  /   _____/\__    ___/  _  \\______   \    |/ _|         \_   ___ \|    |   |   |
  \_____  \   |    | /  /_\  \|       _/      <    ______ /    \  \/|    |   |   |
  /        \  |    |/    |    \    |   \    |  \  /_____/ \     \___|    |___|   |
  /_______  /  |____|\____|__  /____|_  /____|__ \          \______  /_______ \___|
        \/                 \/       \/        \/                 \/        \/   
  */
};

var init = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(projectName) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            //项目不存在
            if (!_fs2.default.existsSync(projectName)) {
              //命令行交互
              _inquirer2.default.prompt([{
                name: 'description',
                message: 'Please enter the project description: '
              }, {
                name: 'author',
                message: 'Please enter the author name: '
              }]).then(function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(answer) {
                  var loading;
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          //下载模板 选择模板
                          //通过配置文件，获取模板信息
                          loading = (0, _ora2.default)('downloading template ...');

                          loading.start();
                          (0, _get.downloadLocal)('' + projectName).then(function () {
                            loading.succeed();
                            var fileName = projectName + '/package.json';
                            if (_fs2.default.existsSync(fileName)) {
                              try {
                                var data = _fs2.default.readFileSync(fileName).toString();
                                var json = JSON.parse(data);
                                json.name = projectName;
                                json.author = answer.author;
                                json.description = answer.description;
                                //修改项目文件夹中 package.json 文件
                                _fs2.default.writeFileSync(fileName, (0, _stringify2.default)(json, null, '\t'), 'utf-8');

                                var installLoading = (0, _ora2.default)('yarn install ...');
                                installLoading.start();
                                exec('cd ' + projectName + ' && yarn install', function (err, stdout, stderr) {
                                  if (err) {
                                    installLoading.fail();
                                    console.error(_chalk2.default.red(stderr));

                                    if (err.code == 127) {
                                      console.error(_chalk2.default.red('You must exec \'npm install yarn -g\''));
                                    }

                                    return;
                                  }
                                  installLoading.succeed();

                                  console.log(_chalk2.default.green(stdout));
                                  console.log(_logSymbols2.default.success, _chalk2.default.green('Project initialization finished!'));
                                  console.log(_chalk2.default.red(title.toString().slice(title.toString().indexOf('/*') + 3, title.toString().lastIndexOf('*/'))));
                                });
                              } catch (error) {
                                console.log(_chalk2.default.red(error.toString()));
                              }
                            }
                          }, function (error) {
                            console.log(_chalk2.default.red(error.toString()));

                            loading.fail();
                          });

                        case 3:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }());
            } else {
              //项目已经存在
              console.log(_logSymbols2.default.error, _chalk2.default.red('The project already exists'));
            }

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function init(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = init;