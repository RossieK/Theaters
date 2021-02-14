const { Router } = require('express');
const isLogged = require('../middlewares/isLogged');
const playService = require('../services/playService');
const userService = require('../services/userService');
const formValidator = require('../middlewares/formValidator');
const playMiddlewareValidator = require('../middlewares/playMiddlewareValidator');

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

router.get('/:id/details', isLogged, (req, res) => {
    playService.getOne(req.params.id)
        .then(play => {
            let isCreator = false;
            if (play.creator.username == req.user.username) {
                isCreator = true;
            }

            let hasLiked = false;
            play.usersLiked.forEach(like => {
                if (like.username == req.user.username) {
                    hasLiked = true;
                }
            });

            res.render('details', { title: 'Details page', play, isCreator, hasLiked });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Something went wrong on our side. We\'re sorry!');
        });
});

router.get('/:id/like', isLogged, (req, res) => {
    playService.likeOne(req.params.id, req.user._id)
        .then(async() => {
            await userService.likePlay(req.params.id, req.user._id);
            res.redirect(`/plays/${req.params.id}/details`)
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Something went wrong on our side. We\'re sorry!');
        });
});

router.get('/:id/edit', isLogged, (req, res) => {
    playService.getOneWithoutDetails(req.params.id)
        .then(play => {
            let isPublicChecked = false;
            if (play.isPublic) {
                isPublicChecked = true;
            }
            res.render('edit', { title: 'Edit play', play, isPublicChecked })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Something went wrong on our side. We\'re sorry!');
        });
});

router.post('/:id/edit', isLogged, playMiddlewareValidator, (req, res) => {
    const formValidations = formValidator(req);

    if (!formValidations.isValid) {
        res.redirect('edit');
    }

    if (req.body.isPublic) {
        req.body.isPublic = true;
    } else {
        req.body.isPublic = false;
    }

    playService.updateOne(req.params.id, req.body)
        .then(() => {
            res.redirect(`/plays/${req.params.id}/details`);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Something went wrong on our side. We\'re sorry!');
        });
});

module.exports = router;