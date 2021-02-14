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
    return Play.findOne({ _id: id }).populate('creator').populate('usersLiked').lean();
}

async function likeOne(id, user) {
    let play = await Play.findOne({ _id: id });
    play.usersLiked.push(user);
    return Play.updateOne({ _id: id }, { usersLiked: play.usersLiked });
}

module.exports = {
    createPlay,
    getAll,
    getPublic,
    getOne,
    likeOne
}