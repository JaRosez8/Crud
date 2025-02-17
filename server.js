import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import dotenv from 'dotenv/config';


const app = express();
const port = 3306;
const db = mysql.createConnection({
    host: 'thresholds-test.mysql.databse.azure.com',
    username: process.env.username,
    password: process.env.password,
    database: process.env.database
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('WASSSZZUUUPP QUE XXOPA!! SAK PASE!!.');
});


//every query needs a db.connect function to 
//run it and send request to client 
//query is the client talking to API to sumit a request
//db.connect is the response 
//after every query and db use postman to test API
//creating new tasks
//reading one or several tasks 
//modify a task - change title, descrip. or status
//delete a task 

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("BYE BYE BYE!");
});

app.get('/users', (req,res)=>{
    res.send('users page');
    console.log('users page');
});

app.get("/tasks", (req, res)=>{
    const query ="SELECT * FROM tasks"
    
    db.query(query,(err,data)=>{
       if(err){
         console.log("Nope Try AGAINT");
         console.log(err);
         res.status(500).json({error: 'error getting results'});
       } else {
        console.log(data[0]);
        res.json(results);
       }
    })
})

app.post('/tasks', (req,res)=>{
    const params = [req.body['completed'], req.body['description'], req.body['title']];
    const query = 'INSERT INTO  tasks (title, description, completed) VALUES(?,?,?);'
    db.query (query,params, (err,data)=>{
        if (err){
            console.error('could not complete task:',err);
            console.log('could not add the task');
            res.status(500).json({error: 'Error completing taks'});}
        else{ 
            console.log(data);
            res.json({message: 'Task Successful'});
            res.status(200);

        }
    })
})
app.listen(port, () => {
    console.log("YURP it's working");
});



