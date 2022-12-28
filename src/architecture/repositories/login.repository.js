const { Users } = require('../../models');

class UserRepository {
    signUp = async (name, email) => {
        await Users.create({ name, email });
        return Users.findOne({
            raw: true,
            where: { email },
            attributes: ['userId', 'email', 'name'],
        });
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

module.exports = UserRepository;