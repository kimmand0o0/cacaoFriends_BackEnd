const { Users } = require('../../models');

class LoginRepository {
    signUp = async (name, email) => {
        return Users.create({ name, email });
    };

    findUser = async (email) => {
        return Users.findOne({
            raw: true,
            where: { email },
            attributes: ['userId', 'email', 'name'],
        });
    };

    updateUser = async (userId, refreshtoken) => {
        return Users.update(
            {
                refreshtoken,
            },
            { where: { userId } }
        );
    };
}

module.exports = LoginRepository;
