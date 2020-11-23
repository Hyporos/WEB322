// require mongoose and setup the Schema
var mongoose = require("mongoose");
var Joi = require('joi');
const joiObjectid = require("joi-objectid");

// connect to the localhost mongo running on default port 27017
mongoose.connect("mongodb://localhost/airbnb");

// define the company schema
// register the Company model using the companySchema
// use the web322_companies collection in the db to store documents
var User = mongoose.model('User', new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 55555
    }
}));

// validate
function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(6).max(55555).required()
    });
    return schema.validate(user);
}

// export

exports.User = User;
exports.validate = validateUser;