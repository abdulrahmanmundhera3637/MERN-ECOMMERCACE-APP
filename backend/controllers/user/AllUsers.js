const userModel = require("../../models/userModel");

async function allUsersControllers(req,res){
    try{
     const allUsers = await userModel.find();

          res.json({
            message : "All Users",
            data : allUsers,
            error : false,
            success : true
          })
    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false
          });
    }
}

module.exports = allUsersControllers;
