export const responseLoginSchema = {
  type: 'object',
  required: ['login','password'],
  properties: {
    login: { type: 'string' },
    password: {type: 'string'}
  },
}

export const requestLoginSchema = {
  type: 'object',
  properties: {
    token: { type: 'string'},
  },
}

