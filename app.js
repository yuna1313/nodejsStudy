// 모듈을 추출합니다.
var rint = require('./rint.js');

// 이벤트를 연결합니다.
rint.timer.on('tick', function(code) {
    console.log('이벤트를 실행합니다.');
});