const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3001;
const cors = require('cors')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors(
    {
        origin: "*",
    }
))

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`listening on: http://localhost:${PORT}`);
    });
});

app.get('/',(req,res)=>{
    res.send("Welcome to house management")
})

app.get('/start',(req,res)=>{
    db.taskdetails.findAll().then(tableValues=>{
        res.send(tableValues)
    })
})

app.post('/saveTask',(req,res)=>{
    console.log(req.body)
    db.taskdetails.create({
        taskId:  req.body.taskId,
        taskHolderName: req.body.taskHolderName,
        taskDate: req.body.taskDate,
        taskName: req.body.taskName,
        taskStatus: req.body.taskStatus,
    })
    .then(tableValues => res.send(tableValues))
    .catch(err=>res.json({response: "Already Exist"}));
})

app.get('/changeStatus',(req,res)=>{
    db.taskdetails.update(
        {
            taskHolderName: "mr001",
        },
        {
          where: { taskId:  req.query.id, }
        }
      ).then(() =>
        db.taskdetails.findAll().then(tableValues=>{
            res.send(tableValues)
        })
      );
})

app.get('/alltask',(req,res)=>{
    db.taskdetails.findAll().then(tableValues=>{
        res.send(tableValues)
    })
})

app.get('/getTask',(req,res)=>{
    db.taskdetails.findAll({
        where: {
            taskHolderName: req.query.name
        }
      }).then(tableValues=>{
        res.send(tableValues)
    })
})

app.get('/deleteHouse',(req,res)=>{
    db.taskdetails.destroy({
        where: {
            taskId: req.query.id
        }
      }).then(() => 
        db.taskdetails.findAll().then(tableValues=>{
            res.send(tableValues)
    }));

})