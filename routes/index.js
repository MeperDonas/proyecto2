var express = require('express'); // importamos el modulo del framework usado

const { authOnly } = require('../middleware/auth'); // importamos el middleware de la funcion authOnly (usuarios autenticados pueden acceder)

const db = require('../db/database') // modulo usado para interactuar con la base de datos

var router = express.Router(); // la instacia para los modulos de enrutamiento 


//----------------------------------------------------------------------//


// Llamar productos
router.get('/', authOnly, async function (req, res, next) {
  let conn;
  try {
    console.log('iniciando la conexion');
    conn = await db.pool.getConnection();
    const rows = await conn.query("SELECT * FROM producto");
    console.log(rows);
    res.render('index.ejs', { title: 'Dashboard', user: req.session.user, products: rows });

  } catch (err) {
    console.log('Entre un error', err);
    throw err;
  } finally {
    if (conn) return conn.end();
    }
});


//-----------------------------------------------------------//



// Llamar usuario
router.get('/auth', function (req, res, next) {
  req.session.regenerate(function () {
    req.session.user = {'name': 'santiago', 'id': 16};
    res.redirect('/');
  });
});


//----------------------------------------------------------//



router.get('/productos/eliminar/:productoid', async function (req, res, next) {
  let conn;
  try {
  console.log('iniciando la conexion');
  conn = await db.pool.getConnection();
  const rows = await conn.query("DELETE FROM producto WHERE id = "+req.params.productoid+";");
  console.log(rows);
  res.redirect('/'); 

  } catch (err) {
  console.log('Entre un error', err);
  throw err;
  } finally {
  if (conn) return conn.end();
    }
});


//--------------------------------------------//


// Funcion de llamar cartas
router.get('/lista_deseos', authOnly, async function (req, res, next) {
  let conn;
  try {
  console.log('iniciando la conexion');
  conn = await db.pool.getConnection();
  const rows = await conn.query("SELECT ld.id, p.id AS producto_id, p.nombre, p.precio FROM lista_deseos ld LEFT JOIN producto p ON ld.producto_id = p.id WHERE usuario_id = "+req.session.user.id+";");
  console.log(rows);
  res.render('lista_deseos.ejs', { title: 'Dashboard', user: req.session.user, products: rows }); 

  } catch (err) {
  console.log('Entre un error', err);
  throw err;
  } finally {
  if (conn) return conn.end();
    }
});


//------------------------------------------------------------------//


// Funcion de eliminar carta
router.get('/lista_deseos/eliminar/:itemid', async function (req, res, next) {
  let conn;
  try {
  console.log('iniciando la conexion');
  conn = await db.pool.getConnection();
  const rows = await conn.query("DELETE FROM lista_deseos WHERE id = "+req.params.itemid+";");
  console.log(rows);
  res.redirect('/lista_deseos'); 

  } catch (err) {
  console.log('Entre un error', err);
  throw err;
  } finally {
  if (conn) return conn.end();
    }
});


module.exports = router;
