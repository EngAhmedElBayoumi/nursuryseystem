

// import mongoose
const mongoose = require('mongoose');

const {body,param,query}=require("express-validator");
// load class
require('../Model/classModel');
const classSchema = mongoose.model("class");


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
//export update Class function
exports.updateClass = (request, response, next) => {
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
    }
    )
    .catch((error) => next(error));
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

