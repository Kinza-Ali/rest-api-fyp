var express = require('express');
let router = express.Router();
let {User} = require("../../models/user");
let {users_token} = require("../../models/users_token");
const validateUser_token = require("../../middlewares/validateUser_token"); 
var bcrypt = require ("bcryptjs"); //for password encryption

const _ = require("lodash"); //for underscore package to perform common task
const jwt = require("jsonwebtoken") // to acquire token when logged in
const config = require("config");
const { token } = require('morgan');
//post method for registration/signUp
router.post("/signUp",async(req,res)=>{
    //check for existing email
    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send("Email alreay exists");
    user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    await user.generateHashedPassword();
    await user.save();
    return res.send(_.pick(user,["name","email"]));
})
//for authentication of login
router.post("/login",async(req,res)=>{
        //check for existing email
        let user = await User.findOne({email:req.body.email});
        if(!user) return res.status(400).send("Email doesn't exist");
        let isValid = await bcrypt.compare(req.body.password,user.password);
        if(!isValid) return res.status(401).send("Invalid Password"); //password: 1234
        let token = jwt.sign({_id:user._id,name:user.name},config.get("jwtPrivateKey"));
        router.post("/",validateUser_token,async(req,res)=>{
    console.log("===========================================");
            let userToken = await new users_token(); 
            userToken.user = req.body.name; 
            userToken.token = token; 
            await userToken.save(); 
            return res.send(userToken);
        });
       
        res.send(token);
})

module.exports = router; 