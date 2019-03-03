// 对称加密 

let crypto = require('crypto');
// let path = require('path');
let str = 'zfpx';
let cipher = crypto.createCipher('blowfish', 'abc');
cipher.update(str);
let result = cipher.final('hex');
console.log(result);
// result  ===>  1459a0d460383229

// 解密
let decipher = crypto.createDecipher('blowfish', 'abc');
decipher.update(result, 'hex')
// 输出解密后的结果
let r = decipher.final('utf8')
console.log(r)
// result  ===>  zfpx