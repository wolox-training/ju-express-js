module.exports = {
  '/weets': {
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
          description: 'User unauthorized to create user admin',
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
