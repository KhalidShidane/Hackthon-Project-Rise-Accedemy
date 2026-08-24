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
    default: "",
  },

  Budget : {
    type : String,
    required : true,
  },
  deadline : {
    type: Number,
    required : true,
  },

  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },


  status: {
  type: String,
  enum: ["Pending", "Available", "Not Available"],
  default: "Pending",
},
  
}, { timestamps: true });


module.exports = mongoose.model("Project", ProjectSchema)



