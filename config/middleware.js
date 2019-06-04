const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require("express-session");
const passport = require('passport');
const express = require('express');
const cors = require('cors');

module.exports= function(app){
    app.use(express.static("public"));
    app.use(session({ secret: "pinkFluffyUnicorns", saveUninitialized:true ,resave:true}));
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(cors());
}
