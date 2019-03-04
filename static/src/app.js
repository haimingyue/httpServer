let config = require('./config.js')
let http = require('http');
let chalk = require('chalk');
let path = require('path');
let fs = require('fs');
let url = require('url');
let util = require('util');
let { promisify } = require('util');
let mime = require('mime');
let stat = promisify(fs.stat);
let readdir = promisify(fs.readdir);
let handlebars = require('handlebars');
function list() {
  // 编译模板，得到一个渲染的方法，传入实际的数据
  let tmpl = fs.readFileSync(path.resolve(__dirname, 'template', 'list.html'), 'utf8')
  return handlebars.compile(tmpl)
}
// 在控制台输出的模块
// 每个debug都有个名字
process.env.debug = 'static:*'
// console.log(process.env)


let debug = require('debug')('static:app');
class Server {
  constructor() {
    this.list = list()
  }
  start() {
    let server = http.createServer()
    server.on('request', this.request.bind(this))
    server.listen(config.port, () => {
      let url = `${config.host}:${config.port}`
      debug(`server started at ${chalk.green(url)}`)
    })
  }

  async request(req, res) {
    // 先取到客户端想访问的路径
    let {pathname} = url.parse(req.url)
    let filepath = path.join(config.root, pathname)
    try {
      let statObj = await stat(filepath)
      if(statObj.isDerectory) {
        let files = await readdir(filepath)
        files = files.map(file => ({
          name: file,
          url: path.join(pathname, file)
        }))
        let html = this.list({
          title: pathname,
          files
        })
        res.setHeader('Content-Type','text/html')
        res.end()
      } else {
        this.sendFile(req, res, filepath, statObj)
      }
    } catch(e) {
      debug(util.inspect(e)); //inspect把对象转成字符串
      this.sendError(req, res)
    }
  }

  sendFile(req, res, filepath, statObj) {
    res.setHeader('Content-Type', mime.getType(filepath));
    fs.createReadStream(filepath).pipe(res);
  }

  sendError(req, res) {
    res.statusCode = 500;
    res.end(`there is somethinf wrong in the server!`)
  }
}

let server = new Server();
server.start(); //启动服务器
