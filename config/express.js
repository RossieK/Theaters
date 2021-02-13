const cookieParser = require('cookie-parser');
const express = require('express');
const handlebars = require('express-handlebars');

module.exports = (app) => {
    //Handlebars
    app.engine('hbs', handlebars({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');

    //Static files
    app.use(express.static('public'));

    //Body parser
    app.use(express.urlencoded({ extended: true }));

    //Cookie parser
    app.use(cookieParser());
}