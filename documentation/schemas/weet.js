module.exports = {
  weetId: {
    type: 'number',
    example: 1
  },
  content: {
    type: 'string',
    example: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print'
  },
  weetCreated: {
    type: 'object',
    properties: {
      weet: {
        type: 'string',
        example: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print'
      }
    }
  },
  getAllWeetsData: {
    type: 'object',
    properties: {
      count: {
        $ref: '#/components/schemas/countPaginator'
      },
      users: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              $ref: '#/components/schemas/weetId'
            },
            user_id: {
              $ref: '#/components/schemas/userId'
            },
            content: {
              $ref: '#/components/schemas/content'
            }
          }
        }
      },
      totalPages: {
        $ref: '#/components/schemas/totalPages'
      }
    }
  }
};
