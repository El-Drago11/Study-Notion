const express = require('express');
const app = express();
require('dotenv').config()
const port  = process.env.PORT || 8000;

const cors = require('cors');
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const http = require('http')

// Routes Import
const userRoute = require('./routes/User');
const profileRoute = require('./routes/Profile');
const courseRoute = require('./routes/Course')
const paymentRoute = require('./routes/Payments');
const contactRoute = require('./routes/Contact')
const adminRoute = require('./routes/Admin')
const chatRoute = require('./routes/Chat')

// connections
const {cloudinaryConnect} = require('./config/cloudinary');
const initializeTheSocket = require('./utils/socket');
cloudinaryConnect(); //-->cloudiary connection
require('./config/database').connect()//--> connection to db

//firebase push notification setup
var admin = require("firebase-admin");

var serviceAccount = require("./config/studynotion-4b060-firebase-adminsdk-fbsvc-8554fd27fb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


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
app.use('/api/v1/admin',adminRoute)
app.use('/api/v1/chat',chatRoute)

//------->Socket setup ----------------

//step-1: integrating the http server with the express app
const server = http.createServer(app)

//step-2: A function to handle socket
initializeTheSocket(server)

//-------------->socket setup-----------------


//---> default Route
app.get('/',(req,res)=>{
    return res.json({
        success:true,
        message : `your server is Running at ${port}`
    })
})
//---> app hosted(server is used when socket listen)
server.listen(port ,(req,res)=>{
    console.log(`APP is  running successful at ${port}`)
})

