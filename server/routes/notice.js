const express = require('express');
const router = express.Router();
const noticeLib = require('../lib/noticeLibrary');
const { responseHandler } = require('./common')


//Create
router.post('/', (req, res) => { responseHandler(noticeLib.createNotice(req.body), res) })


//Read
router.get('/:page', (req, res) => { responseHandler(noticeLib.readNotices(req.params.page), res) })

router.get('/info/:id', (req, res) => { responseHandler(noticeLib.readNoticeInfo(req.params.id), res) })

router.get('/main', (req, res) => { responseHandler(noticeLib.readMainNotice(), res) })

//Upadte
router.put('/:id', (req, res) => { responseHandler(noticeLib.updateNotice(req.params.id, req.body), res) })

//Delete
router.delete('/:id', (req, res) => { responseHandler(noticeLib.deleteNotice(req.params.id), res) })

module.exports = router;