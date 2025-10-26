import { access, stat, cp } from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  const srcDir = join(__dirname, 'files');
  const destDir = join(__dirname, 'files_copy');

  try {
    const srcStat = await stat(srcDir).catch(() => null);
    if (!srcStat || !srcStat.isDirectory()) {
      throw new Error('FS operation failed');
    }
    try {
      await access(destDir, fsConstants.F_OK);
      throw new Error('FS operation failed');
    } catch {
    }
    await cp(srcDir, destDir, { recursive: true, force: false });
  } catch {
    throw new Error('FS operation failed');
  }
};

await copy();
