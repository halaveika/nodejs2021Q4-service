export const responseUserSchema = {
  type: 'object',
  required: ['id','name','login'],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: {type: 'string'}
  },
}

export const requestUserSchema = {
  type: 'object',
  required: ['name','login','password'],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: {type: 'string'},
    password: {type: 'string'},
  },
}

