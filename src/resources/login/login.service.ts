import { loginHandler } from './login.handler';

export const loginUser = {
  schema: {
    body: {login: 'string', password: 'string'},
    response: {
      200: {token:'string'},
    },
  },
  handler: loginHandler,
}

