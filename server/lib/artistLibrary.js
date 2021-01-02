const create_dao = require('../models/dao/create_dao');
const read_dao = require('../models/dao/read_dao');

const { Artist } = require('../models/Artist');


//Create
async function createArtist(save) {
    return await create_dao.saveObject(save, Artist)
}


//Read
async function readAllArtists() {
    return await read_dao.findAll(Artist)
}

async function readArtistInfo(artistId) {
    const variable = { _id: artistId }
    return await read_dao.findOne(variable, Artist)
}

module.exports = {
    createArtist,
    readAllArtists,
    readArtistInfo
}