const bodyTaskSchema = {
  type: 'object',
  // required: ['title','order','description','userId','boardId','columnId'],
  properties: {
    title: { type: 'string' },
    order: { type: ['number','null'] },
    description: { type: 'string' },
    userId: { type: ['string','null'], default: null }, // assignee
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


module.exports = {bodyTaskSchema,responseTaskSchema};



