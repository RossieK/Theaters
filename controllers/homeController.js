const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('guestHome', { title: 'Theaters App' });
});

module.exports = router;