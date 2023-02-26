// import express
const express = require('express');
//import express-validator
const { body, param,query } = require('express-validator');
// import controlers
const teacherController = require('./../Controller/teacherController');

//import teachervalidator
const teachervalidator = require('./../Core/teachervalidator');

const uploadimage= require('./../Core/uploadimg')
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
    .post(uploadimage,checkrole.checkadmin,teachervalidator.postValidator,validatevm,teacherController.addNewTeacher)
    .put(uploadimage,checkrole.checkadmin,teachervalidator.putValidator,validatevm,teacherController.updateTeacher)
    .delete(checkrole.checkadmin,teachervalidator.deleteValidator,validatevm,teacherController.deleteTeacher);

    
// export router
module.exports = router;