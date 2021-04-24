var mongoose = require('mongoose');
const Joi  = require('@hapi/joi');

var recipeSchema = mongoose.Schema( {
    dishName: String,
    ingredients: String,
    method: String,
    imgUrl: String,
    dishUrl: String,
});


var Recipe = mongoose.model("Recipe",recipeSchema);

//validating recipes
function validateRecipe(data){
    const schema = Joi.object({
        dishName: Joi.string().min(3).max(20).required(),
        ingredients: Joi.string().min(10).required(),
        method: Joi.string().min(10).required(),
        imgUrl: Joi.required(),
        dishUrl: Joi.required()
    });
    return schema.validate(data,{abortEarly: false});
}

module.exports.Recipe = Recipe;
module.exports.validate = validateRecipe;