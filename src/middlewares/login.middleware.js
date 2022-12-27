require('dotenv').config();
const jwt = require('jsonwebtoken');
const {
    InvalidParamsError,
    ValidationError,
    AuthenticationError,
    ExistError,
} = require('../middlewares/exceptions/error.class');

// 로그인 되어 있는 유저일 경우 Error를 반환한다.
module.exports = (req, res, next) => {
    try {
        if (!req.cookies) {
            next();
            return;
        }

        const accessToken = req.headers.accessToken;
        const token = validateAccessToken(accessToken);

        if (token) {
            throw new AuthenticationError('이미 로그인이 되어있습니다.', 403);
        }
        next();
    } catch (error) {
        next();
    }
};

// Access Token을 검증합니다.
function validateAccessToken(accessToken) {
    try {
        jwt.verify(accessToken, process.env.SECRET_KEY); // JWT를 검증합니다.
        return true;
    } catch (error) {
        return false;
    }
}
