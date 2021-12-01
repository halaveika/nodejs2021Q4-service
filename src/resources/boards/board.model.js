const Column = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: ['number','null'] },
  }
}

const Board = {
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



module.exports = Board;



