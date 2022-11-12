const express = req("express");
const bodyParser = req("body-parser");
const app = express();
const mysql = req("mysql");
const cors = req("cors");


var db = mysql.createConnection({
    host:'34.66.234.148',
    user: 'root',
    password:'pokebook',
    database:'pokebook_database',
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/search/all", (req, res) => {
    const sqlSelect = "SELECT * FROM User";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        if (err) throw err;
    });
});

app.get("/api/search/keyword?keyword=' + userName", (req, res) => {
    const sqlSelect = "SELECT * FROM Users WHERE UserName = " + req.params.userName;
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(result);
        if (err) throw err;
    });
});



app.post("/api/insert", (req, res) => {
    const InsertuserId = req.body.insertuserId;
    const InsertuserName = req.body.insertuserName;
    const InsertuserEmail = req.body.insertuserEmail;
    const InsertuserPassword = req.body.insertuserPassword;

    const sqlInsert = "INSERT INTO User (UserId, UserName, UserEmail, UserPassword) VALUES (?,?,?,?);";
    db.query(sqlInsert, [InsertuserId, InsertuserName, InsertuserEmail, InsertuserPassword], (err, result) => {
        console.log(InsertuserId);
        console.log(InsertuserName);
        console.log(InsertuserEmail);
        console.log(InsertuserPassword);
        if (err) console.log(err);
    })
});

app.post("/api/delete/:deleteuserId", (req, res) => {
    const DeleteuserId = req.body.deleteuserId;
    db.query('DELETE from User where UserId = ?', [DeleteuserId],
    (err, result) => {
        if (err) {
            console.log(err);
        }
    })
})

app.put("/api/update/:updateuserName/:updateuserPassword", (req, res) => {
    const UserPassword = req.body.updateuserPassword;
    const UserName = req.body.updateuserName;
    db.query('Update User SET UserPassword = ? WHERE UserName = ?', [UserPassword, UserName],
    (err, result) => {
        if (err) {
            console.log(err);
        }
    })
});

app.listen(3002, () => {
    console.log("running on port 3002");
})
