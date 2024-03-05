import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';

const app = new Hono();

app.get('/', (c) => {
  return c.json({
    message: 'Hello from Bun and Docker!',
  });
});

app.use('/public/*', serveStatic({ root: './' }));

export default app;
