const express = require('express');
const router = express.Router();

const loginMiddleware = require('../middlewares/login.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const UserController = require('../architecture/controllers/user.controller');
const userController = new UserController();

//카카오 로그인
router.get('/kakao/login', userController.kakaoLogin);

module.exports = router;
