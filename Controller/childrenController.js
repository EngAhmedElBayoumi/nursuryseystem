// import mongoose
const mongoose = require('mongoose');
const { body, param,query } = require('express-validator');


// load children model
require('../Model/childrenModel');
const childrenSchema = mongoose.model("children");



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
    childrenSchema
    .deleteOne({ _id: request.params.id })
    .then((data) => {
      if (data.deletedCount == 0) {
        next(new Error("child not found"));
      } else response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });

}