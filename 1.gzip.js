let fs = require('fs');
let path = require('path');
let zlib = require('zlib');
// 用于时限压缩

// transform 流 转换流, 继承自双工流, 可读可写
// function gzip (src) {
//   fs.createReadStream(src)
//     .pipe(zlib.createGzip())
//     .pipe(fs.createWriteStream(src+ '.gz'));
// }
//gzip(path.join(__dirname, 'msg.txt'));
// basename 从路径中得到文件名，包括扩展名，第二个参数，去掉扩展名
function gunzip (src) {
  fs.createReadStream(src)
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(path.join(__dirname, path.basename(src, '.gz'))))
}

gunzip(path.join(__dirname, 'msg.txt.gz'))