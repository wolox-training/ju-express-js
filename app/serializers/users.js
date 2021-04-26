const userObjectSerializer = user => {
  const { id, firstName, lastName, email, role } = user;
  return { id, first_name: firstName, last_name: lastName, email, role };
};

module.exports = {
  userObjectSerializer
};
