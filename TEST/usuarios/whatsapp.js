const token= "EAAZAUWhDG8ZAUBAJcbnZBgzs8wWGAV6xuV4kNcmJliIFAG8VZC1f7kgLFCcN9d2sPaQckCHfZCe6AJnP2P8QzUNXAjfB6xLllRz06ZCwPC77PMI80mQ6sEdl8Iw4x5sZB1P3lERUcDlkGdBGIHa0WsM7ftELLEzOqD3vT8u9KgU8u831Boi5SXYeIBEKgJIZATspGMIhXMLA2QZDZD"
/*let data


data=  
    {
    "messaging_product": "whatsapp",
    "to": "543815446283",
    "type": "template",
    "template": 
        { 
        "name": "hello_world",
        "language": { "code": "en_US" }
        } 
    }


console.log(data)

async function whatsapp(){
console.log("ingreso")
try{

/*
     const usuario = await axios({
        url: "https://graph.facebook.com/v13.0/106030762244022/messages",
        method: "POST",
        header: {
          "Content-Type": "application/json",
          'Authorization':  ' EAAZAUWhDG8ZAUBAOZC1LXBFRWRVsUY2qZBrI2Kf8WjGeZBaYEBBjEEVx4z39rL3FUyqcuDxheQ0LVWGZBS7U2xqU4clZCErJKzZAgtODkcJP0uS8Q00XQi2RUtYckb5JILV38FSYoZAPObIdZC4PBrKpPenA1y1JRrz8Dj29ZBSZA979JJJmTEplDXug' 
        },
        data: data
      });   

}catch(error){
    console.log(error)
}


}
*/
let celular= "543815446283"


function whatsapp (){

    var data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": celular,
        "type": "template",
        "template": {
        "name": "hello_world",
        "language": {
            "code": "en_US"
        }
        }
    });
    
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
    })
    .catch(function (error) {
        console.log(error);
    });

}