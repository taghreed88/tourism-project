

const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema

var UserSchema = Schema({
	username: {
		type: String,
        // required:true,
        minLenght:3
	},
	email: {
		type: String,
        // required:true,
        validate(value){
            if(!validator.isEmail){
                throw new Error("Invalid email id")
            }
        }
	},
    
	password: {
		type: String
	},

    phone:{
        type:Number,
        required:true,
        minLenght:3
    }
})

// we need a collection

// User.plugin(passportLocalMongoose);

module.exports = mongoose.model('UserSchema', UserSchema)
