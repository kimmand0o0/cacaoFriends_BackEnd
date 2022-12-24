const express = require('express');
const app = express();

require('dotenv').config();

app.listen(process.env.PORT, () => {
    console.log(process.env.PORT, '포트로 서버가 열렸습니다.');
});

app.get('/', (req, res) => {
    res.send(
        `test ${process.env.PORT}`
    );
});
