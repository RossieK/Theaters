const Play = require('../models/Play');

function createPlay(data, creator) {
    const play = new Play({...data, creator });
    return play.save();
}

function getAll() {
    return Play.find().lean();
}

function getPublic() {
    return Play.find({ isPublic: true }).lean();
}

function getOne(id) {
    return Play.findOne({ _id: id }).lean();
}

module.exports = {
    createPlay,
    getAll,
    getPublic,
    getOne
}