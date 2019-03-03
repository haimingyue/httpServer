// 场景，对运营商返回的数据进行MD5检测
let crypto = require('crypto');
let path = require('path');
let rs = require('fs').createReadStream(path.join(__dirname, meg.txt),  {
  highWaterMark: 2
});

let md5 = crypto.createHash('md5');

rs.on('data', function(data) {
  md5.update(data);
})

rs.on('end', function() {
  let md5Val = md5.digest('hex')
  res.setHeader('Content-MD5', md5Val)
})
