// 모듈을 추출합니다.
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

// 데이터베이스와 연결합니다.
var client = mysql.createConnection({
    user: 'root',
    password: 'apmsetup',
    database: 'Company',
    port: '3307'
});

// 서버를 생성합니다.
var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));

// 미들웨어를 설정합니다.
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true
}));

// 서버를 실행합니다.
app.listen(52273, function() {
    console.log('server running at http://127.0.0.1:52273');
});

// 라우트를 수행합니다.
// 메인 화면
app.get('/', function(request, response) {
    // 파일을 읽습니다.
    fs.readFile('index.html', 'utf8', function(error, data) {
        response.send(ejs.render(data, {
            data: request.session.id
        }));
    });
});

// 로그인
app.get('/login', function(request, response) {
    fs.readFile('login.html', 'utf8', function(error, data) {
        response.send(data);
    });
});

app.post('/login', function(request, response) {
    client.query('SELECT * FROM homepage1 WHERE id=?', [request.body.id],
    function() {
        request.session.id = request.body.id;
        response.redirect('/');
    });
});

// 로그아웃
app.get('/logout', function(request, response) {
    request.session.destroy(function() {
        request.session;
    });
    response.redirect('/');
});

// 회원가입
app.get('/member', function(request, response) {
    // 파일을 읽습니다.
    fs.readFile('member.html', 'utf8', function(error, data) {
        response.send(data);
    });
});

app.post('/member', function(request, response) {
    var body = request.body;

    // 데이터베이스 쿼리를 실행합니다.
    client.query('INSERT INTO homepage1 (id, pw, name) VALUES(?, ?, ?)', [
        body.id, body.pw, body.name
    ], function() {
        response.redirect('/');
    });
});

// 회원목록
app.get('/list', function(request, response) {
    // 파일을 읽습니다.
    fs.readFile('list.html', 'utf8', function(error, data) {
        // 데이터베이스 쿼리를 실행합니다.
        client.query('SELECT * FROM homepage1', function(error, results) {
            response.send(ejs.render(data, {
                data: results
            }));
        });
    });
});

// 회원수정
app.get('/update', function(request, response) {
    // 파일을 읽습니다.
    fs.readFile('update.html', 'utf8', function(error, data) {
        
    });
});