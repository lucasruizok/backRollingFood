
const password = require('./config/config').dbPassword;
const url = `mongodb+srv://lucasRuiz734:${password}@cluster0.thtdlho.mongodb.net/?retryWrites=true&w=majority`;
const mongoose = require('mongoose');
const express = require('express');
const port = 3400;

const app = require('./app');
// CONEXION A BASE DE DATOS ROLLING FOOD

async function rollingFoodConnect(){
    try{
        console.log('Iniciando BD')
        await mongoose.connect(url)
        console.log('***CONEXION EXITOSA**')
        app.listen(port, () =>{
            console.log(`CONEXION A BD EXITOSA CON EXPRESS EN EL PUERTO ${port}`)
        })
        }catch(error){
            console.log('mala conexion', error)
        }
}

rollingFoodConnect()