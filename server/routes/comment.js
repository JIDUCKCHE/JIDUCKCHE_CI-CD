const express = require('express');
const router = express.Router();
const commentLib = require('../lib/commentLibrary');
const { responseHandler } = require('./common')

//Create
router.post('/', (req, res) => { responseHandler(commentLib.createComment(req.body), res) })

//Read
router.get('/', (req, res) => { responseHandler(commentLib.readComments(req.query.prodId, req.query.noticeId), res) })

//Update
router.put('/', (req, res) => { responseHandler(commentLib.updateComment(req.body.commentId, req.body.content), res) })

//Delete
router.delete('/:id', (req, res) => { responseHandler(commentLib.deleteComment(req.params.id), res) })

module.exports = router;