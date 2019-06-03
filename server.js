const express = require('express');
const mongoose = require('mongoose');

const applyMiddleware = require('./config/middleware');
const includeRoutes = require('./routes');
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 3000
//const DB_STRING = process.env.DB_STRING || "mongodb://localhost:27017/smartlockers";

const DB_STRING = process.env.DB_STRING || "mongodb+srv://serviceAccount:rethabile@smart-lockers-ui0jh.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(DB_STRING,{useNewUrlParser:true}, (err)=>{
    if (!err){
        console.log('connection to smartlockers database successfully established')
    }else{
        console.log('failed to establish connection to linqup database')
    }
});


const app = express();
app.use(cors());




applyMiddleware(app);
includeRoutes(app);





app.listen(PORT, ()=>{
    console.log(`smart lockers running on <serv>:${PORT}`)
})