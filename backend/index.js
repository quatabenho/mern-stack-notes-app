require('dotenv').config();

const config = require('./config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString);

const User = require('./models/user.model');

const express = require('express');
const cors = require('cors');
const app = express();

const jwt = require('jsonwebtoken');
const {authenticateToken} = require('./utilities');

app.use(express.json());
app.use(
    cors({
        origin: '*',
    })
);

app.get('/', (req, res) => {
    res.json({ data: "hi"});
});

app.post("/create-account", async(req, res) => {
    const { fullName, email, password } = req.body;

    if(!fullName || !email || !password) {
        return res.status(400).json({ message: "Invalid request"});
    }

    const isUser = await User.findOne({ email: email });

    if(isUser) {
        return res.json({
            error: true,
            message: "User already exists"});
    }

    const user = new User({
        fullName,
        email,
        password,
    });

    await user.save();

    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '3m'});

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Account created successfully",
    })
})

app.post("/login", async(req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: "Invalid request"});
    }

    const userInfo = await User.findOne({ email: email });
    if(!userInfo) {
        return res.status(400).json({ message: "User not found"});
    }

    if(userInfo.email == email && userInfo.password == password) { 
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '36000m'});

        return res.json({
            error: false,
            email,
            accessToken,
            message: "Login successful",
        });
    } else {
        return res.status(400).json({ 
            error: true,
            message: "Invalid credentials"});
    }

});

app.post("/add-note", authenticateToken, async(req, res) => {
    
});


app.listen(8000);

module.exports = app;