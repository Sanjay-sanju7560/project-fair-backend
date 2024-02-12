const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log(('Inside jwt Middleware !!!'));
const token = req.headers['authorization'].split(" ")[1]
console.log(token)
try{
    if(token){
                      // console.log(jwt.verify(token,process.env.jwt_secret) );
    const jwtResponse = jwt.verify(token,process.env.jwt_secret)    
    req.payload = jwtResponse.userId
    next()
    }else{
        res.status(403).json("please provide token")
    }
}catch{
    res.status(401).json("please Login")
}

}
module.exports = jwtMiddleware