class InvalidParamsError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status || 400;
        this.name = 'InvalidParamsError';
        if (!message) this.message = '요청한 데이터 형식이 올바르지 않습니다.';
    }
}
class ValidationError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status || 412;
        this.name = 'ValidationError';
        if (!message) this.message = '요청한 데이터 형식이 올바르지 않습니다.';
    }
}
class AuthenticationError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status || 400;
        this.name = 'AuthenticationError';
        if (!message) this.message = '회원 가입에 실패했습니다.';
    }
}
class ExistError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status || 412;
        this.name = 'ExistError';
        if (!message) this.message = '중복된 정보입니다.';
    }
}
module.exports = {
    InvalidParamsError,
    ValidationError,
    AuthenticationError,
    ExistError,
};
