var express = require('express'); // importa el modulo express (que es el framework)

var session = require('express-session'); // importa el modulo de sesiones de express (es la gestion de sesioens de express)

var createError = require('http-errors'); // importa el modulo para manejar las situaciones http-errores (error 404)

var path = require('path'); // modulo que proporciona facilidad para trabajar con rutas de archivos y direcotrios

var cookieParser = require('cookie-parser'); // importa el módulo cookie-parser, que se utiliza para analizar las cookies adjuntas a las solicitudes HTTP

var logger = require('morgan'); // importa el módulo morgan, que es un middleware de registro HTTP y registrar detalles de las solicitudes HTTP entrantes en la consola del servidor.


const constants = require('./config/constants'); // importa el módulo morgan, que es un middleware de registro HTTP para registrar detalles de las solicitudes HTTP entrantes en la consola del servidor.

var indexRouter = require('./routes/index'); // importa el enrutador principal (indexRouter) desde el archivo index.js ubicado en el directorio routes.

const cors = require('cors');



//Nueva instancia para configurar y ejecutar aplicaciones
var app = express();



// configuracion del view engie
app.set('view engine', 'ejs'); //EJS como motor de vista 
app.set('views', path.join(__dirname, 'views')); // direcotorio de vistas

// configuracion cosas estaticas
app.use(express.static(path.join(__dirname, 'public'))); //directorio archivos estaticos

//permite conexiones de cualquier url
app.use(cors());


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

