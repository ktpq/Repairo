const { hash } = require('crypto')
const prisma = require('../prisma/prisma')
const bcrypt = require('bcrypt')

exports.registerUser = async (data) =>{
    const { first_name, last_name, email, password } = data
    const hashPassword = await bcrypt.hash(data.password, 10)
    return await prisma.user.create({
        data:{
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashPassword
        }
    })
}

exports.getUserByEmail = async (data) =>{
    const { email } = data
    return await prisma.user.findUnique({
        where: {
            email: email
        }
    })
}