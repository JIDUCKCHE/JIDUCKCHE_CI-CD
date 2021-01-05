const express = require('express');
const router = express.Router();
const userLib = require('../lib/userLibrary');
const { responseHandler } = require('./common')

const { auth } = require("../middleware/auth");

router.get("/info/:id", (req, res) => { responseHandler(userLib.readUserInfo(req.params.id), res) })

router.get("/authCode/:id", (req, res) => { responseHandler(userLib.createAuthCode(req.params.id), res) })

router.get("/auth", auth, (req, res) => {
        res.status(200).json({
            _id: req.user._id,
            isAdmin: req.user.isAdmin,
            level: req.user.level,
            isAuth: true,
            email: req.user.email,
            name: req.user.name,
            favoriteIdol: req.user.favoriteIdol,
            role: req.user.role,
            image: req.user.image,
          })
});

router.post("/register", (req, res) => { responseHandler(userLib.createUser(req.body), res) })

router.put("/emailAuth/:id", (req, res) => { responseHandler(userLib.emailAuth(req.params.id, req.body.authCode), res) })

router.put("/admin/:id", (req, res) => { responseHandler(userLib.setAdmin(req.params.id), res) })

router.post("/login", (req, res) => {
    userLib.doLogin(req)
        .then(user => {
            res.cookie('w_auth', user.token)
            res.status(200).json({ loginSuccess: true, userId: user._id })
        })
        .catch(err => { res.status(400).json({ loginSuccess: false, message: err }) })
})

router.get("/logout", auth, (req, res) => { responseHandler(userLib.doLogout(req.user._id), res) })

module.exports = router;