

// import mongoose
const mongoose = require('mongoose');

const {body,param,query}=require("express-validator");
// load class
require('../Model/classModel');
const classSchema = mongoose.model("class");
const teacherSchema= mongoose.model("teachers");
const childrenSchema= mongoose.model("children");

// export get all classes function
exports.getAllClasses = (request, response) => {
    classSchema
    .find({})
    .then((data) => {
    response.status(200).json({ data });
    }
    )
    .catch((error) => next(error));
}

//export add new Class function
exports.addNewClass = (request, response, next) => {
    /** check if request.body.supervisor exist in teacherschema _id  */
    teacherSchema
        .findOne({_id:request.body.supervisor})
        .then((data)=>{
            if(data==null){
                throw new Error("this id not related to any teacher");
            }
        })
        .catch((error)=>next(error));
    /** check if all element in request.body.children array exist in childrenschema _id */
    childrenSchema
    .find({ _id: { $in: request.body.children } })
    .then((data)=>{
        if(data.length!=request.body.children.length){
            throw new Error("not all child id  related to our children");
        }
        else{
        console.log(data)
        new classSchema({
            _id: request.body.id,
            name: request.body.name,
            supervisor: request.body.supervisor,
            children: request.body.children,
        })
        .save()
        .then((data) => {
            response.status(200).json({ data });
        }
        )
        .catch((error) => next(error));
      }
    })
    .catch((error)=>next(error));
}




    

   
    

//export update Class function
exports.updateClass = (request, response, next) => {
    teacherSchema
        .findOne({_id:request.body.supervisor})
        .then((data)=>{
            if(data==null){
                throw new Error("Teacher not Found");
            }
        })
        .catch((error)=>next(error));
  
    childrenSchema
    .find({ _id: { $in: request.body.children } })
    .then((data)=>{
        if(data.length!=request.body.children.length){
            throw new Error("not all child id  related to our children");
        }
        else{
            classSchema
            .updateOne
            (
                { _id: request.body.id },
                {
                    $set: {
                        _id: request.body.id,
                        name: request.body.name,
                        supervisor: request.body.teacher,
                        children: request.body.children,
                    }
                }
            )
            .then((data) => {
                response.status(200).json({ data });
            })
        }
        })
    .catch((error)=>next(error));
}

//export delete Class function
exports.deleteClass = (request, response, next) => {
    classSchema
    .deleteOne({ _id: request.body.id })
    .then((data) => {
        response.status(200).json({ data });
    }
    )
    .catch((error) => next(error));
}


// export get children classes

exports.getChildrenClasses = (request, response,next) => {
    // get all children that ref with class in array children 
    classSchema
    .find({children:request.params.id},{_id:1,name:1})
    .then((data) => {
         response.status(200).json({ data });
    }
    )
    .catch((error) => next(error));
}

// export get teacher classes
exports.getTeacherClasses = (request, response,next) => {
    classSchema
    .find({supervisor:request.params.id},{_id:1,name:1})
    .then((data) => {
    response.status(200).json({ data });
    }
    )
    .catch((error) => next(error));
}

