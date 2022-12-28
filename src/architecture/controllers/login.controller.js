const LoginService = require('../services/login.service');
const {
    InvalidParamsError,
} = require('../../middlewares/exceptions/error.class');

class LoginController {
    loginService = new LoginService();

    kakaoLogin = async (req, res, next) => {
        try {
            const codetype = req.query.codetype || null;
            const { code } = req.query;

            if (!code)
                throw new InvalidParamsError(
                    '카카오 로그인에 실패하였습니다.',
                    412
                );

            const user = await this.loginService.kakaoLogin(code, codetype);
            const accesstoken = await this.loginService.createAccessToken(
                user.userId
            );
            const refreshtoken = await this.loginService.createRefreshToken(
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

module.exports = LoginController;
