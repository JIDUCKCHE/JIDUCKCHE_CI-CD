const express = require("express");
const router = express.Router();
const userLib = require("../lib/userLibrary");
const { responseHandler } = require("./common");

const { auth } = require("../middleware/auth");

// complete -> join 체크 -> test 필요
router.get("/info/:id", (req, res) => {
	responseHandler(userLib.readUserInfo(req.params.id), res);
});

// complete -> test 필요
router.get("/authCode/:id", (req, res) => {
	responseHandler(userLib.createAuthCode(req.params.id), res);
});

// complete -> test 필요
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
	});
});

// complete -> test 필요
router.get("/dup", (req, res) => {
	responseHandler(
		userLib.checkDuplication(req.query.id, req.query.email),
		res
	);
});

// complete -> test 필요
router.post("/register", (req, res) => {
	responseHandler(userLib.createUser(req.body), res);
});

// complete -> test 필요
router.put("/emailAuth/:id", (req, res) => {
	responseHandler(userLib.emailAuth(req.params.id, req.body.authCode), res);
});

// complete -> test 필요
router.put("/admin/:id", (req, res) => {
	responseHandler(userLib.setAdmin(req.params.id), res);
});

// complete -> test 필요
router.post("/login", (req, res) => {
	userLib
		.doLogin(req)
		.then((result) => {
			console.log(result);
			if (result.success) res.cookie("w_auth", result.data.token);
			res.status(200).json({
				success: result.success,
				result: result.data,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json({ success: false, message: err });
		});
});

// 제거 예정 -> 클라이언트에서 토큰 삭제로 구현
router.get("/logout", auth, (req, res) => {
	responseHandler(userLib.doLogout(req.user._id), res);
});

module.exports = router;
