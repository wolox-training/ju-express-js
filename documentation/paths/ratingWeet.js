module.exports = {
  '/weets/:id/ratings': {
    post: {
      tags: ['Rating weet operations'],
      description: 'Create rating weet',
      operationId: 'createRatingWeet',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ratingWeetCreate'
            }
          }
        },
        required: true
      },
      responses: {
        201: {
          description: 'New rating weet was created',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ratingWeetCreated'
              }
            }
          }
        },
        401: {
          description: 'User unauthorized to create rating weet',
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
