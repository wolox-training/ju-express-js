const TOKEN_JWT_EXPIRES = 60 * 60;
const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;
const DEFAULT_LENGTH_WEET = 140;
const USER_ROLE = {
  ADMIN: 'admin',
  REGULAR: 'regular'
};
const USER_POSITIONS = {
  DEVELOPER: 'Developer',
  LEAD: 'Lead',
  TL: 'TL',
  EM: 'EM',
  HEAD: 'HEAD',
  CEO: 'CEO'
};
const TEMPLATES = {
  WELCOME: 'welcome.html'
};

const EMAIL_SENDER = 'johnatan.urbano@wolox.co';

module.exports = {
  TOKEN_JWT_EXPIRES,
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  USER_ROLE,
  DEFAULT_LENGTH_WEET,
  USER_POSITIONS,
  TEMPLATES,
  EMAIL_SENDER
};
