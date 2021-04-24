const {validate}= require("../models/users_token");
function validateUser_token (req,res,next){
    //validation
    let {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    next();
}
module.exports = validateUser_token;