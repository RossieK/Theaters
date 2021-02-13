const express = require('express');
const handlebars = require('express-handlebars');

module.exports = (app) => {
    //Handlebars
    app.engine('hbs', handlebars({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
}