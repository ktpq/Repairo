const { hash } = require('crypto')
const prisma = require('../prisma/prisma')

exports.getUserById = async (user_id) => {
    return await prisma.user.findUnique({
        where:{
            id: Number(user_id)
        }
    })
}

exports.changePassword = async (user_id, hashPassword) => {
    return await prisma.user.update({
        where: {
            id: Number(user_id)
        },
        data: {
            password: hashPassword
        }
    })
}

exports.changeName = async (user_id, data, image_path) =>{
    return await prisma.user.update({
        where:{
            id: Number(user_id)
        },
        data:{
            first_name: data.first_name,
            last_name: data.last_name,
            image_url: image_path
        }
    })
}