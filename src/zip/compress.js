import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  const src = join(__dirname, 'files', 'fileToCompress.txt');
  const dest = join(__dirname, 'files', 'archive.gz');

  try {
    await pipeline(
      createReadStream(src),
      createGzip(),
      createWriteStream(dest)
    );
  } catch {
    throw new Error('Compression failed');
  }
};

await compress();
