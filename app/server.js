'use strict';

const express = require('express');
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.render('index');
});
app.post('/', function(req, res) {
    const response = req;//'{"res":"post"}';
    console.log(req);
    res = response;
});
app.put('/', function(req, res) {
    const response = '{"res":"put"}';
    res.json(response);
});
app.delete('/', function(req, res) {
    const response = '{"res":"delete"}';
    res.text(response);
});


app.post('/login', function(req, res) {
    console.log(req.body);
    console.log(req.body);
    // console.log(JSON.parse(req.body));
    const input_id = req.body.id;
    const input_pw = req.body.pw;
    console.log(dbdata[input_id],"===",input_pw);
    if (dbdata[input_id] == "undefined") {
        console.log("id undefined");
        return res.send("login failed");
    }
    if (dbdata[input_id] === input_pw) {
        return res.send("login success:"+input_id);
    }else{
        return res.send("login failed");
    }
    // res.json(req.body);
    // const inputId = req.body.id;
    // const inputPw = req.body.pw;
    // const response = inputId;
    // console.log(response);
    // res.send = response;
});

app.post('/hello', (req, res) => {
    res.send('Hello ');
});

app.post('/helloname', (req, res) => {
    console.log(req.body);
    res.send('Hello ' + req.body);
});

//仮DB
const dbdata={"user001":"password001"}

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);