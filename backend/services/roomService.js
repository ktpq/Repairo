const prisma = require('../prisma/prisma')
// const { generateAccessCodes } = require('../access_code')


exports.getAllRoomInDorm = async (dorm_id) => {
    return await prisma.room.findMany({
        where: { 
            dorm_id: Number(dorm_id)
        },
        orderBy: {
            id: 'asc'
        }
    })
}

exports.changeRoomAccessCode = async (dorm_id, data) => {
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    const code = `${dorm_id}-${randomPart}`;
    const room_id = Number(data.room_id)
    return await prisma.room.update({
        where: {
            id:  room_id
        },
        data: {
            access_code: code
        }
    })
}

exports.deleteUserInRoom = async (dorm_id, room_id, user_id) => {

    
    
    const result = await prisma.$transaction(async (prisma) => {

        const room = await prisma.room.findUnique({
        where: {
                id: Number(room_id)
            }
        })

        const updateDormRole = await prisma.userDormRole.delete({
            where: {
                    user_id_dorm_id: {
                    user_id: room.user_id,
                    dorm_id: Number(dorm_id)
                }
            }
        })

        const updateRoom = await prisma.room.update({
            where: {
                id: Number(room_id)
            },
            data: {
                user_id: null
            }
        })

        
    
        return { updateRoom, updateDormRole }
    })

    return result;
}