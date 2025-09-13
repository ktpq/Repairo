
const dormService = require("../services/dormService")

exports.getDormByUserId = async (req, res) =>{
    try{
        const user_id = req.user.user_id
        const allRoomWithDorm = await dormService.getDormByUserId(user_id);
        return res.json({
            allRoomWithDorm
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
        const { newDorm, newDormRole, newDormRooms } = await dormService.createDorm(req.body, user_id);
        res.json({newDorm, newDormRole, newDormRooms})
    } catch (error){
        res.json({
            message: "ไม่สามารถสร้างหอพักได้",
            "error": error.message
        })
    }
}

exports.joinDormAsTenant = async (req, res) =>{
    try{
        const user_id = req.user.user_id
        // ส่ง access code ไป
        const room = await dormService.isDormRoomExist(req.body)
        //  ไม่มีห้องนี้ในฐานข้อมูล
        if (!room){
            return res.json({
                messaege: "ไม่พบห้อง"
            })
        }

        // เช็คว่าห้องว่างมั้ย
        if (room.user_id !== null){
            return res.json({
                message: "ห้องนี้มีคนอาศัยอยู่เเล้ว"
            })
        }
        const result = await dormService.joinDormAsTenant(req.body, user_id, room);
        res.json({
            result
        })
    } catch (error){
        res.json({
            message: "เกิดข้อผิดพลาดในการเข้าร่วมหอพัก",
            "error": error.message
        })
    }
}