/*
// 모듈을 추출합니다.
var http = require('http');

// 서버를 생성 및 실행합니다.
http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type' : 'text/html' });
    response.end('<h1>Test - File - 2</h1>');
}).listen(52273, function() {
    console.log('Server Running at http://127.0.0.1:52273');
});
*/

// 서버를 생성 및 실행합니다.
require('http').createServer(function(request, response) {
    if(request.url == '/') {
        // 응답합니다.
        response.write('<!DOCTYPE html>');
        response.write('<html>');
        response.write('<head>');
        response.write('    <title>Forever</title>');
        response.write('</head>');
        response.write('<body>');
        response.write('    <h1>Forever</h1>');
        response.write('</body>');
        response.write('</html>');
        response.end();
    }
    else {
        // 오류를 발생시킵니다.
        error.error.error();
    }
}).listen(52273, function() {
    console.log('Server Running at http://127.0.0.1:52273');
});