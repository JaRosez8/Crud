    express set up 
    start with initializing an NPM package 
run "npm init -y" 
    node package manager 
    init - initalize 
    option y skips setup questions 
create your package.json file 

    create a git repo 

    create gitignore file this is for security
.gitignore 
    is the name of the file inside it 
node_modules
.env 
    "set up gitingore" in terminal 

    install packages 
npm i express cors mysql2 body-parser dotenv 
    do not need for every single project but do for this project 
    
    all packages that we run is hosted by NPM organization they hosts millions of packages

    when we download the packages it will install more than that because the creators of node adopted packages instead of rewriting them 

    be sure we download packages with the correct name due to corrupt packages with similar names 

    package-lock.json will be shown in folder 

    specify that this project is a module 

add "type": "module" to your package.json file, below the description or "main": index.js but can go anywhere in the package 

    if we don't have it there it will not work 

    actual express server stuff. code that's express 

Create server.js file 

    Imports 
    when we import express from express, this file is in our node modules folder. The code needed to run express is in the folder we have to call it.

import express from express
import cors from cors 
import mysql from mysql2
import bodyparser from body-parser 
import dotenv/config 

    set up actual express application 

const app = express()

    select the port for your app
    just use 3000
const port = 3000

    set up a test route. to make sure our express server is running 

    req = request 
    res= response 

app.get('/', (req, res) => {
    res.send("hello!!!");
})

    actually start the express server 
app.listen(port, () =>{
    console.log("express server runnning on port 3000 )
})

run "node server.js"  in terminal

after test server git commit and push to repo 

    at least git add and commit 

    app.listen should be the last thing in the file 

    set up database connection 
    copy and paste this thing into server file 

const db =mysql
host 
user 
etc
etc

    paste underneath const port function 

    change username 
    password will be "test" 
    database will be given 
    this info is given in info Ryan sent us. In real life customary to what we deem or company deem I suppose. 

    this sets up what is needed to connect. Then after that block paste in 

db.connect function 

    underneath const db mysql function 

    remember test your server in terminal with "node server.js" 

    set up and use Nodemon. This helps automatic restarting when code is changed in someway 

    in package.json file add the following key/value pair to the scripts object: put it under scrips area. Make sure to put a coma after the line above it if one exists!
,
"express": "nodemon./server.js

    the above step is optional but helps 

    make an actual query 
    understand what i can and cant change 

    const query = 'SELECT * FROM tasks';
    then 
    a fuction  with params i.e. db.query(query, (err, results)=>{})
    queries should have a if else statements 

    After this start writing out a post request which was covered yesterday. 

    after that it essentially copying and pasting different tasks and routing 
