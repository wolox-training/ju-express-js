module.exports = {
  offset: {
    name: 'offset',
    in: 'query',
    schema: {
      type: 'integer',
      default: 0
    },
    required: false
  },
  limit: {
    name: 'limit',
    in: 'query',
    schema: {
      type: 'integer',
      default: 5
    },
    required: false
  },
  countPaginator: {
    type: 'number',
    example: 0
  },
  totalPages: {
    type: 'number',
    example: 0
  }
};
