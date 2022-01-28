// 모듈을 추출합니다.
var fs = require('fs');
var path = require('path');
var ejs = require('ejs');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

// 데이터베이스와 연결합니다.
var client = mysql.createConnection({
  user: 'root',
  password: 'apmsetup',
  database: 'company',
  port: '3306'
});

// 서버를 생성합니다.
var app = express();

// 서버를 설정합니다.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
  }
}));

// 라우트를 실행합니다.
// 메인화면
app.get('/', function(request, response) {
  response.render('index', {
    session: request.session.memberId
  });
});

// 회원가입
app.get('/member', function(request, response) {
  response.render('member');
});

app.post('/member', function(request, response) {
  var body = request.body;

  // 데이터베이스 쿼리를 실행합니다.
  client.query('INSERT INTO people (id, password, name) VALUES(?, ?, ?)', [
      body.id, body.pw, body.name
  ], function() {
      response.redirect('/');
  });
});

// 회원목록
app.get('/list', function(request, response) {
    // 데이터베이스 쿼리를 실행합니다.
    client.query('SELECT * FROM people', function(error, results) {
        response.render('list', {
          data: results
        });
    });
});

// 로그인
app.get('/login', function(request, response) {
  response.render('login');
});

app.post('/login', function(request, response) {
  var body = request.body;
  // 데이터베이스 쿼리를 실행합니다,
  client.query('SELECT * FROM people WHERE id=?', [body.id], function(error, data) {
    if(data[0] !== undefined && data[0].password == body.pw) {
      request.session.memberId = data[0].id;
      response.redirect('/');
    }
    else {
      response.render('login');
    }
   });
});

// 로그아웃
app.get('/logout', function(request, response) {
  request.session.destroy(function() {
    response.redirect('/');
  });
});

// 회원정보 수정
app.get('/update', function(request, response) {
  // 데이터베이스 쿼리를 실행합니다.
  client.query('SELECT * FROM people WHERE id=?', [request.session.memberId], function(error, result) {
    response.render('update', {
      session: request.session.memberId,
      data: result[0]
    })
  });
});

app.post('/update', function(request, response) {
  var body = request.body;

  // 데이터베이스 쿼리를 실행합니다.
  client.query('UPDATE people SET name=?, password=? WHERE id=?',[
    body.name, body.pw, request.session.memberId
  ], function() {
    response.redirect('/');
  });
});

// 회원탈퇴
app.get('/delete', function(request, response) {
  response.render('delete', {
    session: request.session.memberId
  });
});

app.post('delete',function(request, response) {
  
});

// 오류를 처리합니다.
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
