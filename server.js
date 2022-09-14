const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();


app.set('view engine', 'ejs');

app.use(express.urlencoded())
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mydb', { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (err)
        throw err;

    console.log('Connect DB success...');
});

app.use('/', require(__dirname + '/routes/base.routes.js'))




app.listen(8833, 'localhost', () => {
    console.log('Server running...')
})