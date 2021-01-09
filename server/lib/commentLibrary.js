const create_dao = require('../models/dao/create_dao');
const read_dao = require('../models/dao/read_dao');

const { Comment } = require('../models/Comment');
const { User } = require('../models/User');
const update_dao = require('../models/dao/update_dao');


//Create
async function createComment(save) {
    try {
        result = await create_dao.saveObject(save, Comment)
        result = await read_dao.population(result, User, "userId")
        return ({ success: true, data: result })
    } catch(error) {
        throw error
    }
}


//Read
async function readComments(prodId, noticeId) {
    let variable = {}
    if (prodId) { variable = { prodId: prodId } }
    if (noticeId) { variable = { noticeId: noticeId } }

    try {
        result = await read_dao.findList(variable, Comment)
        result = await read_dao.population(result, User, "userId")
        return ({ success: true, data: result })
    } catch(error) {
        throw error
    }
}


//Update
async function updateComment(commentId, content) {
    const variable = { _id: commentId }
    const update = { content: content, modified: true }

    result = await update_dao.findAndUpate(variable, update, Comment)
    return ({ success: true, data: result })
}


//Delete
async function deleteComment(commentId) {
    const variable = { _id: commentId }
    const update = { deleted: true }

    result = await update_dao.findAndUpate(variable, update, Comment)
    return ({ success: true, data: result })
}


module.exports = {
    createComment,
    readComments,
    updateComment,
    deleteComment
}