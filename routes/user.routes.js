const express = require('express');
const api = express.Router();
const userController = require('../controllers/user.controller');

const jwtControl = require ('../middlewares/jwt');
const isAdmin = require ('../middlewares/isAdmin');
const userCreateUserValidator = require ('../middlewares/userCreateUserValidator')
const validate = require ('../middlewares/validate')


api.get('/users', userController.getUsers);
api.get('/user/:userID',jwtControl, userController.getUser);
api.get('/userName/:name', userController.getName);
api.get('/orderByDate/', userController.orderByDate);
api.post('/user', userCreateUserValidator (),validate,userController.createUser);
api.delete('/user/:userToDeleteID',[jwtControl,isAdmin] ,userController.deleteUsers);
api.put('/user/:userToUpdateID', userController.updateUsers);
api.post('/login', userController.login)



module.exports = api;