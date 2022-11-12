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

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM User";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        if (err) throw err;
    });
});

app.post("/api/search", (req, res) => {
    const UserName = req.body.searchuserName;
    // console.log('searching');
    db.query('SELECT * FROM User WHERE UserName = ?', [UserName],
    (err, result) => {
        if (err) throw err;
        res.send(result);
        console.log(result);
    });
});

app.post("/api/advance1search", (req, res) => {
    // console.log('searching');
    db.query(
        "SELECT t1.TypeName, p1.PokemonName, p1.Attack, \
        (SELECT AVG(p2.Attack)\
                    FROM (Pokemon p2 LEFT JOIN PokemonType pt2 on p2.PokemonId = pt2.PokemonId) JOIN Type t2 ON (pt2.FirstTypeId = t2.TypeId)\
        Where t1.TypeId = t2.TypeId\
        GROUP BY t2.TypeId) as AvgAttack, \
        p1.Defense, \
        (SELECT AVG(p2.Defense)\
                    FROM (Pokemon p2 LEFT JOIN PokemonType pt2 on p2.PokemonId = pt2.PokemonId) JOIN Type t2 ON (pt2.FirstTypeId = t2.TypeId)\
        Where t1.TypeId = t2.TypeId\
        GROUP BY t2.TypeId) as AvgDefense\
    FROM (Pokemon p1 LEFT JOIN PokemonType pt1 on p1.PokemonId = pt1.PokemonId) JOIN Type t1 ON (pt1.FirstTypeId = t1.TypeId)\
    WHERE p1.Attack > (SELECT AVG(p2.Attack)\
                    FROM (Pokemon p2 LEFT JOIN PokemonType pt2 on p2.PokemonId = pt2.PokemonId) JOIN Type t2 ON (pt2.FirstTypeId = t2.TypeId)\
        Where t1.TypeId = t2.TypeId\
        GROUP BY t2.TypeId)\
        AND    \
    p1.Defense > (SELECT AVG(p2.Defense)\
                    FROM (Pokemon p2 LEFT JOIN PokemonType pt2 on p2.PokemonId = pt2.PokemonId) JOIN Type t2 ON (pt2.FirstTypeId = t2.TypeId)\
        Where t1.TypeId = t2.TypeId\
        GROUP BY t2.TypeId)\
    GROUP BY t1.TypeId, t1.TypeName, p1.PokemonName, p1.Attack, p1.Defense\
    ORDER BY t1.TypeName, p1.PokemonName\
    Limit 5", [],
    (err, result) => {
        if (err) throw err;
        res.send(result);
        console.log(result);
    });
});

app.post("/api/advance2search", (req, res) => {
    // console.log('searching');
    db.query("(SELECT p2.PokemonName, t1.TypeName AS FirstTypeName, t2.TypeName AS SecondTypeName, p2.Hp, p2.Attack, p2.Defense, p2.SpecialAttack, p2.SpecialDefense, p2.Speed, p2.Generation\
        FROM (Pokemon p2 LEFT JOIN PokemonType pt2 on p2.PokemonId = pt2.PokemonId) JOIN Type t1 ON (pt2.FirstTypeId = t1.TypeId) JOIN Type t2 ON (pt2.SecondTypeId = t2.TypeId)\
        WHERE (t1.TypeName like '%Fire%' OR t2.TypeName like '%Fire%') AND p2.Generation >= 4\
        ORDER BY p2.PokemonId ASC)\
        \
        UNION\
        \
        (SELECT p2.PokemonName, t1.TypeName AS FirstTypeName, t2.TypeName AS SecondTypeName, p2.Hp, p2.Attack, p2.Defense, p2.SpecialAttack, p2.SpecialDefense, p2.Speed, p2.Generation\
        FROM (Pokemon p2 LEFT JOIN PokemonType pt2 on p2.PokemonId = pt2.PokemonId) JOIN Type t1 ON (pt2.FirstTypeId = t1.TypeId) JOIN Type t2 ON (pt2.SecondTypeId = t2.TypeId)\
        WHERE (t1.TypeName like '%Water%' OR t2.TypeName like '%Water%') AND p2.Generation >= 4\
        ORDER BY p2.PokemonId ASC)\
        \
        UNION\
        \
        (SELECT p2.PokemonName, t1.TypeName AS FirstTypeName, t2.TypeName AS SecondTypeName, p2.Hp, p2.Attack, p2.Defense, p2.SpecialAttack, p2.SpecialDefense, p2.Speed, p2.Generation\
        FROM (Pokemon p2 LEFT JOIN PokemonType pt2 on p2.PokemonId = pt2.PokemonId) JOIN Type t1 ON (pt2.FirstTypeId = t1.TypeId) JOIN Type t2 ON (pt2.SecondTypeId = t2.TypeId)\
        WHERE (t1.TypeName like '%Grass%' OR t2.TypeName like '%Grass%') AND p2.Generation >= 4\
        ORDER BY p2.PokemonId ASC)\
        LIMIT 5", [],
    (err, result) => {
        if (err) throw err;
        res.send(result);
        console.log(result);
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

app.put("/api/update", (req, res) => {
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
