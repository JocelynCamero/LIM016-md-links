'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.obtenerCantTotalLinks = exports.obtenerCantLinksUnicos = exports.obtenerCantLinksRotos = void 0;

// FUNCION PARA OBTENER LA CANTIDAD TOTAL DE LINKS
var obtenerCantTotalLinks = function obtenerCantTotalLinks (arrObj) {
  return arrObj.length;
}; // FUNCION PARA OBTENER LA CANTIDAD TOTAL DE LINKS UNICOS

exports.obtenerCantTotalLinks = obtenerCantTotalLinks;

var obtenerCantLinksUnicos = function obtenerCantLinksUnicos (arrObj) {
  const arrLinksUnicos = [];
  const arrSoloUrls = [];
  arrObj.forEach(function (obj) {
    return arrSoloUrls.push(obj.href);
  });
  arrSoloUrls.forEach(function (url) {
    if (!arrLinksUnicos.includes(url)) {
      arrLinksUnicos.push(url);
    }
  });
  return arrLinksUnicos.length;
}; // FUNCION PARA OBTENER LA CANTIDAD TOTAL DE LINKS ROTOS

exports.obtenerCantLinksUnicos = obtenerCantLinksUnicos;

var obtenerCantLinksRotos = function obtenerCantLinksRotos (arrObj) {
  return arrObj.filter(function (obj) {
    return obj.ok === 'FAIL';
  }).length;
};

exports.obtenerCantLinksRotos = obtenerCantLinksRotos;
