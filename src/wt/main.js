import { Worker } from 'node:worker_threads';
import { cpus } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
  const cpuCount = cpus().length;
  const results = new Array(cpuCount);
  const workers = new Array(cpuCount);

  const tasks = Array.from({ length: cpuCount }, (_, i) => {
    const workerPath = path.join(__dirname, 'worker.js');
    const worker = new Worker(workerPath);
    workers[i] = worker;

    return new Promise((resolve) => {
      worker.once('message', (value) => {
        results[i] = { status: 'resolved', data: value };
        resolve();
      });

      worker.once('error', () => {
        results[i] = { status: 'error', data: null };
        resolve();
      });
      worker.once('exit', (code) => {
        if (results[i] == null) {
          results[i] = code === 0
            ? { status: 'resolved', data: null }
            : { status: 'error', data: null };
        }
        resolve();
      });
      worker.postMessage(10 + i);
    });
  });

  await Promise.all(tasks);
  console.log(results);
};

await performCalculations();