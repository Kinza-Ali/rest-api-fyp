var mongoose = require('mongoose');
const Joi  = require('@hapi/joi');

var successStoriesSchema = mongoose.Schema( {
    title: String,
    paragraph: String,
});


var SuccessStories = mongoose.model("SuccessStories",successStoriesSchema);

//validating SuccessStoriess
function validateSuccessStories(data){
    const schema = Joi.object({
        title: Joi.string().min(3).max(20).required(),
        paragraph: Joi.string().min(10).required(),
    });
    return schema.validate(data,{abortEarly: false});
}

module.exports.SuccessStories = SuccessStories;
module.exports.validate = validateSuccessStories;