let http = require('http');
let path = require('path');
let url = require('url');
let zlib = require('zlib');
let fs = require('fs');
let { promisify } = require('util')
// 可以根据不同的文件转成不同的文件类型
let mime = require('mime');
// 把异步的方法转成同步写法
let stat = promisify(fs.stat)
/**
 * 客户端向服务器发起请求的时候。会带一个请求头
 * Accept-Encoding: gzip, deflate
 */
http.createServer(request).listen(8080);

async function request (req, res) {
  let { pathname } = url.parse(req.url);
  let filepath = path.join(__dirname, pathname)
  try {
    let statObj = await stat(filepath)
    res.setHeader('Content-Type', mime.getType(pathname))
    let acceptEncoding = req.headers['accept-encoding'];
    // 内容协商
    if(acceptEncoding) {
      if(acceptEncoding.match(/\bgzip\b/)) {
        // 告诉服务器我用什么压缩方法压缩了
        res.setHeader('Content-Encoding', 'gzip')
        fs.createReadStream(filepath).pipe(zlib.createGzip()).pipe(res);
      } else if(acceptEncoding.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding', 'deflate')
        fs.createReadStream(filepath).pipe(zlib.createDeflate()).pipe(res);
      } else {
        fs.createReadStream(filepath).pipe(res);
      }
    } else {
      fs.createReadStream(filepath).pipe(res);
    }
  } catch(e) {
    res.statusCode = 404
  }
}