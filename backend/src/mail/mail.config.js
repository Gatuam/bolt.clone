require("dotenv").config({path : '../../.env'});
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  secure: true,
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

async function sendMail(to, sub, msg) {
  try {
    let info = await transporter.sendMail({
      from: process.env.APP_USER,
      to: to,
      subject: sub,
      html: msg,
    });
    console.log('Email sent:', info.messageId);
  } catch (err) {
    console.error('Failed to send mail:', err);
  }
}

sendMail( process.env.APP_USER, sub, msg );

module.exports = sendMail;