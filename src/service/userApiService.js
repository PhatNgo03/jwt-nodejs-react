import { where } from 'sequelize/lib/sequelize';
import db from '../models/index';

const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"], },

        });
        if (users) {
            return {
                EM: 'get success data user',
                EC: 0,
                DT: users
            }
        }
        else {
            return {
                EM: 'get success data user',
                EC: 0,
                DT: []
            }
        }
    }
    catch (erorr) {
        console.log(erorr);
        return {
            EM: 'Something wrongs with service',
            EC: -2,
            DT: []
        }
    }
}

const createNewUser = async (data) => {
    try {
        await db.User.create({

        })
    }
    catch (err) {
        console.log(err);
    }
}

const updateUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if (user) {
            //update
            user.save({

            })
        }
        else {
            //not found
        }
    }
    catch (err) {
        console.log(err);
    }
}

const deleteUser = async (id) => {
    try {
        await db.User.delete({
            where: { id: id }
        })
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser
}