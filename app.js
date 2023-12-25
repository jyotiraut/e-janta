
//require
require('./db')
const express = require('express')
const CreateHttpError = require('http-errors')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()
require('./helpers/auth_schema')

// const connectFlash = require('connect-flash')
//  const session = require('express-session')


//initialization
const app = express()
app.use(morgan('dev'))
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.json())
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({extended:false}))
//const passport = require('passport')

//init session 
// app.use(session({
//     secret:process.env.SECRET_SESSION,
//     resave: false,
//     saveUninitialized:false,
//     cookie:{
//         //secure:true
//         httpOnly:true

//     }
// }))

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });



// app.use(connectFlash());
// app.use((req, res, next) => {
//   res.locals.messages = req.flash();
//   next();
// });

//routes
app.use('/',require('./routes/index.routes'))
app.use('/auth',require('./routes/auth.routes'))
app.use('/user',require('./routes/user.routes'))


const PORT = process.env.PORT || 3000

app.get('/',(req,res)=>{
    res.send("hello")
})

//handling the error

app.use((req,res,next)=>{
    next(CreateHttpError.NotFound())
})

app.use((req,res,next)=>{
    error.status = error.status || 500
    res.status(error.status)
    res.send(error)
})



app.listen(PORT,()=>{
    console.log(`Listening in the port ${PORT}`)
})