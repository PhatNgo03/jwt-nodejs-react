import bcrypt from 'bcryptjs';
import db from '../models/index'
import { Op } from 'sequelize'
const salt = bcrypt.genSaltSync(10);

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
        })
        return {

            EM: "A user is created Successfully",
            EC: 0
        }
    }
    catch (e) {
        console.log(">>> Check erorr", e);
        console.log("User Data:", rawUserData);
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
        console.log(">>Check user :", user.get({ plain: true }))

        if (user) {
            console.log(">>> found user with email/phone")
            let isCorrectPassword = checkPassword(rawData.password, user.password);
            if (isCorrectPassword === true) {
                return {
                    EM: 'Ok',
                    EC: 0,
                    DT: ''
                }
            }
        }

        console.log(">>> Not found user with email/phone", rawData.valueLogin, "password", rawData.password);
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
    registerNewUser, handleUserLogin
}