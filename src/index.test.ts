import { expect, it } from 'bun:test';
import app from './index';

it('Should return 200 Response', async () => {
  const req = new Request('http://localhost/');
  const res = await app.fetch(req);
  expect(res.status).toBe(200);
});
