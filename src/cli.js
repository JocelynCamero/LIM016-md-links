#! /usr/bin/env node

import process from 'process';
import chalk from 'chalk';
import { mdLinks } from './index.js';
import { help } from './help.js';
import { obtenerCantTotalLinks, obtenerCantLinksUnicos, obtenerCantLinksRotos } from './stats.js';

const argumentos = process.argv.slice(2);
switch (argumentos.length) {
  case 0:
    console.log(chalk.redBright.bold('Error: Falta ingresar la ruta'));
    break;
  case 1:
    mdLinks(argumentos[0], { validate: false })
      .then((res) => {
        res.forEach((e) => console.log(`${chalk.cyan(e.href)}   ${chalk.magenta(e.text)}   ${chalk.blackBright(e.file)}`));
      })
      .catch((err) => console.log(chalk.redBright.bold(err)));
    break;
  case 2:
    if (argumentos[1] === '--validate') {
      mdLinks(argumentos[0], { validate: true })
        .then((res) => {
          res.forEach((e) => console.log(`${chalk.cyan(e.href)}   ${chalk.magenta(e.text)}   ${chalk.blackBright(e.file)}   ${chalk.cyanBright.bold(e.status)}   ${chalk.magentaBright.bold(e.ok)}`));
        })
        .catch((err) => console.log(chalk.redBright.bold(err)));
    } else if (argumentos[1] === '--stats') {
      mdLinks(argumentos[0], { validate: true })
        .then((res) => {
          console.log(`${chalk.cyan.underline('Total:')}  ${obtenerCantTotalLinks(res)}`);
          console.log(`${chalk.magenta.underline('Unique:')}  ${obtenerCantLinksUnicos(res)}`);
        })
        .catch((err) => console.log(chalk.redBright.bold(err)));
    } else if (argumentos[1] === '--help') {
      console.log(chalk.cyan.bold(help));
    } else console.log(chalk.redBright.bold('Opcion invalida'));
    break;
  case 3:
    if ((argumentos[1] === '--validate' && argumentos[2] === '--stats') || (argumentos[1] === '--stats' && argumentos[2] === '--validate')) {
      mdLinks(argumentos[0], { validate: true })
        .then(res => {
          console.log(`${chalk.cyan.underline('Total:')}  ${obtenerCantTotalLinks(res)}`);
          console.log(`${chalk.magenta.underline('Unique:')}  ${obtenerCantLinksUnicos(res)}`);
          console.log(`${chalk.redBright.underline('Broken:')}  ${obtenerCantLinksRotos(res)}`);
        })
        .catch((err) => console.log(chalk.redBright.bold(err)));
    } else console.log(chalk.redBright.bold('Opciones invalidas'));
    break;
  default:
    console.log(chalk.redBright.bold('Datos ingresados erroneos'));
}
