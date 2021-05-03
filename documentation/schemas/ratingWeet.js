module.exports = {
  ratingWeetId: {
    type: 'number',
    example: 1
  },
  ratingUserId: {
    type: 'number',
    example: 14
  },
  weetId: {
    type: 'number',
    example: 1
  },
  score: {
    type: 'number',
    example: 1
  },
  ratingWeetCreate: {
    type: 'object',
    properties: {
      score: {
        $ref: '#/components/schemas/score'
      }
    }
  },
  ratingWeetCreated: {
    type: 'object',
    properties: {
      rating: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/components/schemas/ratingWeetId'
          },
          rating_user_id: {
            $ref: '#/components/schemas/ratingUserId'
          },
          weet_id: {
            $ref: '#/components/schemas/weetId'
          },
          score: {
            $ref: '#/components/schemas/score'
          }
        }
      }
    }
  }
};
