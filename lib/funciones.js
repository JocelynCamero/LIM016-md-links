"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verificarExistenciaDeRuta = exports.obtenerLinks = exports.obtenerArregloPromesas = exports.convertirAbsoluta = exports.buscarArchivosMd = void 0;

var fs = _interopRequireWildcard(require("fs"));

var path = _interopRequireWildcard(require("path"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// FUNCION VERIFICAR SI LA RUTA ES UNA CARPETA
var verificarSiEsCarpeta = function verificarSiEsCarpeta(ruta) {
  return fs.statSync(ruta).isDirectory();
}; // FUNCION QUE LISTA LAS RUTAS DE UNA CARPETA


var rutasEncotradas = function rutasEncotradas(ruta) {
  return fs.readdirSync(ruta, 'utf8');
}; // FUNCION QUE VERIFICA SI ES UN ARCHIVO .MD


var archivoMd = function archivoMd(ruta) {
  return path.extname(ruta) === '.md';
}; // FUNCION PARA UNIR RUTAS


var unirRutas = function unirRutas(ruta) {
  return rutasEncotradas(ruta).map(function (elemento) {
    return path.join(ruta, elemento);
  });
}; // FUNCION QUE LEE ARCHIVOS


var leerArchivo = function leerArchivo(ruta) {
  return fs.readFileSync(ruta, 'utf8');
}; // const ruta = './prueba';
// FUNCION QUE VERIFICA SI LA RUTA ES VALIDA


var verificarExistenciaDeRuta = function verificarExistenciaDeRuta(ruta) {
  return fs.existsSync(ruta);
}; // FUNCION CONVERTIR A RUTA ABSOLUTA


exports.verificarExistenciaDeRuta = verificarExistenciaDeRuta;

var convertirAbsoluta = function convertirAbsoluta(ruta) {
  return path.resolve(ruta);
}; // FUNCION QUE BUSCA Y RETORNA LOS ARCHIVOS MD


exports.convertirAbsoluta = convertirAbsoluta;

var buscarArchivosMd = function buscarArchivosMd(rutaAbsoluta) {
  var listaArchivosMD = [];

  if (verificarSiEsCarpeta(rutaAbsoluta)) {
    var listaRutasEncotradas = unirRutas(rutaAbsoluta);

    if (listaRutasEncotradas.length > 0) {
      listaRutasEncotradas.forEach(function (rutaEncontrada) {
        if (archivoMd(rutaEncontrada)) {
          listaArchivosMD.push(rutaEncontrada);
        } else {
          listaArchivosMD = listaArchivosMD.concat(buscarArchivosMd(rutaEncontrada));
        }
      });
    }
  } else if (archivoMd(rutaAbsoluta)) {
    listaArchivosMD.push(rutaAbsoluta);
  }

  return listaArchivosMD;
}; // FUNCION QUE RETORNA UN ARREGLO DE LINKS


exports.buscarArchivosMd = buscarArchivosMd;

var obtenerLinks = function obtenerLinks(arrArchivosMd) {
  var expReg1 = /\[(.*?)\)/g; // CAPTURAR TODOS LOS '[]()'

  var expReg2 = /(?<=\().+?(?=\))/g; // CAPTURAR LO QUE HAY DENTRO DE UN ()

  var expReg3 = /(?<=\[).+?(?=\])/g; // CAPTURAR LO QUE HAY DENTRO DE UN []

  var arrObjLinks = [];
  arrArchivosMd.forEach(function (arcMd) {
    var contenidoArchivo = leerArchivo(arcMd);
    var linksEncontrados = [];
    linksEncontrados = contenidoArchivo.match(expReg1); // ARREGLO DE TITULOS CON LINKS []()

    if (linksEncontrados != null) {
      linksEncontrados.forEach(function (link) {
        var objLink = {};
        objLink.href = link.match(expReg2).toString();
        objLink.text = link.match(expReg3).toString().slice(0, 50);
        objLink.file = arcMd;
        arrObjLinks.push(objLink);
      });
    }
  });
  return arrObjLinks;
}; // FUNCION QUE OBTIENE UN ARREGLO DE PROMESAS QUE RETORNAN OBJETOS


exports.obtenerLinks = obtenerLinks;

var obtenerArregloPromesas = function obtenerArregloPromesas(arrObjLinks) {
  var arrPromesas = arrObjLinks.map(function (obj) {
    return (0, _nodeFetch["default"])(obj.href).then(function (res) {
      return {
        href: obj.href,
        text: obj.text,
        file: obj.file,
        status: res.status,
        ok: res.ok ? 'OK' : 'FAIL'
      };
    })["catch"](function () {
      return {
        href: obj.href,
        text: obj.text,
        file: obj.file,
        status: 500,
        ok: 'FAIL'
      };
    });
  });
  return Promise.all(arrPromesas);
};
/* const rutaAbso = convertirAbsoluta("./prueba");
const arrArchivosMd = buscarArchivosMd(rutaAbso);
const arrObjLinksEncontrados = obtenerLinks(arrArchivosMd);

obtenerArregloPromesas(arrObjLinksEncontrados).then((response) =>
    console.log(response)
); */


exports.obtenerArregloPromesas = obtenerArregloPromesas;