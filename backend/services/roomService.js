const prisma = require('../prisma/prisma')

exports.getAllRoomInDorm = async (dorm_id) => {
    return await prisma.room.findMany({
        where: { 
            dorm_id: Number(dorm_id)
        }
    })
}