const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');


const booksRt = require('./routes/booksApi');
const rentBooksRt = require('./routes/rentbooksApi');
const usersRt = require('./routes/usersApi');
const historiesRt = require('./routes/historyApi');

const app = express();

var corsOptions = {
    origin: ['http://127.0.0.1:8000', 'http://localhost:8000', 'http://127.0.0.1:8081','http://localhost:8081'],
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/books', booksRt);
app.use('/api/rentbooks', rentBooksRt);
app.use('/api/users', usersRt);
app.use('/api/history', historiesRt);

app.listen({ port: 8500 }, async () => {
    await sequelize.authenticate();
    console.log("povezan app_rest");
});