const { Router } = require('express');
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const playController = require('./controllers/playController');

const router = Router();

router.use('/', homeController);
router.use('/user', userController);
router.use('/plays', playController);

module.exports = router;