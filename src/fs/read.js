import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = join(__dirname, 'files', 'fileToRead.txt');

  try {
    const data = await readFile(filePath, 'utf8');
    console.log(data);
  } catch {
    throw new Error('FS operation failed');
  }
};

await read();
