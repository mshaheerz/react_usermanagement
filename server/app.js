const cors = require('cors') ;
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

const express  = require('express');
const logger = require('morgan');
const adminRouter = require('./routes/adminRouter')
const userRouter = require('./routes/userRouter')
const connectDb = require('./model/dbconnection')

const app = express();
app.use(bodyParser.json({limit: '300kb'}));
connectDb(DATABASE_URL)
app.use(cors({
    origin: ['http://localhost:3000'],
    methods:["GET","POST"],
    credentials:true,
}))

app.use(logger("dev"))
app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use(express.static("public"))
app.use(cookieParser())


app.use('/',userRouter)
app.use('/admin',adminRouter)

app.listen(port,()=>{
    console.log(`server listening at http://127.0.0.1:${port}`);
});

module.exports = app;