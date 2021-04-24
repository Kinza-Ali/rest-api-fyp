const {validate}= require("../models/Blog");
function validateBlog (req,res,next){
    //validation
    let {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    next();
}
module.exports = validateBlog;