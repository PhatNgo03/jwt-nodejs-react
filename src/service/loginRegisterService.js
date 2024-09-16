require('dotenv').config();
import bcrypt from 'bcryptjs';
import db from '../models/index'
import { Op } from 'sequelize'
const salt = bcrypt.genSaltSync(10);
import { getGroupWithRoles } from "./JWTService";
import { createJWT } from "../middleware/JWTAction";
//hash user password
const hashUserPassword = (userPassword) => {
    if (!userPassword) {
        throw new Error("Password cannot be undefined or null.");
    }
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })
    if (user) {
        return true;
    }
    return false;
}

const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (user) {
        return true;
    }
    return false;
}
const registerNewUser = async (rawUserData) => {
    try {

        console.log(">> Check email", isEmailExist);
        let isEmailExist = await checkEmailExist(rawUserData.email);

        if (isEmailExist == true) {
            return {
                EM: 'The email is already existed',
                EC: 1,
            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist == true) {
            return {
                EM: 'The phone is already existed',
                EC: 1
            }
        }

        // hash user passoword
        let hashPassword = hashUserPassword(rawUserData.password);


        //create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone,
            groupId: 4
        })
        return {

            EM: "A user is created Successfully",
            EC: 0
        }
    }
    catch (e) {
        console.log(">>> Check erorr", e);
        return {
            EM: "Something wrongs in service..",
            EC: -2
        }
    }
}

const checkPassword = (inputPassword, hashPassword) => {

    return bcrypt.compareSync(inputPassword, hashPassword); // true or false
}

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        })
        if (user) {
            let isCorrectPassword = checkPassword(rawData.password, user.password);
            if (isCorrectPassword === true) {

                let groupWithRoles = await getGroupWithRoles(user);
                let payload = {
                    email: user.email,
                    groupWithRoles,
                    expiresIn: process.env.JWT_EXPIRES_IN
                }
                let token = createJWT(payload);
                return {
                    EM: 'Ok',
                    EC: 0,
                    DT: {
                        access_token: token,
                        data: groupWithRoles
                    }
                }
            }
        }

        return {
            EM: 'Your email or phone number or password is incorrect',
            EC: 1,
            DT: '',
        }
    }
    catch (e) {
        console.log(">>> Check erorr", e);
        console.log("Login Data:", rawData);
        return {
            EM: "Something wrongs in service..",
            EC: -2
        }
    }
}
module.exports = {
    registerNewUser, handleUserLogin, hashUserPassword, checkEmailExist, checkPhoneExist
}