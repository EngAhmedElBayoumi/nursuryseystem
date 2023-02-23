// import express
const express = require('express');
//import express-validator
const { body, param,query } = require('express-validator');
// import controlers
const teacherController = require('./../Controller/teacherController');

//import teachervalidator
const teachervalidator = require('./../Core/teachervalidator');

// import validatevm
const validatevm = require('./../Core/validatevm');

//import express-Router
const router = express.Router();

// route /teacher get all data , post new teacher , update teacher date
router.route('/teachers')
    .get(teacherController.getAllTeacher)
    .post(teachervalidator.postValidator,validatevm,teacherController.addNewTeacher)
    .put(teachervalidator.putValidator,validatevm,teacherController.updateTeacher)
    .delete(teachervalidator.deleteValidator,validatevm,teacherController.deleteTeacher);




// export router
module.exports = router;