const signInSerializer = user => ({
  id: user.id,
  first_name: user.firstName,
  last_name: user.lastName,
  email: user.email
});

module.exports = {
  signInSerializer
};
