const mongoose = require("mongoose");

const app = express();


app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Hackthone").then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });



  

  
app.listen(5000, () => {
  console.log("server is running on port 5000");
});