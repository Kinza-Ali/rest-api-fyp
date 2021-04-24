var mongoose = require('mongoose');
// const Joi  = require('@hapi/joi');


var user_token_Schema = mongoose.Schema( {
    
    user: String,
   token: String,
});

var user_tokenSchema = mongoose.model("users_token",user_token_Schema);

//validating Users
// function validateUser_token(data){
//     const schema = Joi.object({
//         user: Joi.string().min(3).max(20).required(),
//         token: Joi.string().required(),
        
//     });
//     return schema.validate(data,{abortEarly: false});
// }


module.exports.users_token = user_tokenSchema;
// module.exports.validate =  validateUser_token;
