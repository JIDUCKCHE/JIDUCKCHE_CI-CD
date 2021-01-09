const create_dao = require('../models/dao/create_dao');
const read_dao = require('../models/dao/read_dao');

const { Artist } = require('../models/Artist');


//Create
async function createArtist(save) {
    result = await create_dao.saveObject(save, Artist)
    return ({ success: true, data: result })
}


//Read
async function readAllArtists() {
    result = await read_dao.findAll(Artist)
    return ({ success: true, data: result })
}

async function readArtistInfo(artistId) {
    const variable = { _id: artistId }
    result = await read_dao.findOne(variable, Artist)
    return ({ success: true, data: result })
}

module.exports = {
    createArtist,
    readAllArtists,
    readArtistInfo
}