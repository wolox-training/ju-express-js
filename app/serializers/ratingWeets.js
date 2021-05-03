const ratingWeetObjectSerializer = ratingWeet => {
  const { id, ratingUserId, weetId, score } = ratingWeet;
  return { id, rating_user_id: ratingUserId, weet_id: weetId, score };
};

module.exports = {
  ratingWeetObjectSerializer
};
