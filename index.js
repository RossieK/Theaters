const { port } = require('./config/config');
const express = require('express');

//Initialize App
const app = express();

//Routes
app.get('/', (req, res) => {
    res.send('Working!').end();
})

//Server initialization
app.listen(port, () => console.log(`Server listening on port ${port}...`));