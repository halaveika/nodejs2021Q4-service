# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application in Docker

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

```
npm run dev:docker 
```

You should wait while the containers -app and -postgres run in development mode;

```
docker exec -i -t app /bin/bash
```

You can get into -app container with this command

```
docker stop app postgres
```

This command stop -app and -postgres containers

```
docker rm app postgres
```

This command delete -app and -postgres containers

```
docker exec app sh
npm run migrate:generate <MIGRATION_TITLE>
```

This command generate migration in runing container

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

To run load-testin with artillery.io

```
npm install -g artillery
npm run test:load
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging


### Logging level in environment variable;

You can manage Logging level by environment variable (LOG_LEVEL in .env)
Set this **LOG_LEVEL** number from 0 to 5 to the desired logging level.
In order of priority, available levels are:

error | warn | log | verbose | debug

### Migrations for data base

```
npm run entity:create <entity name>
```

To create class for typerom entity

```
npm run migrate:generate
```

To generate migration for database

```
npm run migrate:run
```

To run current migration in database

```
npm run migrate:revert
```
Return to the previos migration state

## LOAD TESTING REPORT

Load testing made by Artillery.io
Test scenarion include testing endpoint "/boards" by CRUD operations with fastify and express engine both.

# Fastfy
[Fastfy report](./test-report/fastify/report.html).
```
  "vusers.created_by_name.CRUD boards": 1200,
  "vusers.created": 1200,
  "http.requests": 6000,
  "http.codes.201": 1200,
  "http.responses": 6000,
  "http.codes.200": 4800,
  "vusers.failed": 0,
  "vusers.completed": 1200
  "http.response_time": {
    "min": 3,
    "max": 515,
    "count": 6000,
    "p50": 47.9,
    "median": 47.9,
    "p75": 96.6,
    "p90": 153,
    "p95": 186.8,
    "p99": 262.5,
    "p999": 368.8
  },
```

# Express
[Express report](./test-report/express/report.html).
```
  "vusers.created_by_name.CRUD boards": 1200,
  "vusers.created": 1200,
  "http.requests": 6000,
  "http.codes.201": 1200,
  "http.responses": 6000,
  "http.codes.200": 4800,
  "vusers.failed": 0,
  "vusers.completed": 1200
  "http.response_time": {
    "min": 3,
    "max": 4680,
    "count": 6000,
    "p50": 1495.5,
    "median": 1495.5,
    "p75": 1939.5,
    "p90": 2725,
    "p95": 3678.4,
    "p99": 4316.6,
    "p999": 4583.6
  },
```