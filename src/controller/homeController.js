import userService from '../service/userService'


const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = (req, res) => {
    //model => get data from database
    return res.render("user.ejs");
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    // console.log(">>> Check hash Password ", hashPassword);
    // let check = bcrypt.compareSync(password, hashPassword); //true
    // console.log(">>> Check pass : ", check);

    // userService.createNewUser(email, password, username)
    userService.getUserList();
    return res.send("handleCreateNewUser");
}
module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser
}