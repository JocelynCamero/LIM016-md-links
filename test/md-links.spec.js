import { mdLinks } from '../src/index.js';

const rutaArchivoMd = 'C:/Users/Jocelyn/Desktop/bootcamp/LIM016-md-links/prueba/markdown3.md';

const rutaInvalida = 'C:/Users/Jocelyn/Desktop/bootcamp/LIM016-md-links/prueba/markdown39.md';

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
  }];

const arrObjLinksValidados = [
  {
    href: 'https://www.facebook.com/',
    text: 'Facebook',
    file: 'C:\\Users\\Jocelyn\\Desktop\\bootcamp\\LIM016-md-links\\prueba\\markdown3.md',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'https://www.lego.com/es-es/404',
    text: 'Lego',
    file: 'C:\\Users\\Jocelyn\\Desktop\\bootcamp\\LIM016-md-links\\prueba\\markdown3.md',
    status: 404,
    ok: 'FAIL'
  }];

// TEST PARA LA FUNCION MDLINKS
describe('mdLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('Debería retornar un arreglo de objetos de links validados',
    () => mdLinks(rutaArchivoMd, { validate: true }).then(e => expect(e).toEqual(arrObjLinksValidados)));
  it('Debería retornar un arreglo de objetos de links sin validar',
    () => mdLinks(rutaArchivoMd, { validate: false }).then(e => expect(e).toEqual(arrObjLinks)));
  it('Debería retornar un mensaje de error',
    () => mdLinks(rutaInvalida, { validate: true }).catch(e => expect(e).toEqual(new Error('La ruta no existe'))));
});
