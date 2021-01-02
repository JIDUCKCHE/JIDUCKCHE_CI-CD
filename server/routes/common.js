async function responseHandler(promise, res) {
    try {
        const result = await promise;
        res.status(200).json({ success: true, result })
    } catch(error) {
        console.log(error)
        res.status(400).json({ success: false, error })
    }
}

module.exports = { responseHandler }