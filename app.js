const express = require('express')

var path = require('path');
var indexRouter = require('./routes/index')
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

// mongoose.connect('mongodb://0.0.0.0:27017/user', {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true
// })


var logger = require('morgan');

var db = require('./config/connection')

const app = express()
app.use(express.urlencoded({extended:true}));
app.use(expressLayout)
app.set('views', path.join(__dirname, 'views'))
app.set('layout', './layout/layout')
app.set('view engine', 'ejs')

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
db.connect()
// db.connect((err)=>{
//     if(err)
//         console.log("DataBase Connection Error "+err);
//     else
//         console.log("DataBase Connected");
    
// })
app.use('/', indexRouter)

const port = 3000
app.listen(port)

module.exports=app