var express = require('express');

const { authOnly } = require('../middleware/auth');
const db = require('../db/database')

var router = express.Router();

router.get('/', authOnly, async function (req, res, next) {
  let conn;
  try {
  console.log('iniciando la conexion');
  conn = await db.pool.getConnection();
  const rows = await conn.query("SELECT * FROM producto");
  console.log(rows);
  res.render('index', { title: 'Dashboard', user: req.session.user, products: rows }); //[ {val: 1}, meta: ... ]

  } catch (err) {
  console.log('Entre un error', err);
  throw err;
  } finally {
  if (conn) return conn.end();
    }
});

router.get('/auth', function (req, res, next) {
  req.session.regenerate(function () {
    req.session.user = {'name': 'santiago', 'id': 16};
    res.redirect('/');
  });
});

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

router.get('/lista_deseos', authOnly, async function (req, res, next) {
  let conn;
  try {
  console.log('iniciando la conexion');
  conn = await db.pool.getConnection();
  const rows = await conn.query("SELECT ld.id, p.id AS producto_id, p.nombre, p.precio FROM lista_deseos ld LEFT JOIN producto p ON ld.producto_id = p.id WHERE usuario_id = "+req.session.user.id+";");
  console.log(rows);
  res.render('lista_deseos', { title: 'Dashboard', user: req.session.user, products: rows }); 

  } catch (err) {
  console.log('Entre un error', err);
  throw err;
  } finally {
  if (conn) return conn.end();
    }
});

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
