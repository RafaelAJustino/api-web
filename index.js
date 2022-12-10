// config inicial

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.set('strictQuery', false);
const app = express();
const port = process.env.PORT || 8080;

// leitura JSON

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());
app.use(cors());

// rotas api

const usersRouter = require('./routes/userRouter');
const usersPostRouter = require('./routes/userPostsRouter');
const { application } = require('express');

app.use('/user', usersRouter);
app.use('/user-post', usersPostRouter);

// porta para conexão

const DB_USER = 'root';
const DB_PASS = 'root';

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@web3.rcbnis4.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(port, '0.0.0.0');
        console.log('Conectado ao MongoDB!');
    })
    .catch((err) => {
        console.log(err);
    })