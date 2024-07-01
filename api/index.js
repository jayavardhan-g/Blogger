const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const cookieParser= require('cookie-parser');


app.use(cookieParser());
app.use(express.json());
app.use(cors({credentials:true,origin:"http://localhost:5173"}));
app.use('/uploads',express.static(__dirname+'/uploads'));

// mongoose.connect("mongodb+srv://blog:ICVrIffVE2A5u1Ol@cluster0.mrwain4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
mongoose.connect("mongodb://localhost:27017/blogs")

app.get('/test', (req,res)=>{
    res.json('Test ok');
})

app.use('/auth',require('./routes/Auth'));
app.use('/blogs',require('./routes/Blog'));

app.listen(5001,()=>{
    console.log('Listening on port 5001');
});