import bcrypt from 'bcryptjs';

import mysql from 'mysql2/promise';

import bluebird from 'bluebird';

import db from '../models/index'

const salt = bcrypt.genSaltSync(10);


//bam mk user
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);

    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPass
        })
    }
    catch (err) {
        console.log(">>> Check error: ", err);
    }

}

const getUserList = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    try {
        const [rows, fields] = await connection.execute('select * from user');
        return rows;
    }
    catch (err) {
        console.log("Check error", err);
    }
}

const deleteUser = async (id) => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    try {
        const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?', [id]);
        return rows;
    }
    catch (err) {
        console.log("Check error", err);
    }
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id=?', [id]);
        return rows;
    }
    catch (err) {
        console.log("Check error", err);
    }
}
const updateUserInfo = async (email, username, id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    try {
        const [rows, fields] = await connection.execute('UPDATE user SET email = ?, username= ? WHERE id = ?',
            [email, username, id]);
        return rows;
    }
    catch (err) {
        console.log("Check error", err);
    }
}
module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfo
}