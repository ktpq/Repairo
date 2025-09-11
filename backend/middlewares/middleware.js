const jwt = require('jsonwebtoken')

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

module.exports = authenticateToken;