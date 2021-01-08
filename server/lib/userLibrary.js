const create_dao = require('../models/dao/create_dao');
const read_dao = require('../models/dao/read_dao');
const update_dao = require('../models/dao/update_dao');
const ejs = require('ejs')
const config = require('../config/key')
const path = require('path');
var appDir = path.dirname(require.main.filename);

const { User } = require('../models/User');

async function createUser(save) {
    return await create_dao.saveObject(save, User)
}

async function checkDuplication(id, email) {
    let variable = {}
    if (id) { variable = { name: id } }
    if (email) { variable = { email: email } }

    try {
        const result = await read_dao.findList(variable, User)
        console.log(result)
        if (result.length > 0) return ('false')
        if (result.length == 0) return ('success')
    } catch (error) {
        throw error
    }
}

async function createAuthCode(userId) {
    const variable = { _id: userId }
    try {
        const user = await read_dao.findOne(variable, User)
        const authNum = Math.random().toString().substr(2,6);
        let emailTemplete;
        ejs.renderFile(appDir+'/template/authMail.ejs', {authCode : authNum}, function (err, data) {
        if(err) throw err
        emailTemplete = data;
        });
        const transporter = config.transporter
        await transporter.sendMail({
            from: `지덕체 어드민`,
            to: user.email,
            subject: '회원가입을 위한 인증번호를 입력해주세요.',
            html: emailTemplete,
        });
        transporter.close()
        const update = { authCode: authNum }
        await update_dao.findAndUpate(variable, update, User)
    } catch (error) {
        throw error
    }
}

async function readUserInfo(userId) {
    const variable = { _id: userId }
    return await read_dao.findOne(variable, User)
}

async function emailAuth(userId, authCode) {
    const variable = { _id: userId }

    try {
        user = await read_dao.findOne(variable, User)
        if (user.authCode == authCode) {
            const update = { level: 2 }
            await update_dao.findAndUpate(variable, update, User)
            return { auth: true }
        } else {
            return { auth: false }
        }
    } catch (error) {
        throw error
    }
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
    checkDuplication,
    createAuthCode,
    readUserInfo,
    emailAuth,
    setAdmin,
    doLogin,
    doLogout
}