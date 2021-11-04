'use strict';

const helmet = require('helmet');
const session = require('cookie-session');
const csrf = require('csurf');
const express = require('express');
const crypto = require('crypto');

const PORT = 8080;
const HOST = '0.0.0.0';

// create express app
const app = express();
app.use(helmet());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// setup route middlewares
const csrfProtection = csrf({ cookie: true });
const parseForm = express.urlencoded({ extended: false });

// parse cookies
// we need this because "cookie" is true in csrfProtection
// app.use(cookieParser());
 
// app.get('/form', csrfProtection, function (req, res) {
//   // pass the csrfToken to the view
//   res.render('send', { csrfToken: req.csrfToken() });
// });
 
// app.post('/process', parseForm, csrfProtection, function (req, res) {
//   res.send('data is being processed');
// });

// app.route('/')
//   .get(function (req, res) {
//     // res.send('Get a random book!');
//     res.render("index.ejs", { csrfToken: req.csrfToken() });
//   })
//   .post(parseForm, csrfProtection, function (req, res) {
//     res.send('post')
//   });

app.get('/', csrfProtection, function (req, res) {
// pass the csrfToken to the view
    res.render('send', { csrfToken: req.csrfToken() });
});
   
app.post('/', parseForm, csrfProtection, function (req, res) {
    res.send('data is being processed');
});

app.listen(PORT, HOST);