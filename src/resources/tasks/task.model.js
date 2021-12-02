const requestTaskSchema = {
  type: 'object',
  required: ['title'],
  properties: {
    title: { type: 'string' },
    order: { type: ['number','null'] },
    description: { type: 'string' },
    userId: { type: ['string','null'], default: null }, // assignee
    boardId: { type: ['string']},
    columnId: { type: ['string','null'], default: null },
  }
}

const responseTaskSchema = {
  type: 'object',
  required: ['id','title','order','description','userId'],
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: ['number','null']},
    description: { type: 'string' },
    userId: { type: ['string','null'], default: null }, // assignee
    boardId: { type: ['string']},
    columnId: { type: ['string','null'], default: null },// assignee
  }
}


module.exports = {requestTaskSchema,responseTaskSchema};



