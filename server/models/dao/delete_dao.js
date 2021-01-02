async function findOneAndDelete(variable, Type) {
    return await Type.findOneAndDelete(variable)
}

async function findAndDelete(variable, Type) {
    return await Type.deleteMany(variable)
}

module.exports = {
    findOneAndDelete,
    findAndDelete
}