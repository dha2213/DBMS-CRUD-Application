const mysql = require('mysql2')

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "dhananjay",
   database: "lab22"
});

// Created the Connection
/*con.connect(function(err) {
if (err) throw err;
console.log("Connected!");
});*/

// Created the Database named as "gfg"
con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
});

module.exports=con;