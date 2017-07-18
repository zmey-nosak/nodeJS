var connection = require('./connection.js');

exports.getUserPersonalInfo = function (id) {
    return new Promise(function (resolve, reject) {
        connection.query('SELECT users.*, cities.name city_name' +
            ' FROM users JOIN cities' +
            ' ON users.city_id=cities.id' +
            ' WHERE users.id = ?', [id],
            function (err, rows, fields) {
                if (err) {
                    reject(err)
                } else if (rows.length === 0) {
                    reject(new Error('User not found!'))
                } else {
                    if (rows === undefined) resolve([]);
                    resolve(rows);
                }
            });
    });
};
exports.getUsersGroups = function (id) {
    return new Promise(function (resolve, reject) {
        connection.query('SELECT groups.name group_name, groups.id group_id' +
            ' FROM users_groups JOIN groups' +
            ' ON users_groups.group_id=groups.id' +
            ' WHERE users_groups.user_id = ?', [id],
            function (err, rows, fields) {
                if (err) {
                    reject(err)
                } else if (rows.length === 0) {
                    resolve([]);
                } else {
                    resolve(rows);
                }
            });
    });
};
exports.getUsersFriends = function (id) {
    return new Promise(function (resolve, reject) {
        connection.query("SELECT users.first_name,users.last_name, CONCAT(users.first_name,IFNULL(concat(' ' , users.last_name),'')) friend_name , " +
            " users.id friend_id" +
            " FROM users_friends JOIN users" +
            " ON users_friends.friend_id=users.id" +
            " WHERE users_friends.user_id = ?", [id],
            function (err, rows, fields) {
                if (err) {
                    reject(err)
                } else if (rows.length === 0) {
                    resolve([]);
                } else {
                    resolve(rows);
                }
            });
    });
};