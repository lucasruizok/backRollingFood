const express= require(`express`);
const api = express.Router();
const productController= require('../controllers/product.Controller')


//creacion de productos
api.post('/product', productController.createProduct);

//Busca todos los usuarios
api.get('/products', productController.getPoducts);

//Busca info completa de un producto por su id
api.get('/products/:productID',productController.getProduct);

//Busca producto por nombre
api.get('/productNameFind/:productName' , productController.getName);

//Borrar producto
api.delete(`/product/:productToDeleteID`, productController.deleteProduct);

//Actualizar producto
api.put(`/product/:productToUpdateID`, productController.updateProduct);


module.exports = api;