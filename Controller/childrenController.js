// import mongoose
const mongoose = require('mongoose');
const { body, param,query } = require('express-validator');


// load children model
require('../Model/childrenModel');
require('../Model/classModel');
const childrenSchema = mongoose.model("children");
const classSchema = mongoose.model("class");
// export get all children function
exports.getAllChildren = (request, response,next) => { 
    childrenSchema
    .find({})
    .then((data) => {
    response.status(200).json({ data });
    })
    .catch((error) => next(error));
};
// export get specific child function
exports.getspecificChildren = (request, response,next) => {
    childrenSchema
    .findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) {
        throw new Error("Child not Found");
      } else {
        response.status(200).json({ data });
      }
    })
    .catch((error) => next(error));
};
//export add new child function
exports.addNewChild = (request, response, next) => { 
     new childrenSchema({
        _id: request.body.id,
        fullName: request.body.fullName,
        age: request.body.age,
        level: request.body.level,
        address: {
            street: request.body.address.street,
            city: request.body.address.city,
            building: request.body.address.building,
        },
    })
    .save()
    .then((data) => {
        response.status(200).json({ data });
    }
    )
    .catch((error) => next(error));

}
//export update child function
exports.updateChild = (request, response, next) => {
    childrenSchema
    .updateOne
    (
                { _id: request.params.id },
                {
                    $set: {
                        _id:request.body.id,
                        fullName: request.body.fullName,
                        age: request.body.age,
                        level: request.body.level,
                        address: {
                            street: request.body.address.street,
                            city: request.body.address.city,
                            building: request.body.address.building,
                        },
                    },
                }
    )
    .then((data) => 
    {
        if (data.matchedCount == 0) {
            throw new Error("Child not Found");
        } else {
            response.status(200).json({ data });
        }
    })
    .catch((error) => next(error));
}

//export delete child function
exports.deleteChild = (request, response, next) => {
    childrenSchema.findByIdAndDelete(request.params.id)
      .then((data) => {
        if (data==null) {
         console.log(data+"from if");
          throw new Error("Child not found");
        }
        console.log(data);
  
         classSchema.findOneAndUpdate(
          { children:request.params.id },
          { $pull: { children: request.params.id } }
        );
      })
      .then(() => {
        response.status(200).json({ message: "Child deleted successfully" });
      })
      .catch((error) => {
        next(error);
      });
  };