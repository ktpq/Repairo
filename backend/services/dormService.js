const prisma = require("../prisma/prisma");
const { generateAccessCodes, generateTechCode } = require("../access_code");

exports.getDormById = async (id) =>{
    return await prisma.dorm.findUnique({
        where:{
          id: Number(id)
        }
    })
}

exports.getDormByUserId = async (user_id) => {
    return await prisma.userDormRole.findMany({
      where: {
        user_id: Number(user_id),
        role: "Tenant"
      },
      include: {
        dorm: {
          select: {
            id: true,
            dorm_name: true,
            img_url: true
          }
        },
      }
    })
}

exports.getDormOwner = async (user_id) => {
  return await prisma.userDormRole.findMany({
    where: {
      user_id: Number(user_id),
      role: "Owner"
    },
    include: {
      dorm: {
        select: {
          id: true,
          dorm_name: true,
          img_url: true
        }
      }
    }
  })
}

exports.getDormTechnician = async (user_id) => {
  return await prisma.userDormRole.findMany({
    where: {
      user_id: Number(user_id),
      role: "Technician"
    },
    include: {
      dorm: {
        select: {
          dorm_name: true,
          map_url: true
        }
      }
    }
  })
}


exports.createDorm = async (data, user_id) => {
  const result = await prisma.$transaction(async (prisma) => {
    const newDorm = await prisma.dorm.create({
      data: {
        dorm_name: data.dorm_name,
        line_id: data.dorm_line,
        map_url: data.dorm_mapurl,
        owner_id: user_id,
        tech_code: generateTechCode(),
      },
    });

    const newDormRole = await prisma.userDormRole.create({
      data: {
        user_id: user_id,
        dorm_id: newDorm.id,
        role: "Owner",
      },
    });
    // console.log(data)
    const codes = generateAccessCodes(newDorm.id, data.dorm_room);

    const rooms = Array.from({ length: data.dorm_room }, (_, i) => ({
      dorm_id: newDorm.id,
      number: i + 1,
      access_code: codes[i],
    }));

    const newDormRooms = await prisma.room.createMany({
      data: rooms,
    });
    return { newDorm, newDormRole, newDormRooms };
  });
  return result;
};

exports.joinDormAsTenant = async (data, user_id, room) => {

  const result = await prisma.$transaction(async (prisma) => {
    const newTenant =  await prisma.room.update({
      where: {
        access_code: data.access_code
      },
      data: {
        user_id: user_id
      }
    })

    const newDormRole = await prisma.userDormRole.create({
          data:{
              user_id: user_id,
              dorm_id: room.dorm_id,
              role: "Tenant"  
          }
      })

      return { newTenant, newDormRole }
  })
  return result;
};

exports.isDormRoomExist = async (data) => {
  return await prisma.room.findUnique({
    where: {
      access_code: data.access_code,
    },
  });
};

exports.getDormByTechCode = async (tech_code) =>  {
  return await prisma.dorm.findUnique({
      where: {
        tech_code: tech_code
      }
  })
}

exports.joinDormAsTechnician = async (user_id, dorm) => {
    return await prisma.userDormRole.create({
        data: {
          user_id: Number(user_id),
          dorm_id: Number(dorm.id),
          role: "Technician"
        }
    })
}
