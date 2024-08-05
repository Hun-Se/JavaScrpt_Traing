
//require 함수를 이용해서 다른 개발자가 만든 모듈 불러오기
const http = require('http');
const express = require('express');
const path = require('path');
const mariadb = require('mariadb');
const cors = require('cors');

//Body의 내용물을 파싱(읽어서 해석하는 것) 해주는 모듈(다른 개발자가 만든 것)
const bodyParser = require('body-parser');


// 데이터베이스(데이터 저장소) 연결을 모아두는 풀 만들기
const pool  = mariadb.createPool(
    {
        host: 'localhost',
        port:4406,
        user:'root',
        password: 'admin',
    }
);

// 익스프레스에서 app 객체 만들기
const app = express();


// 웹서버 실행하고 대기하기
const port = 7001;
http.createServer(app).listen(port, () => {// 이 콜백함수는 웹서버가 실행되면 호출됨
    console.log(`웹서버 실행됨: ${port}`);
});

console.log('웹서버 실행 요청함.');

// 폴더 오픈하기 : 현재 폴더 아래에 있는 public 폴더를 / 요청경로로 오픈하기
app.use('/', express.static(path.join(__dirname, 'public')));

// 뷰 설정
app.set('view', './views');
app.set('veiw engine', 'ejs');

// bodyParser 설정 -> body데이터에 있는 데이터를 읽을 수 있게 해줌
app.use(bodyParser.urlencoded({extended: false})); // URL-encoded 데이터를 파싱하는 미들웨어
app.use(bodyParser.json()); // JSON 데이터를 파싱하는 미들웨어

// 파싱 -> 데이터를 조립해 원하는 데이터로 빼내는 것

BigInt.prototype.toJSON = () => {
    return this.toString();
}

// 라우터 등록하기 : 라우터는 요청 경로에 따라서 실행된 콜백 함수를 등록해주는 것
const router = express.Router();
app.use('/', router);

// 리스트 요청에 대해 처리할 수 있는 함수 등록
// /person/list 요청 경로로 요청이 들어오면 콜백 함수를 실행해라
router.route('/person/list').get(async (req, res) => {

    let con;

    try {
        // 데이터베이스 연결 가져오기
        conn = await pool.getConnection();
        
        // SQL문 실행하기
        const sql = `select id, name, age, mobile from test.person`;
        const rows =await conn.query(sql, []);

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
    
        res.writeHead(200, {'Content-Type':'text/httml;charset=utf8'});
        res.end(JSON.stringify(output));
    } finally {
        // 데이터베이스 연결 풀로 연결 반환하기
        if (con) {
            conn.end();
        }
    }
});

// 추가 요청에 대해 처리할 수 있는 함수 등록
// /person/add 요청 경로로 요청이 들어오면 콜백 함수를 실행해라
router.route('/person/add').get(async (req, res) => {

    const parmas = req.query;
    console.log(`요청파라미터 -> ${JSON.stringify(parmas)}`);

    const date = moment("2023-06-23");

    date.format("YYYY/MM/DD"); // 포맷의 형식은 더 다양함


    let con;

    try {
        // 데이터베이스 연결 가져오기
        conn = await pool.getConnection();
        
        // SQL문 실행하기
        const sql = `insert into test.person(name, age, mobile) values ('${parmas.name}', ${parmas.age}, '${parmas.mobile}');`;
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
    
        res.writeHead(200, {'Content-Type':'text/httml;charset=utf8'});
        res.end(JSON.stringify(output));
    } finally {
        // 데이터베이스 연결 풀로 연결 반환하기
        if (con) {
            conn.end();
        }
    }
});




router.route('/menu/list').get(async (req, res) => {

    let con;

    console.log(`요청 파라미터 받은 것 : ${JSON.stringify(req.query)}`);
    try {
        // 데이터베이스 연결 가져오기
        conn = await pool.getConnection();
        
        // SQL문 실행하기
        const sql = `select id, name, details, color, icon from test.menu`;
        const rows =await conn.query(sql, []);

        const output = {
            code: 200,
            message: 'OK',
            header: {},
            data: rows
        }
    
        // res.writeHead(200, {'Content-Type':'text/httml;charset=utf8'});
        // res.end(JSON.stringify(output));

        const contex = {
            username: '홍길동1',
        }

        res.app.render('menu_list', context, (err, html) => {
           if (err) {
            console.err(`뷰처리 중 에러 ${err}`);
           }
            res.writeHead(200, {'Content-Type':'text/httml;charset=utf8'});
            res.end(html);
        });

    } catch (err){
        const output = {
            code: 400,
            message: `에러 : ${err}`,
        }
    
        res.writeHead(200, {'Content-Type':'text/httml;charset=utf8'});
        res.end(JSON.stringify(output));
    } finally {
        // 데이터베이스 연결 풀로 연결 반환하기
        if (con) {
            conn.end();
        }
    }
});


//post방식
router.route('/menu/list').post(async (req, res) => {

    let con;
    console.log(`요청 파라미터 받은 것 : ${JSON.stringify(req.body)}`);

    try {
        // 데이터베이스 연결 가져오기
        conn = await pool.getConnection();
        
        // SQL문 실행하기
        const sql = `select id, name, details, color, icon from test.menu`;
        const rows =await conn.query(sql, []);

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
    
        res.writeHead(200, {'Content-Type':'text/httml;charset=utf8'});
        res.end(JSON.stringify(output));
    } finally {
        // 데이터베이스 연결 풀로 연결 반환하기
        if (con) {
            conn.end();
        }
    }
});