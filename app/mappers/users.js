const signUpMapper = payload => ({
  firstName: payload.first_name,
  lastName: payload.last_name,
  email: payload.email,
  password: payload.password
});

module.exports = {
  signUpMapper
};
