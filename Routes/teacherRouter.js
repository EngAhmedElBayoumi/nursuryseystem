// import express
const express = require('express');
//import express-validator
const { body, param,query } = require('express-validator');
// import controlers
const teacherController = require('./../Controller/teacherController');

//import teachervalidator
const teachervalidator = require('./../Core/teachervalidator');
// import multer
const multer = require('multer');
//import path
const path = require('path');
const checkrole=require('../Core/checkrole')
// import validatevm
const validatevm = require('./../Core/validatevm');

//import express-Router
const router = express.Router();

// route /teacher get all data , post new teacher , update teacher date
router.route('/teachers')
    .get(checkrole.checkadminorteacher,teacherController.getAllTeacher)
    .post(
        multer({
            storage: multer.diskStorage({
                destination:(req,file,callback)=>{
                    callback(null,path.join(__dirname,"..","images"))
                },
                filename:(req,file,callback)=>{
                    let extension = file.originalname.split(".").pop();
                    // filename = id + extension
                    let filename = req.body.id + "." + extension;
                    callback(null,filename);    
                }
      
        }) 
        }).single("image"),
        checkrole.checkadmin,teachervalidator.postValidator,validatevm,teacherController.addNewTeacher)
    .put(checkrole.checkadmin,teachervalidator.putValidator,validatevm,teacherController.updateTeacher)
    .delete(checkrole.checkadmin,teachervalidator.deleteValidator,validatevm,teacherController.deleteTeacher);


// export router
module.exports = router;