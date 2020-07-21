const mysql = require('mysql');

// Mysql connection ... put the host,user,password,database,port according to your database.


const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'triveous_demo',
    port: '3306'
})

const db = mysqlConnection.connect((err) => {
    if (!err) console.log("Database connected.");
    else console.log(err.stack);

});

module.exports = mysqlConnection