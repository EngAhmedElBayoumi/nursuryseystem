const { models } = require("mongoose");

const multer = require('multer');
const path = require('path');

module.exports=multer({
    storage: multer.diskStorage({
        destination:(request,file,callback)=>{
            callback(null,path.join(__dirname,"..","images"))
        },
        filename:(request,file,callback)=>{
            request.body.image=file.originalname;
            let extension = file.originalname.split(".").pop();
            let filename = request.body.id + "." + extension;
            callback(null,filename);    
        }
}) 
}).single("image")