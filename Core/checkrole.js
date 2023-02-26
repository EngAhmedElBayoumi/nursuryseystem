

exports.checkadmin = (request, response, next) => {
    if(request.role=="admin"){
        next()
    }
    else{
        throw new Error("Not Authorized")
    }

}
exports.checkteacher = (request, response, next) => {
    if(request.role=="teacher"){
        next()
    }
    else{
        throw new Error("Not Authorized")
    }

}
exports.checkadminorteacher = (request, response, next) => {
    if(request.role=="teacher"||request.role=="admin"){
        next()
    }
    else{
        throw new Error("Not Authorized")
    }

}



