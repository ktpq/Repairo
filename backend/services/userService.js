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

exports.deleteTenantUser = async (id, dorm_id) => {
    const result = await prisma.$transaction(async (prisma) => {
        

        const updateDormRole = await prisma.userDormRole.delete({
            where: {
                user_id_dorm_id: {
                    user_id: Number(id),
                    dorm_id: Number(dorm_id)
                }
            }
        })

        const updateRoom = await prisma.room.updateMany({
            where: {
                user_id: Number(id),
                dorm_id: Number(dorm_id)
            },
            data: {
                user_id: null
            }
        })

        const deleteRequest = await prisma.request.deleteMany({
            where: {
                user_id: Number(id)
            }
        })

        

        return { deleteRequest, updateRoom, updateDormRole }
    })

    return result;
}

exports.deleteTechnicianUser = async (id, dorm_id) => {
    const result = await prisma.$transaction(async (prisma) => {
        const updateRequest = await prisma.request.updateMany({
            where: {
                dorm_id: Number(dorm_id),
                technician_id: Number(id)
            },
            data: {
                status: "pending",
                technician_id: null
            }
        })

        const updateDormRole = await prisma.userDormRole.deleteMany({
            where: {
                dorm_id: Number(dorm_id),
                user_id: Number(id),
                role: "Technician"
            }
        })

        return { updateRequest, updateDormRole }
    })
    return result
}