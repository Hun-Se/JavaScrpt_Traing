const http = require('http');
const express = require('express');
const path = require('path');
const mariadb = require('mariadb');
const multer = require('multer');

const pool = mariadb.createPool({
    host: 'localhost',
    port: 4406,
    user: 'root',
    password: 'admin',
    database: 'test'
});

const app = express();
const port = 7001;

BigInt.prototype.toJSON = () => {
    return this.toString();
}
const upload = multer(); 

app.use('/', express.static(path.join(__dirname, 'public')));

const router = express.Router();
app.use('/', router);

router.post('/guestbook/add', upload.none(), async (req, res) => {
    let conn;
    let body = req.body;
    console.log(req.body);

    try {
        conn = await pool.getConnection();
        const sql = `insert into test.test(name, content, date) values('${body.name}', '${body.content}', '${body.date}')`;
        
        const rows = await conn.query(sql, []);

        const output = {
            code: 200,
            message: 'OK',
            header: {},
            data: rows
        };
        res.writeHead(200, {'Content-Type':'text/httml;charset=utf8'});
        res.end(JSON.stringify(output));

    } catch (err) {
        const output = {
            code: 400,
            message: `에러 : ${err}`
        };

        res.writeHead(200, {'Content-Type':'text/httml;charset=utf8'});
        res.end(JSON.stringify(output));

    } finally {
        if (conn) {
            conn.end();
        }
    }
});

router.post('/guestbook/edit', upload.none(), async (req, res) => {
    let conn;
    let body = req.body;
    console.log(req.body);

    try {
        conn = await pool.getConnection();
        const sql = `update test.test set name = '${body.name}', content='${body.content}', date='${body.date}' where id = ${body.id}`;
        
        const rows = await conn.query(sql, []);
        console.log(`sql 실행결과 ${JSON.stringify(rows)}`);

        const output = {
            code: 200,
            message: 'OK',
            header: {},
            data: rows
        };
        res.writeHead(200, {'Content-Type':'text/httml;charset=utf8'});
        res.end(JSON.stringify(output));

    } catch (err) {
        const output = {
            code: 400,
            message: `에러 : ${err}`
        };

        res.writeHead(200, {'Content-Type':'text/httml;charset=utf8'});
        res.end(JSON.stringify(output));

    } finally {
        if (conn) {
            conn.end();
        }
    }
});

router.route('/guestbook/list').get(async (req, res) => {
    let con;

    try {
        // 데이터베이스 연결 가져오기
        conn = await pool.getConnection();
        
        // SQL문 실행하기
        const sql = `select id, name, content, date from test.test order by id desc`;
        const rows = await conn.query(sql, []);

        const output = {
            code: 200,
            message: 'OK',
            header: {},
            data: rows
        }
    
        res.writeHead(200, {'Content-Type':'text/httml;charset=utf8'});
        res.end(JSON.stringify(output));
    } catch (err){
        const output = {
            code: 400,
            message: `에러 : ${err}`,
        }

        console.log(err);
    
        res.writeHead(200, {'Content-Type':'text/httml;charset=utf8'});
        res.end(JSON.stringify(output));
    } finally {
        // 데이터베이스 연결 풀로 연결 반환하기
        if (con) {
            conn.end();
        }
    }
})

router.route('/guestbook/list/:id').get(async (req, res) => {
    let con;
    const id = parseInt(req.params.id);
    console.log(id);

    try {
        // 데이터베이스 연결 가져오기
        conn = await pool.getConnection();
        
        // SQL문 실행하기
        const sql = `select id, name, content, date from test.test where id = ${id}`;
        const rows = await conn.query(sql, []);

        const output = {
            code: 200,
            message: 'OK',
            header: {},
            data: rows
        }
    
        res.writeHead(200, {'Content-Type':'text/httml;charset=utf8'});
        res.end(JSON.stringify(output));
    } catch (err){
        const output = {
            code: 400,
            message: `에러 : ${err}`,
        }

        console.log(err);
    
        res.writeHead(200, {'Content-Type':'text/httml;charset=utf8'});
        res.end(JSON.stringify(output));
    } finally {
        // 데이터베이스 연결 풀로 연결 반환하기
        if (con) {
            conn.end();
        }
    }
})

router.route('/guestbook/remove/:id').delete(async (req, res) => {
    let con;
    const id = parseInt(req.params.id);
    try {
        // 데이터베이스 연결 가져오기
        conn = await pool.getConnection();
        
        // SQL문 실행하기
        const sql = `delete from test.test where id = ${id}`;
        const rows = await conn.query(sql, []);

        const output = {
            code: 200,
            message: 'OK',
            header: {},
            data: rows
        }
    
        res.writeHead(200, {'Content-Type':'text/httml;charset=utf8'});
        res.end(JSON.stringify(output));
    } catch (err){
        const output = {
            code: 400,
            message: `에러 : ${err}`,
        }

        console.log(err);
    
        res.writeHead(200, {'Content-Type':'text/httml;charset=utf8'});
        res.end(JSON.stringify(output));
    } finally {
        // 데이터베이스 연결 풀로 연결 반환하기
        if (con) {
            conn.end();
        }
    }
})

http.createServer(app).listen(port, () => {
    console.log(`웹서버 실행됨 ${port}`);
});