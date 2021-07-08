const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { config: { SERVICE_EMAIL, SERVICE_EMAIL_LOGIN, SERVICE_EMAIL_PASS } } = require('../config');
const templateInfo = require('../email-templates/index');
const { ErrorHandler, errorMessages: { TEMPLATE_NOT_FOUND } } = require('../errors');
const { statusCode } = require('../constants');

const templateParser = new EmailTemplates({
  views: {
    root: path.join(process.cwd(), 'email-templates'),
  }
});

const transporter = nodemailer.createTransport({
  service: SERVICE_EMAIL,
  auth: {
    user: SERVICE_EMAIL_LOGIN,
    pass: SERVICE_EMAIL_PASS
  }
});

const sendMail = async (userMail, action, context = {}) => {
  const sendTemplate = templateInfo[action];

  if (!sendTemplate) {
    throw new ErrorHandler(statusCode.NOT_FOUND, TEMPLATE_NOT_FOUND.message, TEMPLATE_NOT_FOUND.code);
  }

  const html = await templateParser.render(sendTemplate.templateName, context);

  await transporter.sendMail({
    from: 'No Reply',
    to: userMail,
    subject: 'Hello, user',
    html
  });
};

module.exports = { sendMail };
