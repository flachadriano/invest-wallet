import express from "express";
import AppDataSource from "./src/DataSource";

console.log('Connecting to the database...');
AppDataSource.initialize().then(() => {
  console.log('Connected to the database');

  const app = express();
  app.use(express.json());

  app.get('/', (req, res) => res.json('Hello World!'));

  app.listen(process.env.APP_PORT, () => console.log(`Server is running on port ${process.env.APP_PORT}`));

}).catch(e => console.log('Failed to connect to the database:', e));
