import { obtenerCantTotalLinks, obtenerCantLinksUnicos, obtenerCantLinksRotos } from '../src/stats.js';

const arrObjetosValidados = [
  {
    href: 'https://www.facebook.com/',
    text: 'Fb',
    file: 'C:\\Users\\Jocelyn\\Desktop\\bootcamp\\LIM016-md-links\\prueba\\carpeta1\\carpeta5\\markdown3.md',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'https://www.tikok.com/es',
    text: 'Tiktok',
    file: 'C:\\Users\\Jocelyn\\Desktop\\bootcamp\\LIM016-md-links\\prueba\\carpeta1\\carpeta5\\markdown3.md',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'https://www.facebook.com/',
    text: 'facebook',
    file: 'C:\\Users\\Jocelyn\\Desktop\\bootcamp\\LIM016-md-links\\prueba\\carpeta1\\markdown1.md',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'http://dominioparablog.com/',
    text: 'Google',
    file: 'C:\\Users\\Jocelyn\\Desktop\\bootcamp\\LIM016-md-links\\prueba\\carpeta1\\markdown1.md',
    status: 500,
    ok: 'FAIL'
  }
];

// TEST PARA FUNCION OBTENER TOTAL DE LINKS
describe('Obtener cantidad total de links', () => {
  it('Debería ser una función', () => {
    expect(typeof obtenerCantTotalLinks).toBe('function');
  });

  it('Debería retornar "4"', () => {
    expect(obtenerCantTotalLinks(arrObjetosValidados)).toEqual(4);
  });
});

// TEST PARA LA FUNCION DE OBTENER LA CANTIDAD DE LINKS UNICOS
describe('Obtener cantidad de links unicos', () => {
  it('Debería ser una función', () => {
    expect(typeof obtenerCantLinksUnicos).toBe('function');
  });

  it('Debería retornar "3"', () => {
    expect(obtenerCantLinksUnicos(arrObjetosValidados)).toEqual(3);
  });
});

// TEST PARA LA FUNCION DE OBTENER LA CANTIDAD DE LINKS ROTOS
describe('Obtener cantidad de links rotos', () => {
  it('Debería ser una función', () => {
    expect(typeof obtenerCantLinksRotos).toBe('function');
  });

  it('Debería retornar "1"', () => {
    expect(obtenerCantLinksRotos(arrObjetosValidados)).toEqual(1);
  });
});
