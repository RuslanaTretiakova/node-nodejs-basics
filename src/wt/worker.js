import { parentPort } from 'node:worker_threads';

const nthFibonacci = (n) => {
  if (!Number.isFinite(n) || n < 0) throw new Error('Invalid input');
  if (n === 0) return 0;
  if (n === 1) return 1;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
};

parentPort.on('message', (value) => {
  const result = nthFibonacci(value);
  parentPort.postMessage(result);
});
