/**
 * 1. 校验下载的文件是否被篡改
 * 2. 对密码进行加密
 * 
 */

let crypto = require('crypto');

let str = 'hello';

// console.log(crypto.getHashes());

// let md5 = crypto.createHash('md5'); 不安全
let md5 = crypto.createHash('sha1');   //安全
// 指定加密 值
md5.update(str);
// hex: 十六进制，指定输出的格式
console.log(md5.digest('hex'));
//MD5: 5d41402abc4b2a76b9719d911017c592
//SHA1: aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d