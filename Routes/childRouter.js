// import express
const express = require('express');
//import express-validator
const { body, param,query } = require('express-validator');
// import childrenController 
const childrenController = require('./../Controller/childrenController');
// import validatevm
const validatevm = require('./../Core/validatevm');

// import childrenvalidator
const childrenvalidator = require('./../Core/childrenvalidator');
//import express-Router
const router = express.Router();

// route /children get all data , post new child , update child date , delete child
router.route('/children')
    .get(childrenController.getAllChildren)
    .post(childrenvalidator.postValidator,validatevm,childrenController.addNewChild)
    
// get specific children whith id 
router.route('/child/:id')
    .get(childrenvalidator.getValidator,validatevm,childrenController.getspecificChildren)
    .delete(childrenvalidator.deleteValidator,validatevm,childrenController.deleteChild)
    .put(childrenvalidator.putValidator,validatevm,childrenController.updateChild)

// export router
module.exports = router;

