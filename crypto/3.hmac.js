// 加盐算法
let crypto = require('crypto');
let path = require('path');

let hmac = crypto.createHmac('sha1', 'abc');
hmac.update('123');

let result = hmac.digest('hex');
console.log(result);
