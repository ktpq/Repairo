
const dormService = require("../services/dormService")

exports.getDormByUserId = async (req, res) =>{
    try{
        const user_id = req.user.user_id
        const allRoom = await dormService.getDormByUserId(user_id);
        res.json({
            allRoom
        })
    } catch (error){
        return res.json({
            message: "Cannot fetch dorm by userId (from token)",
            error
        })
    }
}

exports.createDorm = async (req, res) =>{
    try{
        const user_id = req.user.user_id
        const newDorm = await dormService.createDorm(req.body, user_id);
        // const newDormRole = await dormRoleService.createDormRole(newDorm.id, user_id)
        // res.json({
        //     newDormRole
        // })
        res.json({
            newDorm
        })
    } catch (error){
        res.json({
            message: "ไม่สามารถสร้างหอพักได้",
            error
        })
    }
}