require('dotenv').config({path: 'variables.env'});
const url = process.env.MONGODB_URL;
const mongoose = require('mongoose');
const express = require('express');
const port = process.env.PORT || 3400;
const host = process.env.HOST || '0.0.0.0';
const app = require('./app');
// CONEXION A BASE DE DATOS ROLLING FOOD

async function rollingFoodConnect(){
    try{
        await mongoose.connect(url)
        app.listen(port,host, () =>{
            console.log(`CONEXION A BD EXITOSA CON EXPRESS EN EL PUERTO ${port}`)
        })
        }catch(error){
            console.log('mala conexion', error)
        }
}

rollingFoodConnect()