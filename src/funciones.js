import * as fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';

// FUNCION VERIFICAR SI LA RUTA ES UNA CARPETA
const verificarSiEsCarpeta = (ruta) => fs.statSync(ruta).isDirectory();

// FUNCION QUE LISTA LAS RUTAS DE UNA CARPETA
const rutasEncotradas = (ruta) => fs.readdirSync(ruta, 'utf8');

// FUNCION QUE VERIFICA SI ES UN ARCHIVO .MD
const archivoMd = (ruta) => path.extname(ruta) === '.md';

// FUNCION PARA UNIR RUTAS
const unirRutas = (ruta) => rutasEncotradas(ruta).map((elemento) => path.join(ruta, elemento));

// FUNCION QUE LEE ARCHIVOS
const leerArchivo = (ruta) => fs.readFileSync(ruta, 'utf8');

// const ruta = './prueba';
// FUNCION QUE VERIFICA SI LA RUTA ES VALIDA
export const verificarExistenciaDeRuta = (ruta) => fs.existsSync(ruta);

// FUNCION CONVERTIR A RUTA ABSOLUTA
export const convertirAbsoluta = (ruta) => path.resolve(ruta);

// FUNCION QUE BUSCA Y RETORNA LOS ARCHIVOS MD
export const buscarArchivosMd = (rutaAbsoluta) => {
  let listaArchivosMD = [];
  if (verificarSiEsCarpeta(rutaAbsoluta)) {
    const listaRutasEncotradas = unirRutas(rutaAbsoluta);
    if (listaRutasEncotradas.length > 0) {
      listaRutasEncotradas.forEach((rutaEncontrada) => {
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
};

// FUNCION QUE RETORNA UN ARREGLO DE LINKS
export const obtenerLinks = (arrArchivosMd) => {
  const expReg1 = /\[(.*?)\)/g; // CAPTURAR TODOS LOS '[]()'
  const expReg2 = /(?<=\().+?(?=\))/g; // CAPTURAR LO QUE HAY DENTRO DE UN ()
  const expReg3 = /(?<=\[).+?(?=\])/g; // CAPTURAR LO QUE HAY DENTRO DE UN []
  const arrObjLinks = [];

  arrArchivosMd.forEach((arcMd) => {
    const contenidoArchivo = leerArchivo(arcMd);
    let linksEncontrados = [];
    linksEncontrados = contenidoArchivo.match(expReg1); // ARREGLO DE TITULOS CON LINKS []()
    if (linksEncontrados != null) {
      linksEncontrados.forEach((link) => {
        const objLink = {};
        objLink.href = link.match(expReg2).toString();
        objLink.text = link.match(expReg3).toString().slice(0, 50);
        objLink.file = arcMd;
        arrObjLinks.push(objLink);
      });
    }
  });
  return arrObjLinks;
};

// FUNCION QUE OBTIENE UN ARREGLO DE PROMESAS QUE RETORNAN OBJETOS
export const obtenerArregloPromesas = (arrObjLinks) => {
  const arrPromesas = arrObjLinks.map((obj) => fetch(obj.href)
    .then((res) => ({
      href: obj.href,
      text: obj.text,
      file: obj.file,
      status: res.status,
      ok: res.ok ? 'OK' : 'FAIL'
    }))
    .catch(() => ({
      href: obj.href,
      text: obj.text,
      file: obj.file,
      status: 500,
      ok: 'FAIL'
    })));
  return Promise.all(arrPromesas);
};

/* const rutaAbso = convertirAbsoluta("./prueba");
const arrArchivosMd = buscarArchivosMd(rutaAbso);
const arrObjLinksEncontrados = obtenerLinks(arrArchivosMd);

obtenerArregloPromesas(arrObjLinksEncontrados).then((response) =>
    console.log(response)
); */
