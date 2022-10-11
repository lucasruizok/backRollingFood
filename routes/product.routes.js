const express= require(`express`);
const api = express.Router();
const productController= require('../controllers/product.Controller');
const upload = require('../libs/storage');

//creacion de productos - upload.single es una funcion para guardar 1 sola imagen
api.post('/product',upload.single('image'), productController.createProduct);

//Busca todos los productos o por categoría
api.get('/products/:cat?', productController.getProducts);

//Busca info completa de un producto por su id
api.get('/productsById/:productID',productController.getProduct);

//Busca producto por nombre
api.get('/productNameFind/:productName' , productController.getName);

//Busca producto y ordenar
api.get('/orderBy/:order' , productController.orderBy);

//Borrar producto
api.delete(`/product/:productToDeleteID`, productController.deleteProduct);

//Actualizar producto
api.put(`/product/:productToUpdateID`, productController.updateProduct);


module.exports = api;