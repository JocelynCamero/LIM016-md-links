"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = void 0;

var _funciones = require("./funciones.js");

// FUNCION QUE RETORNA UNA PROMESA
var mdLinks = function mdLinks(path, options) {
  return new Promise(function (resolve, reject) {
    var pathAbsoluta;

    if ((0, _funciones.verificarExistenciaDeRuta)(path)) {
      pathAbsoluta = (0, _funciones.convertirAbsoluta)(path);
      var arrArchivosMd = (0, _funciones.buscarArchivosMd)(pathAbsoluta);
      var arrObjLinksEncontrados = (0, _funciones.obtenerLinks)(arrArchivosMd);

      if (options.validate) {
        resolve((0, _funciones.obtenerArregloPromesas)(arrObjLinksEncontrados).then(function (response) {
          return response;
        }));
      } else {
        resolve(arrObjLinksEncontrados);
      }
    } else reject(new Error('La ruta no existe'));
  });
};
/* mdLinks('./prueba', { validate: false })
    .then(res => console.log(res))
    .catch(err => console.log(err)); */


exports.mdLinks = mdLinks;