const express= require(`express`);
const api = express.Router();
const pedidoController= require('../controllers/pedido.Controllers')




//creacion de pedidos
api.post('/pedido', pedidoController.createPedido);

//Buscar pedidos, si se manda opcionalmente id busca el phone asociado a este
api.get('/pedidos/:productId?', pedidoController.getPedidos);

//Actualizar estado pedidos
api.put('/pedidos/:pedidoToUpdateID', pedidoController.updatePedido);

api.delete(`/pedidos/:pedidoToDeleteID`, pedidoController.deletePedido);

module.exports = api; 