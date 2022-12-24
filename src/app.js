const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');
const corsOption = {
    origin: true, // *
    withCredential: true,
};

require('dotenv').config();

app.use(express.json());
app.use(cors(corsOption));
app.use('/', routes);

const ErrorHandler = require('./middlewares/error.handler.middleware');
app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
    console.log(process.env.PORT, '포트로 서버가 열렸습니다.');
});

app.get('/', (req, res) => {
    res.send(
        `안녕하세요, 저희는 항해 99 10기 E반 BE 김영재, 김혜주, 김혜란 입니다.`
    );
});
