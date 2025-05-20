const { countDocuments } = require("../models/listing");

class ExpressError extends Error{
    constructor(statusCode,message){
        super(message);
        this.statusCode=statusCode;

    }
}

module.exports=ExpressError;
