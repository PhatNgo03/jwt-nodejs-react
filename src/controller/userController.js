import userApiService from '../service/userApiService';

const readFunc = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;

            let data = await userApiService.getUserWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
        else {
            let data = await userApiService.getAllUser();
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }

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
const createFunc = (req, res) => {
    try {


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
const updateFunc = (req, res) => {
    try {


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
const deleteFunc = (req, res) => {
    try {


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
    readFunc, createFunc, updateFunc, deleteFunc
}