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

router.route('/')

router.route('/guestbook/add').post(async (req, res) => {
    let conn;

    let body = req.body

    try {
        conn = await pool.getConnection();
        const sql = `insert into test.test(name, date, content) values ('${body.name}', ${body.date}, '${body.content}')`
        const rows = await conn.query(sql,[]);

        const output = {
            code: 200,
            message: 'OK',
            header: {},
            data: rows
        }
        
        res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
        res.end(JSON.stringify(output));

    } catch (err) {
        const output = {
            code: 400,
            message: `에러 : ${err}`, 
        }
                
        res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
        res.end(JSON.stringify(output));

    } finally {
        if (con) {
            conn.end();
        }
    }
})

