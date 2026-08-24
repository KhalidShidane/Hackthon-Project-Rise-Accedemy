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
<<<<<<< HEAD
    required : true,
=======
    required : true
>>>>>>> 8eb7b3b (waxaan kusoo Daray user kii 1aad)
  },


  status: {
  type: String,
  enum: ["Pending", "Available"],
  default: "Pending",
},
  
});

<<<<<<< HEAD
module.exports = mongoose.model("Project", ProjectSchema)
=======
module.exports = mongoose.model("Project", ProjectSchema);

>>>>>>> 8eb7b3b (waxaan kusoo Daray user kii 1aad)
