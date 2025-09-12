const prisma = require('../prisma/prisma')

exports.getDormByUserId = (user_id) => {
    return `this is get dorm by user_id : ${user_id}`
}

exports.createDorm = async (data, user_id) =>{
    return await prisma.dorm.create({
        data:{
            dorm_name: data.dorm_name,
            line_id: data.dorm_line,
            map_url: data.dorm_mapurl,
            owner_id: user_id
        }
    })
    // return data.dorm_name
}

