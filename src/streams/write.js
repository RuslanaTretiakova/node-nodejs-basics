import { createWriteStream } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
  const filePath = join(__dirname, 'files', 'fileToWrite.txt');
  try {
    await pipeline(process.stdin, createWriteStream(filePath, { encoding: 'utf8' }));
  } catch (e) {
    process.exitCode = 1;
  }
};

await write();