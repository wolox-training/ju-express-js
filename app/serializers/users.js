const userObjectSerializer = user => {
  const { id, firstName, lastName, email } = user;
  return { id, first_name: firstName, last_name: lastName, email };
};

module.exports = {
  userObjectSerializer
};
