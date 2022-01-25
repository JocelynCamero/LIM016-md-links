//FUNCION PARA OBTENER LA CANTIDAD TOTAL DE LINKS
export const obtenerCantTotalLinks = arrObj => arrObj.length;


//FUNCION PARA OBTENER LA CANTIDAD TOTAL DE LINKS UNICOS
export const obtenerCantLinksUnicos = arrObj => {
    const arrLinksUnicos = [];
    const arrSoloUrls = arrObj.map(obj => obj.href);
    arrSoloUrls.forEach((url) => {
        if (!arrLinksUnicos.includes(url)) {
            arrLinksUnicos.push(url);
        }
    });
    return arrLinksUnicos.length;
};


//FUNCION PARA OBTENER LA CANTIDAD TOTAL DE LINKS ROTOS
export const obtenerCantLinksRotos = arrObj => arrObj.filter(obj => obj.ok === 'FAIL').length;
