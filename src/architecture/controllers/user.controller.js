const UserRepository = require('../repositories/user.repository.js');
const {
    InvalidParamsError,
    ValidationError,
    AuthenticationError,
    ExistError,
} = require('../../middlewares/exceptions/error.class');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();

class UserService {
    userRepository = new UserRepository();

    //카카오 로그인/가입
    kakaoLogin = async (code) => {
        //액세스 토큰을 받아온다
        const {
            data: { access_token: kakaoAccessToken },
        } = await axios('https://kauth.kakao.com/oauth/token', {
            params: {
                grant_type: 'authorization_code',
                client_id: process.env.KAKAO_REST_API_KEY,
                redirect_uri: process.env.KAKAO_REDIRECT_URI,
                code: code,
            },
        });

        //유저 정보를 받아온다
        const { data } = await axios('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${kakaoAccessToken}`,
            },
        });

        const name = data.properties.nickname;
        const email = data.kakao_account.email;

        if (!name || !email)
            throw new ValidationError(
                '카카오 인증 정보가 올바르지 않습니다.',
                400
            );

        let user = await this.userRepository.findUser(email);

        if (!user) {
            return (user = await this.userRepository.signUp(name, email));
        }
        console.log(user);
        return user;
    };

    createAccessToken = async (userId) => {
        return jwt.sign({ userId }, process.env.SECRET_KEY, {
            expiresIn: '2h',
        });
    };

    createRefreshToken = async (userId) => {
        const refreshtoken = jwt.sign(
            {},
            process.env.SECRET_KEY, // 시크릿 키
            { expiresIn: '7d' } // 유효 시간
        );

        await this.userRepository.updateUser(userId, refreshtoken);

        return refreshtoken;
    };
}

module.exports = UserService;
