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
            const { code } = req.query;

            if (!code)
                throw new InvalidParamsError(
                    '카카오 로그인에 실패하였습니다.',
                    412
                );

            const user = await this.userService.kakaoLogin(code);
            const accesstoken = await this.userService.createAccessToken(
                user.userId
            );
            const refreshtoken = await this.userService.createRefreshToken(
                user.userId
            );
            return res
                .header({ accesstoken, refreshtoken })
                .status(200)
                .json({ name: user.name, msg: '로그인이 완료 되었습니다.' });
        } catch (error) {
            console.log(error);
            next(error);
        }
    };
}

module.exports = UserController;
