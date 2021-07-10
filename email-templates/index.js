const { emailActiosEnum } = require('../constants');

module.exports = {
  [emailActiosEnum.WELCOME]: {
    templateName: 'welcome',
    subject: 'Welcome on board'
  },

  [emailActiosEnum.LOG_OUT]: {
    templateName: 'LogOut',
    subject: 'Log Out, buy'
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
