// 모듈을 추출합니다.
var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

// 웹 서버를 실행합니다.
var server = http.createServer(function(request, response) {
    // HTMLPage3.html 파일을 읽습니다.
    fs.readFile('HTMLPage3.html', function(error, data) {
        response.writeHead(200, { 'Content-Type' : 'text/html' });
        response.end(data);
    });
}).listen(52273,function() {
    console.log('Server Running at http://127.0.0.1:52273');
});

// 소켓 서버를 생성 및 실행합니다.
var id = 0;
var io = socketio.listen(server);
io.sockets.on('connection', function(socket){
    id = socket.id;
    // rint 이벤트
    socket.on('rint', function(data) {
        // 클라이언트가 전송한 데이터를 출력합니다.
        console.log('Client Send Data:', data);

        // public 통신
        // io.sockets.emit('smart', data);

        // broadcast 통신
        // socket.broadcast.emit('smart', data);

        // private 통신
        io.sockets.to(id).emit('smart', data);
    });
});