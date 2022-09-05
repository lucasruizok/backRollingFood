const express = require('express');
const api = express.Router();
const whatsappController = require('../controllers/whatsapp.controller');


api.post('https://graph.facebook.com/v13.0/106030762244022/messageshttps://graph.facebook.com/v13.0/106030762244022/messages', function (req,res){
    console.log("prueba");
    res.json (
       
{ 
    "messaging_product": "whatsapp",
 "to": "543815446283",
  "type": "template",
   "template": 
   { "name": "hello_world",
    "language":
     { "code": "en_US" }
   } 
}
    );

});

module.exports = api; 