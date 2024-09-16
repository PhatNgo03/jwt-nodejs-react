import bcrypt from 'bcryptjs';
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

    //Test relationships
    let newUser = await db.User.findOne({
        where: { id: 1 },
        attributes: ["id", "username", "email"],
        include: { model: db.Group, attributes: ["name", "description"], },
        raw: true,
        nest: true
    })


    let roles = await db.Role.findAll({
        include: { model: db.Group, where: { id: 1 } },
        raw: true,
        nest: 1
    })





    let users = [];
    users = await db.User.findAll();
    return users;

    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });
    // try {
    //     const [rows, fields] = await connection.execute('select * from user');
    //     return rows;
    // }
    // catch (err) {
    //     console.log("Check error", err);
    // }
}

const deleteUser = async (userId) => {

    await db.User.destroy({
        where: { id: userId }
    })
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });
    // try {
    //     const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?', [id]);
    //     return rows;
    // }
    // catch (err) {
    //     console.log("Check error", err);
    // }
}

const getUserById = async (id) => {
    let user = {};
    user = await db.User.findOne({
        where: { id: id }
    })
    return user.get({ plain: true })
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });
    // try {
    //     const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id=?', [id]);
    //     return rows;
    // }
    // catch (err) {
    //     console.log("Check error", err);
    // }
}
const updateUserInfo = async (email, username, id) => {

    await db.User.update(
        { email: email, username: username },
        { where: { id: id } }
    );
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });
    // try {
    //     const [rows, fields] = await connection.execute('UPDATE user SET email = ?, username= ? WHERE id = ?',
    //         [email, username, id]);
    //     return rows;
    // }
    // catch (err) {
    //     console.log("Check error", err);
    // }
}
module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfo
}