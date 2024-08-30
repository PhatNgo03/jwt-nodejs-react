import userService from '../service/userService'


const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {
    //model => get data from database

    let userList = await userService.getUserList();
    await userService.deleteUser(4);
    return res.render("user.ejs", { userList });
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    // console.log(">>> Check hash Password ", hashPassword);
    // let check = bcrypt.compareSync(password, hashPassword); //true
    // console.log(">>> Check pass : ", check);

    userService.createNewUser(email, password, username)
    return res.redirect("/user");
}

const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect("/user");
}
module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser
}