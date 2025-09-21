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