import { buscarArchivosMd, obtenerLinks, obtenerArregloPromesas } from '../src/funciones.js';

// TEST PARA LA FUNCION OBTENER ARCHIVOS MD
describe('Obtener archivos .md', () => {
  it('Debería ser una función', () => {
    expect(typeof buscarArchivosMd).toBe('function');
  });
  it('Debería retornar un arreglo con los archivos .md', () => {
    const rutaCarpeta1 = 'C:/Users/Jocelyn/Desktop/bootcamp/LIM016-md-links/prueba/carpeta1';
    const arrArchivosMd1 = [
      'C:\\Users\\Jocelyn\\Desktop\\bootcamp\\LIM016-md-links\\prueba\\carpeta1\\carpeta5\\markdown3.md',
      'C:\\Users\\Jocelyn\\Desktop\\bootcamp\\LIM016-md-links\\prueba\\carpeta1\\markdown1.md'
    ];
    expect(buscarArchivosMd(rutaCarpeta1)).toEqual(arrArchivosMd1);
  });
  it('Debería retornar en un arreglo la ruta ingresada', () => {
    const rutaArchivoMarkdown1 = 'C:/Users/Jocelyn/Desktop/bootcamp/LIM016-md-links/prueba/carpeta1/markdown1.md';
    const arrArchivosMd2 = ['C:/Users/Jocelyn/Desktop/bootcamp/LIM016-md-links/prueba/carpeta1/markdown1.md'];
    expect(buscarArchivosMd(rutaArchivoMarkdown1)).toEqual(arrArchivosMd2);
  });
});

// TEST PARA LA FUNCION QUE RETORNA UN ARREGLO DE OBJETOS DE LINKS CON SUS PROPIEDADES
describe('Obtener array de objetos de links', () => {
  it('Debería ser una función', () => {
    expect(typeof obtenerLinks).toBe('function');
  });
  it('Debería retornar un arreglo de objetos de los links encontrados', () => {
    const arrArchivosMd = [
      'C:\\Users\\Jocelyn\\Desktop\\bootcamp\\LIM016-md-links\\prueba\\markdown3.md'
    ];
    const arrObjLinks = [
      {
        href: 'https://www.facebook.com/',
        text: 'Facebook',
        file: 'C:\\Users\\Jocelyn\\Desktop\\bootcamp\\LIM016-md-links\\prueba\\markdown3.md'
      },
      {
        href: 'https://www.lego.com/es-es/404',
        text: 'Lego',
        file: 'C:\\Users\\Jocelyn\\Desktop\\bootcamp\\LIM016-md-links\\prueba\\markdown3.md'
      }
    ];
    expect(obtenerLinks(arrArchivosMd)).toEqual(arrObjLinks);
  });
});

// TEST PARA LA FUNCION QUE RETORNA UN ARREGLO DE PROMESAS DE OBJETOS DE LINKS VALIDADOS
describe('Obtener array de promesas', () => {
  it('Debería ser una función', () => {
    expect(typeof obtenerArregloPromesas).toBe('function');
  });
  it('Debería retornar un arreglo de objetos de links validados', () => {
    const arrObjLinks = [
      {
        href: 'http://dominioparablog.com/',
        text: 'Google',
        file: 'C:\\Users\\Jocelyn\\Desktop\\bootcamp\\LIM016-md-links\\prueba\\carpeta1\\markdown1.md'
      }
    ];
    const arrObjLinksValidados = [
      {
        href: 'http://dominioparablog.com/',
        text: 'Google',
        file: 'C:\\Users\\Jocelyn\\Desktop\\bootcamp\\LIM016-md-links\\prueba\\carpeta1\\markdown1.md',
        status: 500,
        ok: 'FAIL'
      }
    ];
    return obtenerArregloPromesas(arrObjLinks)
      .catch((e) => { expect(e).toEqual(arrObjLinksValidados); });
  });
  it('Debería retornar un arreglo de objetos de links validados', () => {
    const arrObjLinks = [
      {
        href: 'https://www.facebook.com/',
        text: 'Facebook',
        file: 'C:\\Users\\Jocelyn\\Desktop\\bootcamp\\LIM016-md-links\\prueba\\markdown3.md'
      }
    ];
    const arrObjLinksValidados = [
      {
        href: 'https://www.facebook.com/',
        text: 'Facebook',
        file: 'C:\\Users\\Jocelyn\\Desktop\\bootcamp\\LIM016-md-links\\prueba\\markdown3.md',
        status: 200,
        ok: 'OK'
      }
    ];
    return obtenerArregloPromesas(arrObjLinks)
      .then((e) => { expect(e).toEqual(arrObjLinksValidados); });
  });
});
