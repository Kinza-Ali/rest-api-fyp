const express = require('express');
const admin = require("../../middlewares/admin");
let router = express.Router();
//middleware
const validateBlog = require("../../middlewares/validateBlog"); 


var {Blog}  = require("../../models/Blog");
//get recipes
router.get("/",async(req,res, next)=>{
    //Pagination
    let page = Number(req.query.page ? req.query.page : 1);
    let perPage = Number(req.query.perPage? req.query.perPage : 10);
    let skipRecords = (perPage*(page-1));
    let blog = await Blog.find().skip(skipRecords).limit(perPage);

    return res.send(blog); 
});
//get single recipes
router.get("/:id",async(req,res)=>{
    try{
        let blog = await Blog.findById(req.params.id); 
        if(!blog) return status(400).send ("Given ID does not exist"); 
        return res.send(blog ); 
    } catch(err){
        return res.status(400).send("Invalid Id"); 
    }
});
//update recipe
router.put("/:id",validateBlog,async(req,res)=>{
    try{
    let blog = await Blog.findById(req.params.id); 
    if(!blog) return status(400).send ("Given ID does not exist"); 
    blog.title = req.body.title; 
    blog.paragraph = req.body.paragraph; 
    await blog.save(); 
    return res.send(blog);
    }
    catch(err){
        return res.status(400).send("Invalid Id"); 
    }
});
// delete a record
router.delete("/:id",async(req,res)=>{
    let blog = await Blog.findByIdAndDelete(req.params.id); 
    return res.send(blog);
});
// insert a record
router.post("/",validateBlog,async(req,res)=>{
    
    let blog = await new Blog(); 
    blog.title = req.body.title; 
    blog.paragraph = req.body.paragraph; 
    await blog.save(); 
    return res.send(blog);
});
module.exports = router;  