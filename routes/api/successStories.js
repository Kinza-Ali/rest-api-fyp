const express = require('express');
const admin = require("../../middlewares/admin");
let router = express.Router();
//middleware
const validateSuccessStories = require("../../middlewares/validateSuccessStories"); 


var {SuccessStories}  = require("../../models/SuccessStories");
//get recipes
router.get("/",async(req,res, next)=>{
    //Pagination
    let page = Number(req.query.page ? req.query.page : 1);
    let perPage = Number(req.query.perPage? req.query.perPage : 10);
    let skipRecords = (perPage*(page-1));
    let successStories = await SuccessStories.find().skip(skipRecords).limit(perPage);

    return res.send(successStories); 
});
//get single recipes
router.get("/:id",async(req,res)=>{
    try{
        let successStories = await SuccessStories.findById(req.params.id); 
        if(!successStories) return status(400).send ("Given ID does not exist"); 
        return res.send(successStories ); 
    } catch(err){
        return res.status(400).send("Invalid Id"); 
    }
});
//update recipe
router.put("/:id",validateSuccessStories,async(req,res)=>{
    try{
    let successStories = await SuccessStories.findById(req.params.id); 
    if(!successStories) return status(400).send ("Given ID does not exist"); 
    successStories.title = req.body.title; 
    successStories.paragraph = req.body.paragraph; 
    await successStories.save(); 
    return res.send(successStories);
    }
    catch(err){
        return res.status(400).send("Invalid Id"); 
    }
});
// delete a record
router.delete("/:id",async(req,res)=>{
    let successStories = await SuccessStories.findByIdAndDelete(req.params.id); 
    return res.send(successStories);
});
// insert a record
router.post("/",validateSuccessStories,async(req,res)=>{
    
    let successStories = await new SuccessStories(); 
    successStories.title = req.body.title; 
    successStories.paragraph = req.body.paragraph; 
    await successStories.save(); 
    return res.send(successStories);
});
module.exports = router;  