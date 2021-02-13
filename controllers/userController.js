const { Router } = require('express');
const userService = require('../services/userService');
const { cookie_name } = require('../config/config');

const router = Router();

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register page' });
});

router.post('/register', (req, res) => {
    const { username, password, rePassword } = req.body;

    userService.register({ username, password })
        .then(() => res.redirect('/user/login'))
        .catch(err => console.error(err));
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login page' });
});

router.post('/login', async(req, res) => {
    const { username, password } = req.body;

    try {
        let token = await userService.login({ username, password });
        res.cookie(cookie_name, token);
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;