var mongoose = require('mongoose');
const Joi  = require('@hapi/joi');

var blogsSchema = mongoose.Schema( {
    title: String,
    paragraph: String,
});


var Blog = mongoose.model("Blog",blogsSchema);

//validating Blogs
function validateBlog(data){
    const schema = Joi.object({
        title: Joi.string().min(3).max(20).required(),
        paragraph: Joi.string().min(10).required(),
    });
    return schema.validate(data,{abortEarly: false});
}

module.exports.Blog = Blog;
module.exports.validate = validateBlog;