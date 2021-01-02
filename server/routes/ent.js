const express = require('express');
const router = express.Router();
const fileLib = require('../lib/fileLibrary');
const entLib = require('../lib/entLibrary');
const { responseHandler } = require('./common')

router.post('/getUrl', (req, res) => {
    fileLib.getURL(req.body.name, "ent", (err, result) => {
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, result })
    })
})

//Create
router.post('/', (req, res) => { responseHandler(entLib.createEnt(req.body), res) })

//Read
router.get('/', (req, res) => { responseHandler(entLib.readAllEnts(), res) })

module.exports = router;