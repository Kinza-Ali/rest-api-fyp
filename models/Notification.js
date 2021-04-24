var mongoose = require('mongoose');
const Joi  = require('@hapi/joi');

var notificationSchema = mongoose.Schema( {
 
    time: String,
    date: String,
    uid: String
    // uid,time of Notification, date, 
});


var Notification = mongoose.model("Notification",notificationSchema);

//validating Notification
function validateNotification(data){
    const schema = Joi.object({
        uid: Joi.string().required(),
        time: Joi.string().required(),
        date: Joi.string().required(),
    });
    return schema.validate(data,{abortEarly: false});
}

module.exports.Notification = Notification;
module.exports.validate = validateNotification;