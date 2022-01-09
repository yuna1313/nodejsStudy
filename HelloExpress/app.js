// 모듈을 추출합니다.
var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// 사용자 정의 모듈을 추출합니다.
var routes = require('./routes/index');
var users = require('./routes/users');

// 서버를 생성합니다.
var app = express();

// 서버를 설정합니다.'
app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: true
}));
app.set('case sensitive routes', true);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 미들웨어를 설정합니다.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 라우터 미들웨어를 설정합니다.
app.use('/', routes);
app.use('/users', users);

// 404 에러가 발생했을 때 메시지를 출력합니다.
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 에러 핸들러

// development 환경에서의 오류를 처리합니다.
if(app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error',{
      message: err.message,
      error: err
    });
  });
}

// production 환경에서의 오류를 처리합니다.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
    res.render('error',{
      message: err.message,
      error: {}
    });
})

// GET - /
app.get('/', routes);

// GET - /product
app.get('/product', function(request, response) {
  response.render('product', {
    title: 'Product Page'
  });
});

// GET - /product/insert
app.get('/product/insert', function(request, response) {
  response.render('product/insert', {
    title: 'Insert Page'
  });
});

// GET - /product/edit
app.get('/product/edit', function(request, response) {
  response.render('product/edit', {
    title: 'Edit Page'
  });
});

module.exports = app;
