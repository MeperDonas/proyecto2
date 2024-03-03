const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost', 
    user:'ecommerce_user', 
    password: 'Iv}dd#l{085?',
    connectionLimit: 5,
    database: 'ecommerce',
});



module.exports = {
  pool,
  
};