const express= require(`express`);
const api = express.Router();
const pedidoController= require('../controllers/pedido.Controllers')




//creacion de pedidos
api.post('/pedido', pedidoController.createPedido);

//Buscar pedidos
api.get('/pedidos', pedidoController.getPedidos);

//Actualizar estado pedidos
api.put('/pedido/:pedidoToUpdateID', pedidoController.updatePedido);



module.exports = api; 