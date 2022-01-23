export const responseLoginSchema = {
  type: 'object',
  required: ['login','password'],
  properties: {
    name: { type: 'string'},
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

