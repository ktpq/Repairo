const roomService = require('../services/roomService')

exports.getAllRoomInDorm = async (req, res) => {
    const { dorm_id } = req.params
    try {
        const allRoom = await roomService.getAllRoomInDorm(dorm_id);
        return res.json({
            message: "Get all room in dorm successfull",
            allRoom
        })
    } catch (error) {
        return res.json({
            error: error.message
        })
    }
}

exports.changeRoomAccessCode = async (req, res) => {
    const { dorm_id } = req.params;
    try {
        const result = await roomService.changeRoomAccessCode(dorm_id, req.body);
        return res.json({
            message: "Change room access code successfully",
            result
        })
    } catch (error){
        return res.json({
            error: error.message
        })
    }
}

exports.deleteUserInRoom = async (req, res) => {
    const room_id = req.body.room_id;
    const dorm_id  = req.params.dorm_id;
    const user_id = req.user.user_id;
    try{
        const result = await roomService.deleteUserInRoom(dorm_id, room_id, user_id);
        return res.json({
            message: "Delete user in room successfully",
            result
        })
    } catch(error){
        return res.json({
            error: error.message
        })
    }
}