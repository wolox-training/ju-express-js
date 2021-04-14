const userData = {
  first_name: 'Johnatan Alexis',
  last_name: 'Urbano Guzmán',
  email: 'johnatan.urbano@wolox.co',
  password: '123456789'
};

const userDataEmailIncorrect = {
  first_name: 'Johnatan Alexis',
  last_name: 'Urbano Guzmán',
  email: 'johnatan.urbano@wolox',
  password: '123456789'
};

const userPasswordIncomplete = {
  first_name: 'Johnatan Alexis',
  last_name: 'Urbano Guzmán',
  email: 'johnatan.urbano@wolox.co',
  password: '12345'
};

const userPasswordINotAlphanumeric = {
  first_name: 'Johnatan Alexis',
  last_name: 'Urbano Guzmán',
  email: 'johnatan.urbano@wolox.co',
  password: '@12345'
};

const userDataMissingFieldFirstName = {
  last_name: 'Urbano Guzmán',
  email: 'johnatan.urbano@wolox.co',
  password: '123456789'
};

const userDataMissingFieldLastName = {
  first_name: 'Johnatan Alexis',
  email: 'johnatan.urbano@wolox.co',
  password: '123456789'
};

const userDataMissingFieldEmail = {
  first_name: 'Johnatan Alexis',
  last_name: 'Urbano Guzmán',
  password: '123456789'
};

const userDataMissingFieldPassword = {
  first_name: 'Johnatan Alexis',
  last_name: 'Urbano Guzmán',
  email: 'johnatan.urbano@wolox.co'
};

module.exports = {
  userData,
  userDataEmailIncorrect,
  userPasswordIncomplete,
  userPasswordINotAlphanumeric,
  userDataMissingFieldFirstName,
  userDataMissingFieldLastName,
  userDataMissingFieldEmail,
  userDataMissingFieldPassword
};
