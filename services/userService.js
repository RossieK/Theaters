const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { salt_rounds, secret } = require('../config/config');

async function register(data) {
    const { username, password, rePassword } = {...data };

    let salt = await bcrypt.genSalt(salt_rounds);
    let hash = await bcrypt.hash(password, salt);

    const user = new User({ username, password: hash });
    return user.save();
}

async function login({ username, password }) {
    let user = await User.findOne({ username });

    if (!user) {
        throw new Error('User not found...');
    }

    let passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
        throw new Error('Incorrect password...');
    }

    let token = jwt.sign({ _id: user._id }, secret);
    return token;
}

module.exports = {
    register,
    login
}