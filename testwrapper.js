var child = require('child_process');

child.exec('mocha --reporter JSON', function(err, stdout, stderr){
  console.log(err);
  console.log('===');
  console.log(stdout);
  console.log('===');
  console.log(stderr);
});
