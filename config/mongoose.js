const mongoose = require('mongoose');

module.exports = (app) => {
    mongoose.connect('mongodb://localhost/Theaters', { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', console.log.bind(console, 'DB connected...'));
}