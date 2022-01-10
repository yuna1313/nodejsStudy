// 모듈을 추출합니다.
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 서버를 생성합니다.
var app = express();

// 서버를 설정합니다.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 라우트를 실행합니다.
app.get('/', function(request, response) {
  response.render('index', {
    title: 'Index'
  });
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

// 모듈화
module.exports = app;
