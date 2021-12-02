const Column = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: ['number','null'] },
  }
}

const requestBoardSchema = {
  type: 'object',
  required: ['title'],
  properties: {
    title: { type: 'string' },
    columns:{
      type: 'array',
      items: Column,
    }
  }
}

const responseBoardSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns:{
      type: 'array',
      items: Column,
    }
  }
}




module.exports = {requestBoardSchema,responseBoardSchema};



