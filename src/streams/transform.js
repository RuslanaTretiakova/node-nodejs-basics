import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, _encoding, callback) {
      const input = chunk.toString('utf8').trim();
      const reversed = input.split('').reverse().join('');
      callback(null, reversed + '\n');
    }
  });

  try {
    await pipeline(process.stdin, reverseTransform, process.stdout);
  } catch {
    throw new Error('Stream transformation failed');
  }
};

await transform();