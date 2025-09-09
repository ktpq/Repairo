const prisma = require('../prisma/prisma')

exports.createUser = async (data) => {
    return await prisma.User.create({
        data: data
    })
}