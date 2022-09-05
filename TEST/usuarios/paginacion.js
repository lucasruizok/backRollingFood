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
  // console.log(event.key);          // testigo de tecla
   //console.log(event.target.value); // testigo de todo lo escrito
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
  
   }


  

function obtener(){
    fetch(`${URL}/users`)
        .then (resp => resp.json ())
        .then (datos => {
            usuarios =datos.users;  //usuariosEncontrados corresponde a la def en user.controllers
            listUsers(usuarios)
        })
        
}