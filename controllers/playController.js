const { Router } = require('express');
const isLogged = require('../middlewares/isLogged');
const playService = require('../services/playService');

const router = Router();

router.get('/create', isLogged, (req, res) => {
    res.render('create', { title: 'Create play' });
});

router.post('/create', isLogged, (req, res) => {
    if (req.body.isPublic) {
        req.body.isPublic = true;
    }
    playService.createPlay(req.body, req.user._id)
        .then(() => res.redirect('/'))
        .catch(err => console.error(err));
});

module.exports = router;