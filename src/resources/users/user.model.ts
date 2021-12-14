export const responseUserSchema = {
  type: 'object',
  required: ['name'],
  properties: {
    id: { type: 'string'},
    name: { type: 'string' },
    login: {type: 'string'}
  },
}

export const requestUserSchema = {
  type: 'object',
  properties: {
    id: { type: 'string'},
    name: { type: 'string' },
    login: {type: 'string'},
    password: {type: 'string'},
  },
}

