const ratingWeetMapper = payload => ({
  ratingUserId: payload.rating_user_id,
  weetId: payload.weet_id,
  score: payload.score
});

module.exports = {
  ratingWeetMapper
};
