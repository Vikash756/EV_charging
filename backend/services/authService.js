const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const ApiError = require("../utils/ApiError")

exports.signup = async(data)=>{

const existingUser = await User.findOne({email: data.email})
if(existingUser){
throw new ApiError(400, "User already exists")
}

const hashedPassword = await bcrypt.hash(data.password,10)

const user = new User({

name:data.name,
email:data.email,
password:hashedPassword

})

await user.save()

const { password, ...userWithoutPassword } = user.toObject()
return userWithoutPassword
}

exports.login = async(data)=>{

const {email, password} = data
const user = await User.findOne({email})

if(!user){
throw new ApiError(400, "User not found")
}

const isMatch = await bcrypt.compare(password, user.password)
if(!isMatch){
throw new ApiError(400, "Wrong password")
}

const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
return {token, user: {id: user._id, name: user.name, email: user.email}}
}