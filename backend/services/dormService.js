const prisma = require('../prisma/prisma')
const generateAccessCodes = require('../access_code')

exports.getDormByUserId = (user_id) => {
    return `this is get dorm by user_id : ${user_id}`
}

exports.joinDormByUserId = async (data, user_id) =>{
    return await prisma.room.update({
        where: {
            access_code: data.access_code
        },
        data: {
            user_id: user_id
        }
    })
}

exports.createDorm = async (data, user_id) =>{
    
    const result = await prisma.$transaction(async (prisma) => {
        const newDorm = await prisma.dorm.create({
            data: {
                dorm_name: data.dorm_name,
                line_id: data.dorm_line,
                map_url: data.dorm_mapurl,
                owner_id: user_id
            }
        })

        const newDormRole = await prisma.userDormRole.create({
            data:{
                user_id: user_id,
                dorm_id: newDorm.id,
                role: "Owner"
            }
        })
        // console.log(data)
        const codes = generateAccessCodes(newDorm.id, data.dorm_room);

        const rooms = Array.from({ length: data.dorm_room }, (_, i) => ({
            dorm_id: newDorm.id,
            number: i + 1,
            access_code: codes[i]
        }))

        const newDormRooms = await prisma.room.createMany({
            data: rooms
        })
        return { newDorm, newDormRole, newDormRooms };
    })
    return result;
}

exports.isDormRoomExist = async (data) =>{
    return await prisma.room.findUnique({
        where :{
            access_code: data.access_code
        }
    })
    // return `${user_id} join room by access code ${data.access_code}`
}

