var express = require('express');
let router = express.Router();
let {users_token} = require("../../models/users_token");

const validateUser_token = require("../../middlewares/validateUser_token"); 

// router.post("/",validateUser_token,async(req,res)=>{
//     console.log("===========================================");
//             let userToken = await new users_token(); 
//             userToken.user = req.body.name; 
//             userToken.token = token; 
//             await userToken.save(); 
//             return res.send(userToken);
//         });
router.get("/",async(req,res, next)=>{
    //Pagination
    let page = Number(req.query.page ? req.query.page : 1);
    let perPage = Number(req.query.perPage? req.query.perPage : 10);
    let skipRecords = (perPage*(page-1));
    let userToken = await users_token.find().skip(skipRecords).limit(perPage);

    return res.send(userToken); 
});
        module.exports = router; 