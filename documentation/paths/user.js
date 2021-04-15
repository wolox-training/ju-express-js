module.exports = {
  '/signup': {
    post: {
      tags: ['User operations'],
      description: 'Create user',
      operationId: 'signup',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/userJsonCreate'
            }
          }
        },
        required: true
      },
      responses: {
        201: {
          description: 'New user was created',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/userCreated'
              }
            }
          }
        },
        409: {
          description: 'User already exists',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/userAlreadyExists'
              }
            }
          }
        },
        400: {
          description: 'Invalid parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/userAlreadyExists'
              }
            }
          }
        }
      }
    }
  }
};
