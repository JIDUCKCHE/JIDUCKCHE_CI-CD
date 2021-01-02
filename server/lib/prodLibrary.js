const create_dao = require('../models/dao/create_dao');
const read_dao = require('../models/dao/read_dao');
const delete_dao = require('../models/dao/delete_dao');
const update_dao = require('../models/dao/update_dao');
const fs = require('fs')

const { Prod } = require('../models/Prod');
const { Like } = require('../models/Like');
const { User } = require('../models/User');
const { Artist } = require('../models/Artist');
const { Comment } = require('../models/Comment');
const fileLibrary = require('./fileLibrary');
const ObjectId = require('mongodb').ObjectID;


//Create
async function createProd(save, userId) {
    try {
        result = await create_dao.saveObject(save, Prod)
        const variable = { userId: userId, prodId: result._id }
        await create_dao.saveObject(variable, Like)
        return result
    } catch (error) {
        throw error
    }
}


//Read
//General(timeline)
async function readProds(startid, endid) {
    const startId = startid == 0 ? 0 : ObjectId(startid)
    const endId = endid == 0 ? 0 : ObjectId(endid)

    const pipeline = [
        { $sort: { 'createdAt': -1 } },
        { $match: { '_id': { $not:{ $gte: endId, $lte: startId } } } },
        { $limit: 8 },
        { $lookup: { from: 'comments', localField: '_id', foreignField: 'prodId', as: 'comment' } }
    ]
    const result = await read_dao.findWithAggregate(pipeline, Prod)
    return await read_dao.population(result, User, "userId")
}

async function readBestProds(page) {
    const pipeline = [
        { $match: { commentId: { $exists: false } } },
        { $group: { _id: "$prodId", countA: { $sum: 1 } } },
        { $sort: { 'countA': -1 } },
        { $limit: 8 * (page + 1) },
        { $lookup: { from: 'comments', localField: '_id', foreignField: 'prodId', as: 'comment' } }
    ]

    try {
        result = await read_dao.findWithAggregate(pipeline, Like)
        result = await read_dao.population(result, Prod, "_id")
        return await read_dao.population(result, User, "_id.userId")
    } catch(error) {
        throw error
    }
}

async function readProdInfo(prodId) {
    const variable = { _id: prodId }

    try {
        result = await read_dao.findOne(variable, Prod)
        result = await read_dao.population(result, User, "userId")
        return await read_dao.population(result, Artist, "artistId")
    } catch (error) {
        throw error
    }
}

async function readMyProds(userId) {
    const pipeline = [
        { $match: { userId: ObjectId(userId) }},
        { $limit: 8 },
        { $lookup: { from: 'comments', localField: '_id', foreignField: 'prodId', as: 'comment' } }
    ]
    return await read_dao.findWithAggregate(pipeline, Prod)
}


async function readAritstProds(artistId) {
    const pipeline = [
        { $match: { artistId: ObjectId(artistId) } },
        { $sort: { 'createdAt' : -1 } },
        { $lookup: { from: 'comments', localField: '_id', foreignField: 'prodId', as: 'comment' } }
    ]
    
    try {
        result = await read_dao.findWithAggregate(pipeline, Prod)
        return await read_dao.population(result, User, "userId")
    } catch (error) {
        throw error
    }
}

async function readMyLikeProds(userId) {
    const pipeline = [
        { $match: {$and :[{ commentId: { $exists: false }}, { userId: ObjectId(userId) }]} },
        { $limit: 8 },
        { $lookup: { from: 'comments', localField: 'prodId', foreignField: 'prodId', as: 'comment' } }
    ]
    try {
        result = await read_dao.findWithAggregate(pipeline, Like)
        return await read_dao.population(result, Prod, "prodId")
    } catch(error) {
        throw error
    }
}


//Update
async function updateProd(prodId, update) {
    const variable = { _id: prodId }
    return await update_dao.findAndUpate(variable, update, Prod)
}


//Delete
async function deleteProd(prodId, originName, preName) {
    const variable = { _id: prodId }
    try {
        return await Promise.all([
            fileLibrary.moveToTrash(originName, "prod", (err) => { throw (err) }),
            fileLibrary.moveToTrash(preName, "pre", (err) => { throw (err) }),
            delete_dao.findOneAndDelete(variable, Prod),
            delete_dao.findAndDelete({ prodId: prodId }, Like),
            delete_dao.findAndDelete({ prodId: prodId }, Comment)
    ])} catch (error) {
        throw error
    }
}

module.exports = {
    createProd,
    readProds,
    readBestProds,
    readProdInfo,
    readMyProds,
    readAritstProds,
    readMyLikeProds,
    updateProd,
    deleteProd
}