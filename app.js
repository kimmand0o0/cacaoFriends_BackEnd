const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3001

require('dotenv').config();

app.listen(PORT, () => {
    console.log(PORT, '포트로 서버가 열렸습니다.');
});

app.get('/', (req, res) => {
    res.send('CI/CD Success check2');
});
