const express = require('express');
const router = express.Router();
const fileLib = require('../lib/fileLibrary');
const artsitLib = require('../lib/artistLibrary');
const { responseHandler } = require('./common')

router.post('/getUrl', (req, res) => {
    fileLib.getURL(req.body.name, "artist", (err, result) => {
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, result })
    })
})

router.post('/', (req, res) => { responseHandler(artsitLib.createArtist(req.body), res) })

router.get('/', (req, res) => { responseHandler(artsitLib.readAllArtists(), res) })

router.get('/info/:id', (req, res) => { responseHandler(artsitLib.readArtistInfo(req.params.id), res) })


module.exports = router;