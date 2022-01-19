import { stat } from 'fs';

//VERIFICAR SI ES UN DIRECTORIO O UN ARCHIVO
    stat('./PRUEBA/texto.md', (err, stats) => {
        if(err) {
            if(err.code=='ENOENT')
            {console.log('No existe tal archivo o directorio');}
        }
        else {
        console.log('ES UN DIRECTORIO: ', stats.isDirectory());
        console.log('ES UN ARCHIVO: ', stats.isFile());
        }
    });
