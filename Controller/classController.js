
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
    const { id, name, supervisor, children } = request.body;
  
    Promise.all([
      teacherSchema.findOne({ _id: supervisor }),
      childrenSchema.find({ _id: { $in: children } }),
    ])
      .then(([supervisorData, childrenData]) => {
        if (!supervisorData) {
          throw new Error("Supervisor not found");
        }
  
        if (childrenData.length !== children.length) {
          throw new Error("Not all children found");
        }
  
        const newClass = new classSchema({
          _id: id,
          name,
          supervisor,
          children,
        });
  
       return newClass.save();
      })
      .then((data) => {
        response.status(200).json({ data });
      })
      .catch((error) => next(error));
  };
//export update Class function
exports.updateClass = (request, response, next) => {
    const { id, name, supervisor, children } = request.body;
  
    Promise.all([
      teacherSchema.findOne({ _id: supervisor }),
      childrenSchema.find({ _id: { $in: children } }),
    ])
      .then(([supervisorData, childrenData]) => {
        if (!supervisorData) {
          throw new Error("Supervisor id not exist in our nursery");
        }
  
        if (childrenData.length !== children.length) {
          throw new Error("Not all children id  exist in our nursery");
        }
  
        return classSchema.updateOne(
        { _id: request.body.id },
        {
          $set: {
            _id: request.body.id,
            name,
            supervisor,
            children,
          },
        }
      );
    })
      .then((data) => {
        response.status(200).json({ data });
      })
      .catch((error) => next(error));
  };
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

