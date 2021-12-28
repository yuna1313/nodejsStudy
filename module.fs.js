// 모듈을 추출합니다.
var fs = require('fs');

//변수를 선언합니다.
var data = 'Hello World..!';

// 모듈을 사용합니다.
// var text = fs.readFileSync('textfile.txt', 'utf8');
// console.log(text);

// fs.readFile('textfile.txt', 'utf8', function (error, data) {
//     console.log(data);
// })

fs.writeFile('TextFileOtherWrite.txt', data, 'utf8', function (error) {
    console.log('WRITE FILE ASYNC COMPLETE');
});
fs.writeFileSync('TextFileOtherWriteSync.txt', data, 'utf8');
console.log('WRITE FILE SYNC COMPLETE');