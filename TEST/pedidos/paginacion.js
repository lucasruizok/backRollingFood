/*------------------------------
Archivo que contiene todos los pedidos en la BD, se puede ver mas y borrar a c/u
------------------------------*/



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
        console.log(elemento)
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


//Obtener campo phone del usuario desde el pedido a traves de su id
 async function Pedidos(elemento){
   
     const pedido = await axios.get(`${URL}/pedidos/${elemento.target.id}`)
     console.log(pedido.data.pedidos.usuario.phone)
 }

 