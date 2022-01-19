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

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Running application in Docker

```
npm run dev:docker 
```
or

```
docker-compose up --build
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

0. 'fatal'
1. 'error'
2. 'warn'
3. 'info'
4. 'debug'
5. 'trace'

Example: logger.level = 'info'
The logging level is a minimum level. For instance if logger.level is 'info' then all 'fatal', 'error', 'warn', and 'info' logs will be enabled.

You can pass 'silent' to disable logging:
where **LOG_LEVEL** > 5 or no specify
