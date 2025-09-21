const prisma = require('../prisma/prisma')

exports.getAllRequest = async (dorm_id) => {
    return await prisma.request.findMany({
        where: {
            dorm_id: Number(dorm_id)
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

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

exports.getRequestById = async (id) =>{
    return await prisma.request.findUnique({
        where: {
            id: Number(id)
        }
    })
}

exports.changeRequestStatus = async (data) => {
    return await prisma.request.update({
        where: {
            id: Number(data.id)
        },
        data: {
            status: data.status
        }
    })
}

exports.deleteRequestById = async (data) => {
    return await prisma.request.delete({
        where: {
            id: Number(data.id)
        }
    })
}