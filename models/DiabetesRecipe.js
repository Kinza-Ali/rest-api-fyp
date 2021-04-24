var mongoose = require('mongoose');
const Joi  = require('@hapi/joi');

var diabetesRecipeScehma = mongoose.Schema( {
    dishName: String,
    ingredients: String,
    method: String,
    imgUrl: String,
    dishUrl: String,
});


var DiabetesRecipe = mongoose.model("DiabetesRecipe",diabetesRecipeScehma);

//validating diabetesRecipes
function validateDiabetesRecipe(data){
    const schema = Joi.object({
        dishName: Joi.string().min(3).max(20).required(),
        ingredients: Joi.string().min(10).required(),
        method: Joi.string().min(10).required(),
        imgUrl: Joi.required(),
        dishUrl: Joi.required()
    });
    return schema.validate(data,{abortEarly: false});
}

module.exports.DiabetesRecipe = DiabetesRecipe;
module.exports.validate = validateDiabetesRecipe;