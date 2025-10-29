const userService = require('../services/userService')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const prisma = require('../prisma/prisma')

exports.getCurrentLoginUser = async (req, res) =>{
    // const user_id = req.user.user_id;
    try {
        const token = req.cookies.authToken

        if (!token){
            return res.json({
                user: null,
                isLogin: false
            })
        }

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const user_id = decodedToken.user_id
        const user = await userService.getUserById(user_id);

        return res.json({
            user,
            isLogin: true
        })
        
    } catch (error){
        res.json({
            "error": error.message
        })
    }
}

exports.changePassword = async (req, res) => {
    const user_id = req.user.user_id
    const { old_password, new_password, confirm_password } = req.body
    try{
        const user = await userService.getUserById(user_id);

        // เช็คว่ามี user มั้ย
        if (!user){
            return res.json({
                message: "ไม่พบผู้ใช้"
            })
        }

        // เช็ค confirm password
        if (new_password !== confirm_password){
            return res.json({
                message: "รหัสผ่านใหม่หรือยืนยันรหัสผ่านไม่ตรงกัน"
            })
        }

        // เช็ค old password ว่าตรงกับ password ที่ hash ใน db มั้ย
        const isMatch = await bcrypt.compare(old_password, user.password)
        if (!isMatch) {
            return res.json({
                message: "รหัสผ่านเก่าไม่ถูกต้อง"
            })
        }

        // hash รหัสผ่านใหม่เเละเก็บลง db
        const hashPassword = await bcrypt.hash(new_password, 10);
        await userService.changePassword(user_id, hashPassword)
        return res.json({
            message: "เปลี่ยนรหัสผ่านสำเร็จ"
        })


        
    } catch (error){
        res.json({
            "error": error.message
        })
    }
}

exports.changeProfileInfo = async (req, res) =>{
    const user_id = req.user.user_id;
    let image_path;
    if (req.file){
        image_path = req.file.path
    } else {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(user_id)
            }
        })
        image_path = user.image_url
    }
    
    try{
        const newProfile = await userService.changeProfileInfo(user_id, req.body, image_path);
        return res.json({
            message: "Change name successfull",
            newProfile
        })
    } catch (error){
        res.json({
            error: error.message
        })
    }
}

exports.deleteTenantUser = async (req, res) => {
    const { id, dorm_id } = req.params;
    try{
        const result = await userService.deleteTenantUser(id, dorm_id);
        res.json({
            message: "Delete user successfully",
            result
        })
    } catch (error){
        res.json({
            error: error.message
        })
    }
}

exports.deleteTechnicianUser = async (req, res) => {
    const { id, dorm_id } = req.params;
    try{
        const result = await userService.deleteTechnicianUser(id, dorm_id);
        res.json({
            message: "Delete user successfully",
            result
        })
    } catch (error){
        res.json({
            error: error.message
        })
    }
}