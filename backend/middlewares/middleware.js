const jwt = require('jsonwebtoken')
const prisma = require('../prisma/prisma')

const authenticateToken = (req, res, next) => {
    const token = req.cookies.authToken;

    // ถ้าไม่มี token
    if (!token){
        return res.json({
            message: "กรุณาเข้าสู่ระบบ"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch(error){
        res.json({
            message: "token หมดอายุเเล้ว หรือ ไม่ถูกต้อง",
            error
        })
    }
}

const authorizeDormAccess = async (req, res, next) =>{
    const user_id = req.user.user_id
    const { dorm_id, room_id } = req.params
    try{
        const hasAccess = await prisma.room.findFirst({
            where: {
                user_id: Number(user_id),
                dorm_id: Number(dorm_id),
                id: Number(room_id)
            }
        })
        
        if (!hasAccess){
            return res.json({
                message: "คุณไม่มีสิทธิ์เข้าถึงหอและห้องนี้"
            })
        }

        console.log("คุณมีสิทธิ์")
        next();
    } catch (error){
        res.json({
            "error": error.message
        })
    }
}

const isAdminInDorm = async (req, res, next) => {
    try {
        const user_id = req.user.user_id;
        const dorm_id = Number(req.params.dorm_id);

        const userRole = await prisma.userDormRole.findFirst({
            where: {
                user_id: Number(user_id),
                dorm_id: Number(dorm_id)
            }
        })

        if (!userRole){
            return res.json({
                message: "คุณไม่ได้อยู่ในหอนี้"
            })
        }

        if (userRole.role !== 'Owner' && userRole.role !== 'Technician'){
            return res.json({
                message: "แกไม่มีสิทธิ์"
            })
        }

        next();
    } catch (error){
        return res.json({
            error: error.message
        })
    }
}

module.exports = {
    authenticateToken,
    authorizeDormAccess,
    isAdminInDorm
}