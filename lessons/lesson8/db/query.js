var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'firstdb'
});
connection.connect();

/*
 connection.query(
 'CREATE TABLE AUTH' +
 ' (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,' +
 ' login VARCHAR(50),' +
 ' password VARCHAR(50))', function (error, results, fields) {
 if (error) throw error;
 console.log(results);
 });
 */

// connection.query(
//     "INSERT INTO auth(LOGIN,PASSWORD) VALUES('some_login','some_pass')"
//     , function (error, results, fields) {
//         if (error) throw error;
//         console.log(results);
//     });


// connection.query(
//     "INSERT INTO ??(LOGIN,PASSWORD) VALUES(?,?)",
//     ["auth", "some_login5", "some_pass5"]
//     , function (error, results, fields) {
//         if (error) throw error;
//         connection.query("SELECT * FROM AUTH", function (error, results, fields) {
//             console.log(results);
//         });
//
//         console.log(results);
//     });

connection.query(
    "UPDATE ?? SET login='root', password='root' WHERE id=?",
    ["auth","1"]
    , function (error, results, fields) {
        if (error) throw error;
        connection.query("SELECT * FROM AUTH", function (error, results, fields) {
            console.log(results);
        });

        console.log(results);
    });



// connection.end();