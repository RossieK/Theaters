const { Router } = require('express');
const isLogged = require('../middlewares/isLogged');
const playService = require('../services/playService');
const formValidator = require('../middlewares/formValidator');

const router = Router();

router.get('/create', isLogged, (req, res) => {
    res.render('create', { title: 'Create play' });
});

router.post('/create', isLogged, (req, res) => {
    const formaValidations = formValidator(req);

    if (!formaValidations.isValid) {
        res.render('create', {...formaValidations.options, title: 'Create play' });
    }

    if (req.body.isPublic) {
        req.body.isPublic = true;
    }
    playService.createPlay(req.body, req.user._id)
        .then(() => res.redirect('/'))
        .catch(error => {
            console.log(error);
            res.render('create', { oldInput: {...req.body }, message: 'Please fill in all the fields...', title: 'Create play' });
        });
});

router.get('/:id/details', (req, res) => {
    playService.getOne(req.params.id)
        .then(play => {
            res.render('details', { title: 'Details page', play });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Something went wrong on our side. We\'re sorry!');
        });
})

module.exports = router;