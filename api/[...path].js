import { createApp } from '../src/app.js';

let handler;

export default async function vercelHandler(request, response) {
  try {
    handler ??= createApp();
    return await handler(request, response);
  } catch (error) {
    console.error('Checklist API startup failed', error);
    response.statusCode = 500;
    response.setHeader('content-type', 'application/json; charset=utf-8');
    response.end(JSON.stringify({
      error: 'function_startup_failed',
      message: error instanceof Error ? error.message : String(error)
    }));
  }
}
