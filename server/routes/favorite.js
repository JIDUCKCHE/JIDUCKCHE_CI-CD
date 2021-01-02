const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')

router.post("/unsubscribe", (req, res) => {
    Favorite.findOneAndDelete({ userId: req.body.userId, artistId: req.body.artistId })
        .exec((err, unsubscribeInfo) => {
            if(err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, unsubscribeInfo })
        })
})

router.post("/subscribe", (req, res) => {
    const favorite = new Favorite(req.body)
    favorite.save((err, favoriteInfo) => {
        if(err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true, favoriteInfo })
    })
})



module.exports = router;