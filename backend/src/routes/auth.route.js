const express = require('express');

const { signup, login, logout } = require('../middleware/auth.controller');


const route = express.Router();

route.post('/signup', signup);
route.get('/login', login);
route.get('/logout', logout);


module.exports = route;