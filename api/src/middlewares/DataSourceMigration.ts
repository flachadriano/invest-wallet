import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'ep-square-sun-553066.us-east-2.aws.neon.tech',
  port: 5432,
  username: 'flachadriano',
  password: 'rJ8DPjdtyZ6M',
  database: 'neondb',
  entities: ['src/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
  ssl: true
});

export default AppDataSource;
