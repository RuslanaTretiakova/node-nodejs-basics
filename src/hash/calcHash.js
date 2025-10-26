import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { pipeline } from 'node:stream/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
  const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  const hash = createHash('sha256');

  try {
    await pipeline(createReadStream(filePath), hash);
    const hex = hash.digest('hex');
    console.log(hex);
  } catch {
    throw new Error('Hash calculation failed');
  }
};

await calculateHash();
