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
  },
  userJsonLogin: {
    type: 'object',
    properties: {
      email: {
        $ref: '#/components/schemas/userEmail'
      },
      password: {
        $ref: '#/components/schemas/userPassword'
      }
    }
  },
  userLoginSuccessful: {
    type: 'object',
    properties: {
      token: {
        type: 'string',
        example:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImZpcnN0X25hbWUiOiJKb2huYXRhbiIsImxhc3RfbmFtZSI6IlVyYmFubyBHIiwiZW1haWwiOiJqb2huYXRhbkB3b2xveC5jb20uY28iLCJpYXQiOjE2MTg4NDkxMTYsImV4cCI6MTYxODg1MjcxNn0.ClKuLIWeWS3Tj_wPJ3WYvUcn7l-7I5laT9tlCmXOers'
      },
      expires: {
        type: 'number',
        example: '3600'
      }
    }
  },
  userNotExists: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'The user johnsatan@wolox.com.co is wrong'
      },
      internal_code: {
        type: 'string',
        example: 'unauthorized_error'
      }
    }
  }
};
