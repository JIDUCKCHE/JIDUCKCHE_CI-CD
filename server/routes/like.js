const express = require('express');
const router = express.Router();
const likeLib = require('../lib/likeLibrary');
const { responseHandler } = require('./common')


//Create
router.post('/', (req, res) => {
    responseHandler(likeLib.createLike(req.body.userId, req.body.prodId, req.body.commentId), res)
    // likeLib.createLike(req)
    //     .then(() => { res.status(200).json({ success: true }) })
    //     .catch(err => { res.status(400).json({ success: false, err }) })
})


//Read
router.get('/', (req, res) => {
    responseHandler(likeLib.readLikes(req.query.prodId, req.query.commentId), res)
    // likeLib.readLikes(req)
    //     .then(likes => { res.status(200).json({ success: true, likes }) })
    //     .catch(err => { res.status(400).send(err) })
})


//Delete
router.delete('/', (req, res) => {
    responseHandler(likeLib.deleteLike(req.query.userId, req.query.prodId, req.query.commentId), res)
    // likeLib.deleteLike(req)
    //     .then(() => { res.status(200).json({ success: true }) })
    //     .catch(err => { res.status(400).json({ success: false, err }) })
})

module.exports = router;