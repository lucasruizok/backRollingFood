const mongoose = require (`mongoose`);
const Schema = mongoose.Schema;
 
const state=[ `pendiente`, `realizado`];

const PedidoSchema =new Schema({
        nameUser: {type: String ,required:true},
        phone: {type: Number, required: true, minlength:10, maxlength:10},
        total:{type: Number,required:true},
        date: {type: Date, default:Date.now,required:true},
        products:[
            {
            name:{type: String},
            amount: {type: Number},
            }
        ] ,
        state: {type: String, enum: state, default:`pendiente`}           
 })


 module.exports =mongoose.model('Pedido',PedidoSchema);