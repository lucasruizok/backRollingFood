const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validRoles = [
    'Administrador',
    'Cliente',
    'Despachante'
]

const UserSchema = new Schema({
    avatar: {type: String},
    firstName: {type: String, required: true, minlength:5, maxlength:10},
    lastName: {type: String, required: true, minlength:5, maxlength:20},
    mail: {type: String, required: true, unique:true, index:true,maxlength:30},
    nameUser: {type: String, required: true, unique:true,maxlength:30},
    password: {type: String, required: true, minlength:4, maxlength:120},
    age: {type: Number, required: true, min:15, max: 100},
    state: {type: Boolean, required: true, default: true},
    role: {type: String, required: true, enum: validRoles, default: 'Cliente'},
    fecha: {type: Date, default:Date.now,required:true},
    phone: {type: Number, required: true, minlength:10}
})

module.exports = mongoose.model('User', UserSchema);