const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3001

const connection = mysql.createConnection({
host: "",
user: "",
password: "",
database: "",
port: 3306
})

try
{
    console.log("Connected!")
    var sql = "SHOW TABLES LIKE 'taskdetails'";
    connection.query(sql, function (err, result) {
        if(result.length === 0)
        {
            var sql = "CREATE TABLE taskdetails (taskId VARCHAR(255), taskHolderName VARCHAR(255),  taskDate VARCHAR(255),  taskName VARCHAR(255),  taskStatus VARCHAR(255), PRIMARY KEY(taskId))";
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Table created!");
            });
        }
        else{
            console.log("Table already exists!")
        }
    });
}

catch(e)
{
    console.log(e)
}

app.use(cors(
    {
        origin: "*",
    }
))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) )

app.listen(port,()=>{
    console.log("server is running")
})

function showDetails(req,res)
{
    var sql = "SELECT * from taskdetails"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
        }
        else
        {
           res.json(result)
        }
    });
}

app.get('/',(req,res)=>{
    res.send("Welcome to house management")
})

app.get('/start',(req,res)=>{
    console.log("start route")
    showDetails(req,res)
})

app.post('/saveTask',(req,res)=>{

    // eslint-disable-next-line no-useless-concat
    var sql = "INSERT INTO taskdetails (taskId, taskHolderName, taskDate, taskName, taskStatus) VALUES ("+"'"+ req.body.taskId+"'" +", "+"'"+req.body.taskHolderName+"'"+", "+"'"+req.body.taskDate+"'"+", "+"'"+req.body.taskName+"'"+", "+"'"+req.body.taskStatus+"'"+")"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
        }
        else
        {
            showDetails(req,res)
        }
    });
})

app.get('/changeStatus',(req,res)=>{

    // eslint-disable-next-line no-useless-concat
    var sql = " UPDATE taskdetails SET taskHolderName= 'Manoowranjith' WHERE taskId= '"+req.query.id+"'"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
        }
        else
        {
            showDetails(req,res)
        }
    });
})

app.get('/alltask',(req,res)=>{

    // eslint-disable-next-line no-useless-concat
    showDetails(req,res)
})

app.get('/getTask',(req,res)=>{
    var sql = "SELECT * FROM taskdetails WHERE taskHolderName = '"+req.query.name+"'"
    connection.query(sql, function (err, result) {
        if (err)
        {
            console.log(err)
            res.json({response: "DB error"})
        }
        else
        {
            res.json(result)
        }
    });
})

app.get('/deleteHouse',(req,res)=>{
    var sql = "DELETE FROM taskdetails WHERE taskId = '"+req.query.id+"'"
    connection.query(sql, function (err, result) {
        if (err)
        {
            console.log(err)
            res.json({response: "DB error"})
        }
        else
        {
            showDetails(req,res)
        }
    });
})


