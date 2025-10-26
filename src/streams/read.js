import { createReadStream } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = join(__dirname, 'files', 'fileToRead.txt');
  try {
    await pipeline(createReadStream(filePath, { encoding: 'utf8' }), process.stdout);
  } catch (e) {
    process.exitCode = 1;
  }
};

await read();
