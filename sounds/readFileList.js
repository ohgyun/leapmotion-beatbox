/**
 * 사운드 디렉토리의 전체 파일을 읽는다.
 */
var fs = require('fs');
var path = require('path');

var sounds = fs.readdirSync('./');

sounds.forEach(function (type) {
  if (type.indexOf('.') === 0) { return; }

  var typeDir = './' + type;
  var stats = fs.statSync(typeDir);

  if (stats.isDirectory()) {
    var files = fs.readdirSync('./' + type);
    
    files.forEach(function (file) {
      console.log(path.join(typeDir, file));
    });
  }
});
