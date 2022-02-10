export const requestTaskSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    order: { type: ['number','null'], default: null },
    description: { type: 'string',default: '' },
    userId: { type: ['string','null'], default: null }, // assignee
    boardId: { type: ['string']},
    columnId: { type: ['string','null'], default: null },
  }
}

export const responseTaskSchema = {
  type: 'object',
  required: ['id','title','order','columnId','boardId'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    title: { type: 'string' },
    order: { type: ['number','null']},
    description: { type: 'string' },
    userId: { type: ['string','null'], default: null }, // assignee
    boardId: { type: ['string']},
    columnId: { type: ['string','null'], default: null },
  }
}



