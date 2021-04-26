const weetMapper = payload => ({
  userId: payload.id,
  content: payload.quoteText
});

module.exports = {
  weetMapper
};
