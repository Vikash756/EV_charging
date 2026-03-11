const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

stationId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Station",
required:true
},

bookingTime:{
type:Date,
default:Date.now
},

status:{
type:String,
default:"Booked",
enum:["Booked","Completed","Cancelled"]
}

}, {timestamps: true})

module.exports = mongoose.model("Booking",bookingSchema)