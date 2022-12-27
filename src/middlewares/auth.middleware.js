const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const {
    InvalidParamsError,
    ValidationError,
    AuthenticationError,
    ExistError,
} = require('../middlewares/exceptions/error.class');

module.exports = async (req, res, next) => {
    try {
        // 토큰이 없을 경우
        if (!req.headers.accesstoken && !req.headers.refreshtoken) {
            console.log('refreshtoken이 없습니다.');
            throw new AuthenticationError('로그인이 유효하지 않습니다.', 401);
        }

        const accesstoken = req.headers.accesstoken;
        const refreshtoken = req.headers.refreshtoken;

        // validateAccessToken() = 엑세스 토큰 확인
        const isAccessTokenValidate = validateAccessToken(accesstoken);
        const isRefreshTokenValidate = validateRefreshToken(refreshtoken);

        // 리프레시 토큰이 없을 경우
        if (!isRefreshTokenValidate) {
            console.log('refreshtoken이 없습니다.');
            throw new AuthenticationError('로그인이 유효하지 않습니다.', 401);
        }

        // AccessToken을 확인 했을 때 만료일 경우
        if (!isAccessTokenValidate) {
            const accesstokenId = Users.findOne({
                raw: true,
                where: { token: refreshtoken },
                attributes: ['userId'],
            }).userId;
            if (!accesstokenId) {
                // 새로운 엑세스 토큰을 만들어준다.
                const newAccessToken = createAccessToken(accesstokenId);
                res.header('accesstoken', newAccessToken);
            }
        }
        const { userId } = getAccessTokenPayload(accesstoken);
        res.locals.user = userId;

        next();
    } catch (error) {
        next(error);
    }
};

// Access Token을 검증합니다.
function validateAccessToken(accesstoken) {
    try {
        jwt.verify(accesstoken, process.env.SECRET_KEY); // JWT를 검증합니다.
        return true;
    } catch (error) {
        return false;
    }
}

// Refresh Token을 검증합니다.
function validateRefreshToken(refreshtoken) {
    try {
        jwt.verify(refreshtoken, process.env.SECRET_KEY); // JWT를 검증합니다.
        return true;
    } catch (error) {
        return false;
    }
}

// Access Token의 Payload를 가져옵니다.
function getAccessTokenPayload(accesstoken) {
    try {
        const payload = jwt.verify(accesstoken, process.env.SECRET_KEY); // JWT에서 Payload를 가져옵니다.
        return payload;
    } catch (error) {
        return null;
    }
}

function createAccessToken(userId) {
    const accesstoken = jwt.sign(
        { userId },
        process.env.SECRET_KEY, // 시크릿 키
        { expiresIn: '120m' } // 유효 시간
    );

    return accesstoken;
}
