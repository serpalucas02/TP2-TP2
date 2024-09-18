import { readFile, stat, writeFile } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, 'package.json');

readFile(filePath, 'utf-8', (err, contenidoStr) => {
    if (err) {
        return console.error('Error al leer el package.json:', err);
    }

    let contenidoObj;
    try {
        contenidoObj = JSON.parse(contenidoStr);
    } catch (parseErr) {
        return console.error('Error al parsear el package.json:', parseErr);
    }

    stat(filePath, (err, stats) => {
        if (err) {
            return console.error('Error al obtener el tamaño del package.json:', err);
        }

        let info = {
            contenidoStr,
            contenidoObj,
            size: stats.size
        };

        console.log(info);

        writeFile('info.txt', JSON.stringify(info, null, '\t'), (err) => {
            if (err) {
                return console.error('Error al crear el archivo info.txt:', err);
            }
        });
    });
});
