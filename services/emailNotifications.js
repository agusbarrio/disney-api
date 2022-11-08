const sgMail = require('@sendgrid/mail');
const config = require('../config/env');
if (config.SENDGRID_API_KEY) sgMail.setApiKey(config.SENDGRID_API_KEY);
const emailNotificationsService = {
  sendMail: async (template, to, cc = '', bcc = '') => {
    const msg = {
      to,
      cc,
      bcc,
      from: `Disney api - Alkemy Challenge - <${config.SENDGRID_EMAIL}>`,
      subject: 'Disney api - Alkemy challenge',
      html: 'ups',
      ...template,
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  },
};

module.exports = emailNotificationsService;
