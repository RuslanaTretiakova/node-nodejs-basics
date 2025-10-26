import { fork } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spawnChildProcess = async (args) => {
  const filePath = path.join(__dirname, 'files', 'script.js');

  const childProcess = fork(filePath, args.map(String), {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
  });

  process.stdin.pipe(childProcess.stdin);

  childProcess.stdout.pipe(process.stdout);

  childProcess.on('error', (error) => {
    console.error('Error in child process:', error);
  });

  childProcess.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

await spawnChildProcess(['foo', 'bar', 'bla bla', 42]);

