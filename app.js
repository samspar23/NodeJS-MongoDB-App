const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/demo');

const Schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
});

const User = mongoose.model('User', Schema);

app.get('/', (req, res) => {
    // res.send('Hello World!');
    res.sendFile(__dirname + '/index.html');
});

app.post('/adduser', (req, res) => {
    var userData = new User(req.body);
    userData.save()
        .then(data => {
            res.send('user saved to database');
        })
        .catch(err => {
            res.status(400).send('error while saving to database');
        });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});