import { type Config } from 'drizzle-kit';

export default {
  schema: './src/schema.ts',
  out: './migrations',
  driver: 'turso',
  dbCredentials: {
    url: 'http://db:8080',
    // authToken: envs.DB_AUTH_TOKEN,
  },
  // Print all SQL statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
} satisfies Config;
