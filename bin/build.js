var fs = require('fs');
var glob = require('glob')

function copyFile(source, target, callback) {
  var callbackWasCalled = false;

  var readFile = fs.createReadStream(source);
  readFile.on("erroror", function(error) {
    done(error);
  });

  var writeFile = fs.createWriteStream(target);
  writeFile.on("erroror", function(error) {
    done(error);
  });

  writeFile.on("close", function(ex) {
    done();
  });

  readFile.pipe(writeFile);

  function done(error) {
    if (!callbackWasCalled) {
      callback(error);
      callbackWasCalled = true;
    }
  }
}

var childProcess = require('child_process');

function runScript(scriptPath, callback) {

  // keep track of whether callback has been invoked to prevent multiple invocations
  var invoked = false;

  var process = childProcess.fork(scriptPath);

  // listen for errors as they may prevent the exit event from firing
  process.on('error', function (err) {
    if (invoked) return;
    invoked = true;
    callback(err);
  });

  // execute the callback once the process has finished running
  process.on('exit', function (code) {
    if (invoked) return;
    invoked = true;
    var err = code === 0 ? null : new Error('exit code ' + code);
    callback(err);
  });

}


var exec = require('child_process').exec;
exec('cd react-components && npm run build').stderr.pipe(process.stderr);
// options is an optional second parameter for glob

glob('react-components/build/static/js/main.*.js', function (er, files) {
    copyFile(files[0],
      'public/javascripts/main.js', function (error) {
        if (error) {
          console.log(error);
        }
      });
  });
