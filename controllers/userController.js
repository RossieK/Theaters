const { Router } = require('express');

const router = Router();

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register page' });
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login page' });
});

module.exports = router;