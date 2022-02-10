export const Column = {
  type: 'object',
  required: ['title','order'],
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: ['number','null'] },
  }
}

export const requestBoardSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    columns:{
      type: 'array',
      items: Column,
    }
  }
}

export const responseBoardSchema = {
  type: 'object',
  required: ['title','id','columns'],
  properties: {
    id: { type: 'string', format: 'uuid'  },
    title: { type: 'string' },
    columns:{
      type: 'array',
      items: Column,
    }
  }
}



