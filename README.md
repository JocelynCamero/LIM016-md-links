# MDLINKS

## Indice

-   [1. Resumen del proyecto](#1-preámbulo)

-   [2. Diagramas de flujo](#2-Resumen-del-proyecto)

-   [3. Instalación y uso de la librería](#3-criterios-del-proyecto)

-   [4. Objetivos de aprendizaje](#4-consideraciones-t%C3%A9cnicas)

-   [5. Checklist de criterios cumplidos](#5-checklist-de-criterios-cumplidos)

### 1. Resumen del proyecto

El proyecto trata de la creación de una herramienta de línea de comandos (CLI), así como también la creación de una librería desarrollada en lenguaje JavaScript el cual sera subido a [npm](https://www.npmjs.com/).
Esta librería buscará archivos de tipo **.md** dentro de la ruta que se le pase y nos nos indicará si estos son validos o no, además se mostrará algunas estadísticas de ellos: la cantidad de links que se encontró en total, la cantidad de links rotos y la cantidad de links únicos.

### 2. Diagramas de flujo

#### 2.1 Diagrama API

```mermaid
graph
A(INCIO) --> B[Obtener ruta]
B --> D{Existe la ruta?}
D -- SI --> E[Convertir a ruta absoluta]
D -- NO --> F[Mensaje 'La ruta no existe']
F --> P
E --> G{La ruta es una carpeta?}
G -- SI --> H[Buscar archivos .md]
G -- NO --> Z{El archivo es .md?}
Z -- SI --> J
Z -- NO --> Y[Mensaje 'El archivo no es .md']
Y --> P
H --> I{Existen archivos .md?}
I -- NO --> X[Mensaje 'No hay archivos .md]
I -- SI --> J[Buscar links]
X --> P
J --> K{Tiene links?}
K -- SI --> L[Almacenar url, texto y ruta en un objeto]
K -- NO --> W[Mensaje 'No existen links en el archivo']
W --> P
L --> M[Obtener y almacenar el status de la url]
M --> N{El status de la URL es menor a 400?}
N -- SI --> O[Agregar mensaje 'ok']
N -- NO --> V[Agregar mensaje 'fail']
V --> P
O --> P(FIN)
```

#### 2.2 Diagrama CLI

### 3. Instalación y uso de la librería

### 4. Objetivos de aprendizaje

### JavaScript

-   [ ] **Diferenciar entre tipos de datos primitivos y no primitivos**

-   [x] **Arrays (arreglos)**

-   [x] **Objetos (key, value)**

-   [x] **Uso de condicionales (if-else, switch, operador ternario, lógica booleana)**

-   [x] **Funciones (params, args, return)**

-   [ ] **Recursión o recursividad**

-   [x] **Módulos de CommonJS**

-   [ ] **Diferenciar entre expresiones (expressions) y sentencias (statements)**

-   [ ] **Callbacks**

-   [ ] **Promesas**

-   [ ] **Pruebas unitarias (unit tests)**

-   [ ] **Pruebas asíncronas**

-   [ ] **Uso de mocks y espías**

-   [ ] **Pruebas de compatibilidad en múltiples entornos de ejecución**

-   [x] **Uso de linter (ESLINT)**

-   [x] **Uso de identificadores descriptivos (Nomenclatura y Semántica)**

### Node.js

-   [x] **Instalar y usar módulos con npm**

-   [x] **Configuración de package.json**

-   [ ] **Configuración de npm-scripts**

-   [ ] **process (env, argv, stdin-stdout-stderr, exit-code)**

-   [x] **File system (fs, path)**

### Control de Versiones (Git y GitHub)

-   [x] **Git: Instalación y configuración**

-   [x] **Git: Control de versiones con git (init, clone, add, commit, status, push, pull, remote)**

-   [ ] **Git: Integración de cambios entre ramas (branch, checkout, fetch, merge, reset, rebase, tag)**

-   [ ] **GitHub: Creación de cuenta y repos, configuración de llaves SSH**

-   [x] **GitHub: Despliegue con GitHub Pages**

-   [ ] **GitHub: Colaboración en Github (branches | forks | pull requests | code review | tags)**

-   [x] **GitHub: Organización en Github (projects | issues | labels | milestones | releases)**

### HTTP

-   [ ] **Consulta o petición (request) y respuesta (response).**

-   [x] **Codigos de status de HTTP**

### 5. Checklist de criterios cumplidos

### General

-   [ ] Puede instalarse via `npm install --global <github-user>/md-links`

### `README.md`

-   [ ] Un board con el backlog para la implementación de la librería.
-   [ ] Documentación técnica de la librería.
-   [ ] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

-   [ ] El módulo exporta una función con la interfaz (API) esperada.
-   [ ] Implementa soporte para archivo individual
-   [ ] Implementa soporte para directorios
-   [ ] Implementa `options.validate`

### CLI

-   [ ] Expone ejecutable `md-links` en el path (configurado en `package.json`)
-   [ ] Se ejecuta sin errores / output esperado
-   [ ] Implementa `--validate`
-   [ ] Implementa `--stats`

### Pruebas / tests

-   [ ] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
        lines, y branches.
-   [ ] Pasa tests (y linters) (`npm test`).
