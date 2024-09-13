import db from '../models/index';

const getGroups = async () => {
    try {
        let data = await db.Group.findAll({
            order: [
                ['name', 'ASC']
            ],
            attributes: ["id", "name", "description"],

        })
        return {
            EM: "get group sucessfully!",
            EC: 0,
            DT: data,
        }
    }
    catch (err) {
        console.log(err);
        return {
            EM: "error from service",
            EC: -2,
            DT: [],
        }
    }
}

module.exports = {
    getGroups
}