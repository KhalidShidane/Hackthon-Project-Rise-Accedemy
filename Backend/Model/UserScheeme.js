const mongoose = require('mongoose')

const UserScheeme = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
     phone:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true
     },
     image:{
        type:String,
        required:true
     }
})