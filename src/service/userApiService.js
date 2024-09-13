import db from '../models/index';
import { checkEmailExist, checkPhoneExist, hashUserPassword } from '../service/loginRegisterService'
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

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "username", "email", "phone", "sex", "address"],
            include: { model: db.Group, attributes: ["name", "description", "id"], },
            order: [
                ['id', 'DESC']
            ],
        })
        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }
        console.log(">>Check data ", data);
        return {
            EM: 'Pagination successfully',
            EC: 0,
            DT: data
        }
    }
    catch (err) {
        return {
            EM: 'Something wrongs with service',
            EC: -2,
            DT: []
        }
    }
}

const createNewUser = async (data) => {
    try {
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist == true) {
            return {
                EM: 'The email is already existed',
                EC: 1,
                DT: 'email'
            }
        }
        let isPhoneExist = await checkPhoneExist(data.phone);
        if (isPhoneExist == true) {
            return {
                EM: 'The phone is already existed',
                EC: 1,
                DT: 'phone'
            }
        }
        // hash user passoword
        let hashPassword = hashUserPassword(data.password);
        await db.User.create({ ...data, password: hashPassword });
        return {
            EM: "Create user ok",
            EC: 0,
            DT: []
        }

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
        let user = await db.User.findOne({
            where: { id: id }
        })
        if (user) {
            await user.destroy();
            return {
                EM: "Delete user successfully",
                EC: 0,
                DT: user,
            }
        }
        else {
            return {
                EM: "User  not exist",
                EC: 1,
                DT: [],
            }
        }
    }
    catch (err) {
        console.log("Error in deleteUser: ", err);
        return {
            EM: "Something went wrong in the service",
            EC: -2,
            DT: [],
        }
    }
}

module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser, getUserWithPagination
}