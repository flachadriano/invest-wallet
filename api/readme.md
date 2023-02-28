# Api

## Installed dependencies

It was the lessons used to support this project development:
- https://youtu.be/RaweREhpBX8
- https://youtu.be/j8cm2C5-xn8
- https://youtu.be/jBOLRzjEERk

### Application dependencies

* express - the framework to create the server. https://expressjs.com/
* typeorm - work with database, using ORM. https://typeorm.io/
* reflect-metadata - dependency of typeorm
* pg - postgres database
* express-async-errors - intercept application errors

### Development dependencies

* typescript - this is a typescript project
* ts-node-dev - run our server on development mode
* eslint - source code style
* vitest - run tests

### Commands used to create the project

This command is used to initialize the typescript configurator
```bash
yarn tsc --init
```

## Work with the database

When you want to add anything on database, just change the entity describe on entities folder.

Then run the command:
```bash
yarn migrate:generate
```

It will generate a migration on `src/migrations`. Run the below command, as soon as possible, because if you generate two migrations before run it, it will broke the database:
```bash
yarn migrate:run
```
