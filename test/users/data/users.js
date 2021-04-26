const userData = {
  first_name: 'Johnatan Alexis',
  last_name: 'Urbano Guzmán',
  email: 'johnatan.urbano@wolox.com.co',
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
  email: 'johnatan.urbano@wolox.com.co',
  password: '12345'
};

const userPasswordINotAlphanumeric = {
  first_name: 'Johnatan Alexis',
  last_name: 'Urbano Guzmán',
  email: 'johnatan.urbano@wolox.com.co',
  password: '@12345'
};

const userDataMissingFieldFirstName = {
  last_name: 'Urbano Guzmán',
  email: 'johnatan.urbano@wolox.com.co',
  password: '123456789'
};

const userDataMissingFieldLastName = {
  first_name: 'Johnatan Alexis',
  email: 'johnatan.urbano@wolox.com.co',
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
  email: 'johnatan.urbano@wolox.com.co'
};

const userDataAuthorized = {
  email: 'johnatan.urbano@wolox.com.co',
  password: '123456789'
};

const userDataUnauthorizedEmail = {
  email: 'johnata.urbano@wolox.com.co',
  password: '123456789'
};

const userDataUnauthorizedPassword = {
  email: 'johnatan.urbano@wolox.com.co',
  password: 'badpassword'
};

const userSignInMissingEmail = {
  password: '123456789'
};

const userSignInMissingPassword = {
  email: 'johnatan.urbano@wolox.com.co'
};

const usersToInsert = [
  {
    first_name: 'nombre uno',
    last_name: 'apellido uno',
    email: 'johnatan.urbano@wolox.com.co',
    password: '123456789'
  },
  {
    first_name: 'nombre dos',
    last_name: 'apellido dos',
    email: 'nombre.dos@wolox.com.co',
    password: '123456789'
  },
  {
    first_name: 'nombre tres',
    last_name: 'apellido tres',
    email: 'nombre.tres@wolox.com.co',
    password: '123456789'
  }
];

const userAdminData = {
  first_name: 'Johnatan Alexis',
  last_name: 'Urbano Guzmán',
  email: 'johnatan.urbano@wolox.com.co',
  password: '123456789'
};

const userAdminDataToCreate = {
  first_name: 'Admin',
  last_name: 'Admin',
  email: 'admin@wolox.com.co',
  password: '123456789'
};

module.exports = {
  userData,
  userDataEmailIncorrect,
  userPasswordIncomplete,
  userPasswordINotAlphanumeric,
  userDataMissingFieldFirstName,
  userDataMissingFieldLastName,
  userDataMissingFieldEmail,
  userDataMissingFieldPassword,
  userDataAuthorized,
  userDataUnauthorizedEmail,
  userDataUnauthorizedPassword,
  userSignInMissingEmail,
  userSignInMissingPassword,
  usersToInsert,
  userAdminData,
  userAdminDataToCreate
};
