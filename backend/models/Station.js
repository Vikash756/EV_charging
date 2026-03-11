const mongoose = require("mongoose")

const stationSchema = new mongoose.Schema({

name:{
type:String,
required:true
},

location:{
type:String,
required:true
},

latitude:{
type:Number,
required:true
},

longitude:{
type:Number,
required:true
},

availableSlots:{
type:Number,
required:true,
min:0
}

}, {timestamps: true})

module.exports = mongoose.model("Station",stationSchema)