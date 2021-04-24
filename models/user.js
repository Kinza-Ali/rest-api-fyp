var mongoose = require('mongoose');
const Joi  = require('@hapi/joi');
var bcrypt = require ("bcryptjs"); //for password encryption

var userSchema = mongoose.Schema( {
    name: String,
    email: {
        type: String,
        required: true,
        useCreateIndex: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      },
    password: { type: String, required: true }, 
    role: {
            type:String,
            default: "user"},
});
userSchema.methods.generateHashedPassword = async function () {
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
}

var User = mongoose.model("User",userSchema);

//validating Users
function validateUserSignUp(data){
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().min(10).required(),
        password: Joi.string().min(5).required(),
    });
    return schema.validate(data,{abortEarly: false});
}
function validateUserLogin(data){
    const schema = Joi.object({
        email: Joi.string().email().min(10).required(),
        password: Joi.string().min(5).required(),
    });
    return schema.validate(data,{abortEarly: false});
}


module.exports.User = User;
module.exports.validateUserSignUp = validateUserSignUp; //for SignUp
module.exports.validateUserLogin = validateUserLogin; //for Login