

// el const express y el import son lo mismo nada mas q son dos versiones distintas
// const express = require('express');
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js'

import dotenv from 'dotenv';
dotenv.config({path: 'variables.env' });
// require('dotenv').config({path: './variables.env' });



const app = express();


//conectar la base de datos
db.authenticate()
    .then( () => console.log('base de datos conectada') )
    .catch( error => console.log(error));


//definir puerto
const port = process.env.PORT || 4000;

//habilitar PUG
app.set('view engine', 'pug');

//Obtener el año actual
app.use((req, res, next) => {
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';

    next();
})



//Agregar Body parse para leer los datos del formulario
app.use(express.urlencoded({extended: true}));


//definir la carpeta publica
app.use(express.static('public'));


//Agregar Router
app.use('/', router);

const host = process.env.HOST || '0.0.0.0';

console.log(process.env.HOST)
// const port = process.env.PORT || 3000;


app.listen(port, host, () => {
    console.log(`el servidor esta funcionando en el puerto ${port}`)
});