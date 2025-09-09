const userService = require('../services/userService')

exports.createUser = async (req, res) =>{
    try{
        const newUser = await userService.createUser(req.body);
        res.json({
            message: "Create user successfully",
            newUser
        })
    } catch(error){
        res.json({
            message: "Create user failed",
            error
        })
    }
}
