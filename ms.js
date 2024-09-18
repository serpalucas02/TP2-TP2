import { readFileSync, statSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, 'package.json');

try {
    const contenidoStr = readFileSync(filePath, 'utf-8');
    const contenidoObj = JSON.parse(contenidoStr);
    const stats = statSync(filePath);

    let info = {
        contenidoStr,
        contenidoObj,
        size: stats.size
    };

    console.log(info);

    writeFileSync('info.txt', JSON.stringify(info, null, '\t'));

} catch (err) {
    console.error('Error al leer el package.json o crear el archivo info.txt:', err);
}
