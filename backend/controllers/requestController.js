const requestService = require('../services/requestService')

exports.getAllRequest = async (req, res) => {
    const { dorm_id } = req.params
    try {
        const allRequest = await requestService.getAllRequest(dorm_id)
        return res.json({
            message: "Get all request in dorm successfull",
            allRequest
        })
    } catch(error){
        res.json({
            error: error.message
        })
    }
}

exports.getRequestById = async (req, res) => {
    const { id, dorm_id, room_id } = req.params
    const user_id = req.user.user_id;
    try {
        const request = await requestService.getRequestById(id);
        res.json({
            message: "Get request by id successful",
            request
        })
    } catch (error){
        res.json({
            "error": error.message
        })
    }
}

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

exports.changeRequestStatus = async (req, res) => {
    try {
        const result = await requestService.changeRequestStatus(req.body);
        return res.json({
            message: "Change request status success",
            result
        })
    } catch (error){
        return res.json({
            error: error.message
        })
    }
}

exports.deleteRequestById = async (req, res) => {
    try {
        const result = await requestService.deleteRequestById(req.body);
        return res.json({
            message: "Delete request successfull",
            result
        })
    } catch (error){
        res.json({
            error: error.message
        })
    }
}

exports.getNoHandRequest = async (req, res) => {
    const dorm_id = req.params.dorm_id;
    try{
        const allRequest = await requestService.getNoHandRequest(dorm_id);
        return res.json({
            message: "Get nohand request successfully",
            allRequest
        })

    } catch (error) {
        return res.json({
            error: error.message
        })
    }
}

exports.handInRequest  = async (req, res) =>{
    const id = req.params.id;
    const user_id = req.user.user_id;
    try{
        const result = await requestService.handInRequest(id, user_id)
        return res.json({
            message: "Hand-in request successfully",
            result
        })
    } catch (error) {
        return res.json({
            error: error.message
        })
    }
}

exports.getIncompleteRequestForTechnician = async (req, res) => {
    const user_id = req.user.user_id;
    const dorm_id = req.params.dorm_id
    try {
        const allRequest = await requestService.getIncompleteRequestForTechnician(dorm_id, user_id)
        return res.json({
            message: "Get Incomplete request for technician successfully",
            allRequest
        })
    } catch (error) {
        return res.json({
            error: error.message
        })
    }
}

exports.getCompleteRequestForTechnician = async (req, res) => {
    const user_id = req.user.user_id;
    const dorm_id = req.params.dorm_id
    try {
        const allRequest = await requestService.getCompleteRequestForTechnician(dorm_id, user_id)
        return res.json({
            message: "Get Incomplete request for technician successfully",
            allRequest
        })
    } catch (error) {
        return res.json({
            error: error.message
        })
    }
}

exports.getDashboardStatus = async (req, res) => {
    const dorm_id = req.params.dorm_id;
    try {
        const result = await requestService.getDashboardStatus(dorm_id)
        return res.json({
            message: "Get dashboard status successfully",
            result
        })
    } catch (error){
        return res.json({
            error: error.message
        })
    }
}