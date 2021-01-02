async function findAndUpate(variable, update, Type) {
    return await Type.findOneAndUpdate(variable, update)
}

module.exports = { findAndUpate }