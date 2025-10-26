import { readdir, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
  const folderPath = join(__dirname, 'files');

  try {
    const folderStat = await stat(folderPath);
    if (!folderStat.isDirectory()) {
      throw new Error('FS operation failed');
    }
    const files = await readdir(folderPath);
    console.log(files);
  } catch {
    throw new Error('FS operation failed');
  }
};

await list();
