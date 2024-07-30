// 웹서버 만들기
// 자바의 import와 유사
const http = require('http');
const express = require('express');
const mariadb = require('mariadb');
const path = require('path'); // 경로

const app = express();
const router = express.Router();
app.use('/', router);

app.use('/', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
    res.end('<h2>페이지를 찾을 수 없습니다.</h2>');
});

http.createServer(app).listen(7001, () => {
    console.log(`웹서버 실행됨: 7001`);
});