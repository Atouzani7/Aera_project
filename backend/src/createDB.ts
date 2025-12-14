import { createConnection } from 'mysql2/promise';

async function ensureDatabaseExists() {
  const connection = await createConnection({
    host: 'localhost',
    user: 'AeraProject_user',
    password: 'AeraProject_password',
  });
  await connection.query('CREATE DATABASE IF NOT EXISTS AeraProject_db');
  await connection.end();
}

async function main() {
  await ensureDatabaseExists();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
