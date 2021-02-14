const { Router } = require('express');
const playService = require('../services/playService');

const router = Router();

router.get('/', (req, res) => {
    if (res.locals.isAuthenticated) {
        playService.getAll()
            .then(plays => {
                res.render('home', { title: 'Theaters App', plays });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json('Something went wrong on our side. We\'re sorry!');
            })
    }
});

module.exports = router;