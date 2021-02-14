const mongoose = require('mongoose');

const playSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        length: { max: 50 }
    },
    imageUrl: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    usersLiked: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Play', playSchema);