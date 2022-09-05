//var request = require('request');
var https = require('follow-redirects').https;
var fs = require('fs');
//var request = require('request');
var axios = require('axios');

function envioPedido(req,res){
    console.log("prueba")
   /* res.json ({
        datos: "datos de prueba"
    });*/

    /*    
    var data = JSON.stringify({ 
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
      
      var config = {
        method: 'post',
        url: 'https://graph.facebook.com/v13.0/106030762244022/messages',
        headers: { 
          'Authorization': 'Bearer EAAZAUWhDG8ZAUBAMY9qkoUkZA4xjLSMgGYcy18rl6P9xSQt431PJHSIkBcTClgZCP6gCC9gXYBZBwjPibuuNtsKDlkLCl01HVkfszz5dwZAACNQEgB9Yp77XLZABhv26xo2aREIZAxsmSryCZBvz2lzKDzD9sSJfpnbzW8fQd88AS3jEWRUyhPkOhSlk0ZAhyK4llxKkNWzj1HFwZDZD', 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
      

   */
}

module.exports = envioPedido