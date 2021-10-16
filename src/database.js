const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: 'username',
    port: '3306',
    password: '',
    database: 'pvundead'
})

mysqlConnection.connect(function (err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log("Conexion BD exitosa!");
    }
});

module.exports = mysqlConnection;