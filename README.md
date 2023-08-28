# Bookmarks API

A bookmark management API built with **[Nest JS](https://nestjs.com/)** and **[TypeScript](https://www.typescriptlang.org/)**. This study project is a dive into the best practices of **[Node JS](https://nodejs.org/)** back-end technologies. It leverages **[Docker and Docker Compose](https://www.docker.com/)** for containerized databases, employs **[Prisma](https://www.prisma.io/)** as the ORM for streamlined database operations, and integrates **[JWT](https://jwt.io/)** for secure authentication.

## Installation

1. Clone the repository:

```bash
  git clone git@github.com:afonsofn/bookmarks-api.git && cd bookmarks-api
```

2. Install the dependencies:

```bash
  npm install
```

## Database Configuration

The project uses Prisma as an ORM and has convenience scripts to manage the database:

1. Start the dev database:

```bash
  npm run db:dev:start
```

2. Apply migrations to the dev database:

```bash
  npm run prisma:dev:deploy
```

3. Open Prisma Studio for the dev database:

```bash
  npm run prisma:dev:studio
```

Other useful scripts:

- Restart the development database:

```bash
  npm run db:dev:restart
```

- Delete the development database:

```bash
  npm run db:dev:delete
```

Similar scripts are available for the test environment, just replace dev with test in the commands above.

## Execution

- Start API in dev mode:

```bash
  npm run start
```

- Start API in dev watch mode :

```bash
  npm run start:dev
```

- Start API in prod mode :

```bash
  npm run start:prod
```

## Testing

- Run end-to-end tests:

```bash
  npm run test:e2e
```

## Formatting and Linting

- Format the code with Prettier:

```bash
  npm run format
```

- Run ESLint:

```bash
  npm run lint
```

## License

This project is distributed under the [MIT](LICENSE) license.

Developed by **[@Raff](https://www.linkedin.com/in/afonsofn/)**
