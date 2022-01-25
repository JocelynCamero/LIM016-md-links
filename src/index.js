import { verificarExistenciaDeRuta, convertirAbsoluta, buscarArchivosMd, obtenerLinks, obtenerArregloPromesas } from './funciones.js';

export const mdLinks = (path, options) => new Promise((resolve, reject) => {
    let pathAbsoluta;
    if (verificarExistenciaDeRuta(path)) {
        pathAbsoluta = convertirAbsoluta(path);
        let arrArchivosMd = buscarArchivosMd(pathAbsoluta);
        let arrObjLinksEncontrados = obtenerLinks(arrArchivosMd);
        if (options.validate) {
            resolve(Promise.all(obtenerArregloPromesas(arrObjLinksEncontrados))
                .then(response => response));
        }
        else {
            resolve(arrObjLinksEncontrados);
        }
    }
    else reject('La ruta no existe')
});



/* mdLinks('./prueba', { validate: false })
    .then(res => console.log(res))
    .catch(err => console.log(err)); */