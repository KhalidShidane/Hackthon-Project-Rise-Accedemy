const mongoose =require('mongoose')

const express = require('express')

const App = express();


mongoose.connect("mongodb://localhost:27017/Hackthon").then(()=>{
    console.log("Data base Connected")
})

App.listen(5000,()=>{
    console.log("Server is Runing")
})