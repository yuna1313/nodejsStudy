// 모듈을 추출합니다.
var http = require('http');
var fs = require('fs');
var jade = require('jade');

// 서버를 생성하고 실행합니다.
http.createServer(function(request, response) {
    // ejsPage 파일을 읽습니다.
    fs.readFile('JadePage.jade', 'utf-8', function(error, data) {
        // jade 모듈을 사용합니다.
        var fn = jade.compile(data);
        response.writeHead(200, { 'Content-Type' : 'text/html' });
        response.end(fn({
            name: 'RintIanTta',
            description: 'Hello jade With Node.js'
        }));
    });
}).listen(52273, function() {
    console.log('Server Running at http://127.0.0.1:52273');
})