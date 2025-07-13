require('dotenv').config();

module.exports = {
    EMAIL_USER: process.env.EMAIL_USER?.trim(),
    EMAIL_PASS: process.env.EMAIL_PASS?.trim(),
};
