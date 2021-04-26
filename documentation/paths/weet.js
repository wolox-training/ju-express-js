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
        }
      }
    }
  }
};
