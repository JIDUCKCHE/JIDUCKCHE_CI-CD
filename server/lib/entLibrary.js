const create_dao = require('../models/dao/create_dao');
const read_dao = require('../models/dao/read_dao');

const { Ent } = require('../models/Ent')


//Create
async function createEnt(save) {
    return await create_dao.saveObject(save, Ent)
}


//Read
async function readAllEnts() {
    return await read_dao.findAll(Ent)
}

module.exports = {
    createEnt,
    readAllEnts
}