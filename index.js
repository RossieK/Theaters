const { port } = require('./config/config');
const express = require('express');
const expressConfig = require('./config/express');

//Initialize App
const app = express();
expressConfig(app);

//Routes
app.get('/', (req, res) => {
    res.render('home');
})

//Server initialization
app.listen(port, () => console.log(`Server listening on port ${port}...`));