let argv = {};
let args = process.argv;
console.log(args)
for(let i = 2; i < args.length; i++) {
  let val = args[i];
  if(val.statsWith('--')) {
    argv[val.slice(2)] = args[++1]
  }
}



exports.argv = argv;