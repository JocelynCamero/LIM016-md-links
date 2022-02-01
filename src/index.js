import {
  verificarExistenciaDeRuta,
  convertirAbsoluta,
  buscarArchivosMd,
  obtenerLinks,
  obtenerArregloPromesas
} from './funciones.js';

// FUNCION QUE RETORNA UNA PROMESA
export const mdLinks = (path, options) => new Promise((resolve, reject) => {
  let pathAbsoluta;
  if (verificarExistenciaDeRuta(path)) {
    pathAbsoluta = convertirAbsoluta(path);
    const arrArchivosMd = buscarArchivosMd(pathAbsoluta);
    const arrObjLinksEncontrados = obtenerLinks(arrArchivosMd);
    if (options.validate) {
      resolve(obtenerArregloPromesas(arrObjLinksEncontrados).then((response) => response));
    } else {
      resolve(arrObjLinksEncontrados);
    }
  } else reject(new Error('La ruta no existe'));
});
/* mdLinks('./prueba', { validate: false })
    .then(res => console.log(res))
    .catch(err => console.log(err)); */
