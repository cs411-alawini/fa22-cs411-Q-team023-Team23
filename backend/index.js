const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

var connection = mysql.createConnection({
  host     : '34.66.234.148',
  user     : 'root',
  password : 'pokebook',
  database : 'PokeBook',
  port: 80
});

connection.connect();

connection.query('SELECT * from User', function(err, rows, fields) {
    if(err) console.log(err);
    console.log('The solution is: ', rows);
    connection.end();
});

// app.post('/insert', (req, res) => {
//     const UserId = req.body.UserId;
//     const UserName = req.body.UserName;
//     const UserEmail = req.body.UserEmail;
//     const UserPassword = req.body.UserPassword;

//     db.query('INSERT INTO User (UserId, UserName, UserEmail, UserPassword) values (?, ?, ?, ?)', 
//     [name, sex, passward], 
//     (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.send("Values Inserted");
//         }
//     });
// });

// app.post('/delete', (req, res) => {
//     const id = req.body.id;
//     db.query('DELETE from User where ID = ?', [id],
//     (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.send("Values Inserted");
//         }
//     })
// })

app.listen(80, () => {
    console.log("running on port 80");
})