const User = require('../models/User');
const bcrypt = require('bcrypt');
const { salt_rounds } = require('../config/config');

async function register(data) {
    const { username, password, rePassword } = {...data };

    let salt = await bcrypt.genSalt(salt_rounds);
    let hash = await bcrypt.hash(password, salt);

    const user = new User({ username, password: hash });
    return user.save();
}

module.exports = {
    register
}