const { Router } = require('express');

const router = Router();

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create play' });
});

module.exports = router;