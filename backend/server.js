const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT  || 3000
const cors = require('cors');
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin: 'http://localhost:5173',
}));

// app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/images', express.static('backend/public/images'));

app.use('/api/goals',require('./routes/goalRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/admin',require('./routes/adminRoutes'))


app.use(errorHandler)



app.listen(port,'::',() => console.log(`server started at port ${port}`))