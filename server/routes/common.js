async function responseHandler(promise, res) {
    try {
        const result = await promise;
        res.status(200).json({ success: result.success, result: result.data })
    } catch(error) {
        console.log(error)
        res.status(400).json({ success: false, error })
    }
}

module.exports = { responseHandler }