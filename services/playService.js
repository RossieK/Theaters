const Play = require('../models/Play');

function createPlay(data, creator) {
    const play = new Play({...data, creator });
    return play.save();
}

function getAll() {
    return Play.find().lean();
}

module.exports = {
    createPlay,
    getAll
}