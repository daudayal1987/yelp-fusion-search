require('dotenv').config();

const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use('/public', express.static('public'));
app.use('/', require('./routes/routedefinitions'));

app.listen(process.env.APP_PORT, ()=>{

    console.log(`Application is running on ${process.env.APP_PORT}`);
});