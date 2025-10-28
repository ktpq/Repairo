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

exports.getRequestByIdTechnician = async (req, res) => {
    const { id, dorm_id } = req.params
    try{
        const request = await requestService.getRequestById(id)
        res.json({
            message: "Get request by id successful (technician)",
            request
        })
    } catch (error){
        res.json({
            error: error.message
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
    console.log(req.file)
    const imagePath = req.file ? req.file.path : null;

    try {
        const newRequest = await requestService.createRequest(dorm_id, room_id, user_id, data, imagePath);
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

exports.updateRequest = async (req, res) => {
    const { id, dorm_id, room_id } = req.params
    let imagePath;
    if (req.file){
        // ถ้าส่ง file มาให้ใช้อันใหม่
        imagePath = req.file ? req.file.path : null;
    } else {
        // ถ้าไม่ได้ส่งไฟล์มาให้ใช้อันเดิม
        const currentRequest = await requestService.getRequestById(id);
        imagePath = currentRequest.image_url
    }

    try{
        const result = await requestService.updateRequest(id, req.body, imagePath)
        return res.json({
            message: "Update request successfully",
            result
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

exports.getNoTechRequest = async (req, res) => {
    const dorm_id = req.params.dorm_id;
    try{
        const allRequest = await requestService.getNoTechRequest(dorm_id);
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

exports.acceptRequest  = async (req, res) =>{
    const id = req.params.id;
    const user_id = req.user.user_id;
    try{
        const result = await requestService.acceptRequest(id, user_id)
        return res.json({
            message: "Accept request successfully",
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
            message: "Get Complete request for technician successfully",
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

exports.submitRequest = async (req, res) => {
    const { id, dorm_id } = req.params;
    const image_path = req.file.path
    try {
        const result = await requestService.submitRequest(id, image_path)
        return res.json({
            message: "Submit request successfully", 
            result
        })
    } catch (error) {
        return res.json({
            error: error.message
        })
    }
}

exports.cancelRequest = async (req, res) => {
    const { id } = req.params
    try{
        const result = await requestService.cancelRequest(id)
        return res.json({
            message: "Cancel request successfully",
            result
        })
    } catch (error){
        res.json({
            error: error.message
        })
    }
}

