import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const port = (process.env.DB_PORT as unknown) as number | undefined;

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['src/entities/*.{ts,js}'],
  migrations: ['src/migrations/*.{ts,js}'],
  namingStrategy: new SnakeNamingStrategy(),
  ssl: true
});

export default AppDataSource;
