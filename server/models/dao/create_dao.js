async function saveObject(variable, Type) { 
    const object = new Type(variable)
    return await object.save();
}

module.exports = {
    saveObject
}