#! /usr/bin/env node
"use strict";

var _process = _interopRequireDefault(require("process"));

var _chalk = _interopRequireDefault(require("chalk"));

var _index = require("./index.js");

var _help = require("./help.js");

var _stats = require("./stats.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var argumentos = _process["default"].argv.slice(2);

switch (argumentos.length) {
  case 0:
    console.log(_chalk["default"].redBright.bold('Error: Falta ingresar la ruta'));
    break;

  case 1:
    if (argumentos[0] === '--help') {
      console.log(_chalk["default"].cyan.bold(_help.help));
    } else {
      (0, _index.mdLinks)(argumentos[0], {
        validate: false
      }).then(function (res) {
        res.forEach(function (e) {
          return console.log("".concat(_chalk["default"].cyan(e.href), "   ").concat(_chalk["default"].magenta(e.text), "   ").concat(_chalk["default"].blackBright(e.file), " \n "));
        });
      })["catch"](function (err) {
        return console.log(_chalk["default"].redBright.bold(err));
      });
    }

    break;

  case 2:
    if (argumentos[1] === '--validate') {
      (0, _index.mdLinks)(argumentos[0], {
        validate: true
      }).then(function (res) {
        res.forEach(function (e) {
          return console.log("".concat(_chalk["default"].cyan(e.href), "   ").concat(_chalk["default"].magenta(e.text), "   ").concat(_chalk["default"].blackBright(e.file), "   ").concat(_chalk["default"].cyanBright.bold(e.status), "   ").concat(_chalk["default"].magentaBright.bold(e.ok)));
        });
      })["catch"](function (err) {
        return console.log(_chalk["default"].redBright.bold(err));
      });
    } else if (argumentos[1] === '--stats') {
      (0, _index.mdLinks)(argumentos[0], {
        validate: true
      }).then(function (res) {
        console.log("".concat(_chalk["default"].cyan.underline('Total:'), "  ").concat((0, _stats.obtenerCantTotalLinks)(res)));
        console.log("".concat(_chalk["default"].magenta.underline('Unique:'), "  ").concat((0, _stats.obtenerCantLinksUnicos)(res)));
      })["catch"](function (err) {
        return console.log(_chalk["default"].redBright.bold(err));
      });
    } else console.log(_chalk["default"].redBright.bold('Opcion invalida'));

    break;

  case 3:
    if (argumentos[1] === '--validate' && argumentos[2] === '--stats' || argumentos[1] === '--stats' && argumentos[2] === '--validate') {
      (0, _index.mdLinks)(argumentos[0], {
        validate: true
      }).then(function (res) {
        console.log("".concat(_chalk["default"].cyan.underline('Total:'), "  ").concat((0, _stats.obtenerCantTotalLinks)(res)));
        console.log("".concat(_chalk["default"].magenta.underline('Unique:'), "  ").concat((0, _stats.obtenerCantLinksUnicos)(res)));
        console.log("".concat(_chalk["default"].redBright.underline('Broken:'), "  ").concat((0, _stats.obtenerCantLinksRotos)(res)));
      })["catch"](function (err) {
        return console.log(_chalk["default"].redBright.bold(err));
      });
    } else console.log(_chalk["default"].redBright.bold('Opciones invalidas'));

    break;

  default:
    console.log(_chalk["default"].redBright.bold('Datos ingresados erroneos'));
}