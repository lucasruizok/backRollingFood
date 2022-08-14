const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validRoles = [
    'Administrador',
    'Cliente'
]

const UserSchema = new Schema({
    avatar: {type: String},
    firstName: {type: String, required: true, minlength:5, maxlength:20},
    lastName: {type: String, required: true, minlength:5, maxlength:20},
    mail: {type: String, required: true, unique:true, index:true},
    nameUser: {type: String, required: true, unique:true},
    password: {type: String, required: true, minlength:4, maxlength:12},
    age: {type: Number, required: true, min:15, max: 100},
    state: {type: Boolean, required: true, default: true},
    role: {type: String, required: true, enum: validRoles, default: 'Cliente'}
})

module.exports = mongoose.model('User', UserSchema);