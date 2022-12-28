const express = require('express');
const router = express.Router();

const loginMiddleWare = require('../middlewares/login.middleware');

const LoginController = require('../architecture/controllers/login.controller');
const loginController = new LoginController();

//카카오 로그인
router.get('/kakao', loginMiddleWare, loginController.kakaoLogin);

module.exports = router;
