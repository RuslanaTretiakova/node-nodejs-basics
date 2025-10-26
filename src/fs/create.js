import { access, writeFile } from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  const filePath = join(__dirname, 'files', 'fresh.txt');
  const content = 'I am fresh and young';

  try {
    await access(filePath, fsConstants.F_OK);
    throw new Error('FS operation failed');
  } catch (err) {
    if (err?.message === 'FS operation failed') throw err;
    try {
      await writeFile(filePath, content, 'utf8');
    } catch {
      throw new Error('FS operation failed');
    }
  }
};

await create();