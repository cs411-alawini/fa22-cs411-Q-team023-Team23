const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


var db = mysql.createConnection({
    host:'34.66.234.148',
    user: 'root',
    password:'pokebook',
    database:'pokebook_database',
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/search/all", (require, response) => {
    const sqlSelect = "SELECT * FROM User";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
        if (err) throw err;
    });
});

app.get("/api/search/keyword?keyword=' + userName", (require, response) => {
    const sqlSelect = "SELECT * FROM Users WHERE UserName = " + require.params.userName;
    db.query(sqlSelect, (err, result) => {
        response.send(result);
        console.log(result);
        if (err) throw err;
    });
});



app.post("/api/insert", (require, response) => {
    const InsertuserId = require.body.insertuserId;
    const InsertuserName = require.body.insertuserName;
    const InsertuserEmail = require.body.insertuserEmail;
    const InsertuserPassword = require.body.insertuserPassword;

    const sqlInsert = "INSERT INTO User (UserId, UserName, UserEmail, UserPassword) VALUES (?,?,?,?);";
    db.query(sqlInsert, [InsertuserId, InsertuserName, InsertuserEmail, InsertuserPassword], (err, result) => {
        console.log(InsertuserId);
        console.log(InsertuserName);
        console.log(InsertuserEmail);
        console.log(InsertuserPassword);
        if (err) console.log(err);
    })
});

// app.delete("/api/delete/:deleteuserId", (require, response) => {
//     const DeleteuserId = require.body.deleteuserId;

//     const sqlDelete = "DELETE FROM User WHERE UserId = ?;";
//     db.query(sqlDelete, [DeleteuserId], (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             result.send("User Deleted");}
//     })
// });

app.post("/api/delete/:deleteuserId", (require, response) => {
    const DeleteuserId = require.body.deleteuserId;
    db.query('DELETE from User where UserId = ?', [DeleteuserId],
    (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            result.send("User Deleted");
        }
    })
})

app.put("/api/update", (require, response) => {
    const UserName = require.body.userName;
    const UserPassword = require.body.userPassword;

    const sqlUpdate = "UPDATE `User` SET `movieReview` = ? WHERE `movieName`= ?";
    db.query(sqlUpdate, [UserName, UserPassword], (err, result) => {
        if (err) 
        console.log(error);
    })
});

app.listen(3002, () => {
    console.log("running on port 3002");
})
