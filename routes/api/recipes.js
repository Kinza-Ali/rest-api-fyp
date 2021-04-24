const express = require('express');
const admin = require("../../middlewares/admin");
let router = express.Router();
//middleware
const validateRecipe = require("../../middlewares/validateRecipe"); 


var {Recipe}  = require("../../models/Recipe");
//get recipes
router.get("/",async(req,res, next)=>{
    //Pagination
    let page = Number(req.query.page ? req.query.page : 1);
    let perPage = Number(req.query.perPage? req.query.perPage : 10);
    let skipRecords = (perPage*(page-1));
    let recipes = await Recipe.find().skip(skipRecords).limit(perPage);

    return res.send(recipes); 
});
//get single recipes
router.get("/:id",async(req,res)=>{
    try{
        let recipe = await Recipe.findById(req.params.id); 
        if(!recipe) return status(400).send ("Given ID does not exist"); 
        return res.send(recipe ); 
    } catch(err){
        return res.status(400).send("Invalid Id"); 
    }
});
//update recipe
router.put("/:id",validateRecipe,async(req,res)=>{
    try{
    let recipe = await Recipe.findById(req.params.id); 
    if(!recipe) return status(400).send ("Given ID does not exist"); 
    recipe.dishName = req.body.dishName; 
    recipe.ingrdients = req.body.ingrdients; 
    recipe.method = req.body.method;
    recipe.dishUrl = req.body.dishUrl;
    recipe.imgUrl = req.body.imgUrl;
    await recipe.save(); 
    return res.send(recipe);
    }
    catch(err){
        return res.status(400).send("Invalid Id"); 
    }
});
// delete a record
router.delete("/:id",async(req,res)=>{
    let recipe = await Recipe.findByIdAndDelete(req.params.id); 
    return res.send(recipe);
});
// insert a record
router.post("/",validateRecipe,async(req,res)=>{
    
    let recipe = await new Recipe(); 
    recipe.dishName = req.body.dishName; 
    recipe.ingredients = req.body.ingredients; 
    recipe.method = req.body.method;
    recipe.dishUrl = req.body.dishUrl;
    recipe.imgUrl = req.body.imgUrl;
    await recipe.save(); 
    return res.send(recipe);
});
module.exports = router;  