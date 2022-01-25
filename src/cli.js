#! /usr/bin/env node

import { process } from 'process';
import { mdLinks } from './mdLinks.js';
import { obtenerCantTotalLinks, obtenerCantLinksUnicos, obtenerCantLinksRotos } from './stats.js';
import { help } from './help.js';


const argumentos = process.argv;

switch (argumentos.length) {
    case 1:
        console.log('Ingresar la ruta');
        break;
    case 2:
        mdLinks('./prueba', { validate: false })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        break;
    case 3:
        if (argumentos[2] == '--validate') {
            mdLinks('./prueba', { validate: true })
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
        if (argumentos[2] == '--stats') {
            mdLinks('./prueba', { validate: true })
                .then(res => {
                    console.log(obtenerCantTotalLinks('Total: ', res));
                    console.log(obtenerCantLinksUnicos('Unique: ', res));
                })
                .catch(err => console.log(err));
        }
        if (argumentos[2] == '--help') {
            console.log(help);
        }
        else console.log('Comando invalido');
        break;
    case 4:
        if ((argumentos[2] == '--validate' && argumentos[3] == '--stats') || (argumentos[2] == '--stats' && argumentos[3] == '--validate')) {
            mdLinks('./prueba', { validate: true })
                .then(res => {
                    console.log(obtenerCantTotalLinks('Total: ', res));
                    console.log(obtenerCantLinksUnicos('Unique: ', res));
                    console.log(obtenerCantLinksRotos('Broken: ', res));
                })
                .catch(err => console.log(err));
        }
        else console.log('Comando invalido');
        break;
    default:
        console.log('Comando invalido');
}