const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'db', 
    user:'ecommerce_user', 
    password: 'Iv}dd#l{085?',
    connectionLimit: 5,
    database: 'ecommerce',
});



module.exports = {
  pool,
  
};