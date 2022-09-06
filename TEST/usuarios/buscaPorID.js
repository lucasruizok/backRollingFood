/*------------------------------
-------obtengo el id desde la web que lo envía
------------------------------*/

const params =new URLSearchParams(window.location.search)
const id=params.get(`id`)                                    //aqui obtengo el id que usaré para llamar al backend


/*------------------------------
-------obtengo info de la BD para que en cada llamada se renderise
------------------------------*/

const listarDatos= document.getElementById("datos");

const URL =`http://localhost:3400`

async function renderizar (id){
    const user = await axios.get ( `${URL}/user/` + id);  
    //console.log (user);  
    console.log (user.data.usuario);
    listarDatos.innerText=user.data.usuario.firstName + `/`+ user.data.usuario.mail 

}

renderizar(id);
