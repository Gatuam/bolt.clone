const express = require('express');

const { signup, login, logout, verfiyEmail } = require('../middleware/auth.controller');


const route = express.Router();

route.post('/signup', signup);
route.post('/login', login);
route.post('/logout', logout);
route.post('/verifyemail', verfiyEmail)


module.exports = route;