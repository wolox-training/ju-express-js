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
    example: 1
  },
  totalPages: {
    type: 'number',
    example: 0
  },
  unauthorizedUser: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Invalid token'
      },
      internal_code: {
        type: 'string',
        example: 'unauthorized_error'
      }
    }
  }
};
