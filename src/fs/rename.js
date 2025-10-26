import { access, rename } from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const renameFile = async () => {
  const dir = join(__dirname, 'files');
  const src = join(dir, 'wrongFilename.txt');
  const dest = join(dir, 'properFilename.md');

  try {
    await access(src, fsConstants.FOK);
    try {
      await access(dest, fsConstants.F_OK);
      throw new Error('FS operation failed');
    } catch (err) {
      if (err && err.code !== 'ENOENT') throw new Error('FS operation failed');
    }
    await rename(src, dest);
  } catch {
    throw new Error('FS operation failed');
  }
};

await renameFile();