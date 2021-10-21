'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.static('public'));
// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

app.get('/', function(req, res, next) {
    res.render('index');
});
app.post('/', function(req, res, next) {
    const response = '{"res":"post"}';
    res.json(response);
});
app.put('/', function(req, res, next) {
    const response = '{"res":"put"}';
    res.json(response);
});
app.delete('/', function(req, res, next) {
    const response = '{"res":"delete"}';
    res.json(response);
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);