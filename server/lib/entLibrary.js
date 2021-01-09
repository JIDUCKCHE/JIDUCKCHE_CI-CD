const create_dao = require('../models/dao/create_dao');
const read_dao = require('../models/dao/read_dao');

const { Ent } = require('../models/Ent')


//Create
async function createEnt(save) {
    result = await create_dao.saveObject(save, Ent)
    return ({ success: true, data: result })
}


//Read
async function readAllEnts() {
    result = await read_dao.findAll(Ent)
    return ({ success: true, data: result })
}

module.exports = {
    createEnt,
    readAllEnts
}