const { not } = require('@hapi/joi');
const express = require('express');
const admin = require("../../middlewares/admin");
let router = express.Router();
//middleware
const validateNotification = require("../../middlewares/validateNotification"); 


var {Notification}  = require("../../models/Notification");
//get recipes
router.get("/",async(req,res, next)=>{
    //Pagination
    let page = Number(req.query.page ? req.query.page : 1);
    let perPage = Number(req.query.perPage? req.query.perPage : 10);
    let skipRecords = (perPage*(page-1));
    let notification = await Notification.find().skip(skipRecords).limit(perPage);

    return res.send(notification); 
});
//get single recipes
router.get("/:id",async(req,res)=>{
    try{
        let notification = await Notification.findById(req.params.id); 
        if(!notification) return status(400).send ("Given ID does not exist"); 
        return res.send(notification ); 
    } catch(err){
        return res.status(400).send("Invalid Id"); 
    }
});
//update recipe
router.put("/:id",validateNotification,async(req,res)=>{
    try{
    let notification = await Notification.findById(req.params.id); 
    if(!notification) return status(400).send ("Given ID does not exist"); 
    notification.time = req.body.time; 
    notification.date = req.body.date; 
    notification.uid = req.body.uid;
    await notification.save(); 
    return res.send(notification);
    }
    catch(err){
        return res.status(400).send("Invalid Id"); 
    }
});
// delete a record
router.delete("/:id",async(req,res)=>{
    let notification = await Notification.findByIdAndDelete(req.params.id); 
    return res.send(notification);
});
// insert a record
router.post("/",validateNotification,async(req,res)=>{
    console.log(req.body.time)
    let notification = await new Notification(); 
    notification.time = req.body.time; 
    notification.date = req.body.date; 
    notification.uid = req.body.uid;
    await notification.save(); 
    
    return res.send(notification);
});
module.exports = router;  