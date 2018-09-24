const express = require('express');
const shortid = require('shortid');
const hbs = require('hbs');
let index = require('./routes/routes.js');

const PORT = 3000;
let app = express();
hbs.registerPartials(__dirname + './../views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + './../public'));


hbs.registerHelper('getCurrentYear',() => {
    return  new Date().getFullYear();
});


app.use('/',index);

app.listen(PORT,()=>{
    console.log("Connected at port 3000");
});