const express = require('express');
const api = express.Router();
const userController = require('../controllers/user.controller');

const jwtControl = require ('../middlewares/jwt');


api.get('/users', userController.getUsers);
api.get('/user/:userID', userController.getUser);
api.get('/userName/:name', userController.getName);
api.get('/orderByDate/', userController.orderByDate);
api.post('/user', userController.createUser);
api.delete('/user/:userToDeleteID', jwtControl,userController.deleteUsers);
api.put('/user/:userToUpdateID', userController.updateUsers);
api.post('/login', userController.login)



module.exports = api;