const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    avatar: {type: String},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required: true},
    nameUser: {type: String, required: true},
    password: {type: String, required: true},
    mail: {type: String, required: true},
    state: {type: Boolean, required: true},
    role: {type: String, required: true}
})

module.exports = mongoose.model('User', UserSchema);