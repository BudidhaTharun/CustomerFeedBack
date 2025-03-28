const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const webRoutes = require('./Routes/webRoutes');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.static('public'));
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: true,
}));
app.use(express.json());

mongoose.connect('mongodb+srv://tharunbudidha:1234567890@customerfeedback.p2urszj.mongodb.net/?retryWrites=true&w=majority&appName=customerfeedback')
  .then((result) => app.listen(4000,(req,res)=>{
    console.log('mongoDB connected Succesfully');
  }))
  .catch((err) => console.log(err));



app.use(webRoutes);