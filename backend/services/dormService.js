const prisma = require('../prisma/prisma')

exports.getDormByUserId = (user_id) => {
    return `this is get dorm by user_id : ${user_id}`
}

exports.createDorm = async (data, user_id) =>{
    // return await prisma.dorm.create({
    //     data:{
    //         dorm_name: data.dorm_name,
    //         line_id: data.dorm_line,
    //         map_url: data.dorm_mapurl,
    //         owner_id: user_id
    //     }
    // })
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

        return { newDorm, newDormRole };
    })
    return result;
}

