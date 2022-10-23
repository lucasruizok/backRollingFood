
const password = require('./config/config').dbPassword;
const url = process.env.MONGODB_URI || `mongodb+srv://lucasRuiz734:${password}@cluster0.thtdlho.mongodb.net/?retryWrites=true&w=majority`;
const mongoose = require('mongoose');
const express = require('express');
const port = process.env.port || 3400;
const app = require('./app');
require('dotenv').config();
// CONEXION A BASE DE DATOS ROLLING FOOD

async function rollingFoodConnect(){
    try{
        await mongoose.connect(url)
        app.listen(port, () =>{
            console.log(`CONEXION A BD EXITOSA CON EXPRESS EN EL PUERTO ${port}`)
        })
        }catch(error){
            console.log('mala conexion', error)
        }
}

rollingFoodConnect()