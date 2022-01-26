import * as fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';
import { resolve } from 'path';

//FUNCION VERIFICAR SI LA RUTA ES UNA CARPETA
const verificarSiEsCarpeta = (ruta) => fs.statSync(ruta).isDirectory();

//FUNCION QUE LISTA LAS RUTAS DE UNA CARPETA
const rutasEncotradas = (ruta) => fs.readdirSync(ruta, 'utf8');

//FUNCION QUE VERIFICA SI ES UN ARCHIVO .MD
const archivoMd = (ruta) => path.extname(ruta) === '.md';

//FUNCION PARA UNIR RUTAS
const unirRutas = (ruta) =>
    rutasEncotradas(ruta).map((elemento) => path.join(ruta, elemento));

//FUNCION QUE LEE ARCHIVOS
const leerArchivo = (ruta) => fs.readFileSync(ruta, 'utf8');

const ruta = './prueba';
//FUNCION QUE VERIFICA SI LA RUTA ES VALIDA
export const verificarExistenciaDeRuta = (ruta) => fs.existsSync(ruta);

//FUNCION CONVERTIR A RUTA ABSOLUTA
export const convertirAbsoluta = (ruta) => path.resolve(ruta);
let listaArchivosMD = [];
//FUNCION QUE BUSCA Y RETORNA LOS ARCHIVOS MD
export const buscarArchivosMd = (rutaAbsoluta) => {
    if (verificarSiEsCarpeta(rutaAbsoluta)) {
        let listaRutasEncotradas = unirRutas(rutaAbsoluta);
        if (listaRutasEncotradas.length != 0) {
            listaRutasEncotradas.forEach((rutaEncontrada) => {
                if (archivoMd(rutaEncontrada)) {
                    listaArchivosMD.push(rutaEncontrada);
                } else {
                    buscarArchivosMd(rutaEncontrada);
                }
            });
        }
    } else {
        if (archivoMd(rutaAbsoluta)) {
            listaArchivosMD.push(rutaAbsoluta);
        }
    }
    return listaArchivosMD;
};

//FUNCION QUE RETORNA UN ARREGLO DE LINKS
export const obtenerLinks = (arrArchivosMd) => {
    const expReg1 = /\[(.*?)\)/g; //CAPTURAR TODOS LOS '[]()'
    const expReg2 = /(?<=\().+?(?=\))/g; //CAPTURAR LO QUE HAY DENTRO DE UN ()
    const expReg3 = /(?<=\[).+?(?=\])/g; //CAPTURAR LO QUE HAY DENTRO DE UN []

    let arrObjLinks = [];

    arrArchivosMd.forEach((archivoMd) => {
        let contenidoArchivo = leerArchivo(archivoMd);
        let linksEncontrados = [];
        linksEncontrados = contenidoArchivo.match(expReg1); //ARREGLO DE TITULOS CON LINKS []()
        if (linksEncontrados != null) {
            linksEncontrados.forEach((link) => {
                let objLink = new Object();
                objLink.href = link.match(expReg2).toString();
                objLink.text = link.match(expReg3).toString().slice(0, 50);
                objLink.file = archivoMd;
                arrObjLinks.push(objLink);
            });
        }
    });
    return arrObjLinks;
};

//FUNCION QUE OBTIENE UN ARREGLO DE PROMESAS QUE RETORNAN OBJETOS
export const obtenerArregloPromesas = (arrObjLinks) => {
    const arrPromesas = arrObjLinks.map((obj) => {
        return fetch(obj.href)
            .then((res) => {
                obj.href;
                obj.text;
                obj.file;
                obj.status = res.status;
                obj.ok = res.ok ? 'OK' : 'FAIL';
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
    });
    return arrPromesas;
};

const rutaAbso = convertirAbsoluta(ruta);
const arrArchivosMd = buscarArchivosMd(rutaAbso);
const arrObjLinksEncontrados = obtenerLinks(arrArchivosMd);

Promise.all(obtenerArregloPromesas(arrObjLinksEncontrados)).then((response) =>
    console.log(response)
);
