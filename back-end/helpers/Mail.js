const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bikecare.no.replay@gmail.com',
    pass: 'jucpohpxtwtztzcq',
  },
});

function sendEmail(to, subject, text, html, callback) {
  const mailOptions = {
    from: 'bikecare.no.replay@gmail.com',
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      callback(error, null);
    } else {
      console.log('Email sent:', info.response);
      callback(null, info.response);
    }
  });
}

module.exports = {
  sendEmail,
};
