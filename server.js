// App endpoint
const projectData = [];
// Add express package to the project
const express = require('express');
// Create instance of our app with express;
const app = express();
// Dependencies
const bodyParser = require('body-parser');
const cors = require('cors');
// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
// Initializing the project folder
app.use(express.static('website'));
// our port
const port = 8000;
// Spin up the server
const server = app.listen(port, () => {
    console.log('Server Is Running');
    console.log(`Local Host: ${port}`);
});
// Post Route
app.post('/postWeatherData', (req, res) => {
    const newWeatherData = {};
    projectData.push(newWeatherData);
});
// Get Route
app.get('/getWeatherData', (req,res) => {
    res.send(projectData);
})