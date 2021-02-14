const { Router } = require('express');
const playService = require('../services/playService');
const isLogged = require('../middlewares/isLogged');

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
            });
    } else {
        playService.getPublic()
            .then(plays => {
                plays.sort((a, b) => b.usersLiked.length - a.usersLiked.length);
                plays = plays.slice(0, 3);
                res.render('home', { title: 'Theaters App', plays });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json('Something went wrong on our side. We\'re sorry!');
            })
    }
});

router.get('/sortByDate', isLogged, (req, res) => {
    playService.getAll()
        .then(plays => {
            plays.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            res.render('home', { title: 'Theaters App', plays });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Something went wrong on our side. We\'re sorry!');
        });
});

router.get('/sortByLikes', isLogged, (req, res) => {
    playService.getAll()
        .then(plays => {
            plays.sort((a, b) => b.usersLiked.length - a.usersLiked.length);
            res.render('home', { title: 'Theaters App', plays });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Something went wrong on our side. We\'re sorry!');
        });
});

module.exports = router;