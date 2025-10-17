const jwt = require('jsonwebtoken')
const prisma = require('../prisma/prisma')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')  // โฟลเดอร์นี้ต้องสร้างไว้ล่วงหน้า
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

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

        // 1. เช็คว่าเป็นผู้เช่ามั้ย
        const isTenant = await prisma.room.findFirst({
            where: {
                user_id: Number(user_id),
                dorm_id: Number(dorm_id),
                id: Number(room_id)
            }
        })
        
        if (isTenant){
            console.log("คุณเป็นผู้เช่าของหอ")
            return next()
        }
        
        // เช็คว่าเป็น admin หรือ ช่างมั้ย
        const userRole = await prisma.userDormRole.findFirst({
            where: {
                user_id: Number(user_id),
                dorm_id: Number(dorm_id),
                role: { in: ["Owner", "Technician"] }
            }
        });

        if (userRole) {
            console.log("คุณเป็น technician ของหอ");
            return next();
        }

        // ถ้าไม่ตรงเงื่อนไขใดเลย
        return res.json({
            message: "คุณไม่มีสิทธิ์เข้าถึงหอนี้"
        });

        
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

const isTechnicianInDorm = async (req, res, next) => {

    const user_id = req.user.user_id;
    const dorm_id = req.params.dorm_id;

    const userRole = await prisma.userDormRole.findFirst({
            where: {
                user_id: Number(user_id),
                dorm_id: Number(dorm_id),
                role: { in: ["Owner", "Technician"] }
            }
        });

        if (userRole) {
            console.log("คุณเป็น technician ของหอ");
            return next();
        }

        return res.json({
            message: "คุณไม่ได้เป็น technician ของหอนี้"
        })
}

module.exports = {
    authenticateToken,
    authorizeDormAccess,
    isAdminInDorm,
    isTechnicianInDorm,
    upload
}