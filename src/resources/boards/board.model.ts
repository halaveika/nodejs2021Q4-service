export const Column = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: ['number','null'] },
  }
}

export const requestBoardSchema = {
  type: 'object',
  required: ['title','columns'],
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
    id: { type: 'string' },
    title: { type: 'string' },
    columns:{
      type: 'array',
      items: Column,
    }
  }
}



