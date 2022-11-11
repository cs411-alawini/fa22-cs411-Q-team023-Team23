const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


var db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'pokebook',
    database:'pokebook-365702',
})

// db.connect(function(err) {
//     if (err) throw err;
//     var sql = "INSERT INTO `movie_reviews` (`id`,`movieName`, `movieReview`) VALUES (5,'inception', 'good movie');";
//     db.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result.affectedRows + " record(s) updated");
//     });
//   });

// app.get('/', (require, response) => {
//     const sqlInsert = "INSERT INTO `movie_reviews` (`movieName`, `movieReview`) VALUES ('Spider2', 'good movie');";
//     db.query(sqlInsert, (err, result) => {
//         response.send("Hello world!!!");
//     })
// })

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// TODO: Get all the users
app.get("/api/get", (require, response) => {
    const sqlSelect = "SELECT * FROM User";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
        if (err) throw err;
    });
});

// TODO: Get all the information for a specific user with (UserId)
app.get("/api/get/User/:UserId", (require, response) => {
    const sqlSelect = "SELECT * FROM Users WHERE UserId = " + require.params.UserId;
    db.query(sqlSelect, (err, result) => {
        response.send(result);
        console.log(result);
        if (err) throw err;
    });
});

// TODO: Insert a User
app.post("/api/insert", (require, response) => {
    const UserName = require.body.UserName;
    const UserEmail = require.body.UserEmail;
    const UserPassword = require.body.UserPassword;

    const sqlInsert = "INSERT INTO `User` (`UserName`, `UserEmail`, `UserPassword`) VALUES (?,?,?)";
    db.query(sqlInsert, [UserName, UserEmail, UserPassword], (err, result) => {
        console.log(error);
    })
});

// TODO: Delete a User with UserName
app.delete("/api/delete/:UserName", (require, response) => {
    const UserName = require.params.UserName;

    const sqlDelete = "DELETE FROM `movie_reviews` WHERE `movieName`= ?";
    db.query(sqlDelete, UserName, (err, result) => {
        if (err) 
        console.log(error);
        if (err) throw err;
    })
});

// app.put("/api/update/", (require, response) => {
//     const movieName = require.body.movieName;
//     const movieReview = require.body.movieReview;

//     const sqlUpdate = "UPDATE `movie_reviews` SET `movieReview` = ? WHERE `movieName`= ?";
//     db.query(sqlUpdate, [movieReview,movieName ], (err, result) => {
//         if (err) 
//         console.log(error);
//     })
// });

app.listen(3002, () => {
    console.log("running on port 3002");
})

