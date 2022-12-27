const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const {
    InvalidParamsError,
    ValidationError,
    AuthenticationError,
    ExistError,
} = require('../middleWares/exceptions/error.class');

module.exports = async (req, res, next) => {
    try {
        // 토큰이 없을 경우
        if (!req.cookies.accessToken && !req.cookies.refreshToken) {
            console.log('refreshToken이 없습니다.');
            throw new AuthenticationError('로그인이 유효하지 않습니다.', 401);
        }

        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        // validateAccessToken() = 엑세스 토큰 확인
        const isAccessTokenValidate = validateAccessToken(accessToken);
        const isRefreshTokenValidate = validateRefreshToken(refreshToken);

        // 리프레시 토큰이 없을 경우
        if (!isRefreshTokenValidate) {
            console.log('refreshToken이 없습니다.');
            throw new AuthenticationError('로그인이 유효하지 않습니다.', 401);
        }

        // AccessToken을 확인 했을 때 만료일 경우
        if (!isAccessTokenValidate) {
            const accessTokenId = Users.findOne({
                raw: true,
                where: { token: refreshToken },
                attributes: ['userId'],
            }).userId;
            if (!accessTokenId) {
                // 새로운 엑세스 토큰을 만들어준다.
                const newAccessToken = createAccessToken(accessTokenId);
                res.header('accessToken', newAccessToken);
            }
        }
        const { userId } = getAccessTokenPayload(accessToken);
        res.locals.user = userId;

        next();
    } catch (error) {
        next(error);
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

// Refresh Token을 검증합니다.
function validateRefreshToken(refreshToken) {
    try {
        jwt.verify(refreshToken, process.env.SECRET_KEY); // JWT를 검증합니다.
        return true;
    } catch (error) {
        return false;
    }
}

// Access Token의 Payload를 가져옵니다.
function getAccessTokenPayload(accessToken) {
    try {
        const payload = jwt.verify(accessToken, process.env.SECRET_KEY); // JWT에서 Payload를 가져옵니다.
        return payload;
    } catch (error) {
        return null;
    }
}

function createAccessToken(userId) {
    const accessToken = jwt.sign(
        { userId },
        process.env.SECRET_KEY, // 시크릿 키
        { expiresIn: '120m' } // 유효 시간
    );

    return accessToken;
}
