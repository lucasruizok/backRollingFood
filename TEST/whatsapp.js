const token= "EAAZAUWhDG8ZAUBAJcbnZBgzs8wWGAV6xuV4kNcmJliIFAG8VZC1f7kgLFCcN9d2sPaQckCHfZCe6AJnP2P8QzUNXAjfB6xLllRz06ZCwPC77PMI80mQ6sEdl8Iw4x5sZB1P3lERUcDlkGdBGIHa0WsM7ftELLEzOqD3vT8u9KgU8u831Boi5SXYeIBEKgJIZATspGMIhXMLA2QZDZD"
const token2= "EAAZAUWhDG8ZAUBAOZC1LXBFRWRVsUY2qZBrI2Kf8WjGeZBaYEBBjEEVx4z39rL3FUyqcuDxheQ0LVWGZBS7U2xqU4clZCErJKzZAgtODkcJP0uS8Q00XQi2RUtYckb5JILV38FSYoZAPObIdZC4PBrKpPenA1y1JRrz8Dj29ZBSZA979JJJmTEplDXug"



 function envioWhatsapp (phone){
   
    const celular= "54" + phone                 //completo numero con la estructura para el envio
    console.log("numero completo", celular)


    let objeto= {
        "messaging_product": "whatsapp",
        "to": "numeroDestino",
        "type": "template",
        "template": {
        "name": "rollingfood1",
        "language": {
            "code": "es"
        }
        }
    }
    
    objeto.to = celular
   
    var data = JSON.stringify(objeto);
    
    var config = {
        method: 'post',
        url: 'https://graph.facebook.com/v13.0/106030762244022/messages',
        headers: { 
        'Authorization': 'Bearer EAAZAUWhDG8ZAUBAOZC1LXBFRWRVsUY2qZBrI2Kf8WjGeZBaYEBBjEEVx4z39rL3FUyqcuDxheQ0LVWGZBS7U2xqU4clZCErJKzZAgtODkcJP0uS8Q00XQi2RUtYckb5JILV38FSYoZAPObIdZC4PBrKpPenA1y1JRrz8Dj29ZBSZA979JJJmTEplDXug', 
        'Content-Type': 'application/json'
        },
        data : data
    };
    
    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("Mensaje Whatsapp enviado correctamente")
    })
    .catch(function (error) {
        console.log(error);
        alert("Error en envío de mensaje por Whatsapp  ")
    });

}


//exports.envioWhatsapp = envioWhatsapp

//export  {envioWhatsapp}