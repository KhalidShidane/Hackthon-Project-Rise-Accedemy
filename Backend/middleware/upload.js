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
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed"));
  },
});

module.exports = upload;
