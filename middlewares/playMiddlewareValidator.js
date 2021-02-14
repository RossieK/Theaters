const { body } = require('express-validator');

module.exports = [
    body('title', 'Please add a valid title...').notEmpty(),
    body('description', 'Please add a description shorter than 50 symbols...').notEmpty().isLength({ max: 50 }),
    body('imageUrl', 'Please add a valid image URL...').notEmpty()
]