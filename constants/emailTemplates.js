'use strict';

const EMAIL_TEMPLATES = {
  REGISTER: {
    subject: 'Welcome',
    html: `<div
    style="width: 100%; color:white; font-family: sans-serif; text-align: center; padding: 1.5rem; box-sizing: border-box; border-radius: 1rem; background-image: linear-gradient(0, rgb(30, 30, 170), rgb(26, 29, 41));">
    <h1 style="width: 100%; margin: 0;">Welcome to the Disney World</h1>
    <br>
    <p style="width: 100%; margin: 0; font-size: 1.25rem;">You are now registered in the platform</p>
  </div>`,
  },
};

module.exports = EMAIL_TEMPLATES;
