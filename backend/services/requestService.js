const prisma = require('../prisma/prisma')

exports.createRequest = async (dorm_id, room_id, user_id, data) =>{
    return await prisma.request.create({
        data: {
            user_id: Number(user_id),
            topic: data.topic,
            description: data.description,
            phone: data.phone,
            request_date: data.request_date,
            status: "pending",
            dorm_id: Number(dorm_id),
            room_id: Number(room_id)
        }
    })
}

exports.getIncompleteRequest = async (dorm_id, room_id, user_id) =>{
    return await prisma.request.findMany({
        where: {
            dorm_id: Number(dorm_id),
            room_id: Number(room_id),
            user_id: Number(user_id),
            status: {
                not: "completed"
            }

        }
    })
}

exports.getCompleteRequest = async (dorm_id, room_id, user_id) =>{
    return await prisma.request.findMany({
        where: {
            dorm_id: Number(dorm_id),
            room_id: Number(room_id),
            user_id: Number(user_id),
            status: "completed"
        }
    })
}