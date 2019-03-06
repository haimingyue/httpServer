//detach 默认情况下，父进程等子进程全部完成才退出
// 子进程设置detach ： true 子进程脱离父进程单独存在

let {spawn} = require('child_process');
let fs = require('fs');
let path = require('path');
let fd = fs.openSync(path.join(__dirname, 'msg.txt'), 'w', 0o666)
let p1 = spawn('node', ['test4.js'], {
  stdin: ['ignore', fd, process.stderr],
  // stdin: [xx, 标准输出流, xx]
  cwd:path.join(__dirname, 'test1'),
  detach: true
})

p1.on('error', function(err) {
  console.log(err);
})
process.on('error', function(err) {
  console.log(err)
})
// 让父进程先退出，子进程继续运行
p1.unref();
