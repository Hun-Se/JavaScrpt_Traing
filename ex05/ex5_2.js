// 웹서버 만들기

const http = require('http');
const express = require('express');

const app = express();

const router = express.Router();
app.use('/', router);

router.route('/person/list').get((req, res) => {
    console.log('/person/list 요청됨.');

    const person = {
        name: '홍길동1',
        age: 21,
    }

    const output = JSON.stringify(person);

    res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
    res.end(output);
});

app.use((req, res, next) => {
    console.log(`첫번째 미들웨어 호출됨`);

    next();
})

app.use((req, res, next) => {
    console.log('두번째 미들웨어 호출됨');

    res.writeHead(200, {'Content-Type': 'text/html;charset=utf8'});
    res.end('<h3>페이지를 찾을 수 없습니다.</h3>');
});


http.createServer(app).listen(7001, () => {
    console.log(`웹서버 실행됨: 7001`);
});

console.log(`웹서버 실행 요청함`);