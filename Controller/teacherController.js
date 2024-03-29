// import mongoose 
const mongoose = require('mongoose');
// import jsonwebtoken
// load teacher model
require('../Model/teacherModel');
require('../Model/classModel');
// import bcrypt
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(16);
// teacher schema
const teacherSchema = mongoose.model("teachers");
const classSchema = mongoose.model("class");

// export getallteacher function
exports.getAllTeacher = (request, response) => {
    teacherSchema
    .find({})
    .then((data) => {
    response.status(200).json({ data });
    }
    )
    .catch((error) => next(error));
};

//export add new teacher function
exports.addNewTeacher = (request, response, next) => {
    console.log(request.file);
    new teacherSchema({
        _id: request.body.id,
        fullName: request.body.fullName,
        password: bcrypt.hashSync(request.body.password, salt),
        email: request.body.email,
        image: request.body.image,
    })
    .save()
    .then((data) => {
        response.status(200).json({ data });
})
    .catch((error) => next(error));
    }

//export update teacher function
exports.updateTeacher = (request, response, next) => {
    teacherSchema
    .updateOne
    (
        { _id: request.body.id },
        {
            $set: {
                fullName: request.body.fullName,
                password: bcrypt.hashSync(request.body.password, salt),
                email: request.body.email,
                image: request.body.image,
            }
        })
    .then((data) => {
        response.status(200).json({ data });
    })
    .catch((error) => next(error));
}

//export delete teacher function
exports.deleteTeacher = (request, response, next) => {
    classSchema.findOne({supervisor:request.body.id})
    .then((data)=>{
        if(data){
            throw new Error("can't delete this teacher before set new supervisor for this class");
        }
        else{
    teacherSchema
    .deleteOne({ _id: request.body.id })
    .then((data) => {
      if (data.deletedCount == 0) {
        next(new Error("teacher not found"));
      } else response.status(200).json({ data });
    })
    }
    })
    .catch((error) => {
        next(error);
      }
    );
}
