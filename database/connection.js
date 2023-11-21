//conexão com knex
var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'apiusers' //Declarando que eu estou interagindo com o banco de dados api users
    }
  });

module.exports = knex