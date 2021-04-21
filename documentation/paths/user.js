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
        }
      }
    }
  },
  '/signin': {
    post: {
      tags: ['User operations'],
      description: 'Login user',
      operationId: 'signin',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/userJsonLogin'
            }
          }
        },
        required: true
      },
      responses: {
        201: {
          description: 'User logged successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/userLoginSuccessful'
              }
            }
          }
        },
        401: {
          description: 'User does not exists',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/userNotExists'
              }
            }
          }
        }
      }
    }
  }
};
