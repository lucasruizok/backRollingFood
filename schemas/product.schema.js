const mongoose = require (`mongoose`);
const Schema = mongoose.Schema;
 
const categorias= ['cat1','cat2', 'cat3'];

const ProductSchema =new Schema({
        nombre: {type: String , minlenght:3, maxlenght:10, required:true,unique:true},
        estado: {type: Boolean, default:true},
        precio: {type: Number, required:true},
        descuento:{type: Number, required:true, default:0},
        detalle: {type: String,required:true},
        categoria: { type: String, enum: categorias, required:true}
 })



 module.exports =mongoose.model('Product',ProductSchema);