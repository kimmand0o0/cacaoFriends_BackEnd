const express = require('express');
const router = express.Router();

const UserController = require('../architecture/controllers/user.controller');
const userController = new UserController();

//카카오 로그인
router.get('/kakao', userController.kakaoLogin);

module.exports = router;
