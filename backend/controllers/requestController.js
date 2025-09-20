const requestService = require('../services/requestService')

exports.getIncompleteRequest = async (req, res) =>{
    const { dorm_id, room_id } = req.params
    const user_id = req.user.user_id
    try {
        const allRequest = await requestService.getIncompleteRequest(dorm_id, room_id, user_id);
        return res.json({
            message: "Get all incomplete request successful",
            allRequest
        })
    } catch (error){
        res.json({
            "error": error.message
        })
    }
}

exports.getCompleteRequest = async (req, res) => {
    const { dorm_id, room_id } = req.params
    const user_id = req.user.user_id
    try{
        const allRequest = await requestService.getCompleteRequest(dorm_id, room_id, user_id);
        return res.json({
            message: "Get all complete request successful",
            allRequest
        })
    } catch (error){
        res.json({
            "error": error.message
        })
    }
}

exports.createRequest =  async (req, res) =>{
    const { dorm_id, room_id } = req.params
    const user_id = req.user.user_id
    const data = req.body
    try {
        const newRequest = await requestService.createRequest(dorm_id, room_id, user_id, data);
        res.json({
            "message": "Create new request successful",
            newRequest
        })
    } catch (error){
        res.json({
            error: error.message
        })
    }
}