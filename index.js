import * as fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';
import { resolve } from 'path';


//FUNCION VERIFICAR SI LA RUTA EXISTE
const existeRuta = ruta => fs.existsSync(ruta);

//FUNCION CONVERTIR A RUTA ABSOLUTA
const convertirAbsoluta = ruta => path.resolve(ruta);

//FUNCION VERIFICAR SI LA RUTA ES UNA CARPETA
const verificarSiEsCarpeta = ruta => fs.statSync(ruta).isDirectory();

//FUNCION QUE LISTA LAS RUTAS DE UNA CARPETA
const rutasEncotradas = ruta => fs.readdirSync(ruta, 'utf8');

//FUNCION QUE VERIFICA SI ES UN ARCHIVO .MD
//const archivosMd = rutas => rutas.filter(ruta => path.extname(ruta) === '.md');
const archivoMd = ruta => path.extname(ruta) === '.md';

//FUNCION PARA UNIR RUTAS
const unirRutas = ruta => rutasEncotradas(ruta).map(elemento => path.join(ruta, elemento));

//FUNCION QUE LEE ARCHIVOS
const leerArchivo = ruta => fs.readFileSync(ruta, 'utf8');


const ruta = './PRUEBA';

//FUNCION QUE BUSCA Y RETORNA LOS ARCHIVOS MD
const buscarArchivosMd = (ruta) => {
  let listaArchivosMD = [];
  if (existeRuta(ruta)) {
    let rutaAbsoluta = convertirAbsoluta(ruta);

    if (verificarSiEsCarpeta(rutaAbsoluta)) {
      let listaRutasEncotradas = unirRutas(rutaAbsoluta);
      if (listaRutasEncotradas.length != 0) { listaArchivosMD = listaRutasEncotradas.filter(rutaEncontrada => archivoMd(rutaEncontrada)); }
      else { console.log('No hay archivos'); }
    }

    else if (archivoMd(rutaAbsoluta)) { listaArchivosMD.push(rutaAbsoluta); }
  }
  else { console.log('La ruta no es valida'); }

  return listaArchivosMD;
}


//FUNCION QUE RETORNA UN ARREGLO DE LINKS
const obtenerLinks = (arrArchivosMd) => {
  const expReg1 = /\[(.*?)\)/g;//CAPTURAR TODOS LOS '[]()'
  const expReg2 = /(?<=\().+?(?=\))/g;//CAPTURAR LO QUE HAY DENTRO DE UN ()
  const expReg3 = /(?<=\[).+?(?=\])/g;//CAPTURAR LO QUE HAY DENTRO DE UN []
  const arrObjLinks = [];
  arrArchivosMd.forEach(archivoMd => {
    const contenidoArchivo = leerArchivo(archivoMd);
    let linksEncontrados = [];
    linksEncontrados = contenidoArchivo.match(expReg1);//ARREGLO DE TITULOS CON LINKS []()
    linksEncontrados.forEach(link => {
      let objLink = new Object();
      objLink.href = link.match(expReg2).toString();
      objLink.text = link.match(expReg3).toString();
      objLink.file = archivoMd;
      arrObjLinks.push(objLink);
    });
  });
  return arrObjLinks;
};



//FUNCION QUE OBTIENE UN ARREGLO DE PROMESAS QUE RETORNAN OBJETOS
const obtenerArregloPromesas = (arrObjLinks) => {
  const arrPromesas = arrObjLinks.map(obj => {
    return fetch(obj.href)
      .then(res => {
        obj.href;
        obj.text;
        obj.file;
        obj.status = res.status;
        obj.ok = (res.ok) ? 'OK' : 'FAIL';
        return obj;
      })
      .catch((e) => {
        obj.href;
        obj.text;
        obj.file;
        obj.status = 500;
        obj.ok = 'FAIL';
        obj.message = e;
        return obj;
      });
  }
  )
  return arrPromesas;
};


const arrArchivosMd = buscarArchivosMd(ruta);
const arrObjLinksEncontrados = obtenerLinks(arrArchivosMd);

Promise.all(obtenerArregloPromesas(arrObjLinksEncontrados))
  .then(response => {
    console.log(response);
  });

