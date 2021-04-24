const express = require('express');
const admin = require("../../middlewares/admin");
let router = express.Router();
//middleware
const validateDiabetesRecipe = require("../../middlewares/validateDiabetesRecipe"); 


var {DiabetesRecipe}  = require("../../models/DiabetesRecipe");
//get recipes
router.get("/",async(req,res, next)=>{
    //Pagination
    let page = Number(req.query.page ? req.query.page : 1);
    let perPage = Number(req.query.perPage? req.query.perPage : 10);
    let skipRecords = (perPage*(page-1));
    let diabetesRecipe = await DiabetesRecipe.find().skip(skipRecords).limit(perPage);

    return res.send(diabetesRecipe); 
});
//get single recipes
router.get("/:id",async(req,res)=>{
    try{
        let diabetesRecipe = await DiabetesRecipe.findById(req.params.id); 
        if(!diabetesRecipe) return status(400).send ("Given ID does not exist"); 
        return res.send(diabetesRecipe ); 
    } catch(err){
        return res.status(400).send("Invalid Id"); 
    }
});
//update recipe
router.put("/:id",validateDiabetesRecipe,async(req,res)=>{
    try{
    let diabetesRecipe = await DiabetesRecipe.findById(req.params.id); 
    if(!diabetesRecipe) return status(400).send ("Given ID does not exist"); 
    diabetesRecipe.dishName = req.body.dishName; 
    diabetesRecipe.ingrdients = req.body.ingrdients; 
    diabetesRecipe.method = req.body.method;; 
    await diabetesRecipe.save(); 
    return res.send(diabetesRecipe);
    }
    catch(err){
        return res.status(400).send("Invalid Id"); 
    }
});
// delete a record
router.delete("/:id",async(req,res)=>{
    let diabetesRecipe = await DiabetesRecipe.findByIdAndDelete(req.params.id); 
    return res.send(diabetesRecipe);
});
// insert a record
router.post("/",validateDiabetesRecipe,async(req,res)=>{
    
    let diabetesRecipe = await new DiabetesRecipe(); 
    diabetesRecipe.dishName = req.body.dishName; 
    diabetesRecipe.ingredients = req.body.ingredients; 
    diabetesRecipe.method = req.body.method;
    diabetesRecipe.dishUrl = req.body.dishUrl;
    diabetesRecipe.imgUrl = req.body.imgUrl;
    await diabetesRecipe.save(); 
    return res.send(diabetesRecipe);
});
module.exports = router;  