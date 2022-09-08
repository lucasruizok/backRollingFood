/*------------------------------
-------obtengo el id desde la web que lo envía
------------------------------*/

const params =new URLSearchParams(window.location.search)
const id=params.get(`id`)                                    //aqui obtengo el id que usaré para llamar al backend
const listarDatos= document.getElementById("datos");
const URL =`http://localhost:3400`;
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmZhYzBhMTY3ZmFhZDhiMTJkMDlmNWMiLCJmaXJzdE5hbWUiOiJNYXJ0aW4iLCJsYXN0TmFtZSI6IlJvZHJpZ3VleiIsIm1haWwiOiJtYXJ0aW5AZ21haWwuY29tIiwibmFtZVVzZXIiOiJuZW90ZWNoIiwiYWdlIjozNCwic3RhdGUiOmZhbHNlLCJyb2xlIjoiQWRtaW5pc3RyYWRvciIsIl9fdiI6MCwiZmVjaGEiOiIyMDIyLTA5LTA3VDAyOjI4OjU2LjgwOFoiLCJpYXQiOjE2NjI1MTc3MzZ9.vSGwXCVIweGYS2npM0zkzTdffrDl4BOlrB9r_TGbuHg"


// se envía token ya que se define asi en archivo user.routes.js
async function enviaToken(){  
    try{
        const usuario = await axios.get(
            `${URL}/user/` + id,
            {
            headers:{
                     'Authorization': token
                    }
            }
        )
        console.log(usuario.data)          
        listarDatos.innerText=usuario.data.usuario.firstName + `/`+ usuario.data.usuario.mail 
   }catch(error){
        console.log(error)
   }
}


enviaToken();








