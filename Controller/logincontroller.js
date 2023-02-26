const jwt=require('jsonwebtoken')
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
require("../Model/teacherModel")
const teacherSchema=mongoose.model("teachers")

exports.login=(request,response,next)=>{

    if(request.body.fullName=="admin"&&request.body.password=="admin")
    {
        let token = jwt.sign(
            {id:10,role:"admin"},
            "Ahmed@Tarek",
            {expiresIn:"24h"},
        ) 
        response.status(200).json({
            message:"Admin Login Successfull",token
        })
    }else{
        teacherSchema.
        findOne({fullName:request.body.fullName})
        .then((data)=>{
                if(data){
                    bcrypt.compare(request.body.password, data.password, (error) => {
                        if (error) {
                             throw new Error("Invalid fullName  or password");
                        } else 
                        {
                            let token = jwt.sign(
                            {id:data._id,role:"teacher"},
                            "Ahmed@Tarek",
                            {expiresIn:"12h"},
                            ) 
                            response.status(200).json({
                                message:"Teacher Login Successfull",token
                            })
                        }
                    })
                }
                else{
                    response.status(404).json({message:"Invalid username or password"})
                }
        })
        .catch((error)=>next(error))
    }
        
    }