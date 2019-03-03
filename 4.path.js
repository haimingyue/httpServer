let path = require('path');

let str = 'a/b/c/d.jpg';

console.log(path.basename(str));
console.log(path.basename(str, '.jpg'));
console.log(path.extname(str));
