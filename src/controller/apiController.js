import loginRegisterService from '../service/loginRegisterService'

const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api'
    })
}
const handleRegister = async (req, res) => {
    try {
        //req.body : email, phone, username, password
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required parameters', // error message
                EC: '1', //erorr code
                DT: '',//data
            })
        }
        if (!req.body.passoword && req.body.password.length < 6) {
            return res.status(200).json({
                EM: 'Your password must have more than 6 letters', // error message
                EC: '1', //erorr code
                DT: '',//data
            })
        }

        //service : create user
        let data = await loginRegisterService.registerNewUser(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: '',
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', //erorr code
            DT: '',//data
        })
    }
    console.log("CHeckk call me", req.body)
}

const handleLogin = async (req, res) => {
    try {

        let data = await loginRegisterService.handleUserLogin(req.body);
        if (data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        }
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, //erorr code
            DT: data.DT,//data  
        })
    }
    catch (e) {
        console.log("Check erorr server", e);
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', //erorr code
            DT: '',//data
        })
    }

}

const handleLogout = async (req, res) => {
    try {
        res.clearCookie('jwt')
        return res.status(200).json({
            EM: 'Clear cookies success',
            EC: 0,
            DT: '',
        });
    } catch (e) {
        console.log("Error during logout:", e);
        return res.status(500).json({
            EM: 'Error from server',
            EC: -1,
            DT: '',
        });
    }
};

module.exports = {
    testApi, handleRegister, handleLogin, handleLogout
}