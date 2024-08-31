import bcrypt from 'bcryptjs';

import mysql from 'mysql2/promise';

import bluebird from 'bluebird';


const salt = bcrypt.genSaltSync(10);


//bam mk user
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    try {
        const [rows, fields] =
            await connection.execute('INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
                [email, hashPass, username]);
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
        const [rows, fields] = await connection.execute('select * from users');
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
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id=?', [id]);
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
        const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id=?', [id]);
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
        const [rows, fields] = await connection.execute('UPDATE users SET email = ?, username= ? WHERE id = ?',
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