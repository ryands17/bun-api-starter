import {
  sqliteTable,
  integer,
  text,
  index,
  withReplicas,
} from 'drizzle-orm/sqlite-core';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { ulid } from 'ulid';

export const todos = sqliteTable(
  'todos',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => ulid()),
    text: text('todo_text').notNull(),
    completed: integer('completed').default(0),
  },
  (table) => {
    return {
      completedIndex: index('completed_index').on(table.completed),
    };
  },
);

const writer = drizzle(createClient({ url: 'http://db:8080?tls=0' }), {
  logger: true,
});

const reader = drizzle(createClient({ url: 'http://replica1:8080?tls=0' }), {
  logger: true,
});

export const db = withReplicas(writer, [reader]);
