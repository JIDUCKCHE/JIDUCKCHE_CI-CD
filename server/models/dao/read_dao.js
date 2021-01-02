async function findOne(variable, Type) {
    const result = await Type.findOne(variable)
    console.log(result)
    if (result == null) console.log("The row is empty")
    return result
}

async function findList(variable, Type) {
    const result = await Type.find(variable)
    if (result == null) console.log("The row is empty")
    return result
}

async function findSome(variable, Type, num) {
    const result = await Type.find(variable).limit(num)
    if (result == null) console.log("The row is empty")
    // if (result.length != num) throw new Error("The row is shorter than expected")
    return result
}

async function findWithAggregate(pipeline, Type) {
    return await Type.aggregate(pipeline)
}

async function population(info, RefType, refId) {
    return await RefType.populate(info, {path: refId})
}

async function findAll(Type) {
    const result = await Type.find().sort('createdAt')
    if (result == null) console.log("The row is empty")
    return result
}

module.exports = {
    findOne,
    findList,
    findSome,
    findWithAggregate,
    population,
    findAll
}