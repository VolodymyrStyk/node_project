const { emailActiosEnum } = require('../constants');

module.exports = {
  [emailActiosEnum.WELCOME]: {
    templateName: 'welcome',
    subject: 'Welcome on board'
  },

  [emailActiosEnum.PASSWORD_CHANGE]: {
    templateName: 'changePassword',
    subject: 'Password was changed'
  },

  [emailActiosEnum.CREATE_NEW_USER]: {
    templateName: 'createNewUser',
    subject: 'Create new User, approve e-mail'
  },

  [emailActiosEnum.DELETE_USER]: {
    templateName: 'deleteUser',
    subject: 'Create new User, approve e-mail'
  },

  [emailActiosEnum.UPDATE_USER]: {
    templateName: 'updateUser',
    subject: 'Create new User, approve e-mail'
  }
};
