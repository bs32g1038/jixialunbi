import * as nodemailer from 'nodemailer';

const nodemailerMailgun = nodemailer.createTransport({
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_API_KEY,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = ({ to, subject, html }) => {
  return new Promise((resolve, reject) => {
    if (!process.env.EMAIL_API_KEY || !process.env.EMAIL_PASS) {
      console.log('You need to provide MAILGUN_API_KEY and MAILGUN_DOMAIN environment variables for sending emails.');
      return resolve('An error occurred while sending an email: (Credentials missing).');
    }
    nodemailerMailgun.sendMail(
      {
        from: 'jixialunbi <jixialunbi@163.com>',
        to,
        subject,
        html,
      },
      function (err, info) {
        if (err) {
          console.log('An error occurred while sending an email: ', err);
          return reject(err);
        } else {
          return resolve(info);
        }
      }
    );
  });
};
