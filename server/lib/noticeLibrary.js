const create_dao = require('../models/dao/create_dao');
const read_dao = require('../models/dao/read_dao');
const delete_dao = require('../models/dao/delete_dao');
const update_dao = require('../models/dao/update_dao');
const moment = require('moment')

const { Notice } = require('../models/Notice');
const { Comment } = require('../models/Comment');
const { User } = require('../models/User');

//Create
async function createNotice(save) {
    return await create_dao.saveObject(save, Notice)
}


//Read
async function readNotices(page) {
    const pipeline = [
        { $sort: { 'createdAt': -1 } },
        { $skip: 8 * page },
        { $limit: 8 },
        { $lookup: { from: 'comments', localField: '_id', foreignField: 'noticeId', as: 'comment' } }
    ]
    const result = await read_dao.findWithAggregate(pipeline, Notice)
    return await read_dao.population(result, User, "userId")
}

async function readNoticeInfo(noticeId) {
    const variable = { _id: noticeId }

    try {
        result = await read_dao.findOne(variable, Notice)
        return await read_dao.population(result, User, "userId")
    } catch (error) {
        throw error
    }
}


async function readMainNotice() {
    const limitDate = moment().subtract(1, 'd').toISOString
    const pipeline = [
        { $match: { 'createdAt': { $gt: limitDate } } },
        { $sort: { 'createdAt': -1 } },
    ]
    const result = await read_dao.findWithAggregate(pipeline, Notice)
    return await read_dao.population(result, User, "userId")
}

//Update
async function updateNotice(noticeId, update) {
    const variable = { _id: noticeId }
    return await update_dao.findAndUpate(variable, update, Notice)
}


//Delete
async function deleteNotice(noticeId) {
    const variable = { _id: noticeId }
    try {
        return await Promise.all([
            delete_dao.findOneAndDelete(variable, Notice),
            delete_dao.findAndDelete({ noticeId: noticeId }, Comment)
    ])} catch (error) {
        throw error
    }
}

module.exports = {
    createNotice,
    readNotices,
    readNoticeInfo,
    readMainNotice,
    updateNotice,
    deleteNotice
}