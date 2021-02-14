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

module.exports = router;