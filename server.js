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
    console.log('Connected to the MySQL database.');
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
app.get("/tasks", (req, res)=>{
    const query ="SELECT * FROM tasks"
    
    db.query(query,(err,data)=>{
       if(err){
         console.log("Nope Try AGAINT");
         console.log(err);
         res.status(500).json({error: 'error getting results'});
       } else {
         res.json(results);
       }
    })
})
app.listen(port, () => {
    console.log("express server running on port 3306");
});



