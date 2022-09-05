/*------------------------------
Archivo que contiene todos los usuario en la BD, se puede ver mas y borrar a c/u
------------------------------*/



const URL =`http://localhost:3400`

const searchInput= document.getElementById(`search`);
const listaHTML = document.getElementById(`lista1`);
let usuarios= [];

obtener();

//para buscar por coincidencia parcial
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


function listUsers(usuarios){
    listaHTML.innerHTML= ``;                                         //para blanquer pantalla
     usuarios.map ( (elemento) => {
        console.log(elemento._id)
        listaHTML.innerHTML= listaHTML.innerHTML + `<br>` + elemento.firstName +`  <button onclick="getSpecificUser(event)" id=${elemento._id} > ver mas </button>` +
        ` <button onclick="updateSpecificUser(event)" id=${elemento._id}> update </button>`+ ` <button onclick="deleteSpecificUser(event)" id=${elemento._id}> delete </button>` 
     })
     generaBotones();

   }

//Obtiene todos los elementos  
function obtener(){
    fetch(`${URL}/users`)
        .then (resp => resp.json ())
        .then (datos => {
            usuarios =datos.users;        //users corresponde a la def en user.controllers
            botones=datos.botones       //cantidad de botones en la paginación
            listUsers(usuarios)
        })        
}

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