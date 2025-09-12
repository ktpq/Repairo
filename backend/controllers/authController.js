const authService = require('../services/authService')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) =>{
    try{
        const newUserRegister = await authService.registerUser(req.body)
        res.json({
            message: "Register success",
            newUserRegister
        })
        
    } catch (error){
        res.json({
            message: "Register failed",
            error
        })
    }
}

exports.login = async (req, res) =>{
    try{
        const user = await authService.getUserByEmail(req.body)

        // เช็คว่าเจอผู้ใช้มั้ย
        if (!user){
            return res.json({
                message: "ไม่พบผู้ใช้ในระบบ"
            })
        }
        
        // เจอผู้ใช้ แต่เช็คว่า password ตรงมั้ย
        const plainPassword = req.body.password
        const match = await bcrypt.compare(plainPassword, user.password)
        if (!match){
            return res.json({
                message: "รหัสผ่านไม่ถูกต้อง",
            })
        }

        const token = jwt.sign({user_id: user.id}, process.env.JWT_SECRET, {
            expiresIn: "1d"
        })

        res.cookie("authToken", token, {
            httpOnly: true,
            maxAge: 24*60*60*1000,
            sameSite: "strict"
        })

        return res.json({
            message: "เข้าสู่ระบบสำเร็จ",
            path: "/"
        })


    } catch (error){
        res.json({
            message: "Login failed",
            error
        })
    }
}

exports.logout = async (req, res) =>{
    try{
        res.clearCookie("authToken", {
            httpOnly: true,
            sameSite: "strict",
            path: "/"
        })
        res.json({
            message: "Logout สำเร็จ"
        })
    } catch (error){
        res.json({
            message: "Logout ไม่สำเร็จ",
            error
        })
    }
}
