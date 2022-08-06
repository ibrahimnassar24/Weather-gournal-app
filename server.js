// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Spin up the server
const port = 3000;
const starting = () => {
    console.log("Hello, the server is up and running on port " + port);
};
const server = app.listen(port, starting);

// Initialize retrieve route with a callback function
app.get("/retrieve", sendData);



// Post Route
app.post("/add", (req, res) => {
    projectData = req.body;
    console.log(projectData);
    res.send(projectData);
});

// Callback function to complete GET '/retrieve'

function sendData(req, res) {
    res.send(projectData);

}