const {validate}= require("../models/Notification");
function validateNotification (req,res,next){
    //validation
    console.log("evaluating..");
    console.log(req.body)
    let {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    next();
}
module.exports = validateNotification;