const UserService = require('../services/user.service');
const {
    InvalidParamsError,
    ValidationError,
    AuthenticationError,
    ExistError,
} = require('../../middlewares/exceptions/error.class');

class UserController {
    userService = new UserService();

    kakaoLogin = async (req, res, next) => {
        try {
            // const headers = req.headers['authorization'];
            // const kakaoToken = headers.split(' ')[1];
            const { code } = req.query;

            if (!code)
                throw new InvalidParamsError(
                    '카카오 로그인에 실패하였습니다.',
                    412
                );

            const accessToken = await this.userService.kakaoLogin(code);
            const refreshToken = await this.userService.createRefreshToken(
                userId
            );

            return res
                .header({ accessToken, refreshToken })
                .status(200)
                .json({ msg: '로그인이 완료 되었습니다.' });
        } catch (error) {
            console.log(error);
            next();
        }
    };
}

module.exports = UserController;
