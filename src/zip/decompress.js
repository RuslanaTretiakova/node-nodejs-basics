import { createReadStream, createWriteStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  const src = join(__dirname, 'files', 'archive.gz');
  const dest = join(__dirname, 'files', 'fileToCompress.txt');

  try {
    await pipeline(
      createReadStream(src),
      createGunzip(),
      createWriteStream(dest)
    );
  } catch {
    throw new Error('Decompression failed');
  }
};

await decompress();