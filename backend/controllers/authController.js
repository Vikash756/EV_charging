const authService = require("../services/authService")

exports.signup = async(req,res,next)=>{

try{

const user = await authService.signup(req.body)

res.status(201).json(user)

}catch(err){

next(err)

}

}

exports.login = async(req,res,next)=>{

try{

const result = await authService.login(req.body)

res.json(result)

}catch(err){

next(err)

}

}