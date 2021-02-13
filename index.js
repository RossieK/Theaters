const { port } = require('./config/config');
const express = require('express');
const expressConfig = require('./config/express');
const routes = require('./routes');

//Initialize App
const app = express();
expressConfig(app);

//Routes
app.use(routes);

//Server initialization
app.listen(port, () => console.log(`Server listening on port ${port}...`));