const jwt = require("jsonwebtoken")

const authMiddleware = (req,res,next)=>{

const token = req.headers.authorization

if(!token){
return res.status(401).json({message:"No token provided"})
}

try{

const parts = token.split(" ")
if(parts.length !== 2){
return res.status(401).json({message:"Invalid token format"})
}

const decoded = jwt.verify(parts[1],process.env.JWT_SECRET)

req.user = decoded

next()

}catch(err){

return res.status(401).json({message:"Invalid token", error: err.message})
}

}

module.exports = authMiddleware