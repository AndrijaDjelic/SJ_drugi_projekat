const express = require('express');
const { sequelize, Histories,Users,RentBooks, Books } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const route = express.Router();//ovaj ruter dole exportujemo
route.use(express.json());//da bi nam tumacio sadrzaj kao json
route.use(express.urlencoded({ extended: true }));//kada budemo iz fron tend komunicirali da ume da protumaci podatke iz forme i da ih stavi u js obj

function authToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ msg: "err" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

    if (err) return res.status(403).json({ msg: err });

    req.user = user;

    next();
  });
}
route.use(authToken);


route.get('/showBy/:userId', (req, res) => {
  //  console.log('getAllBooks pozvan')
  Histories.findAll({ where: { userId: req.params.userId }, include: [{model: Users, attributes: ['id', 'username'], as: 'user'}, {model: RentBooks, 
    attributes: ['id', 'bookId'], as: 'rentBook', include:{model: Books, attributes: ['id', 'title','author','genre'], as: 'book'}}]})
      .then(rows => res.json(rows))
      .catch(err => res.status(500).json(err));
  });

  route.post('/', (req, res) => {
  
    if (validEntry.error) {
      res.status(422).json({ msg: validEntry.error.message })
    } else {
      Histories.create({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre
      })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
    }
  
  
  });

module.exports = route;