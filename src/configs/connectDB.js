// get the client
import mysql from "mysql2";

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "learnnodejs",
});

// // simple query
// connection.query("SELECT * FROM `users` ", function (err, results, fields) {
//   console.log(">>> check mySQL");
//   console.log(results); // results contains rows returned by server
//   let rows = Object.values(JSON.parse(JSON.stringify(results)));
//   console.log(rows);
// });

export default connection;
