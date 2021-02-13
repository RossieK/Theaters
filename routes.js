const { Router } = require('express');
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');

const router = Router();

router.use('/', homeController);
router.use('/user', userController);

module.exports = router;