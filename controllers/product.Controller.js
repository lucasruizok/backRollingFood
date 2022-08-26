const Product = require ('../schemas/product.schema');

//Creacion de productos
async function createProduct (req, res){
    try{
        console.log (req.body);
        let producto = new Product (req.body);                                                                       
        const nuevoProducto = await producto.save();      
        return res.send({
            message:"producto creado correctamente " ,
            producto: nuevoProducto
        });
    } catch(error){
        return res.send({
            message:"Error en creacion de producto ",
            error 
        });    
    }
}

//buscar todos los productos
function getPoducts(req,res) {
    Product.find ( {} , (error,productos)=> {                                  
        if( productos.length == 0){
            return res.status(404).send({
                message: " No se encontró ningun producto"
            })
        }    
         if(error) {
             return res.status(200).send({
                 message: "Error al obtener productos"
             })
         }
         return res.status(200).send({
             message: "Productos obtenidos correctamente",
             productosEncontrados: productos
         })      
    })  
}

//Busqueda de productos recuperando id : (VER MAS)
async function getProduct (req ,res){
    try{
        const id= req.params.productID                                             //obtengo el id desde el path
        console.log( `El id del producto solicitado es: ${req.params.productID}` )
        let producto =await Product.findById(id)                                                
        return res.send({
            message: "Busqueda por params exitosa",
            producto
        })
    }catch(error){
        return res.send({
            message: "Error obtenido en la busqueda",
            error
        })
    }
}

//Busqueda por nombre de producto
async function getName (req,res){
    const name= req.params.productName;
    console.log(name)
    try{
        const producto = await Product.find({nombre: new RegExp(name,'i')})
                                                                                            
        if(producto.length == 0){                                           //bloque para control de array vacio.
            return res.send({
                message: 'No se enconto ningun producto'
            })
        }       
        return res.send({
                message: 'busqueda por nombre exitosa',
                producto
            })        
    } catch(error){
        return res.send({
            message: 'error al obtener producto por nombre',
            error
        })
    }
}

//Busqueda y ordenar producto por descuento o precio
async function orderBy (req,res){
    const order= req.params.order;
    let ordenar= {};
    
    switch (order){
        case "A":
            console.log("Orden por menor a mayor precio");
            ordenar= {precio: 1}
            break;
        case "B":
            console.log("Orden por May a menor precio");
            ordenar= {precio : -1}
            break;
        default:
            console.log("Orden por descuento");
            ordenar= {descuento : -1}
    }
    

    try{
        const producto = await Product.find({})
                                      .sort( ordenar)
                                                                                                                             
        if(producto.length == 0){                                           
            return res.send({
                message: 'No se enconto ningun producto'
            })
        }       
        return res.send({
                message: 'busqueda  exitosa',
                producto
            })        
    } catch(error){
        return res.send({
            message: 'error al obtener productos ',
            error
        })
    }
}


//Actualizacion de productos por id
async function updateProduct (req ,res){
    try{
        const id= req.params.productToUpdateID                                             //obtengo el id desde el path
        console.log( `El id del producto a modificar es: ${req.params.productToUpdateID }` )
        let producto =await Product.findByIdAndUpdate(id, req.body, {new:true})                                         
        return res.send({
            message: "Actualizacion exitosa",
            producto
        })
    }catch(error){
        return res.send({
            message: "Error obtenido en la actualizacion",
            error
        })
    }

}

//Borrar producto
async function deleteProduct (req ,res){
    try{
        console.log(req.params.productToDeleteID )
        const id= req.params.productToDeleteID                                           //obtengo el id desde el path
        console.log( `El id del producto a borrar es: ${req.params.productToDeleteID}` )
        const deletedProduct =await Product.findByIdAndDelete(id)        
        return res.send({
            message: "Se borro el siguiente producto",
            deletedProduct
        })
    }catch(error){
        return res.send({
            message: "Error al borrar producto",
            error
        })
    }

}


module.exports = {
    createProduct,
    getPoducts,
    getProduct,
    getName,
    orderBy,
    deleteProduct,
    updateProduct
}