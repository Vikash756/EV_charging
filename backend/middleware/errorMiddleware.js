const logger = require("../config/logger")

const errorHandler = (err,req,res,next)=>{

logger.error(err.message || err)

const statusCode = err.statusCode || 500
const message = err.message || "Internal Server Error"

res.status(statusCode).json({

message,

error: process.env.NODE_ENV === "development" ? err : undefined

})

}

module.exports = errorHandler