const multer = require('multer')
 
const storage = multer.diskStorage({
    destination:(req,fil,cb)=>{
        cb(null,"images")
    },
   filename:(req,file,cb)=>{
        cb (null, Date.now()+"-"+file.originalname);
    }
})
const upload = multer({storage})

module.exports = upload
