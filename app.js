const express = require('express');
const engines = require('consolidate');
const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

const JWT_ACCESS_TOKEN_SECRET = 'f43o0308r34nfn0jJ2ejvnuffh394j8t3gnsdjcuo9hwe32@)*#)@&#*&@(#)@&';
const JWT_REFRESH_TOKEN_SECRET = 'skdfbwweohuo23ou420r23hofu3b202hj80h@UI)()@#*@()*)#@*)@#*H@IHE22e';

// To decrypt the passwords(through hashing) when stored in database
const bcrypt = require('bcryptjs');

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

// Login API
app.post('/api/login', async (req, res) => {
    const {ign, password} = req.body;
    const user = await User.findOne({"ign" : ign}).lean();

    if(!user){
        return res.json({ status: "error", error: "Invalid IGN/Password"});
    }

    if(await bcrypt.compare(password, user.password)){
        const accessToken = jwt.sign({
            id: user._id,
            username: user.ign
        }, JWT_ACCESS_TOKEN_SECRET, { expiresIn: '15s'});

        const refreshToken = jwt.sign({
            id: user._id,
            username: user.ign
        }, JWT_REFRESH_TOKEN_SECRET);

        return res.json({ status: "ok", accessToken: accessToken, refreshToken: refreshToken});
    }

    res.json({ status: "error", error: "Invalid IGN/Password"});
})


// Signup API
app.post('/api/signup', async (req, res) => {
    const {firstName, middleName, lastName, email, ign, password: plainTextPassword} = await req.body;
    const password = await bcrypt.hash(plainTextPassword, 10);

    try{
        const response = await User.create({
            firstName, middleName, lastName, email, ign, password
        })
        console.log('User created successfully ', response);
    } catch(err) {
        if(err.code === 11000){
            return res.json({status: 'error', error: err.keyPattern});
        }
    }
    res.json({status: 'ok'});
});

// View engine -> set to HTML
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.get('/', (req, res) => res.redirect('/login'));
app.get('/login', (req, res) => res.render('login.html'));
app.get('/signup', (req, res) => res.render('signup.html'));
app.get('/homepage', (req, res) => res.render('homepage.html'));

// Listen for requests
app.listen(2000, ()=>{
    console.log('Listening for requests on port 2000...');
})