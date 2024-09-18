import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

async function procesarArchivo() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const filePath = join(__dirname, 'package.json');

    try {
        const contenidoStr = await fs.readFile(filePath, 'utf-8');
        const contenidoObj = JSON.parse(contenidoStr);
        const stats = await fs.stat(filePath);

        let info = {
            contenidoStr,
            contenidoObj,
            size: stats.size
        };

        console.log(info);

        await fs.writeFile('info.txt', JSON.stringify(info, null, '\t'));

    } catch (err) {
        console.error('Error:', err);
    }
}

procesarArchivo();
