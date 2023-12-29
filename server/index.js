const express = require('express');
const app = express();
require('dotenv').config()
const port  = process.env.PORT || 8000;

const cors = require('cors');
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

// Routes Import
const userRoute = require('./routes/User');
const profileRoute = require('./routes/Profile');
const courseRoute = require('./routes/Course')
const paymentRoute = require('./routes/Payments');
const contactRoute = require('./routes/Contact')

// connections
const {cloudinaryConnect} = require('./config/cloudinary')
cloudinaryConnect(); //-->cloudiary connection
require('./config/database').connect()//--> connection to db

// middelware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:3000',  //front-end 'url'
    credentials:true
}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp"  //temporary file where we store our file before uploading the cloudinary
}))

// ---> Routes
app.use('/api/v1/auth',userRoute)
app.use('/api/v1/profile',profileRoute)
app.use('/api/v1/course',courseRoute)
app.use('/api/v1/payment',paymentRoute)
app.use('/api/v1/reach',contactRoute)
//---> default Route
app.get('/',(req,res)=>{
    return res.json({
        success:true,
        message : `your server is Running at ${port}`
    })
})
//---> app hosted
app.listen(port ,(req,res)=>{
    console.log(`APP is  running successful at ${port}`)
})

