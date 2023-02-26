// import express
const express = require('express');
//import express-validator
const { body, param,query } = require('express-validator');

// import classController 
const classController = require('./../Controller/classController');

// import validatevm
const validatevm = require('./../Core/validatevm');

// import classvalidator
const classvalidator = require('./../Core/classvalidator');
//import express-Router
const router = express.Router();

// route /class get all data , post new class , update class date
router.route('/classes')
    .get(classController.getAllClasses)
    .post(classvalidator.postValidator,validatevm,classController.addNewClass)
    .put(classvalidator.putValidator,validatevm,classController.updateClass)
    .delete(classvalidator.deleteValidator,validatevm,classController.deleteClass);


router.route('/classchildren/:id')
    .get(classvalidator.getClassChildrenValidator,validatevm,classController.getChildrenClasses)



router.route('/classteacher/:id')
    .get(classvalidator.getTeacherClassesValidator,validatevm,classController.getTeacherClasses)
    


// export router
module.exports = router;