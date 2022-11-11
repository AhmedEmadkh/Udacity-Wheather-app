// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Port
const port = 3000;

// port number for the server
const listen = () =>{
  console.log('server runing');
  console.log(`runing on lacation: localhost:${port}`)
}

const server = app.listen(port , listen());

// Posting Data by postData func.
const postData = (req,res)=>{
  projectData = req.body;
  res.send(projectData);
  console.log(projectData);
}

app.post('/add',postData);


// Getting Data by getData func.

const getData = (req,res)=>{
  res.send(projectData);
}


app.get('/get',getData)
