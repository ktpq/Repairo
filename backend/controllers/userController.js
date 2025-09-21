const userService = require('../services/userService')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.getCurrentLoginUser = async (req, res) =>{
    const user_id = req.user.user_id;
    try {
        const user = await userService.getUserById(user_id);
        return res.json({
            message: "Get user by id success",
            user
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

exports.changeName = async (req, res) =>{
    const user_id = req.user.user_id;
    try{
        const newName = await userService.changeName(user_id, req.body);
        return res.json({
            message: "Change name successfull",
            newName
        })
    } catch (error){
        res.json({
            error: error.message
        })
    }
}