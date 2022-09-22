/*------------------------------
Archivo que contiene todos los pedidos en la BD, se puede ver mas y borrar a c/u
------------------------------*/
const token= "EAAZAUWhDG8ZAUBAJcbnZBgzs8wWGAV6xuV4kNcmJliIFAG8VZC1f7kgLFCcN9d2sPaQckCHfZCe6AJnP2P8QzUNXAjfB6xLllRz06ZCwPC77PMI80mQ6sEdl8Iw4x5sZB1P3lERUcDlkGdBGIHa0WsM7ftELLEzOqD3vT8u9KgU8u831Boi5SXYeIBEKgJIZATspGMIhXMLA2QZDZD"


const URL =`http://localhost:3400`

const searchInput= document.getElementById(`search`);
const listaHTML = document.getElementById(`lista1`);
//let pedidos= [];

obtener();

//para buscar por coincidencia parcial
/*
searchInput.addEventListener(`keyup`, async (event)=> {
   const searchValue =event.target.value;
   if(searchValue == ''){    //bloque para evitar error en input sin datos
    return obtener()   
   }

   console.log(`${URL}/UserName/${searchValue}`)
   const filteredUsers = await axios.get (`${URL}/UserName/${searchValue}`);
   console.log(filteredUsers)
   const usuariosFiltrados= filteredUsers.data.usuario;
   listUsers(usuariosFiltrados);
})
*/

function listPedidos(pedidos){
    listaHTML.innerHTML= ``;                                         //para blanquer pantalla
     pedidos.map ( (elemento) => {
        //console.log(elemento)
        listaHTML.innerHTML= listaHTML.innerHTML + `<br>` + elemento.usuario.firstName +elemento.usuario.lastName +
        `  <button onclick="getSpecificUser(event)" id=${elemento._id} > ver mas </button>` +
        ` <button onclick="updateSpecificUser(event)" id=${elemento._id}> update </button>`+ 
        ` <button onclick="deleteSpecificUser(event)" id=${elemento._id}> delete </button>`+ 
        `<button onclick="Pedidos(event)" id=${elemento._id}> whatsapp </button>` 
     })
     //generaBotones();

   }

//Obtiene todos los elementos  
function obtener(){
    fetch(`${URL}/pedidos`)
        .then (resp => resp.json ())
        .then (datos => {
            pedidos =datos.pedidos;        //users corresponde a la def en user.controllers (retorno de la fcion)
            botones=datos.botones       //cantidad de botones en la paginación
           listPedidos(pedidos)
        })        
}
/*
//Envio al back la pagina seleccionada por el usuario
async function paginacion (page){
    const usuariosPorPagina = await axios.get(`${URL}/users/?page=${page}`)
    listUsers(usuariosPorPagina.data.users)
}

function generaBotones(){
    const botonera= document.getElementById(`botonera`)
    botonera.innerHTML =``;
    console.log(`botones = ${botones}`);
    for (let i=0; i<botones; i++){
        console.log (i)
        botonera.innerHTML= botonera.innerHTML+`<li class="page-item"><a class="page-link" onclick="paginacion(${i})" href="#">${i+1}</a></li>`
    }
}

//Funcion VER MAS (para obtener ID en el path de nueva ventana)
function getSpecificUser(elemento){ 
    let id= elemento.target.id                                 //obtengo de todo el evento, el campo donde esta el id
    console.log(id);
    window.location.href =`buscaPorID.html?id=${id}`           //con esto me muevo a la otra página   
 }

*/

function whatsapp (phone){
    
    let phone1= "\"" + phone +"\""
    console.log("se envia ", phone1)

    var data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": phone1,
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




//Obtener campo phone del usuario desde el pedido a traves de su id
 async function Pedidos(elemento){
   
     const pedido = await axios.get(`${URL}/pedidos/${elemento.target.id}`)
     let phone=pedido.data.pedidos.usuario.phone;
     console.log(pedido.data.pedidos.usuario.phone)
     whatsapp(phone)
 }

 