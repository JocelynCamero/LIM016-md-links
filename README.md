# MDLINKS

## Indice

- [1. Resumen del proyecto](#1-resumen-del-proyecto)

- [2. Diagramas de flujo](#2-diagramas-de-flujo)

- [3. Instalación y uso de la librería](#3-instalación-y-uso-de-la-librería)

- [4. Objetivos de aprendizaje](#4-objetivos-de-aprendizaje)

- [5. Checklist de criterios cumplidos](#5-checklist-de-criterios-cumplidos)

### 1. Resumen del proyecto

El proyecto trata de la creación de una herramienta de línea de comandos (CLI), así como también la creación de una librería desarrollada en lenguaje JavaScript el cual sera subido a [npm](https://www.npmjs.com/).
Esta librería buscará archivos de tipo **.md** dentro de la ruta que se le pase y nos nos indicará si estos son validos o no, además se mostrará algunas estadísticas de ellos: la cantidad de links que se encontró en total, la cantidad de links rotos y la cantidad de links únicos.

### 2. Diagramas de flujo

#### 2.1 Diagrama API

![](https://github.com/JocelynCamero/LIM016-md-links/blob/main/imagenes/DIAGRAMA%20FLUJO%20API.jpg)

#### 2.2 Diagrama CLI

![](https://github.com/JocelynCamero/LIM016-md-links/blob/main/imagenes/DIAGRAMA%20FLUJO%20CLI.jpg)

### 3. Instalación y uso de la librería

#### 3.1 Instalación

`npm i mdlinks-jcc`

#### 3.2 Uso de la librería

- En la terminal ingresamos el comando **md-Links** seguido de la **ruta** de la ubicación del archivo y/o carpeta en la cual se buscara los links.
  Ejemplo:

![](https://github.com/JocelynCamero/LIM016-md-links/blob/main/imagenes/ruta%20sin%20opcion.png)

- Ingresando el comando **md-Links** seguido de la **ruta** y seguido del comando **--validate**, obtendremos las propiedades de los links encontrados.
  Ejemplo:

![](https://github.com/JocelynCamero/LIM016-md-links/blob/main/imagenes/--validate.png)

- Ingresando el comando **md-Links** seguido de la **ruta** y seguido del comando **--stats**, obtendremos algunos datos estadisticos(total de links y cantidad de links unicos).
  Ejemplo:

![](https://github.com/JocelynCamero/LIM016-md-links/blob/main/imagenes/--stats.png)

- Ingresando el comando **md-Links** seguido de la **ruta** y seguido de los comandos **--stats --validate** o **--validate --stats**, obtendremos la cantidad total de links que encontremos en ese archivo, el total de links unicos encontrados y el total de links rotos.
  Ejemplo:

![](https://github.com/JocelynCamero/LIM016-md-links/blob/main/imagenes/--validate%20--stats.png)

- Ingresando el comando **md-Links** seguido de la **ruta** y seguido del comando **--help**, obtendremos una tabla con ayuda.
  Ejemplo:

![](https://github.com/JocelynCamero/LIM016-md-links/blob/main/imagenes/--help.png)

### 4. Objetivos de aprendizaje

### JavaScript

- [x] **Diferenciar entre tipos de datos primitivos y no primitivos**

- [x] **Arrays (arreglos)**

- [x] **Objetos (key, value)**

- [x] **Uso de condicionales (if-else, switch, operador ternario, lógica booleana)**

- [x] **Funciones (params, args, return)**

- [x] **Recursión o recursividad**

- [x] **Módulos de CommonJS**

- [x] **Diferenciar entre expresiones (expressions) y sentencias (statements)**

- [x] **Callbacks**

- [x] **Promesas**

- [x] **Pruebas unitarias (unit tests)**

- [x] **Pruebas asíncronas**

- [ ] **Uso de mocks y espías**

- [ ] **Pruebas de compatibilidad en múltiples entornos de ejecución**

- [x] **Uso de linter (ESLINT)**

- [x] **Uso de identificadores descriptivos (Nomenclatura y Semántica)**

### Node.js

- [x] **Instalar y usar módulos con npm**

- [x] **Configuración de package.json**

- [x] **Configuración de npm-scripts**

- [x] **process (env, argv, stdin-stdout-stderr, exit-code)**

- [x] **File system (fs, path)**

### Control de Versiones (Git y GitHub)

- [x] **Git: Instalación y configuración**

- [x] **Git: Control de versiones con git (init, clone, add, commit, status, push, pull, remote)**

- [ ] **Git: Integración de cambios entre ramas (branch, checkout, fetch, merge, reset, rebase, tag)**

- [ ] **GitHub: Creación de cuenta y repos, configuración de llaves SSH**

- [x] **GitHub: Despliegue con GitHub Pages**

- [ ] **GitHub: Colaboración en Github (branches | forks | pull requests | code review | tags)**

- [ ] **GitHub: Organización en Github (projects | issues | labels | milestones | releases)**

### HTTP

- [ ] **Consulta o petición (request) y respuesta (response).**

- [x] **Codigos de status de HTTP**

### 5. Checklist de criterios cumplidos

### General

- [ ] Puede instalarse via `npm install --global <github-user>/md-links`

### `README.md`

- [x] Un board con el backlog para la implementación de la librería.
- [x] Documentación técnica de la librería.
- [x] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

- [x] El módulo exporta una función con la interfaz (API) esperada.
- [x] Implementa soporte para archivo individual
- [x] Implementa soporte para directorios
- [x] Implementa `options.validate`

### CLI

- [x] Expone ejecutable `md-links` en el path (configurado en `package.json`)
- [x] Se ejecuta sin errores / output esperado
- [x] Implementa `--validate`
- [x] Implementa `--stats`

### Pruebas / tests

- [x] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
      lines, y branches.
- [x] Pasa tests (y linters) (`npm test`).
