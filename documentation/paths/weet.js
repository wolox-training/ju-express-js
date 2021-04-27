module.exports = {
  '/weet': {
    post: {
      tags: ['Weet operations'],
      description: 'Create weet',
      operationId: 'createWeet',
      parameters: [],
      responses: {
        201: {
          description: 'New weet was created',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/weetCreated'
              }
            }
          }
        },
        401: {
          description: 'User unauthorized to create weet',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/unauthorizedUser'
              }
            }
          }
        }
      }
    }
  },
  '/weets': {
    get: {
      tags: ['Weet operations'],
      description: 'Get all weets',
      operationId: 'getAllWeets',
      parameters: [
        {
          $ref: '#/components/schemas/limit'
        },
        {
          $ref: '#/components/schemas/offset'
        }
      ],
      responses: {
        200: {
          description: 'Weets data successful',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/getAllWeetsData'
              }
            }
          }
        },
        401: {
          description: 'User unauthorized to create weet',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/unauthorizedUser'
              }
            }
          }
        }
      }
    }
  }
};
