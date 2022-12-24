const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3001

require('dotenv').config();

app.listen(process.env.PORT, () => {
    console.log(process.env.PORT, '포트로 서버가 열렸습니다.');
});

app.get('/', (req, res) => {
    res.send(`안녕하세요, 저희는 항해 99 10기 E반 BE 김영재, 김혜주, 김혜란 입니다. ${process.env.PORT}`);
});