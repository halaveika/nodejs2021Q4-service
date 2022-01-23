import { loginHandler } from './login.handler';
import { responseLoginSchema, requestLoginSchema } from './login.model';

export const loginUser = {
  schema: {responseLoginSchema,
    response: {
      200: requestLoginSchema,
    },
  },
  handler: loginHandler,
}

