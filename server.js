const express = require('express');
const bodyParser = require('body-parser');

const { login, restrict, expired, user } = require('./auth');
const data = require('./data');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/login', login);
app.use('/data', restrict, expired, user, data);

app.listen(3000);
