const http = require('http');
const express = require('express');
const path = require('path');
const mariadb = require('mariadb');
const exp = require('constants');

const pool = mariadb.createPool(
    {
        host: 'localhost',
        port:4406,
        user:'root',
        password: 'admin',
    }
);

const app = express();

const port = 7001;

http.createServer(app).listen(port, () => {
    console.log(`웹서버 실행됨 ${port}`);
});

app.use('/', express.static(path.join(__dirname, 'public')));

BigInt.prototype.toJSON = () => {
    return this.toString();
}

const router = express.Router();
app.use('/', router);



