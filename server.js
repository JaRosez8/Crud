import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import dotenv from 'dotenv/config';


const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("hello!!!");
});

app.listen(port, () => {
    console.log("express server running on port 3000");
});



