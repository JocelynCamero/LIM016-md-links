export const help = `                        
                                                      █▀▄▀█ █▀▀▄ █   █ █▄  █ █ ▄▀ █▀▀ 
                                                      █ ▀ █ █  █ █   █ █ ▀▄█ █▀▄  ▀▀█
                                                      ▀   ▀ ▀▀▀  ▀▀▀ ▀ ▀   ▀ ▀  ▀ ▀▀▀
                                                                 By Jocelyn
                                                                 
                 ╔═════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
                 ║                                                  SINTAXIS BASICA                                            ║
                 ╠═══════════════════╦═════════════════════════════════════════════════════════════════════════════════════════╣
                 ║                   ║ Muestra los links econtrados con su respectivo texto y ruta.                            ║
                 ║   mdLinks <ruta>  ║ Ejemplo:                                                                                ║
                 ║                   ║ mdLinks C:/Users/jocel/Desktop/BOOTCAMP/MIS PROYECTOS/PROYECTO 3/LIM016-md-links/PRUEBA ║  
                 ╚═══════════════════╩═════════════════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                                               SINTAXIS CON OPCIONES                                                            ║
╠═══════════════════════════════════╦════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║                                   ║ Muestra los links econtrados con su respectivo texto, ruta, status y mensaje del status.                   ║
║     mdLinks <ruta> --validate     ║ Ejemplo:                                                                                                   ║
║                                   ║ mdLinks C:/Users/jocel/Desktop/BOOTCAMP/MIS PROYECTOS/PROYECTO 3/LIM016-md-links/PRUEBA --validate         ║
╠═══════════════════════════════════╬════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║                                   ║ Muestra el total de links encontrados y la cantidad de links unicos.                                       ║
║      mdLinks <ruta> --stats       ║ Ejemplo:                                                                                                   ║
║                                   ║ mdLinks C:/Users/jocel/Desktop/BOOTCAMP/MIS PROYECTOS/PROYECTO 3/LIM016-md-links/PRUEBA --stats            ║
╠═══════════════════════════════════╬════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║                                   ║ Muestra el total de links encontrados, la cantidad de links unicos y la cantidad de links rotos.           ║
║ mdLinks <ruta> --stats --validate ║ Ejemplo:                                                                                                   ║
║                                   ║ mdLinks C:/Users/jocel/Desktop/BOOTCAMP/MIS PROYECTOS/PROYECTO 3/LIM016-md-links/PRUEBA --stats --validate ║
╚═══════════════════════════════════╩════════════════════════════════════════════════════════════════════════════════════════════════════════════╝

* NOTA: LA RUTA PUEDE SER RELATIVA O ABSOLUTA`;
