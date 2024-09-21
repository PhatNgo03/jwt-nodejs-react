import userApiService from '../service/userApiService';
import roleApiService from '../service/roleApiService'
const readFunc = async (req, res) => {
    try {
        // if (req.query.page && req.query.limit) {
        //     let page = req.query.page;
        //     let limit = req.query.limit;

        //     let data = await userApiService.getUserWithPagination(+page, +limit);
        //     return res.status(200).json({
        //         EM: data.EM,
        //         EC: data.EC,
        //         DT: data.DT
        //     })
        // }
        // else {
        let data = await roleApiService.getAllRoles();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    }

    // }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', //erorr code
            DT: '',//data
        })
    }
}
const createFunc = async (req, res) => {
    try {
        let data = await roleApiService.createNewRoles(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', //erorr code
            DT: '',//data
        })
    }
}

const updateFunc = async (req, res) => {
    try {
        let data = await userApiService.updateUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', //erorr code
            DT: '',//data
        })
    }
}
const deleteFunc = async (req, res) => {
    try {
        let data = await roleApiService.deleteRole(req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', //erorr code
            DT: '',//data
        })
    }
}
const getRoleByGroup = async (req, res) => {
    try {
        let id = req.params.groupId;
        let data = await roleApiService.getRoleByGroup(id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', //erorr code
            DT: '',//data
        })
    }
}

const assignRoleToGroup = async (req, res) => {
    try {
        let data = await roleApiService.assignRoleToGroup(req.body.data);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', //erorr code
            DT: '',//data
        })
    }
}
module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc, getRoleByGroup, assignRoleToGroup
}