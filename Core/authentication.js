const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    try{
        const authHeader = request.get('authorization').split(" ")[1];
        const token=jwt.verify(authHeader,"Ahmed@Tarek")
        console.log(token)
        request.role=token.role;
        request.id=token.id;
        next()
    }
    catch(error){
       throw new Error("Not Authenticated")
    }
}