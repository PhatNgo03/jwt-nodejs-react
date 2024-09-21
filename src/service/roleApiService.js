import { where } from "sequelize/lib/sequelize";
import db from "../models"
const createNewRoles = async (roles) => {
    try {

        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        })

        const persits = roles.filter(({ url: url1 }) =>
            !currentRoles.some(({ url: url2 }) => url1 === url2))
        if (persits.length === 0) {
            return {
                EM: 'Nothing to create ...',
                EC: 0,
                DT: []
            };
        }

        await db.Role.bulkCreate(persits);
        return {
            EM: `Create role success: ${persits.length} roles...`,
            EC: 0,
            DT: []
        };
    }
    catch {
        console.log(err);
        return {
            EM: 'Something wrong with services',
            EC: -2,
            DT: []
        };
    }
}

const getAllRoles = async () => {
    try {
        let data = await db.Role.findAll({
            order: [
                ['id', 'DESC']
            ],
        })

        return {
            EM: `Get all role succeeds`,
            EC: 0,
            DT: data
        };
    }
    catch {
        console.log(err);
        return {
            EM: 'Something wrong with services',
            EC: -2,
            DT: []
        };
    }
}

const deleteRole = async (id) => {
    try {
        let role = await db.Role.findOne({
            where: { id: id }
        })
        if (role) {
            await role.destroy();
        }
        return {
            EM: `Delete Roles succeeds`,
            EC: 0,
            DT: []
        };
    }
    catch (err) {
        console.log(err);
        return {
            EM: 'Something wrong with services',
            EC: -2,
            DT: []
        };
    }
}

const getRoleByGroup = async (id) => {
    try {
        if (!id) {
            return {
                EM: `Not found any role`,
                EC: 0,
                DT: []
            };
        }
        let roles = await db.Group.findOne({
            where: { id: id },
            attributes: ["id", "name", "description"],
            include: {
                model: db.Role,
                attributes: ["id", "url", "description"],
                through: { attributes: [] }
            }
        })
        return {
            EM: `get role by group succeeds`,
            EC: 0,
            DT: roles
        };
    }
    catch (err) {
        console.log(err);
        return {
            EM: 'Something wrong with services',
            EC: -2,
            DT: []
        };
    }
}

const assignRoleToGroup = async (data) => {
    try {

        await db.Group_Role.destroy({
            where: { groupId: +data.groupId }
        })
        await db.Group_Role.bulkCreate(data.groupRoles, {
            fields: ['groupId', 'roleId']
        });
        return {
            EM: `Assgin Role to Group succees`,
            EC: 0,
            DT: []
        };
    }
    catch (err) {
        console.log(err);
        return {
            EM: 'Something wrong with services',
            EC: -2,
            DT: []
        };
    }
}

// const assignRoleToGroup = async (data) => {
//     try {
//         // Log dữ liệu đầu vào để kiểm tra
//         console.log("Data received for group role assignment:", data);

//         // Xóa các vai trò cũ dựa trên groupId
//         await db.Group_Role.destroy({
//             where: { groupId: +data.groupId }
//         });

//         // Kiểm tra và log dữ liệu trước khi tạo mới
//         if (data.groupRoles && data.groupRoles.length > 0) {
//             console.log("Data to bulkCreate:", data.groupRoles);

//             await db.Group_Role.bulkCreate(data.groupRoles);
//         } else {
//             console.log("No roles to assign, groupRoles is empty.");
//             return {
//                 EM: 'No roles to assign.',
//                 EC: 1,
//                 DT: []
//             };
//         }

//         return {
//             EM: `Assign Role to Group success`,
//             EC: 0,
//             DT: []
//         };
//     }
//     catch (err) {
//         console.log("Error in assignRoleToGroup:", err);
//         return {
//             EM: 'Something wrong with services',
//             EC: -2,
//             DT: []
//         };
//     }
// }

module.exports = {
    createNewRoles, getAllRoles, deleteRole, getRoleByGroup, assignRoleToGroup
}