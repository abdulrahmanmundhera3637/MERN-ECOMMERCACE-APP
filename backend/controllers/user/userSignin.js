const bycrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const jwt = require('jsonwebtoken');

async function userSignInController(req,res){
try{
const {email,password} = req.body;
if(!email){
    throw new Error("Please Provide Email");
 }
 if(!password){
    throw new Error("Please Provide Password");
 }

 const user = await userModel.findOne({email});
 if(!user){
    throw new Error("User not found");
 }

 const checkPassword = await bycrypt.compare(password, user.password);

 if(checkPassword){
    const tokenData = {
       _id : user._id,
       email : user.email,
    }
   const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
   const tokenOption = {
    httpOnly : true,
    secure : true
   }
   res.cookie("token",token,tokenOption).json({
    message : "Login Successfully",
    data : token,
    success : true,
    error : false,
   })
 }else{
    throw new Error("Wrong Password");
 }


}catch(err){
          res.json({
            message : err.message || err,
            error : true,
            success : false
          });
    }
}

module.exports = userSignInController;