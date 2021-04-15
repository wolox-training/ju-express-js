module.exports = {
  userFirstName: {
    type: 'string',
    example: 'Johnatan Alexis'
  },
  userLastName: {
    type: 'string',
    example: 'Urbano Guzmán'
  },
  userEmail: {
    type: 'string',
    example: 'johnatan.urbano@wolox.com.co'
  },
  userPassword: {
    type: 'string',
    example: '12345678'
  },
  userJsonCreate: {
    type: 'object',
    properties: {
      first_name: {
        $ref: '#/components/schemas/userFirstName'
      },
      last_name: {
        $ref: '#/components/schemas/userLastName'
      },
      email: {
        $ref: '#/components/schemas/userEmail'
      },
      password: {
        $ref: '#/components/schemas/userPassword'
      }
    }
  },
  userCreated: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'Johnatan Alexis'
      }
    }
  },
  userAlreadyExists: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'The user already exists'
      },
      internal_code: {
        type: 'string',
        example: 'conflict_error'
      }
    }
  }
};
