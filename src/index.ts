import { Hono } from 'hono';
import { z } from 'zod';
import { serveStatic } from 'hono/bun';
import { db, todos } from './schema';
import { StatusCode } from './status-codes';
import { eq } from 'drizzle-orm';

const app = new Hono();

// fetch all todos
app.get('/', async (c) => {
  let data = await db.select().from(todos);
  return c.json({ data: { todos: data } });
});

// create todo
const CreateTodoSchema = z.object({
  text: z.string().min(1),
  completed: z
    .boolean()
    .default(false)
    .transform((val) => (val ? 1 : 0)),
});

app.post('/', async (c) => {
  const body = CreateTodoSchema.parse(await c.req.json());
  await db.insert(todos).values(body).returning();

  return c.text('', StatusCode.CREATED);
});

// update todo
const UpdateTodoSchema = z.object({
  text: z.string().optional(),
  completed: z
    .boolean()
    .optional()
    .transform((val) => {
      if (typeof val === 'undefined') {
        return undefined;
      }
      return val ? 1 : 0;
    }),
});

app.patch('/:id', async (c) => {
  const body = UpdateTodoSchema.parse(await c.req.json());
  const updatedTodo = await db
    .update(todos)
    .set(body)
    .where(eq(todos.id, c.req.param('id')))
    .returning();

  return c.json({ data: { todo: updatedTodo } });
});

// delete a todo
app.delete('/:id', async (c) => {
  await db.delete(todos).where(eq(todos.id, c.req.param('id')));

  return c.text('', StatusCode.NO_CONTENT);
});

app.use('/public/*', serveStatic({ root: './' }));

export default app;
