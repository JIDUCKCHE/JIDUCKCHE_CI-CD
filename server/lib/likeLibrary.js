const create_dao = require('../models/dao/create_dao');
const read_dao = require('../models/dao/read_dao');
const delete_dao = require('../models/dao/delete_dao');

const { Like } = require('../models/Like');
const ObjectId = require('mongodb').ObjectID;


//Create
async function createLike(userId, prodId, commentId) {
    let variable = { }
    if (prodId) variable = { prodId: prodId, userId: userId }
    if (commentId) variable = { prodId: prodId, commentId: commentId, userId: userId }
    return await create_dao.saveObject(variable, Like)
}


//Read
async function readLikes(prodId, commentId) {
    let pipeline = [ ]
    if (prodId) {
        pipeline = [{ $match: {$and :[ { commentId: { $exists: false }}, { prodId: ObjectId(prodId) } ]}}]
    }
    if (commentId) {
        pipeline = [{ $match: { commentId: ObjectId(commentId) } }]
    }
    return await read_dao.findWithAggregate(pipeline, Like)
}


//Delete
async function deleteLike(userId, prodId, commentId) {
    let variable = { }
    if (prodId) variable = { prodId: prodId, userId: userId }
    if (commentId) variable = { commentId: commentId, userId: userId }
    return await delete_dao.findOneAndDelete(variable, Like)

}

module.exports = {
    createLike,
    readLikes,
    deleteLike
}