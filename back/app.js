const express = require('express');
const { sequelize,RentBooks } = require('./models');
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const { Op } = require("sequelize");
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://127.0.0.1:8081', 'http://localhost:8081'],
        methods: ['GET', 'POST', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ''
    },
    allowEIO3: true
    
});

server.listen(3000);

var corsOptions = {
    origin: ['http://127.0.0.1:8081','http://localhost:8081'],
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) return res.redirect(301, '/login');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect(301, '/login');
    
        req.user = user;
    
        next();
    });
}

app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './static' });
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});

app.get('/', authToken, (req, res) => {
    res.sendFile('index.html', { root: './static' });
});

function authSocket(msg, next) {
    if (msg[1].token == null) {
        next(new Error("Not authenticated"));
    } else {
        jwt.verify(msg[1].token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                next(new Error('You need to be logged in'));
            } else {
                msg[1].user = user;
                next();
            }
        });
    }
}

io.on('connection', socket => {
    socket.use(authSocket);

    console.log('Connection established');

    socket.on('rent', msg => {
       console.log('pozvan socket rent i poruka od msg');
       RentBooks.findOne({ where: {[Op.and]: [{bookId: msg.body.id}, {available: true}] }  })
        .then(rentBook =>{
            rentBook.available = false;
            rentBook.save();
            // io.emit('rent', JSON.stringify(msg));
        })
        .catch(err => res.status(500).json(err));
    });
    
    socket.on('error', err => socket.emit('error', err.message) );
});


app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
    console.log('povezan app');
});