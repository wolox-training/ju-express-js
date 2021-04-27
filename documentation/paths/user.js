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
  },
  '/users': {
    get: {
      tags: ['User operations'],
      description: 'Get all users',
      operationId: 'getAllUsers',
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
          description: 'Users data successful',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/getAllUsersData'
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
  '/admin/users': {
    post: {
      tags: ['User operations'],
      description: 'Create user admin',
      operationId: 'adminUsers',
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
          description: 'New user admin was created',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/userCreated'
              }
            }
          }
        },
        401: {
          description: 'User unauthorized to create user admin',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/userCantCreateAdmin'
              }
            }
          }
        },
        409: {
          description: 'User admin already exists',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/userAdminAlreadyExists'
              }
            }
          }
        }
      }
    }
  }
};
