import { createServer } from './app.js';

const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? '0.0.0.0';
const server = createServer();

server.listen(port, host, () => {
  console.log(`Checklist API listening on http://${host}:${port}`);
});

function shutdown(signal) {
  console.log(`${signal} received; closing server`);
  server.close((error) => {
    if (error) {
      console.error(error);
      process.exitCode = 1;
    }
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
