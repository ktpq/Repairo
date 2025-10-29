const { start } = require('repl')
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

exports.createRequest = async (dorm_id, room_id, user_id, data, imagePath) =>{
    const oriDate = data.request_date
    const isoDate = new Date(oriDate.replace(" ", "T"));

    return await prisma.request.create({
        data: {
            user_id: Number(user_id),
            topic: data.topic,
            description: data.description,
            phone: data.phone,
            request_date: isoDate,
            status: "pending",
            dorm_id: Number(dorm_id),
            room_id: Number(room_id),   
            image_url: imagePath
        }
    })
}

exports.updateRequest = async (id, data, imagePath) => {
    const oriDate = data.request_date
    const isoDate = new Date(oriDate.replace(" ", "T"));

    return await prisma.request.update({
        where: {
            id: Number(id)
        },
        data: {
            topic: data.topic,
            description: data.description,
            phone: data.phone,
            request_date: isoDate,
            image_url: imagePath
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
        },
        orderBy: {
            request_date: "asc"
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

exports.getRequestById = async (id) => {
    return await prisma.request.findUnique({
        where: {
        id: Number(id),
        },
        include: {
        technician: {
            select: {
            first_name: true,
            last_name: true,
            },
        },
        dorm: {
            select: {
            dorm_name: true,
            },
        },
        user: {
            select: {
                first_name: true,
                last_name: true
            }
        }
        },
    });
};


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

exports.cancelRequest = async (id) => {
    return await prisma.request.update({
        where: {
            id: Number(id)
        },
        data: {
            status: "canceled"
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

exports.getNoTechRequest = async (dorm_id) => {
    return await prisma.request.findMany({
        where: {
            dorm_id: Number(dorm_id),
            technician_id: null
        }
    })
}

exports.acceptRequest = async (id, user_id) => {
    return await prisma.request.update({
        where: {
            id: Number(id)
        },
        data: {
            technician_id: Number(user_id),
            status: "in_progress"
        }
    });
}

exports.getIncompleteRequestForTechnician = async (dorm_id, user_id) => {
    return await prisma.request.findMany({
        where: {
            dorm_id: Number(dorm_id),
            technician_id: Number(user_id),
            status : "in_progress"
        }
    })
}

exports.getCompleteRequestForTechnician = async (dorm_id, user_id) => {
    return await prisma.request.findMany({
        where: {
            dorm_id: Number(dorm_id),
            technician_id: Number(user_id),
            status : "completed"
        }
    })
}

exports.getDashboardStatus = async (dorm_id) => {
    const result = await prisma.$transaction(async (prisma) => {
        const total_report = await prisma.request.count({
            where: {
                dorm_id: Number(dorm_id)
            }
        })
        
        // report ในเดือนนี้
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0,0,0,0)

        const endOfMonth = new Date(startOfMonth)
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);

        const total_report_thismonth = await prisma.request.count({
        where: {
                dorm_id: Number(dorm_id),
                    createdAt: {
                    gte: startOfMonth,
                    lt: endOfMonth,
                    },
            },
        });
        const pending_report = await prisma.request.count({
            where: {
                status: "pending",
                dorm_id: Number(dorm_id)
            }
        })

        const inprogress_report = await prisma.request.count({
            where: {
                status: "in_progress",
                dorm_id: Number(dorm_id)
            }
        })

        const completed_report = await prisma.request.count({
            where: {
                status: "completed",
                dorm_id: Number(dorm_id)
            }
        })

        const canceld_report = await prisma.request.count({
            where: {
                status: "canceled",
                dorm_id: Number(dorm_id)
            }
        })

        const dorm = await prisma.dorm.findUnique({
            where: {
                id: Number(dorm_id)
            }
        })

        const allReport = pending_report + inprogress_report + completed_report + canceld_report
        const success_rate = ((completed_report * 100) / allReport).toFixed(2)
        return { total_report, total_report_thismonth, pending_report, inprogress_report, completed_report, canceld_report, success_rate, dorm }
    })
    return result
    
}

exports.submitRequest = async (id, image_path) => {
    return await prisma.request.update({
        where: {
            id: Number(id)
        },
        data: {
            submit_image_url: image_path,
            status: "completed"
        }
    })
}
