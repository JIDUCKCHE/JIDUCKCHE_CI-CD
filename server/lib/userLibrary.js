const create_dao = require('../models/dao/create_dao');
const read_dao = require('../models/dao/read_dao');
const update_dao = require('../models/dao/update_dao');

const { User } = require('../models/User');

async function createUser(save) {
    return await create_dao.saveObject(save, User)
}

async function readUserInfo(userId) {
    const variable = { _id: userId }
    return await read_dao.findOne(variable, User)
}

async function setAdmin(userId) {
    const variable = { _id: userId }
    const update = { isAdmin: true }
    return await update_dao.findAndUpate(variable, update, User)
}

async function doLogin(req) {
    const variable = { email: req.body.email }

    try {
        result = await read_dao.findOne(variable, User)
        if(!result) throw new Error("Auth failed, email not found")
        await result.comparePassword(req.body.password)
        return await result.generateToken(result)
    } catch(error) {
        console.log(error)
        throw error
    }
}

async function doLogout(userId) {
    const variable = { _id: userId }
    const update = { token: "" }

    return await update_dao.findAndUpate(variable, update, User)
}

module.exports = {
    createUser,
    readUserInfo,
    setAdmin,
    doLogin,
    doLogout
}