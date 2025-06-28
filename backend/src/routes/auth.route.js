const express = require('express');

const { signup, login, logout, verfiyEmail, forgotPassword, resetPasswod } = require('../middleware/auth.controller');


const route = express.Router();

route.post('/signup', signup);
route.post('/login', login);
route.post('/logout', logout);
route.post('/verifyemail', verfiyEmail)
route.post('/forgot-password', forgotPassword)
route.post('/reset-password/:token', resetPasswod); 

module.exports = route; 