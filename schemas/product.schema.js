const mongoose = require (`mongoose`);
const Schema = mongoose.Schema;
 
const categorias= ['Tradicionales','Especiales', 'Vegetarianas', 'Calzones'];

const ProductSchema =new Schema({
        imgUrl:{type: String},
        nombre: {type: String , minlenght:3, maxlenght:10, required:true,unique:true},
        estado: {type: Boolean, default:true},
        precio: {type: Number, required:true},
        descuento:{type: Number, required:true, default:0},
        detalle: {type: String,required:true},
        categoria: { type: String, enum: categorias, required:true},
        amount:{type: Number, default:1}
 })

ProductSchema.methods.setImgUrl = function setImgUrl (filename){
        this.imgUrl = `http://localhost:3400/public/${filename}`
}

 module.exports =mongoose.model('Product',ProductSchema);