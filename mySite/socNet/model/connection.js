/**
 * Created by Echetik on 16.07.2017.
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'admin',
    password:'admin',
    database:'firstDB'
});

connection.connect();

module.exports = connection;
