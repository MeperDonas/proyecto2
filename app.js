var express = require('express'); //importa el modulo express (que es el framework)

var session = require('express-session'); //importa el modulo de sesiones de express (es la gestion de sesioens de express)

var createError = require('http-errors'); //importa el modulo para manejar las situaciones http-errores (error 404)

var path = require('path'); //

var cookieParser = require('cookie-parser');

var logger = require('morgan');


const constants = require('./config/constants');
var indexRouter = require('./routes/index'); 





var app = express();



// configuracion del view engie
app.set('view engine', 'ejs'); //EJS como motor de vista 
app.set('views', path.join(__dirname, 'views')); // direcotorio de vistas

// configuracion cosas estaticas
app.use(express.static(path.join(__dirname, 'public'))); //directorio archivos estaticos


// configuracion middleware de sesiones
app.use(session({
    resave: false, // no guardar si no se modifica
    saveUninitialized: false, // no crea sesin hasta que algo almacene
    secret: 'shhhh, very secret'
}));

//configaron de middleware adicional para el registro, analisis de JSON, formularios y cookies
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// enrutador principal, todo lo que llegue a la raiz sera manejado por el indexRouter
app.use('/', indexRouter);

// error 404 (no encontrado)
app.use(function(req, res, next) {
  next(createError(404));
});


app.listen(constants.PORT, () => {
  console.log(`Activo el puerto ${constants.PORT}`)
})

// script para importar
module.exports = app;

