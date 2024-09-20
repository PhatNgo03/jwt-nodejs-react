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


module.exports = {
    createNewRoles, getAllRoles, deleteRole
}