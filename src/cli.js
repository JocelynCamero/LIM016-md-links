#! /usr/bin/env node

import process from 'process';
import { mdLinks } from './index.js';
import { help } from './help.js';
import {
    obtenerCantTotalLinks,
    obtenerCantLinksUnicos,
    obtenerCantLinksRotos,
} from './stats.js';

const argumentos = process.argv.slice(2);

/* if (argumentos.length == 1) {
    console.log('Ingresar la ruta');
} */

switch (argumentos.length) {
    case 0:
        console.log('Error: Falta ingresar la ruta');
        break;
    case 1:
        mdLinks('./prueba', { validate: false })
            .then((res) => {
                res.forEach((e) =>
                    console.log(` ${e.href} ${e.text} ${e.file}`)
                );
            })
            .catch((err) => console.log(err));
        break;
    case 2:
        if (argumentos[1] == '--validate') {
            mdLinks('./prueba', { validate: true })
                .then((res) => {
                    res.forEach((e) =>
                        console.log(
                            ` ${e.href}   ${e.text}   ${e.file}   ${e.status}   ${e.ok}`
                        )
                    );
                })
                .catch((err) => console.log(err));
        } else if (argumentos[1] == '--stats') {
            mdLinks('./prueba', { validate: true })
                .then((res) => {
                    console.log(`Total: ${obtenerCantTotalLinks(res)}`);
                    console.log(`Unique: ${obtenerCantLinksUnicos(res)}`);
                })
                .catch((err) => console.log(err));
        } else if (argumentos[1] == '--help') {
            console.log(help);
        } else console.log('Comando invalido');
        break;
    case 3:
        if (
            (argumentos[1] == '--validate' && argumentos[2] == '--stats') ||
            (argumentos[1] == '--stats' && argumentos[2] == '--validate')
        ) {
            mdLinks('./prueba', { validate: true })
                .then((res) => {
                    console.log(`Total: ${obtenerCantTotalLinks(res)}`);
                    console.log(`Unique: ${obtenerCantLinksUnicos(res)}`);
                    console.log(`Broken: ${obtenerCantLinksRotos(res)}`);
                })
                .catch((err) => console.log(err));
        } else console.log(' invalido');
        break;
    default:
        console.log('error en la cantidad de datos ');
}
