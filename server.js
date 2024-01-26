import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js'


//config ENV
dotenv.config()

//database config
connectDB();

//rest object
const app = express();

//middle ware
app.use(express.json())
app.use(morgan('dev'))


//Routes
app.use('/api/v1/auth' , authRoute)
//rest api
app.get('/', (req,res)=>{
    res.send("<h1>Hello Guys</h1>")
})


//port 
const PORT = process.env.PORT || 8080;

//Run Listen
app.listen(PORT, ()=>{
    console.log(`server runing on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})