module.exports = function(cb){
  process.stdin.resume();
  process.stdin.setEncoding('ascii');
  let _input = '';
  process.stdin.on('data', function(input) {
    _input += input;
  });

  process.stdin.on('end', function() {
    cb(getLines(_input));
  });
};

function getLines(str) {
  let lines = (str||'').toString().split('\n');
	// pop any empty lines off end of lines array
  while (lines[lines.length - 1] === '') {
    lines.pop();
  }
  return lines;
}
