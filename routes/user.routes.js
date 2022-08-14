const express = require('express');
const api = express.Router();
const userController = require('../controllers/user.controller');

api.get('/users', userController.getUsers);
api.get('/user/:userID', userController.getUser);
api.post('/user', userController.createUser);
api.delete('/user', userController.deleteUser);
api.put('/user', userController.updateUser);
api.post('/login', userController.login)
module.exports = api;