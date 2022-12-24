module.exports = (error, req, res, next) => {
    console.error(error);
    if (error.name.includes('Sequelize')) {
        res.status(500).json({ errorMessage: 'Internal Server Error' });
    }
    res.status(error.status || 400).json({ errorMessage: error.message });
};
