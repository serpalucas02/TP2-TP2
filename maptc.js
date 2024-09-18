import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, 'package.json');

fs.readFile(filePath, 'utf-8')
    .then(contenidoStr => {
        const contenidoObj = JSON.parse(contenidoStr);
        return fs.stat(filePath).then(stats => ({ contenidoStr, contenidoObj, size: stats.size }));
    })
    .then(info => {
        console.log(info);
        return fs.writeFile('info.txt', JSON.stringify(info, null, '\t'));
    })
    .catch(err => {
        console.error('Error:', err);
    });
