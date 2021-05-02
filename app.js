const express = require('express');
const engines = require('consolidate');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/user');

// Connect to local MongoDB server
mongoose.connect('mongodb://localhost:27017/login-app-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
});

const app = express();

// Middleware to render static files
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'));

// Middleware for express to decode the body coming in from requests
app.use(express.json());

app.post('/api/signup', async (req, res) => {

    // Create a User in the collection based on our Schema


    res.json({status: 'ok'});
});

// View engine -> set to HTML
app.engine('html', engines.mustache);
app.set('view engine', 'html');

// Listen for requests
app.get('/', (req, res) => res.redirect('/login'));
app.get('/login', (req, res) => res.render('login.html'));
app.get('/signup', (req, res) => res.render('signup.html'));
app.get('/homepage', (req, res) => res.redirect('homepage.html'));

app.listen(4000, ()=>{
    console.log('Listening for requests on port 4000...');
})