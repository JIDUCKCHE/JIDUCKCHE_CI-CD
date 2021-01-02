const express = require('express');
const router = express.Router();
const fileLib = require("../lib/fileLibrary");
const prodLib = require('../lib/prodLibrary');
const { responseHandler } = require('./common')

router.post('/getUrl', (req, res) => {
    fileLib.getURL(req.body.name, "prod", (err, result) => {
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, result })
    })
})

router.post('/getPreUrl', (req, res) => {
    fileLib.getURL(req.body.name, "pre", (err, result) => {
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, result })
    })
})

router.post('/deleteImage', (req, res) => {
    const fileName = req.body.name
    fileLib.moveToTrash(fileName, "prod", (err) => {
        if(err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true })
    })
})

router.post('/deletePreImage', (req, res) => {
    const fileName = req.body.name
    fileLib.moveToTrash(fileName, "pre", (err) => {
        if(err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true })
    })
})

//Create
router.post('/', (req, res) => { responseHandler(prodLib.createProd(req.body, req.body.userId), res) })


//Read
router.get('/', (req, res) => { responseHandler(prodLib.readProds(req.query.startId, req.query.endId), res) })

router.get('/best/:page', (req, res) => { responseHandler(prodLib.readBestProds(req.params.page), res) })

router.get('/info/:prodId', (req, res) => { responseHandler(prodLib.readProdInfo(req.params.prodId), res) })

router.get('/my/:userId', (req, res) => { responseHandler(prodLib.readMyProds(req.params.userId), res) })

router.get('/artist/:artistId', (req, res) => { responseHandler(prodLib.readAritstProds(req.params.artistId), res) })

router.get('/myLike/:userId', (req, res) => { responseHandler(prodLib.readMyLikeProds(req.params.userId), res) })

//Upadte
router.put('/', (req, res) => { responseHandler(prodLib.updateProd(req.body.prodId, req.body), res) })

//Delete
router.delete('/', (req, res) => { responseHandler(prodLib.deleteProd(req.query.prodId, req.query.originName, req.query.preName), res) })

module.exports = router;