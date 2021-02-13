const { Router } = require('express');
const userService = require('../services/userService');

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

module.exports = router;