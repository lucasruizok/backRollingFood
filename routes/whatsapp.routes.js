const express = require('express');
const api = express.Router();
const whatsappController = require('../controllers/whatsapp.controller');


api.post('https://graph.facebook.com/v13.0/106030762244022/messages', async function (req,res){
    console.log("prueba");
    
    try{
        const usuario = await axios.get(
            'https://graph.facebook.com/v13.0/106030762244022/messages',
            {
            headers:{
                     'Authorization': token
                    }
            },
        
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
                    )           
            )
        
   }catch(error){
        console.log(error)
   }
});

module.exports = api; 