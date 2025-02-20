import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import 'dotenv/config';

const app = express(); // this calls the express function
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT;  // Use the correct environment variable name

const db = mysql.createConnection({
    host: 'thresholds-test.mysql.database.azure.com',
    user: process.env.PF, // Replace with your MySQL username
    port: 3306, // Replace with the port you need - may be different from mine
    password: process.env.PASSWORD, // Replace with your MySQL password
    database: process.env.DATABASE, // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Failed ANT ANT!!:', err);
        return;
    }
    console.log('WASSSZZUUUPP QUE XXOPA!! SAK PASE!!.');
});


// //every query needs a db.connect function to 
// //run it and send request to client 
// //query is the client talking to API to sumit a request
// //db.connect is the response 
// //after every query and db use postman to test API
// //creating new tasks
// //reading one or several tasks 
// //modify a task - change title, descrip. or status
// //delete a task 

app.get('/', (req, res) => {
    res.send('Proceed you VALID');
});

app.get('/users', (req, res) => {
    res.send('Users page');
    console.log('Users page');
});

app.get('/tasks', (req, res) => {
    const query = 'SELECT * FROM tasks';
    db.query(query, (err, results) => {
        if (err) {
            console.error('could not PULL UP!:', err);
            console.log('You did something wrong with the tasks');
            res.status(500).json({ error: 'Error retrieving tasks' });
        } else {
            console.log(results[0]);
            res.json(results);
        }
    });
});


//create task
app.post('/tasks', (req, res) => {
    const parmas = [req.body['title'], req.body['description'], req.body['is_completed']];
    const query = 'INSERT INTO tasks (title, description, is_completed) VALUES(?, ?, ?);'
    db.query(query, parmas, (err, results) => {
        if (err) {
            console.error('could not insert the task:', err);
            console.log('could not add the task');
            res.status(500).json({ error: 'Error inserting task' });
        } else {
            console.log(results);
            res.json({ message: 'Task inserted successfully' });
            res.status(200);
        }
    });

})

//modifies 
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10); // Ensure ID is an integer
    const { title, description, is_completed } = req.body;

    // Debugging: Log the ID and received data
    console.log("Updating task with ID:", taskId);
    console.log("Received data:", req.body);

    // Validate input
    if (!title || !description || is_completed === undefined) {
        return res.status(400).json({ error: 'All fields (title, description, is_completed) are required' });
    }

    const query = 'UPDATE tasks SET title = ?, description = ?, is_completed = ? WHERE id = ?';
    const params = [title, description, is_completed, taskId];

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Error updating task:', err);
            return res.status(500).json({ error: 'Error ANT ANT!!' });
        }

        console.log("MySQL Results:", results); // Debugging line

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Nah task aint found' });
        }

        res.json({ message: 'Task updated YURRPP!!' });
    });
});

// DELETE single
app.delete('/delete/:id', (req, res) => {
    const taskId = req.params.id; // Get ID from URL parameter

    const query = "DELETE FROM tasks WHERE id = ?"; 

    db.query(query, [taskId], (err, results) => {
        if (err) {
            console.error("Error deleting task:", err);
            return res.status(500).json({ error: "Error ANT ANT!!." });
        }
        res.status(200).json({ message: "Yessir is has been deleted GO FORTH!" });
    });
});




app.listen(port, () => {
    console.log('You got it babes!');
});
