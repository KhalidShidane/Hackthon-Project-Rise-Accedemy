const mongoose = require ("mongoose");

const ProjectSchema = new mongoose.Schema({
      name: {
    type: String,
    required: true,
  },

  description : {
    type : String,
    required : true
  },

  category: {
    type: String,
    required: true,
  },

  skills : {
    type : String,
    required : true,
  },

  image : { 
    type: String,
    required : true,

  },

  Budget : {
    type : String,
    required : true,
  },
  deadline : {
    type: Number,
    required : true,
  },


  status: {
  type: String,
  enum: ["Pending", "Available"],
  default: "Pending",
},
  
});

module.exports = mongoose.model("Project", ProjectSchema)