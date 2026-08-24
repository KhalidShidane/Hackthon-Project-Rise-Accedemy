const fs = require("fs");
const path = require("path");
const multer = require("multer");

const uploadDirectory = path.join(__dirname, "..", "images");
fs.mkdirSync(uploadDirectory, { recursive: true });
 
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, uploadDirectory)
    },
   filename:(req,file,cb)=>{
        cb(null, Date.now()+"-"+file.originalname);
    }
})
const upload = multer({ storage });

module.exports = upload;
