const weetObjectSerializer = weet => {
  const { id, userId, content } = weet;
  return { id, user_id: userId, content };
};

module.exports = {
  weetObjectSerializer
};
